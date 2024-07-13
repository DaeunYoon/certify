// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import { AttestationRegistry } from "../../src/AttestationRegistry.sol";
import { SchemaRegistry } from "../../src/SchemaRegistry.sol";

struct DeployInstance {
    address schemaRegistry;
    address attestationRegistry;
}

library DeployAll {
    function deploy() internal returns (DeployInstance memory instance) {
        instance.schemaRegistry = address(new SchemaRegistry());
        instance.attestationRegistry = address(new AttestationRegistry(instance.schemaRegistry));
    }
}