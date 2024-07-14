<script>
import { NButton, NModal } from 'naive-ui';
import { getSchemaRegistryContract } from '~/contracts';
import useWallet from '~/composables/useWallet';

const wallet = useWallet();
const { chain } = useAccount();
const client = useClient();

const options = ['address', 'bool', 'bytes32', 'bytes', 'string', 'uint256'];
const schemaItems = ref([{ name: '', type: options[0] }]);

const showSuccessPopup = ref(false);

async function createSchema() {
  if (!wallet.value) {
    console.error('Wallet not connected');
    return;
  }

  const schemaRegistry = getSchemaRegistryContract(chain.value.id);
  const schema = schemaItems.value
    .map((item) => {
      return `${item.type} ${item.name}`;
    })
    .join(',');

  try {
    const [account] = await wallet.value.getAddresses();
    const { request } = await client.value.simulateContract({
      address: schemaRegistry.address,
      abi: schemaRegistry.abi,
      functionName: 'register',
      args: [schema],
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
  <FormKit submit-label="Create" type="form" @submit="createSchema">
    <h2 class="text-xl font-bold mb-3">Create Schema</h2>
    <FormKit v-model="schemaItems" name="schemas" type="list" dynamic>
      <div v-for="(item, index) in schemaItems" :key="item" class="outer">
        <FormKit type="group" :index="index">
          <div class="flex gap-x-2">
            <FormKit name="name" type="text" label="Name" required />
            <FormKit name="type" type="select" label="Type" :options />
            <div class="flex items-center gap-1">
              <n-button
                v-if="index === schemaItems.length - 1"
                @click="schemaItems.push({ name: '', type: options[0] })"
                >+</n-button
              >
              <n-button
                v-if="schemaItems.length !== 1"
                @click="schemaItems.splice(index, 1)"
                >-</n-button
              >
            </div>
          </div>
        </FormKit>
      </div>
    </FormKit>
  </FormKit>
</template>
