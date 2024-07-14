<script setup lang="ts">
import { computed } from 'vue';
import useAccount from '~/composables/useAccount';
import { getSchemaRegistryContract } from '~/contracts';
import { NButton, NCard, NEmpty } from 'naive-ui';
import { computedAsync } from '@vueuse/core';
import { getLogs } from '~/helpers/index';
import { withQuery } from 'ufo';

const { address, chain } = useAccount();
const contract = computed(() =>
  chain.value?.id ? getSchemaRegistryContract(chain.value.id) : null
);

const grantedSchemas = computedAsync(
  async () => {
    if (!contract.value) {
      return [];
    }

    const logs = await getLogs(
      contract.value.address,
      address.value,
      contract.value.events.grantPermission
    );

    return logs;
  },
  [] // initial state
);

const deniedSchemas = computedAsync(
  async () => {
    if (!contract.value) {
      return [];
    }
    const logs = await getLogs(
      contract.value.address,
      address.value,
      contract.value.events.denyPermission
    );

    return logs;
  },
  [] // initial state
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
  <div class="flex flex-col gap-y-2">
    <div class="w-full flex justify-between">
      <h2 class="font-bold text-lg mb-2">Schema List</h2>
      <n-button class="w-52" @click="navigateTo('/schema/create')">
        Create Schema
      </n-button>
    </div>

    <n-card
      v-for="schema in schemas"
      :key="schema.decoded.parameters[0].value"
      class="rounded-md max-w-[800px]"
      :title="schema.decoded.parameters[0].value"
      size="small"
    >
      <div class="flex flex-col gap-y-1">
        Schema: {{ schema.decoded.parameters[2].value }}
        <n-button
          type="primary"
          class="mt-2"
          @click="
            navigateTo(
              withQuery('/attestation/create', {
                uid: schema.decoded.parameters[0].value,
                schema: schema.decoded.parameters[2].value,
              })
            )
          "
        >
          Create Attestation
        </n-button>
      </div>
    </n-card>
    <div v-if="schemas.length === 0" class="mt-4 h-40">
      <n-empty
        class="h-full w-full flex justify-center items-center"
        description="No schemas found"
      />
    </div>
  </div>
</template>
