import * as LitJsSdk from '@lit-protocol/lit-node-client';
import { getAttestationRegistryContract } from '~/contracts';
import { sepolia, baseSepolia, arbitrumSepolia } from 'viem/chains';

class Lit {
  litNodeClient;
  chain;

  constructor(chain) {
    this.chain = chain;
  }

  async connect() {
    this.litNodeClient = new LitJsSdk.LitNodeClient({
      litNetwork: 'datil-dev',
    });
    await this.litNodeClient.connect();
  }

  async encryptString(value, uid) {
    if (!this.litNodeClient) {
      await this.connect(); // Connect to Lit Network if not already
    }

    try {
      const authSig = await LitJsSdk.checkAndSignAuthMessage({
        chain: this.chain,
      });

      const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(
        {
          accessControlConditions: createAccessControlConditions(
            this.chain,
            uid
          ),
          dataToEncrypt: value,
          authSig,
          chain: this.chain,
        },
        this.litNodeClient
      );

      console.log(encryptedString, symmetricKey);

      const encryptedSymmetricKey = await this.litNodeClient.saveEncryptionKey({
        accessControlConditions: createAccessControlConditions(this.chain, uid),
        symmetricKey,
        authSig,
        chain,
      });

      return {
        encryptedString: await LitJsSdk.blobToBase64String(encryptedString),
        encryptedSymmetricKey: LitJsSdk.uint8arrayToString(
          encryptedSymmetricKey,
          'base16'
        ),
      };
    } catch (e) {
      console.error(e);
      LitJsSdk.disconnectWeb3();
    }
  }

  async decryptText(encryptedString, encryptedSymmetricKey) {
    if (!this.litNodeClient) {
      await this.connect();
    }

    const authSig = await LitJsSdk.checkAndSignAuthMessage({
      chain: this.chain,
    });

    const symmetricKey = await this.litNodeClient.getEncryptionKey({
      accessControlConditions: createAccessControlConditions(this.chain),
      toDecrypt: encryptedSymmetricKey,
      chain,
      authSig,
    });

    try {
      const decryptString = await LitJsSdk.decryptString(
        LitJsSdk?.base64StringToBlob(encryptedString),
        symmetricKey
      );
      return decryptString;
    } catch (err) {
      console.log(err);
    }
  }
}

let myLit;
export function connectLit(chainName) {
  if (myLit && myLit.chain === chainName) {
    return myLit;
  }

  myLit = new Lit(chainName);
  return myLit.connect();
}

export default function getLit() {
  return myLit;
}

function createAccessControlConditions(chain, uid) {
  const chainId = sepolia.id;
  if (chain === 'baseSepolia') {
    chainId = baseSepolia.id;
  } else if (chain === 'arbitrumSepolia') {
    chainId = arbitrumSepolia.id;
  }

  const contract = getAttestationRegistryContract(chainId);
  const functionAbi = contract.abi.find(
    (abi) => abi.name === 'hasPermissionToDecrypt'
  );
  const accessControlConditions = [
    {
      chain: chain,
      contractAddress: contract.address,
      functionName: 'hasPermissionToDecrypt',
      functionParams: [uid, ':userAddress'],
      functionAbi,
      returnValueTest: {
        comparator: '==',
        value: true,
      },
      standardContractType: '',
    },
  ];
  return accessControlConditions;
}
