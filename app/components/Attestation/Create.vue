<script>
import { NButton, NModal } from 'naive-ui';
import { getAttestationRegistryContract } from '~/contracts';
import useWallet from '~/composables/useWallet';
import {
  encodeAttestationData,
  calculateAttestationUid,
} from '~/helpers/index';
import { getAddress } from 'viem';
import getLit from '~/helpers/lit';

const route = useRoute();
const schema = computed(() => route.query.schema);
const schemaUID = computed(() => route.query.uid);
const parsedSchema = computed(() => {
  return schema.value
    ? schema.value.split(',').map((item) => {
        const [type, name] = item.split(' ');
        return { name, type };
      })
    : [];
});

const wallet = useWallet();
const { chain, address } = useAccount();
const client = useClient();

const showSuccessPopup = ref(false);

async function createAttestation(value) {
  try {
    if (!wallet.value || !address.value) {
      console.error('Wallet not connected');
      return;
    }

    const { recipient, ...content } = value;
    const currentTimestamp = Date.now();

    const expectedUid = calculateAttestationUid(
      schemaUID.value,
      recipient,
      address.value,
      currentTimestamp
    );

    const data = encodeAttestationData(schema.value, content);

    const lit = getLit();

    const encryptedInformation = await lit.encryptString(data, expectedUid);
    console.log(encryptedInformation);

    const attestationRegistry = getAttestationRegistryContract(chain.value.id);
    const [account] = await wallet.value.getAddresses();

    const { request } = await client.value.simulateContract({
      address: attestationRegistry.address,
      abi: attestationRegistry.abi,
      functionName: 'attest',
      args: [
        schemaUID.value,
        encryptedInformation.encryptedString,
        getAddress(recipient),
        encryptedInformation.encryptedSymmetricKey,
        currentTimestamp,
      ],
      account,
    });

    await wallet.value.writeContract(request);
    showSuccessPopup.value = true;
  } catch (error) {
    alert(`Transaction failed :( \n(${error?.message ?? error})`);
  }
}

function closePopup() {
  showSuccessPopup.value = false;
  navigateTo('/schema');
}
</script>
<template>
  <n-modal
    :show="showSuccessPopup"
    preset="card"
    :style="`width: 500px`"
    @close="closePopup"
  >
    <div class="flex flex-col items-center gap-4">
      <h2 class="text-xl font-bold">Transaction successfully submitted! :D</h2>
      <n-button @click="closePopup">Goood</n-button>
    </div>
  </n-modal>

  <FormKit submit-label="Create" type="form" @submit="createAttestation">
    <h2 class="text-xl font-bold mb-3">Create Attestation</h2>
    <div v-for="item in parsedSchema" :key="item" class="outer">
      <FormKit
        v-if="item.type === 'bool'"
        :label="item.name"
        :name="item.name"
        type="select"
        :options="{ true: true, false: false }"
        required
      />
      <FormKit
        v-else
        :label="item.name"
        :name="item.name"
        type="text"
        required
      />
    </div>
    <FormKit label="Recipient" name="recipient" type="text" required />
  </FormKit>
</template>
