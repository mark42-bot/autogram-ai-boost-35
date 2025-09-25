import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Instagram, CheckCircle, ExternalLink } from 'lucide-react';

interface InstagramLoginProps {
  onLoginSuccess: (userData: any) => void;
  className?: string;
}

export const InstagramLogin = ({ onLoginSuccess, className }: InstagramLoginProps) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const handleInstagramConnect = async () => {
    setIsConnecting(true);
    
    // Simulate Instagram OAuth flow
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock user data for demo
    const mockUserData = {
      id: '12345678',
      username: 'demo_user',
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
          caption: 'Building dreams one step at a time ✨ #entrepreneurlife #motivation #success',
          timestamp: '2024-01-15T10:30:00Z',
          likeCount: 2847,
          commentsCount: 156
        },
        {
          id: '2',
          mediaType: 'IMAGE',
          mediaUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=400&fit=crop',
          permalink: 'https://instagram.com/p/demo2',
          caption: 'Coffee and productivity go hand in hand ☕ Ready to tackle Monday! #mondaymotivation #productivity',
          timestamp: '2024-01-14T08:15:00Z',
          likeCount: 1923,
          commentsCount: 87
        },
        {
          id: '3',
          mediaType: 'IMAGE',
          mediaUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=400&fit=crop',
          permalink: 'https://instagram.com/p/demo3',
          caption: 'Team collaboration at its finest! Innovation happens when great minds come together 🚀 #teamwork #innovation',
          timestamp: '2024-01-13T16:45:00Z',
          likeCount: 3421,
          commentsCount: 203
        }
      ]
    };
    
    setIsConnected(true);
    setIsConnecting(false);
    onLoginSuccess(mockUserData);
  };

  if (isConnected) {
    return (
      <Card className="glass border-border/20">
        <CardContent className="p-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <Badge className="gradient-primary">
              <Instagram className="w-4 h-4 mr-2" />
              Connected
            </Badge>
          </div>
          <p className="text-lg font-semibold text-green-600 mb-2">
            Instagram Account Connected!
          </p>
          <p className="text-sm text-muted-foreground">
            You can now analyze your posts and get personalized insights.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass border-border/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <Instagram className="w-6 h-6 text-pink-500" />
          Connect Instagram Account
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          Connect your Instagram account to analyze your actual posts and get personalized performance insights.
        </p>
        
        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
            What you'll get:
          </h4>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            <li>• Access to your real Instagram posts</li>
            <li>• Performance analytics for each post</li>
            <li>• AI-powered insights and recommendations</li>
            <li>• Audience engagement patterns</li>
          </ul>
        </div>

        <Button 
          onClick={handleInstagramConnect}
          disabled={isConnecting}
          className="w-full gradient-primary hover-glow"
        >
          {isConnecting ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
              Connecting to Instagram...
            </>
          ) : (
            <>
              <Instagram className="w-4 h-4 mr-2" />
              Connect Instagram Account
            </>
          )}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          We'll only access your basic profile info and media. 
          <a href="#" className="text-primary hover:underline inline-flex items-center gap-1">
            Learn more <ExternalLink className="w-3 h-3" />
          </a>
        </p>
      </CardContent>
    </Card>
  );
};