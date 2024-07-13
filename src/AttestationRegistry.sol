// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {ISchemaRegistry, SchemaRecord} from "./ISchemaRegistry.sol";
import {IAttestationRegistry, AttestationRecord} from "./IAttestationRegistry.sol";
import {EMPTY_UID, MAX_TIMESTAMP} from "./Common.sol";

contract AttestationRegistry is IAttestationRegistry {
    ISchemaRegistry schemaRegistry;

    mapping(bytes32 => AttestationRecord) public _db;
    mapping(bytes32 => mapping(address => uint256)) private _permissions;

    constructor(address _schemaRegistry) {
        schemaRegistry = ISchemaRegistry(_schemaRegistry);
    }

    /// @inheritdoc IAttestationRegistry
    function attest(bytes32 schemaUID, bytes calldata data, address recipient) external override returns (bytes32) {
        // Ensure that we aren't attempting to attest to a non-existing schema.
        SchemaRecord memory schemaRecord = schemaRegistry.getSchema(schemaUID);
        require(schemaRecord.uid != EMPTY_UID, "Attestation/non-existing-schema");
        require(
            schemaRegistry.hasAccessToSchema(schemaRecord.uid, msg.sender) == true, "Attestation/attester-not-allowed"
        );

        AttestationRecord memory attestation = AttestationRecord({
            uid: EMPTY_UID,
            schema: schemaUID,
            time: block.timestamp,
            revokedAt: 0,
            recipient: recipient,
            attester: msg.sender,
            data: data
        });

        // Look for the first non-existing UID (and use a bump seed/nonce in the rare case of a conflict).
        bytes32 uid;
        uint32 bump = 0;
        while (true) {
            uid = _getUID(attestation, bump);
            if (_db[uid].uid == EMPTY_UID) {
                break;
            }

            unchecked {
                ++bump;
            }
        }
        attestation.uid = uid;

        _db[uid] = attestation;
        _grant(uid, msg.sender, MAX_TIMESTAMP);
        _grant(uid, recipient, MAX_TIMESTAMP);

        emit Attested(uid, msg.sender, recipient, schemaUID, data);
        return uid;
    }

    /// @inheritdoc IAttestationRegistry
    function revoke(bytes32 uid) external override {
        AttestationRecord memory attestation = _db[uid];
        require(
            schemaRegistry.hasAccessToSchema(attestation.schema, msg.sender) == true, "Attestation/attester-not-allowed"
        );

        _db[uid].revokedAt = block.timestamp;

        emit Revoked(uid);
    }

    /// @inheritdoc IAttestationRegistry
    function getAttestation(bytes32 uid) external view override returns (AttestationRecord memory) {
        return _db[uid];
    }

    /// @inheritdoc IAttestationRegistry
    function grant(bytes32 uid, address usr, uint256 maxTimestamp) external {
        AttestationRecord memory attestation = _db[uid];
        require(attestation.uid != EMPTY_UID, "Permission/attestation-not-found");
        // Revoke access if the max timestamp is in the past.
        // require(maxTimestamp > block.timestamp, "Permission/grant-invalid-timestamp");

        bool isAuthorizedUser = _permissions[uid][msg.sender] == MAX_TIMESTAMP
            || schemaRegistry.hasAccessToSchema(attestation.schema, msg.sender);
        require(isAuthorizedUser, "Permission/not-authorized-user");

        _grant(uid, usr, maxTimestamp);
    }

    /// @inheritdoc IAttestationRegistry
    function hasPermissionToDecrypt(bytes32 uid, address usr) external view returns (bool isAuthorizedUser) {
        AttestationRecord memory attestation = _db[uid];
        require(attestation.uid != EMPTY_UID, "Permission/attestation-not-found");

        isAuthorizedUser =
            _permissions[uid][msg.sender] > block.timestamp || schemaRegistry.hasAccessToSchema(attestation.schema, usr);
    }

    /// @dev Calculates a UID for a given attestation.
    /// @param attestation The input attestation.
    /// @param bump A bump value to use in case of a UID conflict.
    /// @return Attestation UID.
    function _getUID(AttestationRecord memory attestation, uint32 bump) private pure returns (bytes32) {
        return keccak256(
            abi.encodePacked(
                attestation.schema,
                attestation.recipient,
                attestation.attester,
                attestation.time,
                attestation.data,
                bump
            )
        );
    }

    /// @dev Grants access to a specific attestation.
    /// @param uid The UID of the attestation.
    /// @param usr The user account to grant access to.
    /// @param timestamp The max timestamp of valid attestation access.
    function _grant(bytes32 uid, address usr, uint256 timestamp) private {
        _permissions[uid][usr] = timestamp;
        emit Granted(uid, usr, timestamp);
    }
}
