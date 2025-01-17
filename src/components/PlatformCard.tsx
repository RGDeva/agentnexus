import React from 'react';
import { ExternalLink, Github, MessageSquare, Twitter, MessageCircle, Bot, Heart, Infinity, Terminal, Sun, Code, Cpu, Brain, Zap, Network, Settings, TrendingUp, BarChart, Star, Smile, Shield, Link2 } from 'lucide-react';
import { Platform } from '../types';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

interface PlatformCardProps {
  platform: Platform;
  index: number;
}

export function PlatformCard({ platform, index }: PlatformCardProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'bot': return <Bot className="h-6 w-6" />;
      case 'heart': return <Heart className="h-6 w-6" />;
      case 'infinity': return <Infinity className="h-6 w-6" />;
      case 'terminal': return <Terminal className="h-6 w-6" />;
      case 'sun': return <Sun className="h-6 w-6" />;
      case 'code': return <Code className="h-6 w-6" />;
      case 'cpu': return <Cpu className="h-6 w-6" />;
      case 'brain': return <Brain className="h-6 w-6" />;
      case 'zap': return <Zap className="h-6 w-6" />;
      case 'network': return <Network className="h-6 w-6" />;
      case 'settings': return <Settings className="h-6 w-6" />;
      case 'trending-up': return <TrendingUp className="h-6 w-6" />;
      case 'bar-chart': return <BarChart className="h-6 w-6" />;
      case 'star': return <Star className="h-6 w-6" />;
      case 'smile': return <Smile className="h-6 w-6" />;
      case 'link': return <Link2 className="h-6 w-6" />;
      default: return <Bot className="h-6 w-6" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 overflow-hidden hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className={cn(
                "p-3 rounded-xl",
                "bg-gradient-to-br from-cyan-500/10 to-blue-500/10 text-cyan-400"
              )}
            >
              {getIcon(platform.icon)}
            </motion.div>
            <div className="ml-4">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-white">{platform.name}</h3>
                {platform.verified && (
                  <div className="flex items-center px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs">
                    <Shield className="w-3 h-3 mr-1" />
                    Verified
                  </div>
                )}
              </div>
              <p className="text-sm text-slate-400">{platform.category}</p>
            </div>
          </div>
          {platform.chainId && (
            <div className="flex items-center gap-2">
              <img 
                src={`https://raw.githubusercontent.com/ethereum-lists/chains/master/_data/chains/eip155-${platform.chainId}/logo.png`}
                alt="Chain Logo"
                className="w-6 h-6 rounded-full"
                onError={(e) => {
                  e.currentTarget.src = "https://ethereum.org/static/6b935ac0e6194247347855dc3d328e83/13c43/eth-diamond-black.png";
                }}
              />
            </div>
          )}
        </div>
        
        <p className="text-slate-300 line-clamp-2 mb-4">{platform.description}</p>

        <div className="flex flex-wrap gap-2">
          {platform.links.website && (
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={platform.links.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 text-sm font-medium shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40"
            >
              <ExternalLink className="h-4 w-4 mr-1.5" />
              Visit
            </motion.a>
          )}
          
          {platform.links.github && (
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={platform.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-1.5 rounded-lg bg-slate-700 text-white hover:bg-slate-600 transition-all duration-300 text-sm font-medium"
            >
              <Github className="h-4 w-4 mr-1.5" />
              GitHub
            </motion.a>
          )}

          {platform.links.discord && (
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={platform.links.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-1.5 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition-all duration-300 text-sm font-medium"
            >
              <MessageSquare className="h-4 w-4 mr-1.5" />
              Discord
            </motion.a>
          )}

          {platform.links.twitter && (
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={platform.links.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-1.5 rounded-lg bg-sky-500 text-white hover:bg-sky-600 transition-all duration-300 text-sm font-medium"
            >
              <Twitter className="h-4 w-4 mr-1.5" />
              Twitter
            </motion.a>
          )}

          {platform.links.telegram && (
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={platform.links.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-1.5 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300 text-sm font-medium"
            >
              <MessageCircle className="h-4 w-4 mr-1.5" />
              Telegram
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
}