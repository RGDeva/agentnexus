import React, { useState } from 'react';
import { agents } from '../data/agents';
import { AgentCard } from '../components/AgentCard';
import { Search, Filter } from 'lucide-react';
import { FreelanceNiche } from '../types';

export function Marketplace() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNiche, setSelectedNiche] = useState<FreelanceNiche | 'all'>('all');

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesNiche = selectedNiche === 'all' || agent.niche.includes(selectedNiche as FreelanceNiche);
    return matchesSearch && matchesNiche;
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">AI Agent Marketplace</h1>
        <p className="mt-2 text-gray-600">Discover and use AI agents for your freelance work</p>
      </div>

      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search agents..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="text-gray-400 h-5 w-5" />
          <select
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={selectedNiche}
            onChange={(e) => setSelectedNiche(e.target.value as FreelanceNiche | 'all')}
          >
            <option value="all">All Niches</option>
            <option value="writer">Writer</option>
            <option value="designer">Designer</option>
            <option value="marketer">Marketer</option>
            <option value="developer">Developer</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAgents.map((agent) => (
          <AgentCard
            key={agent.id}
            agent={agent}
            onRun={() => {}}
            onLearnMore={() => {}}
          />
        ))}
      </div>
    </div>
  );
}