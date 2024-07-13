// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/// @notice A struct representing a record for a submitted schema.
struct SchemaRecord {
    bytes32 uid; // The unique identifier of the schema.
    string schema; // Custom specification of the schema (e.g., "uint256 eventId, uint8 voteIndex").
}

interface ISchemaRegistry {
    /// @notice Emitted when a new schema has been registered
    /// @param uid The schema UID.
    event Registered(bytes32 indexed uid);

    /// @notice Emitted when a user has been granted access to a schema
    /// @param uid The schema UID.
    /// @param usr The user address.
    event GrantPermission(bytes32 indexed uid, address indexed usr);

    /// @notice Emitted when a user has been denied access to a schema
    /// @param uid The schema UID.
    /// @param usr The user address.
    event DenyPermission(bytes32 indexed uid, address indexed usr);

    /// @notice Submits and reserves a new schema
    /// @param schema The schema data schema.
    /// @return The UID of the new schema.
    function register(string calldata schema) external returns (bytes32);

    /// @notice Allow access to a schema
    /// @param uid The schema UID.
    /// @param usr The user address.
    function grantPermission(bytes32 uid, address usr) external;

    /// @notice Deny access to a schema
    /// @param uid The schema UID.
    /// @param usr The user address.
    function denyPermission(bytes32 uid, address usr) external;

    /// @notice Checks if a user has access to a schema
    /// @param uid The schema UID.
    /// @param usr The user address.
    function hasAccessToSchema(bytes32 uid, address usr) external view returns (bool);

    /// @notice Returns an existing schema by UID
    /// @param uid The UID of the schema to retrieve.
    /// @return The schema data members.
    function getSchema(bytes32 uid) external view returns (SchemaRecord memory);
}
