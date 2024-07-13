import { getAccount } from '@wagmi/core';
import { computed } from 'vue';

import { http, createConfig } from '@wagmi/core';
import { sepolia, baseSepolia, arbitrumSepolia } from '@wagmi/core/chains';

export const config = createConfig({
  chains: [sepolia, arbitrumSepolia, baseSepolia],
  transports: {
    [sepolia.id]: http(),
    [baseSepolia.id]: http(),
    [arbitrumSepolia.id]: http(),
  },
});
const account = computed(() => getAccount(config));
const address = computed(() => account.value.address);
const chain = computed(() => account.value.chain);

export default () => {
  return {
    address,
    chain,
  };
};
