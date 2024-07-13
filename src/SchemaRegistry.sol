// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {EMPTY_UID} from "./Common.sol";
import {ISchemaRegistry, SchemaRecord} from "./ISchemaRegistry.sol";

contract SchemaRegistry is ISchemaRegistry {
    // Data
    mapping(bytes32 uid => SchemaRecord schemaRecord) private _registry;
    mapping(bytes32 => mapping(address => uint256)) private _permissions;

    constructor() {}

    /// @inheritdoc ISchemaRegistry
    function register(string calldata schema) external returns (bytes32) {
        SchemaRecord memory schemaRecord = SchemaRecord({uid: EMPTY_UID, schema: schema});

        bytes32 uid = _getUID(schemaRecord);
        require(_registry[uid].uid == EMPTY_UID, "SchemaRegistry/already-exists");

        schemaRecord.uid = uid;

        _registry[uid] = schemaRecord;
        _grantPermission(uid, msg.sender);

        emit Registered(uid);

        return uid;
    }

    /// @inheritdoc ISchemaRegistry
    function grantPermission(bytes32 uid, address usr) external {
        require(_permissions[uid][msg.sender] == 1, "SchemaRegistry/not-authorized");
        _grantPermission(uid, usr);
    }

    /// @inheritdoc ISchemaRegistry
    function denyPermission(bytes32 uid, address usr) external {
        require(_permissions[uid][msg.sender] == 1, "SchemaRegistry/not-authorized");
        _permissions[uid][usr] = 0;
        emit DenyPermission(uid, usr);
    }

    /// @inheritdoc ISchemaRegistry
    function getSchema(bytes32 uid) external view returns (SchemaRecord memory) {
        return _registry[uid];
    }

    /// @inheritdoc ISchemaRegistry
    function hasAccessToSchema(bytes32 uid, address usr) external view returns (bool) {
        return _permissions[uid][usr] == 1;
    }

    /// @dev Calculates a UID for a given schema.
    /// @param schemaRecord The input schema.
    /// @return schema UID.
    function _getUID(SchemaRecord memory schemaRecord) private pure returns (bytes32) {
        return keccak256(abi.encodePacked(schemaRecord.schema));
    }

    function _grantPermission(bytes32 uid, address usr) private {
        _permissions[uid][usr] = 1;
        emit GrantPermission(uid, usr);
    }
}
