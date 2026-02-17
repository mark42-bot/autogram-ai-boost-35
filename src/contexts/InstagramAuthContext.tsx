import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { getInstagramAuthUrl, exchangeCodeForToken, getLongLivedToken, getInstagramUserProfile, getInstagramUserMedia, getMediaInsights } from '@/instagram/auth';
import type { InstagramGraphMedia, InstagramMediaInsight } from '@/instagram/types';

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
  handleOAuthCallback: (code: string) => Promise<void>;
}

const InstagramAuthContext = createContext<InstagramAuthContextType>({
  user: null,
  isConnected: false,
  isConnecting: false,
  login: async () => {},
  logout: () => {},
  handleOAuthCallback: async () => {},
});

export const useInstagramAuth = () => useContext(InstagramAuthContext);

// Helper: convert Graph API media to our InstagramPost format
function mapGraphMediaToPost(media: InstagramGraphMedia, insights?: InstagramMediaInsight[]): InstagramPost {
  const getInsightValue = (name: string) => {
    const insight = insights?.find(i => i.name === name);
    return insight?.values?.[0]?.value || 0;
  };

  const reach = getInsightValue('reach');
  const impressions = getInsightValue('impressions');
  const saved = getInsightValue('saved');
  const engagementVal = getInsightValue('engagement');
  const likeCount = media.like_count || 0;
  const commentsCount = media.comments_count || 0;

  return {
    id: media.id,
    mediaType: media.media_type,
    mediaUrl: media.media_url || media.thumbnail_url || '',
    permalink: media.permalink,
    caption: media.caption || '',
    timestamp: media.timestamp,
    likeCount,
    commentsCount,
    reach: reach || undefined,
    impressions: impressions || undefined,
    saves: saved || undefined,
    engagement: reach > 0 ? parseFloat(((engagementVal / reach) * 100).toFixed(1)) : undefined,
  };
}

const ACCESS_TOKEN_KEY = 'instagram_access_token';

export const InstagramAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<InstagramUser | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  // Restore session from stored token on mount
  useEffect(() => {
    const storedToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (storedToken) {
      fetchUserData(storedToken).catch(() => {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
      });
    }
  }, []);

  // Fetch user profile and media using access token
  const fetchUserData = async (accessToken: string) => {
    const profile = await getInstagramUserProfile(accessToken);
    const mediaResponse = await getInstagramUserMedia(accessToken);

    // Fetch insights for each post (may fail for some)
    const postsWithInsights: InstagramPost[] = await Promise.all(
      mediaResponse.data.map(async (media) => {
        try {
          const insightsResponse = await getMediaInsights(accessToken, media.id);
          return mapGraphMediaToPost(media, insightsResponse.data);
        } catch {
          return mapGraphMediaToPost(media);
        }
      })
    );

    setUser({
      id: profile.id,
      username: profile.username,
      accountType: profile.account_type,
      mediaCount: profile.media_count,
      followersCount: profile.followers_count || 0,
      followingCount: profile.follows_count || 0,
      profilePictureUrl: profile.profile_picture_url || '',
      recentPosts: postsWithInsights,
    });
  };

  // Redirect to Instagram OAuth page
  const login = useCallback(async () => {
    const authUrl = getInstagramAuthUrl();
    window.location.href = authUrl;
  }, []);

  // Handle the OAuth callback (exchange code for token, fetch data)
  const handleOAuthCallback = useCallback(async (code: string) => {
    setIsConnecting(true);
    try {
      // Exchange auth code for short-lived token
      const tokenResponse = await exchangeCodeForToken(code);

      // Exchange for long-lived token
      const longLivedResponse = await getLongLivedToken(tokenResponse.access_token);
      const accessToken = longLivedResponse.access_token;

      // Store token
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);

      // Fetch user data
      await fetchUserData(accessToken);
    } catch (error) {
      console.error('Instagram OAuth error:', error);
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      throw error;
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }, []);

  return (
    <InstagramAuthContext.Provider value={{ user, isConnected: !!user, isConnecting, login, logout, handleOAuthCallback }}>
      {children}
    </InstagramAuthContext.Provider>
  );
};
