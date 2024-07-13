import { createPublicClient, http } from 'viem';
import useAccount from './useAccount';
import { computed } from 'vue';

const { chain } = useAccount();

export default () =>
  computed(() => {
    return createPublicClient({
      chain: chain.value,
      transport: http(),
    });
  });
