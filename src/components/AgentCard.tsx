import React from 'react';
import { Play, Info, PenLine, Palette, Target, Code } from 'lucide-react';
import { AIAgent } from '../types';
import { cn } from '../lib/utils';

interface AgentCardProps {
  agent: AIAgent;
  onRun: (agent: AIAgent) => void;
  onLearnMore: (agent: AIAgent) => void;
}

export function AgentCard({ agent, onRun, onLearnMore }: AgentCardProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'pen-line':
        return <PenLine className="h-6 w-6" />;
      case 'palette':
        return <Palette className="h-6 w-6" />;
      case 'target':
        return <Target className="h-6 w-6" />;
      case 'code':
        return <Code className="h-6 w-6" />;
      default:
        return <Info className="h-6 w-6" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <div className={cn(
            "p-2 rounded-lg",
            "bg-blue-50 text-blue-600"
          )}>
            {getIcon(agent.icon)}
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-900">{agent.name}</h3>
            <p className="text-sm text-gray-500">{agent.category}</p>
          </div>
        </div>
        <span className="text-sm font-medium text-gray-500">${agent.costPerUse}/use</span>
      </div>
      <p className="mt-4 text-gray-600">{agent.description}</p>
      <div className="mt-6 flex space-x-3">
        <button
          onClick={() => onRun(agent)}
          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
        >
          <Play className="h-4 w-4 mr-2" />
          Run Agent
        </button>
        <button
          onClick={() => onLearnMore(agent)}
          className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Info className="h-4 w-4 mr-2" />
          Learn More
        </button>
      </div>
    </div>
  );
}