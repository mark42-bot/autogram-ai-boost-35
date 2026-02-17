import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useInstagramAuth } from '@/contexts/InstagramAuthContext';
import { 
  Users, 
  Globe, 
  TrendingUp, 
  ArrowLeft,
  Heart,
  MessageCircle,
  Share,
  Smartphone,
  Instagram
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AudienceInsightsPage = () => {
  const { user, isConnected, login, isConnecting } = useInstagramAuth();
  const [currentPost, setCurrentPost] = useState(0);
  const [showInsights, setShowInsights] = useState(false);
  const navigate = useNavigate();

  const posts = user?.recentPosts || [];

  useEffect(() => {
    if (isConnected && posts.length > 0) {
      setShowInsights(false);
      const timer = setTimeout(() => setShowInsights(true), 800);
      return () => clearTimeout(timer);
    }
  }, [isConnected, currentPost]);

  // Audience data derived from real post metrics when available
  const getAudienceData = () => ({
    postMetrics: posts.map(p => ({
      likes: p.likeCount,
      comments: p.commentsCount,
      reach: p.reach || 0,
      impressions: p.impressions || 0,
      saves: p.saves || 0,
      engagement: p.engagement || 0,
    })),
  });

  if (!isConnected) {
    return (
      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto text-center">
        <Badge className="gradient-primary mb-6 px-4 py-2">
          <Users className="w-4 h-4 mr-2" />
          Audience Insights
        </Badge>
        <h1 className="text-4xl font-bold mb-6">Connect Instagram to View Insights</h1>
        <p className="text-muted-foreground mb-8">Log in with your Instagram account to understand your audience demographics and behavior.</p>
        <Button
          onClick={login}
          disabled={isConnecting}
          className="h-14 text-lg bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white"
        >
          {isConnecting ? (
            <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />Connecting...</>
          ) : (
            <><Instagram className="w-5 h-5 mr-3" />Log in with Instagram</>
          )}
        </Button>
      </div>
    );
  }

  const post = posts[currentPost];
  const audience = getAudienceData();

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <Button variant="ghost" onClick={() => navigate('/features/analytics')} className="mb-8">
        <ArrowLeft className="w-4 h-4 mr-2" />Back to Analytics
      </Button>

      <div className="text-center mb-12">
        <Badge className="gradient-primary mb-6 px-4 py-2">
          <Users className="w-4 h-4 mr-2" />
          Deep Audience Understanding
        </Badge>
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          <span className="gradient-hero bg-clip-text text-transparent">Audience</span>
          <br /><span className="text-foreground">Insights</span>
        </h1>
      </div>

      {/* Post Selector */}
      <div className="flex gap-3 justify-center mb-12 flex-wrap">
        {posts.map((p, i) => (
          <div
            key={p.id}
            onClick={() => { setCurrentPost(i); setShowInsights(false); }}
            className={`w-16 h-16 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
              currentPost === i ? 'border-primary ring-2 ring-primary/30 scale-110' : 'border-border/20 hover:border-primary/50'
            }`}
          >
            <img src={p.mediaUrl} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      {/* Post + Insights */}
      {post && (
        <Card className="glass border-border/20 overflow-hidden">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
              {/* Instagram Post */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 p-6">
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg max-w-sm mx-auto">
                  <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
                    <img src={user!.profilePictureUrl} alt="" className="w-10 h-10 rounded-full object-cover" />
                    <div className="ml-3">
                      <p className="font-semibold text-sm text-gray-900 dark:text-white">@{user!.username}</p>
                      <p className="text-xs text-gray-500">{new Date(post.timestamp).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="aspect-square">
                    <img src={post.mediaUrl} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center space-x-4 mb-3">
                      <Heart className="w-6 h-6 text-red-500" />
                      <MessageCircle className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                      <Share className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                    </div>
                    <p className="text-sm text-gray-900 dark:text-white">
                      <span className="font-semibold">@{user!.username}</span> {post.caption}
                    </p>
                  </div>
                </div>
              </div>

              {/* Post Metrics */}
              <div className={`p-6 space-y-6 transition-all duration-700 ${showInsights ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Post Metrics
                </h3>

                <Card className="glass border-border/20 p-4">
                  <h4 className="font-semibold mb-3">Engagement</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Likes</span>
                      <span className="text-sm font-medium">{post.likeCount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Comments</span>
                      <span className="text-sm font-medium">{post.commentsCount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Reach</span>
                      <span className="text-sm font-medium">{(post.reach || 0).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Impressions</span>
                      <span className="text-sm font-medium">{(post.impressions || 0).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Saves</span>
                      <span className="text-sm font-medium">{(post.saves || 0).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Engagement Rate</span>
                      <span className="text-sm font-medium">{post.engagement ? `${post.engagement}%` : 'N/A'}</span>
                    </div>
                  </div>
                </Card>

                <Card className="glass border-border/20 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Smartphone className="w-4 h-4" /> Audience Insights
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Detailed audience demographics (age, gender, location) are available via the Instagram Graph API for Business/Creator accounts. 
                    Connect your account to see real audience data here.
                  </p>
                </Card>
              </div>

              {/* Summary */}
              <div className={`p-6 space-y-6 transition-all duration-700 delay-300 ${showInsights ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  Account Summary
                </h3>

                <Card className="glass border-border/20 p-4">
                  <h4 className="font-semibold mb-3">Overall Stats</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Total Posts</span>
                      <span className="text-sm font-medium">{posts.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Total Likes</span>
                      <span className="text-sm font-medium">{posts.reduce((s, p) => s + p.likeCount, 0).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Total Comments</span>
                      <span className="text-sm font-medium">{posts.reduce((s, p) => s + p.commentsCount, 0).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Avg Engagement</span>
                      <span className="text-sm font-medium">
                        {posts.length > 0 && posts.some(p => p.engagement) 
                          ? `${(posts.reduce((s, p) => s + (p.engagement || 0), 0) / posts.filter(p => p.engagement).length).toFixed(1)}%`
                          : 'N/A'
                        }
                      </span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AudienceInsightsPage;