const ABIs = {
  attestationRegistryLike: [
    {
      type: 'constructor',
      inputs: [
        { name: '_schemaRegistry', type: 'address', internalType: 'address' },
      ],
      stateMutability: 'nonpayable',
    },
    {
      type: 'function',
      name: '_db',
      inputs: [{ name: '', type: 'bytes32', internalType: 'bytes32' }],
      outputs: [
        { name: 'uid', type: 'bytes32', internalType: 'bytes32' },
        { name: 'schema', type: 'bytes32', internalType: 'bytes32' },
        { name: 'data', type: 'bytes', internalType: 'bytes' },
        { name: 'attester', type: 'address', internalType: 'address' },
        { name: 'recipient', type: 'address', internalType: 'address' },
        { name: 'revokedAt', type: 'uint256', internalType: 'uint256' },
        { name: 'time', type: 'uint256', internalType: 'uint256' },
      ],
      stateMutability: 'view',
    },
    {
      type: 'function',
      name: 'attest',
      inputs: [
        { name: 'schemaUID', type: 'bytes32', internalType: 'bytes32' },
        { name: 'data', type: 'bytes', internalType: 'bytes' },
        { name: 'recipient', type: 'address', internalType: 'address' },
      ],
      outputs: [{ name: '', type: 'bytes32', internalType: 'bytes32' }],
      stateMutability: 'nonpayable',
    },
    {
      type: 'function',
      name: 'getAttestation',
      inputs: [{ name: 'uid', type: 'bytes32', internalType: 'bytes32' }],
      outputs: [
        {
          name: '',
          type: 'tuple',
          internalType: 'struct AttestationRecord',
          components: [
            { name: 'uid', type: 'bytes32', internalType: 'bytes32' },
            { name: 'schema', type: 'bytes32', internalType: 'bytes32' },
            { name: 'data', type: 'bytes', internalType: 'bytes' },
            { name: 'attester', type: 'address', internalType: 'address' },
            { name: 'recipient', type: 'address', internalType: 'address' },
            { name: 'revokedAt', type: 'uint256', internalType: 'uint256' },
            { name: 'time', type: 'uint256', internalType: 'uint256' },
          ],
        },
      ],
      stateMutability: 'view',
    },
    {
      type: 'function',
      name: 'grant',
      inputs: [
        { name: 'uid', type: 'bytes32', internalType: 'bytes32' },
        { name: 'usr', type: 'address', internalType: 'address' },
        { name: 'maxTimestamp', type: 'uint256', internalType: 'uint256' },
      ],
      outputs: [],
      stateMutability: 'nonpayable',
    },
    {
      type: 'function',
      name: 'hasPermissionToDecrypt',
      inputs: [
        { name: 'uid', type: 'bytes32', internalType: 'bytes32' },
        { name: 'usr', type: 'address', internalType: 'address' },
      ],
      outputs: [
        { name: 'isAuthorizedUser', type: 'bool', internalType: 'bool' },
      ],
      stateMutability: 'view',
    },
    {
      type: 'function',
      name: 'revoke',
      inputs: [{ name: 'uid', type: 'bytes32', internalType: 'bytes32' }],
      outputs: [],
      stateMutability: 'nonpayable',
    },
    {
      type: 'event',
      name: 'Attested',
      inputs: [
        {
          name: 'uid',
          type: 'bytes32',
          indexed: true,
          internalType: 'bytes32',
        },
        {
          name: 'attester',
          type: 'address',
          indexed: true,
          internalType: 'address',
        },
        {
          name: 'recipient',
          type: 'address',
          indexed: true,
          internalType: 'address',
        },
        {
          name: 'schema',
          type: 'bytes32',
          indexed: false,
          internalType: 'bytes32',
        },
        { name: 'data', type: 'bytes', indexed: false, internalType: 'bytes' },
      ],
      anonymous: false,
    },
    {
      type: 'event',
      name: 'Granted',
      inputs: [
        {
          name: 'uid',
          type: 'bytes32',
          indexed: true,
          internalType: 'bytes32',
        },
        {
          name: 'user',
          type: 'address',
          indexed: true,
          internalType: 'address',
        },
        {
          name: 'maxTimestamp',
          type: 'uint256',
          indexed: false,
          internalType: 'uint256',
        },
      ],
      anonymous: false,
    },
    {
      type: 'event',
      name: 'Revoked',
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
    schemaRegistry: '0x176ab35e905c1fd7dd1169ba1165729fd1f8ab44',
    attestationRegistry: '0xed8566308239403fc30026db5cc0df0e47e6d877',
  },
  84532: {},
  421614: {},
};

export function getSchemaRegistryContract(chainId: string) {
  return {
    address: addresses[chainId].schemaRegistry,
    abi: ABIs.schemaRegistryLike,
  };
}

export function getAttestationRegistryContract(chainId: string) {
  return {
    address: addresses[chainId].attestationRegistry,
    abi: ABIs.attestationRegistryLike,
  };
}
