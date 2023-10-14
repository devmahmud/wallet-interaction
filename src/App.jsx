import '@rainbow-me/rainbowkit/styles.css';

import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { ConnectButton } from '@rainbow-me/rainbowkit';

import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { celo, celoAlfajores, celoCannoli } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import WalletInteraction from './WalletInteraction';

function App() {
  const { chains, publicClient } = configureChains(
    [celoAlfajores, celo, celoCannoli],
    [publicProvider()]
  );

  const { connectors } = getDefaultWallets({
    appName: 'Kickstarter',
    projectId: '304bb25132c30b8673622bd3433ef4ee',
    chains,
  });

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
  });

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <ConnectButton />

        <WalletInteraction />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
