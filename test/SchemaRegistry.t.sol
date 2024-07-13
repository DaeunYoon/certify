// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import {ISchemaRegistry, SchemaRecord} from "../src/ISchemaRegistry.sol";
import {DeployAll, DeployInstance} from "../script/dependencies/DeployAll.sol";

contract SchemaRegistryTest is Test {
    // Contract instance
    DeployInstance public instance;
    ISchemaRegistry schemaRegistry;

    // Test accounts
    address public alice = address(0x01);

    // Events
    event Registered(bytes32 indexed uid);
    event GrantPermission(bytes32 indexed uid, address indexed usr);
    event DenyPermission(bytes32 indexed uid, address indexed usr);

    function setUp() public {
        instance = DeployAll.deploy();
        schemaRegistry = ISchemaRegistry(instance.schemaRegistry);
    }

    function testRegister() public {
        bytes32 expectedUid = keccak256(abi.encodePacked("schema"));
        vm.expectEmit(true, false, false, false);
        emit Registered(expectedUid);
        bytes32 uid = schemaRegistry.register("schema");
        assertEq(schemaRegistry.hasAccessToSchema(uid, address(this)), true);

        vm.startPrank(alice);
        assertEq(schemaRegistry.hasAccessToSchema(uid, alice), false);
        vm.stopPrank();
    }

    function testGrantAndDenyPermission() public {
        bytes32 uid = schemaRegistry.register("schema2");

        vm.startPrank(alice);
        assertEq(schemaRegistry.hasAccessToSchema(uid, alice), false);
        vm.stopPrank();

        vm.expectEmit(true, true, false, false);
        emit GrantPermission(uid, alice);
        schemaRegistry.grantPermission(uid, alice);

        vm.startPrank(alice);
        assertEq(schemaRegistry.hasAccessToSchema(uid, alice), true);
        vm.stopPrank();

        vm.expectEmit(true, true, false, false);
        emit DenyPermission(uid, alice);
        schemaRegistry.denyPermission(uid, alice);

        vm.startPrank(alice);
        assertEq(schemaRegistry.hasAccessToSchema(uid, alice), false);
        vm.stopPrank();
    }

    function testFailRegisterAlreadyExists() public {
        vm.expectRevert("SchemaRegistry/already-exists");
        schemaRegistry.register("schema");
    }
}
