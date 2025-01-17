export type PlatformCategory = 'Agent Framework' | 'AI Assistant' | 'Virtual Character' | 'Development Tool' | 'AI Network' | 'Social Agent' | 'Hackathon' | 'Grant';

export interface Platform {
  id: string;
  name: string;
  description: string;
  category: PlatformCategory;
  links: {
    website?: string;
    docs?: string;
    github?: string;
    discord?: string;
    twitter?: string;
    telegram?: string;
  };
  icon: string;
  image?: string;
  date?: string;
  verified?: boolean;
  chainId?: number;
  contractAddress?: string;
  tokenId?: string;
  votes?: number;
  rating?: number;
  reviews?: Review[];
}

export interface Review {
  id: string;
  address: string;
  rating: number;
  comment: string;
  timestamp: number;
}