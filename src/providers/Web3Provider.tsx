import React from 'react';
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react';
import { WagmiConfig } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = process.env.WALLET_CONNECT_PROJECT_ID || 'YOUR_PROJECT_ID';

const metadata = {
  name: 'NexusAI Hub',
  description: 'Web3 AI Agents Directory',
  url: 'https://nexusai.hub',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};

const chains = [mainnet, sepolia];
const wagmiConfig = defaultWagmiConfig({ 
  chains, 
  projectId, 
  metadata,
  enableWalletConnect: true, // Required for WalletConnect
});

// 3. Create modal
try {
  createWeb3Modal({
    wagmiConfig,
    projectId,
    chains,
    defaultChain: mainnet,
    themeMode: 'dark',
    themeVariables: {
      '--w3m-accent': '#06b6d4',
      '--w3m-border-radius-master': '0.75rem',
    }
  });
} catch (error) {
  console.error('Failed to initialize Web3Modal:', error);
}

interface Web3ProviderProps {
  children: React.ReactNode;
}

export function Web3Provider({ children }: Web3ProviderProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiConfig>
  );
}