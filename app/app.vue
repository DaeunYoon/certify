<script setup lang="ts">
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi';
import { sepolia, baseSepolia, arbitrumSepolia } from 'viem/chains';
import { reconnect } from '@wagmi/core';

const runtimeConfig = useRuntimeConfig();

// 1. Define constants
const projectId = runtimeConfig.public.WEB3_PROJECT_ID;

// 2. Create wagmiConfig
const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'http://localhost:3000/', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

// 3. Create wagmiConfig
const chains = [sepolia, baseSepolia, arbitrumSepolia];
const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
});

reconnect(config);

// 3. Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
});
</script>

<template>
  <ClientOnly>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </ClientOnly>
</template>
