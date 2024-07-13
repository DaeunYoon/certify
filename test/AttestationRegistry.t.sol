// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import { Test, console } from "forge-std/Test.sol";
import { IAttestationRegistry } from "../src/IAttestationRegistry.sol";
import { ISchemaRegistry } from "../src/ISchemaRegistry.sol";
import { DeployAll, DeployInstance } from "../script/dependencies/DeployAll.sol";

contract IAttestationRegistryTest is Test {
    // Contract instance
    DeployInstance public instance;
    ISchemaRegistry schemaRegistry;
    IAttestationRegistry attestationRegistry;

    // Test accounts
    address public alice = address(0x01);
    address public bob = address(0x02);

    // Test data
    bytes32 schemaUID;
    uint256 futureTimestamp = block.timestamp + 1 days;

    // Events
    event Attested(bytes32 indexed uid, address indexed attester, address indexed recipient, bytes32 schema, bytes data);
    event Revoked(bytes32 indexed uid);
    event Granted(bytes32 indexed uid, address indexed user, uint256 maxTimestamp);

    function setUp() public {
        instance = DeployAll.deploy();
        schemaRegistry = ISchemaRegistry(instance.schemaRegistry);
        attestationRegistry = IAttestationRegistry(instance.attestationRegistry);
        schemaUID = schemaRegistry.register("schema");
    }

    function testAttestAndRevoke() public {
        bytes memory data = abi.encodePacked("data");
        bytes32 uid = attestationRegistry.attest(schemaUID, data, alice);
        
        assertEq(attestationRegistry.getAttestation(uid).revokedAt, 0);
        attestationRegistry.revoke(uid);
        assertNotEq(attestationRegistry.getAttestation(uid).revokedAt, 0);
    }

    function testHasPermissionToDecrypt() public {
        bytes memory data = abi.encodePacked("data");
        bytes32 uid = attestationRegistry.attest(schemaUID, data, alice);

        vm.startPrank(alice);
        assertEq(attestationRegistry.hasPermissionToDecrypt(uid, alice), true);
        vm.stopPrank();

        vm.startPrank(bob);
        assertEq(attestationRegistry.hasPermissionToDecrypt(uid, alice), false);
        vm.stopPrank();

        vm.prank(alice);
        attestationRegistry.grant(uid, bob, futureTimestamp);
        vm.stopPrank();

        vm.startPrank(bob);
        assertEq(attestationRegistry.hasPermissionToDecrypt(uid, bob), true);

        vm.warp(futureTimestamp);
        assertEq(attestationRegistry.hasPermissionToDecrypt(uid, bob), false);
        vm.stopPrank();
    }
}
