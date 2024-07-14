const ABIs = {
  attestationRegistryLike: [
    {
      inputs: [
        {
          internalType: 'address',
          name: '_schemaRegistry',
          type: 'address',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'bytes32',
          name: 'uid',
          type: 'bytes32',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'attester',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'recipient',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'bytes32',
          name: 'schema',
          type: 'bytes32',
        },
        {
          indexed: false,
          internalType: 'bytes',
          name: 'data',
          type: 'bytes',
        },
      ],
      name: 'Attested',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'bytes32',
          name: 'uid',
          type: 'bytes32',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'user',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'maxTimestamp',
          type: 'uint256',
        },
      ],
      name: 'Granted',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'bytes32',
          name: 'uid',
          type: 'bytes32',
        },
      ],
      name: 'Revoked',
      type: 'event',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32',
        },
      ],
      name: '_db',
      outputs: [
        {
          internalType: 'bytes32',
          name: 'uid',
          type: 'bytes32',
        },
        {
          internalType: 'bytes32',
          name: 'schema',
          type: 'bytes32',
        },
        {
          internalType: 'bytes32',
          name: 'symmetricKey',
          type: 'bytes32',
        },
        {
          internalType: 'bytes',
          name: 'data',
          type: 'bytes',
        },
        {
          internalType: 'address',
          name: 'attester',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'recipient',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'revokedAt',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'time',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'schemaUID',
          type: 'bytes32',
        },
        {
          internalType: 'bytes',
          name: 'data',
          type: 'bytes',
        },
        {
          internalType: 'address',
          name: 'recipient',
          type: 'address',
        },
        {
          internalType: 'bytes32',
          name: 'symmetricKey',
          type: 'bytes32',
        },
        {
          internalType: 'uint256',
          name: 'currentTimestamp',
          type: 'uint256',
        },
      ],
      name: 'attest',
      outputs: [
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'uid',
          type: 'bytes32',
        },
      ],
      name: 'getAttestation',
      outputs: [
        {
          components: [
            {
              internalType: 'bytes32',
              name: 'uid',
              type: 'bytes32',
            },
            {
              internalType: 'bytes32',
              name: 'schema',
              type: 'bytes32',
            },
            {
              internalType: 'bytes32',
              name: 'symmetricKey',
              type: 'bytes32',
            },
            {
              internalType: 'bytes',
              name: 'data',
              type: 'bytes',
            },
            {
              internalType: 'address',
              name: 'attester',
              type: 'address',
            },
            {
              internalType: 'address',
              name: 'recipient',
              type: 'address',
            },
            {
              internalType: 'uint256',
              name: 'revokedAt',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'time',
              type: 'uint256',
            },
          ],
          internalType: 'struct AttestationRecord',
          name: '',
          type: 'tuple',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'uid',
          type: 'bytes32',
        },
        {
          internalType: 'address',
          name: 'usr',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'maxTimestamp',
          type: 'uint256',
        },
      ],
      name: 'grant',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'uid',
          type: 'bytes32',
        },
        {
          internalType: 'address',
          name: 'usr',
          type: 'address',
        },
      ],
      name: 'hasPermissionToDecrypt',
      outputs: [
        {
          internalType: 'bool',
          name: 'isAuthorizedUser',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'uid',
          type: 'bytes32',
        },
      ],
      name: 'revoke',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ],
  schemaRegistryLike: [
    { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
    {
      type: 'function',
      name: 'denyPermission',
      inputs: [
        { name: 'uid', type: 'bytes32', internalType: 'bytes32' },
        { name: 'usr', type: 'address', internalType: 'address' },
      ],
      outputs: [],
      stateMutability: 'nonpayable',
    },
    {
      type: 'function',
      name: 'getSchema',
      inputs: [{ name: 'uid', type: 'bytes32', internalType: 'bytes32' }],
      outputs: [
        {
          name: '',
          type: 'tuple',
          internalType: 'struct SchemaRecord',
          components: [
            { name: 'uid', type: 'bytes32', internalType: 'bytes32' },
            { name: 'schema', type: 'string', internalType: 'string' },
          ],
        },
      ],
      stateMutability: 'view',
    },
    {
      type: 'function',
      name: 'grantPermission',
      inputs: [
        { name: 'uid', type: 'bytes32', internalType: 'bytes32' },
        { name: 'usr', type: 'address', internalType: 'address' },
      ],
      outputs: [],
      stateMutability: 'nonpayable',
    },
    {
      type: 'function',
      name: 'hasAccessToSchema',
      inputs: [
        { name: 'uid', type: 'bytes32', internalType: 'bytes32' },
        { name: 'usr', type: 'address', internalType: 'address' },
      ],
      outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
      stateMutability: 'view',
    },
    {
      type: 'function',
      name: 'register',
      inputs: [{ name: 'schema', type: 'string', internalType: 'string' }],
      outputs: [{ name: '', type: 'bytes32', internalType: 'bytes32' }],
      stateMutability: 'nonpayable',
    },
    {
      type: 'event',
      name: 'DenyPermission',
      inputs: [
        {
          name: 'uid',
          type: 'bytes32',
          indexed: true,
          internalType: 'bytes32',
        },
        {
          name: 'usr',
          type: 'address',
          indexed: true,
          internalType: 'address',
        },
      ],
      anonymous: false,
    },
    {
      type: 'event',
      name: 'GrantPermission',
      inputs: [
        {
          name: 'uid',
          type: 'bytes32',
          indexed: true,
          internalType: 'bytes32',
        },
        {
          name: 'usr',
          type: 'address',
          indexed: true,
          internalType: 'address',
        },
        {
          name: 'schema',
          type: 'string',
          indexed: false,
          internalType: 'string',
        },
      ],
      anonymous: false,
    },
    {
      type: 'event',
      name: 'Registered',
      inputs: [
        {
          name: 'uid',
          type: 'bytes32',
          indexed: true,
          internalType: 'bytes32',
        },
      ],
      anonymous: false,
    },
  ],
};

const addresses = {
  11155111: {
    schemaRegistry: '0x73F45027CcE51be3F316018599245459b6d5089B',
    attestationRegistry: '0x0C94fD3e8adc4A6E7b0923FACdF085686e447128',
  },
  84532: {},
  421614: {},
};

const events = {
  schemaRegistry: {
    denyPermission:
      '0x2f6c6f2b9a6d0d37718fae85e2d30a2cfe6de2e49339b2a71795e653beebbcc7',
    grantPermission:
      '0xa86d7ad58ce6d67d25ca275b542b5e9ed900d2aacbb2474c556f335f719f5c54',
  },
  attestationRegistry: {
    attested: 'Attested',
    granted: 'Granted',
    revoked: 'Revoked',
  },
};

export function getSchemaRegistryContract(chainId: number) {
  return {
    address: addresses[chainId].schemaRegistry,
    abi: ABIs.schemaRegistryLike,
    events: events.schemaRegistry,
  };
}

export function getAttestationRegistryContract(chainId: string) {
  return {
    address: addresses[chainId].attestationRegistry,
    abi: ABIs.attestationRegistryLike,
    events: events.attestationRegistry,
  };
}
