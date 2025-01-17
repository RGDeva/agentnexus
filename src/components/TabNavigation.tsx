import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { PlatformCategory } from '../types';

interface TabNavigationProps {
  activeTab: PlatformCategory | 'all';
  onTabChange: (tab: PlatformCategory | 'all') => void;
  tabs: { id: PlatformCategory | 'all'; label: string; count: number }[];
}

export function TabNavigation({ activeTab, onTabChange, tabs }: TabNavigationProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
            "hover:bg-slate-700/50 hover:text-cyan-400",
            activeTab === tab.id
              ? "bg-slate-700/50 text-cyan-400"
              : "bg-slate-800/50 text-slate-400"
          )}
        >
          <span className="relative z-10">{tab.label}</span>
          {tab.count > 0 && (
            <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-cyan-500/20 text-cyan-400">
              {tab.count}
            </span>
          )}
          {activeTab === tab.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg"
              transition={{ type: "spring", duration: 0.5 }}
            />
          )}
        </button>
      ))}
    </div>
  );
}