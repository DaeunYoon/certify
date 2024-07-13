// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

struct AttestationRecord {
    bytes32 uid;
    bytes32 schema;
    bytes data;
    address attester;
    address recipient;
    uint256 revokedAt;
    uint256 time;
}

interface IAttestationRegistry {
    /// @notice Emitted when a new attestation was created
    /// @param uid The attestation UID.
    /// @param attester The address of the account who attested.
    /// @param recipient The address of the account who received the attestation.
    /// @param schema The schema UID.
    /// @param data The attestation data.
    event Attested(
        bytes32 indexed uid, address indexed attester, address indexed recipient, bytes32 schema, bytes data
    );

    /// @notice Emitted when an attestation was revoked
    /// @param uid The attestation UID.
    event Revoked(bytes32 indexed uid);

    /// @notice Emitted when a new access was granted
    /// @param uid The attestation UID.
    /// @param user The address of the account who got granted access to attestation.
    /// @param maxTimestamp The max timestamp of valid attestation access.
    event Granted(bytes32 indexed uid, address indexed user, uint256 maxTimestamp);

    /// @notice Attest to a specific schema with data
    /// @param schemaUID The UID of the schema.
    /// @param data The data to be attested.
    /// @param receiver The receiver of the attestation.
    /// @return The UID of the attestation.
    function attest(bytes32 schemaUID, bytes calldata data, address receiver) external returns (bytes32);

    function revoke(bytes32 uid) external;

    function getAttestation(bytes32 uid) external view returns (AttestationRecord memory);

    /// @notice Grant access to a specific attestation
    /// @param uid The UID of attestation.
    /// @param usr The user account to grant access to.
    /// @param maxTimestamp The max timestamp of valid attestation access.
    function grant(bytes32 uid, address usr, uint256 maxTimestamp) external;

    /// @notice Check if access is granted to a specific attestation
    /// @param uid The UID of attestation.
    /// @param usr The user account to check access for.
    /// @return True if access is granted, false otherwise.
    function hasPermissionToDecrypt(bytes32 uid, address usr) external view returns (bool);
}
