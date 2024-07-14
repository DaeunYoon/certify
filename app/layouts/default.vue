<script setup lang="ts">
import { NLayout, NLayoutHeader, NLayoutSider, NLayoutFooter } from 'naive-ui';
import useAccount from '~/composables/useAccount';
import { connectLit } from '~/helpers/lit';
import * as LitJsSdk from '@lit-protocol/lit-node-client';

const { chain } = useAccount();
watch(
  chain,
  (newChain, prev) => {
    console.log('Chain changed to:', newChain?.name);
    if (newChain && newChain.id !== prev?.id) {
      const chainName = newChain.name.toLocaleLowerCase();
      LitJsSdk.disconnectWeb3();
      connectLit(chainName);
    }
  },
  { immediate: true }
);
</script>

<template>
  <div class="h-screen flex flex-col">
    <n-layout-header
      bordered
      class="flex justify-between items-center px-2 py-1"
    >
      <h1 class="font-bold text-base">Certify</h1>
      <w3m-button />
    </n-layout-header>
    <n-layout class="flex-1" has-sider>
      <n-layout-sider
        bordered
        show-trigger
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        :native-scrollbar="false"
      >
        <TheSidebar />
      </n-layout-sider>
      <div class="px-6 py-2 flex-1">
        <slot />
      </div>
    </n-layout>
    <n-layout-footer bordered class="text-center">
      Made for EthGlobal Brussels
    </n-layout-footer>
  </div>
</template>
