import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { platforms } from '../data/platforms';
import { PlatformCard } from '../components/PlatformCard';
import { CategoryGroup, PlatformCategory } from '../types';
import { motion } from 'framer-motion';
import { TabNavigation } from '../components/TabNavigation';

export function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<PlatformCategory | 'all'>('all');

  const tabs = useMemo(() => {
    const categoryCounts = platforms.reduce((acc, platform) => {
      acc[platform.category] = (acc[platform.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return [
      { id: 'all', label: 'All', count: platforms.length },
      { id: 'Agent Framework', label: 'Frameworks', count: categoryCounts['Agent Framework'] || 0 },
      { id: 'Virtual Character', label: 'Characters', count: categoryCounts['Virtual Character'] || 0 },
      { id: 'Social Agent', label: 'Social', count: categoryCounts['Social Agent'] || 0 },
      { id: 'Development Tool', label: 'Tools', count: categoryCounts['Development Tool'] || 0 },
      { id: 'AI Network', label: 'Networks', count: categoryCounts['AI Network'] || 0 },
      { id: 'Hackathon', label: 'Hackathons', count: categoryCounts['Hackathon'] || 0 },
      { id: 'Grant', label: 'Grants', count: categoryCounts['Grant'] || 0 },
    ];
  }, []);

  const filteredPlatforms = useMemo(() => {
    return platforms.filter(platform => {
      const matchesSearch = platform.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          platform.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeTab === 'all' || platform.category === activeTab;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeTab]);

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 mb-4 tracking-tight">
          Discover AI Agents
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          Explore the future of autonomous systems, frameworks, and tools
        </p>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <div className="flex flex-col sm:flex-row gap-4 max-w-3xl mx-auto">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search platforms..."
              className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent backdrop-blur-xl text-white placeholder-slate-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="inline-flex items-center justify-center px-6 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl hover:bg-slate-700/50 transition-colors backdrop-blur-xl text-white">
            <SlidersHorizontal className="h-5 w-5 text-slate-400 mr-2" />
            <span>Filters</span>
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <TabNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
          tabs={tabs}
        />
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {filteredPlatforms.map((platform, index) => (
          <PlatformCard
            key={platform.id}
            platform={platform}
            index={index}
          />
        ))}
        {filteredPlatforms.length === 0 && (
          <div className="col-span-full text-center py-16">
            <p className="text-xl text-slate-400">No platforms found matching your search criteria.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}