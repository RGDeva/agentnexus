import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Trophy, ArrowUp, Medal } from 'lucide-react';
import { platforms } from '../data/platforms';
import { Link } from 'react-router-dom';

export function Leaderboard() {
  const sortedPlatforms = useMemo(() => {
    return [...platforms]
      .sort((a, b) => (b.votes || 0) - (a.votes || 0))
      .slice(0, 50); // Top 50
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 mb-4">
          Top AI Agents
        </h1>
        <p className="text-xl text-slate-400">
          The most popular and highly rated platforms in our directory
        </p>
      </motion.div>

      <div className="space-y-4">
        {sortedPlatforms.map((platform, index) => (
          <motion.div
            key={platform.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-slate-800/50 rounded-xl p-4 backdrop-blur-xl border border-slate-700/50 hover:border-cyan-500/50 transition-colors"
          >
            <Link to={`/platform/${platform.id}`} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-8 text-center">
                  {index === 0 && <Trophy className="w-6 h-6 text-yellow-400" />}
                  {index === 1 && <Medal className="w-6 h-6 text-slate-300" />}
                  {index === 2 && <Medal className="w-6 h-6 text-amber-600" />}
                  {index > 2 && <span className="text-slate-400">#{index + 1}</span>}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{platform.name}</h3>
                  <p className="text-sm text-slate-400">{platform.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-cyan-400">
                  <ArrowUp className="w-4 h-4" />
                  <span>{platform.votes || 0}</span>
                </div>
                {platform.rating && (
                  <div className="flex items-center gap-1 text-yellow-400">
                    <span>{platform.rating.toFixed(1)}</span>
                    <span className="text-sm text-slate-400">/ 5.0</span>
                  </div>
                )}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}