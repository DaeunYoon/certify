<script setup lang="ts">
import { computed } from 'vue';
import useClient from '~/composables/useClient';
import useAccount from '~/composables/useAccount';
import { getSchemaRegistryContract } from '~/contracts';
import { NButton } from 'naive-ui';

const { address } = useAccount();
const client = useClient();
const { data: grantedSchemas } = useAsyncData(
  async () => {
    if (!client.value?.address) {
      return [];
    }
    const contract = getSchemaRegistryContract(client.value.id);
    return client.value.getContractEvents({
      address: contract.address,
      abi: contract.abi,
      eventName: 'GrantPermission',
      args: {
        usr: address.value,
      },
    });
  },
  {
    watch: [client, address],
  }
);

const { data: deniedSchemas } = useAsyncData(async () => {
  if (!client.value?.address) {
    return [];
  }
  const contract = getSchemaRegistryContract(client.value.id);
  return client.value.getContractEvents({
    address: contract.address,
    abi: contract.abi,
    eventName: 'DenyPermission',
  });
});

const schemas = computed(() => {
  const _deniedSchemas = deniedSchemas.value ?? [];

  return [];
  // return (grantedSchemas.value ?? []).filters((schema) => {
  //   const findIndex = _deniedSchemas.findIndex((deniedSchema) => {
  //     return deniedSchema.schema === schema.schema;
  //   });

  //   if (findIndex === -1) {
  //     return true;
  //   }

  //   _deniedSchemas.splice(findIndex, 1);
  //   return false;
  // });
});
</script>

<template>
  <div>
    <n-button @click="navigateTo('/schema/create')">Create Schema</n-button>
    {{ schemas }}
  </div>
</template>
