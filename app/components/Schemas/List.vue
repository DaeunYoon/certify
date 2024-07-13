<script setup lang="ts">
import { computed } from 'vue';
import useClient from '~/composables/useClient';
import useAccount from '~/composables/useAccount';
import { getSchemaRegistryContract } from '~/contracts';
import { NButton, NCard, NEmpty } from 'naive-ui';

const { address, chain } = useAccount();
const client = useClient();

const { data: grantedSchemas } = useAsyncData(
  'grantedSchemas',
  async () => {
    if (!address.value) {
      return [];
    }
    const schemaRegistry = getSchemaRegistryContract(chain.value.id);
    return client.value.getContractEvents({
      address: schemaRegistry.address,
      abi: schemaRegistry.abi,
      eventName: 'GrantPermission',
      args: {
        usr: address.value,
      },
    });
  },
  {
    immediate: true,
    watch: [client, address],
  }
);

const { data: deniedSchemas } = useAsyncData(
  'deniedSchemas',
  async () => {
    if (!client.value?.address) {
      return [];
    }
    const contract = getSchemaRegistryContract(client.value.id);
    return client.value.getContractEvents({
      address: contract.address,
      abi: contract.abi,
      eventName: 'DenyPermission',
    });
  },
  {
    immediate: true,
    watch: [client, address],
  }
);

const schemas = computed(() => {
  const _deniedSchemas = deniedSchemas.value ?? [];
  const _grantedSchemas = grantedSchemas.value ?? [];

  return _grantedSchemas.filter((schema) => {
    const findIndex = _deniedSchemas.findIndex((deniedSchema) => {
      return deniedSchema.schema === schema.schema;
    });

    if (findIndex === -1) {
      return true;
    }

    _deniedSchemas.splice(findIndex, 1);
    return false;
  });
});
</script>

<template>
  <div class="flex flex-col">
    <n-button class="w-52 self-end" @click="navigateTo('/schema/create')">
      Create Schema
    </n-button>
    <div
      v-for="schema in schemas"
      :key="schema[0]"
      class="flex flex-col gap-y-1"
    >
      <n-card class="rounded-md" :title="schema[0]" size="small">
        Schema: {{ schema[2] }}
      </n-card>
    </div>
    <div v-if="schemas.length === 0" class="mt-4 h-40">
      <n-empty
        class="h-full w-full flex justify-center items-center"
        description="No schemas found"
      />
    </div>
  </div>
</template>
