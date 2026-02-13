import React, { createContext, useContext, useState, useCallback } from 'react';

export interface InstagramPost {
  id: string;
  mediaType: string;
  mediaUrl: string;
  permalink: string;
  caption: string;
  timestamp: string;
  likeCount: number;
  commentsCount: number;
  shares?: number;
  reach?: number;
  impressions?: number;
  saves?: number;
  engagement?: number;
}

export interface InstagramUser {
  id: string;
  username: string;
  accountType: string;
  mediaCount: number;
  followersCount: number;
  followingCount: number;
  profilePictureUrl: string;
  recentPosts: InstagramPost[];
}

interface InstagramAuthContextType {
  user: InstagramUser | null;
  isConnected: boolean;
  isConnecting: boolean;
  login: () => Promise<void>;
  logout: () => void;
}

const InstagramAuthContext = createContext<InstagramAuthContextType>({
  user: null,
  isConnected: false,
  isConnecting: false,
  login: async () => {},
  logout: () => {},
});

export const useInstagramAuth = () => useContext(InstagramAuthContext);

export const InstagramAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<InstagramUser | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const login = useCallback(async () => {
    setIsConnecting(true);
    // Simulate Instagram OAuth flow
    await new Promise(resolve => setTimeout(resolve, 2000));

    const mockUser: InstagramUser = {
      id: '12345678',
      username: 'your_brand',
      accountType: 'BUSINESS',
      mediaCount: 247,
      followersCount: 15420,
      followingCount: 892,
      profilePictureUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      recentPosts: [
        {
          id: '1',
          mediaType: 'IMAGE',
          mediaUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop',
          permalink: 'https://instagram.com/p/demo1',
          caption: 'Building dreams one step at a time ✨ #entrepreneurlife #motivation',
          timestamp: '2024-01-15T10:30:00Z',
          likeCount: 2847,
          commentsCount: 156,
          shares: 89,
          reach: 12400,
          impressions: 18700,
          saves: 234,
          engagement: 26.8
        },
        {
          id: '2',
          mediaType: 'IMAGE',
          mediaUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=400&fit=crop',
          permalink: 'https://instagram.com/p/demo2',
          caption: 'Coffee and productivity ☕ Ready to tackle Monday! #mondaymotivation',
          timestamp: '2024-01-14T08:15:00Z',
          likeCount: 1923,
          commentsCount: 87,
          shares: 45,
          reach: 8760,
          impressions: 13200,
          saves: 167,
          engagement: 23.4
        },
        {
          id: '3',
          mediaType: 'IMAGE',
          mediaUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=400&fit=crop',
          permalink: 'https://instagram.com/p/demo3',
          caption: 'Team collaboration at its finest! 🚀 #teamwork #innovation',
          timestamp: '2024-01-13T16:45:00Z',
          likeCount: 3421,
          commentsCount: 203,
          shares: 178,
          reach: 15670,
          impressions: 22100,
          saves: 298,
          engagement: 31.2
        },
        {
          id: '4',
          mediaType: 'IMAGE',
          mediaUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop',
          permalink: 'https://instagram.com/p/demo4',
          caption: 'Data-driven decisions leading the way 📊 #analytics #growth',
          timestamp: '2024-01-12T14:20:00Z',
          likeCount: 1567,
          commentsCount: 234,
          shares: 89,
          reach: 7234,
          impressions: 11500,
          saves: 345,
          engagement: 28.1
        },
        {
          id: '5',
          mediaType: 'IMAGE',
          mediaUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop',
          permalink: 'https://instagram.com/p/demo5',
          caption: 'Customer success stories fuel our passion! 💡 #success #stories',
          timestamp: '2024-01-11T11:00:00Z',
          likeCount: 2134,
          commentsCount: 187,
          shares: 123,
          reach: 8765,
          impressions: 14300,
          saves: 456,
          engagement: 33.5
        },
        {
          id: '6',
          mediaType: 'IMAGE',
          mediaUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop',
          permalink: 'https://instagram.com/p/demo6',
          caption: 'Innovation never stops! 🔥 Pushing boundaries today #innovation',
          timestamp: '2024-01-10T09:30:00Z',
          likeCount: 1823,
          commentsCount: 298,
          shares: 145,
          reach: 6789,
          impressions: 10800,
          saves: 389,
          engagement: 35.2
        }
      ]
    };

    setUser(mockUser);
    setIsConnecting(false);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <InstagramAuthContext.Provider value={{ user, isConnected: !!user, isConnecting, login, logout }}>
      {children}
    </InstagramAuthContext.Provider>
  );
};