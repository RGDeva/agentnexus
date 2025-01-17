import { AIAgent } from '../types';

export const agents: AIAgent[] = [
  {
    id: '1',
    name: 'ContentGenius',
    description: 'AI-powered content generation for blogs, articles, and social media posts',
    niche: ['writer', 'marketer'],
    icon: 'pen-line',
    costPerUse: 5,
    category: 'Content Creation'
  },
  {
    id: '2',
    name: 'DesignMaster',
    description: 'Generate design concepts and mockups instantly',
    niche: ['designer'],
    icon: 'palette',
    costPerUse: 8,
    category: 'Design'
  },
  {
    id: '3',
    name: 'MarketingGuru',
    description: 'Create marketing strategies and campaign ideas',
    niche: ['marketer'],
    icon: 'target',
    costPerUse: 10,
    category: 'Marketing'
  },
  {
    id: '4',
    name: 'CodeAssist',
    description: 'AI pair programmer for faster development',
    niche: ['developer'],
    icon: 'code',
    costPerUse: 15,
    category: 'Development'
  }
];