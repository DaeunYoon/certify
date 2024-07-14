import { h, Component } from 'vue';
import { NIcon } from 'naive-ui';
import axios from 'axios';
import {
  getAddress,
  toBytes,
  isBytes,
  encodeAbiParameters,
  decodeAbiParameters,
  parseAbiParameters,
} from 'viem';

export function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

export async function getLogs(
  contractAddress: string,
  userAddress: string,
  topic0: string
): Promise<any[]> {
  const formattedWallet = userAddress.replace(
    '0x',
    '0x000000000000000000000000'
  );

  const url = `https://eth-sepolia.blockscout.com/api/v2/addresses/${contractAddress}/logs`;

  const response = await axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response?.data?.items) return [];

  const filteredLogs = response?.data?.items.filter((log: any) => {
    return (
      log.topics[0] === topic0 &&
      log.topics[2] === formattedWallet.toLocaleLowerCase()
    );
  });

  return filteredLogs;
}

export const decodeAttestationData = function (schema, attestation) {
  const optionTypes = schema.split(',').map((e) => e.trim());
  const decodedArray = decodeAbiParameters(optionTypes, attestation.data);
  // Keep only named values
  const decodedObject = {};
  for (const key of Object.keys(decodedArray)) {
    if (/^\+?\d+$/.test(key)) {
      continue;
    }
    decodedObject[key] = decodedArray[key];
  }
  return decodedObject;
};

export const encodeAttestationData = function (
  schema: string,
  options: string[]
) {
  const optionValues = [];
  const optionTypes = schema.split(',').map((e) => e.trim());
  const optionTypesToCreateSchema = [];
  for (const optionType of optionTypes) {
    const [type, key] = optionType.split(' ');
    optionTypesToCreateSchema.push(type);

    const value = options[key];
    if (!value) {
      throw new Error(`Option "${key}" can not be empty`);
    }
    if (type === 'address') {
      try {
        getAddress(value);
      } catch (error) {
        throw new Error(
          `Option "${key}" is invalid, please ensure checksummed format`
        );
      }
    }
    if (type === 'bool') {
      optionValues.push(value === 'true');
      continue;
    }
    if (type === 'bytes32') {
      const valueBytes = toBytes(value);
      if (!isBytes(valueBytes) || valueBytes.length !== 32) {
        throw new Error(
          `Option "${key}" is invalid, please ensure bytes32 format`
        );
      }
      // Use converted value instead of the string
      optionValues.push(valueBytes);
      continue;
    }
    optionValues.push(value);
  }

  return encodeAbiParameters(
    parseAbiParameters(optionTypesToCreateSchema.join(',')),
    optionValues
  );
};
