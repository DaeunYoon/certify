import { createWalletClient, custom } from 'viem';
import useAccount from './useAccount';

const { chain } = useAccount();

export default () =>
  computed(() => {
    // @ts-ignore
    return window.ethereum
      ? createWalletClient({
          chain: chain.value,
          // @ts-ignore
          transport: custom(window.ethereum),
        })
      : undefined;
  });
