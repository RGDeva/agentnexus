import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Cpu, Wallet, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount, useNetwork, useBalance } from 'wagmi';

export function Layout() {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { data: balance } = useBalance({
    address,
    watch: true,
  });
  const location = useLocation();

  const handleConnect = async () => {
    try {
      await open();
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  const navLinks = [
    { path: '/', label: 'Directory' },
    { path: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="backdrop-blur-xl bg-black/20 sticky top-0 z-50 border-b border-slate-700/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center px-2 py-2 group">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 p-2 rounded-xl mr-3 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300"
                >
                  <Cpu className="h-6 w-6 text-white" />
                </motion.div>
                <div className="flex flex-col">
                  <motion.span 
                    className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600"
                    whileHover={{ scale: 1.05 }}
                  >
                    NexusAI Hub
                  </motion.span>
                  <span className="text-xs text-slate-400">Web3 AI Agents Directory</span>
                </div>
              </Link>

              <div className="hidden md:flex items-center gap-4">
                {navLinks.map(({ path, label, icon: Icon }) => (
                  <Link
                    key={path}
                    to={path}
                    className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                      location.pathname === path
                        ? 'bg-cyan-500/20 text-cyan-400'
                        : 'text-slate-400 hover:text-cyan-400 hover:bg-slate-700/50'
                    }`}
                  >
                    {Icon && <Icon className="w-4 h-4 mr-2" />}
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              {isConnected ? (
                <div className="flex items-center gap-2">
                  {balance && (
                    <span className="text-sm text-slate-300">
                      {parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
                    </span>
                  )}
                  <button
                    onClick={handleConnect}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium hover:from-cyan-600 hover:to-blue-600 transition-all duration-300"
                  >
                    {chain?.name} · {address?.slice(0, 6)}...{address?.slice(-4)}
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleConnect}
                  className="flex items-center px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium hover:from-cyan-600 hover:to-blue-600 transition-all duration-300"
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  Connect Wallet
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Outlet />
      </main>
    </div>
  );
}