import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useInstagramAuth } from '@/contexts/InstagramAuthContext';
import { 
  ArrowLeft,
  TrendingUp, 
  Heart, 
  MessageCircle, 
  Share, 
  Eye,
  Download,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Sparkles,
  Instagram
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PerformanceReportsPage = () => {
  const { user, isConnected, login, isConnecting } = useInstagramAuth();
  const [currentPost, setCurrentPost] = useState(0);
  const [animationStep, setAnimationStep] = useState(0);
  const navigate = useNavigate();

  const posts = user?.recentPosts || [];

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimationStep((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto text-center">
        <Badge className="gradient-primary mb-6 px-4 py-2">
          <PieChart className="w-4 h-4 mr-2" />
          Performance Reports
        </Badge>
        <h1 className="text-4xl font-bold mb-6">Connect Instagram to View Reports</h1>
        <p className="text-muted-foreground mb-8">Log in with your Instagram account to get detailed performance reports for your posts.</p>
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

  const getInsights = () => {
    if (!post) return [];
    const insights: string[] = [];
    if (post.engagement) insights.push(`Engagement rate of ${post.engagement}% on this post`);
    if (post.reach) insights.push(`Reached ${post.reach.toLocaleString()} unique accounts`);
    if (post.saves) insights.push(`${post.saves.toLocaleString()} saves indicate high-value content`);
    if (insights.length === 0) insights.push('Connect your account to see detailed insights');
    return insights;
  };

  return (
    <div className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Button variant="ghost" onClick={() => navigate('/features/analytics')} className="mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />Back to Analytics
        </Button>

        <div className="text-center mb-12">
          <Badge className="gradient-primary mb-6 px-4 py-2">
            <PieChart className="w-4 h-4 mr-2" />
            Performance Reports
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-hero bg-clip-text text-transparent">Detailed</span>
            <br /><span className="text-foreground">Performance Analytics</span>
          </h1>
        </div>

        {/* Post Selector */}
        <Card className="glass border-border/20 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Your Instagram Posts
              </span>
              <Badge className="gradient-primary">{posts.length} posts</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {posts.map((p, i) => (
                <div
                  key={p.id}
                  onClick={() => setCurrentPost(i)}
                  className={`aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                    currentPost === i ? 'border-primary ring-2 ring-primary/20' : 'border-border/20 hover:border-primary/50'
                  }`}
                >
                  <img src={p.mediaUrl} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {post && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Instagram Post */}
            <Card className="glass border-border/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  Live Performance Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white dark:bg-gray-900 rounded-lg border shadow-lg max-w-sm mx-auto">
                  <div className="flex items-center p-4 border-b">
                    <img src={user!.profilePictureUrl} alt="" className="w-8 h-8 rounded-full object-cover" />
                    <div className="ml-3">
                      <div className="font-semibold text-sm">@{user!.username}</div>
                      <div className="text-xs text-gray-500">{new Date(post.timestamp).toLocaleDateString()}</div>
                    </div>
                  </div>
                  <div className="aspect-square relative overflow-hidden">
                    <img src={post.mediaUrl} alt="" className="w-full h-full object-cover" />
                    {animationStep > 0 && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="text-white text-center animate-fade-in">
                          <div className="text-2xl font-bold mb-2">
                            {animationStep === 1 && `❤️ ${post.likeCount.toLocaleString()}`}
                            {animationStep === 2 && `👀 ${(post.reach || 0).toLocaleString()}`}
                            {animationStep === 3 && `📊 ${post.engagement ? `${post.engagement}%` : 'N/A'}`}
                          </div>
                          <div className="text-sm">
                            {animationStep === 1 && 'Total Likes'}
                            {animationStep === 2 && 'Total Reach'}
                            {animationStep === 3 && 'Engagement Rate'}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-4 mb-3">
                      <Heart className="w-6 h-6" />
                      <MessageCircle className="w-6 h-6" />
                      <Share className="w-6 h-6" />
                    </div>
                    <div className="text-sm mb-2">
                      <span className="font-semibold">{post.likeCount.toLocaleString()} likes</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-semibold">@{user!.username}</span> {post.caption}
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      View all {post.commentsCount} comments
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Metrics */}
            <div className="space-y-6">
              <Card className="glass border-border/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-center mb-2">
                        <Heart className="w-5 h-5 text-red-500 mr-2" />
                        <span className="text-2xl font-bold">{post.likeCount.toLocaleString()}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">Likes</div>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-center mb-2">
                        <MessageCircle className="w-5 h-5 text-blue-500 mr-2" />
                        <span className="text-2xl font-bold">{post.commentsCount}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">Comments</div>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-center mb-2">
                        <Eye className="w-5 h-5 text-green-500 mr-2" />
                        <span className="text-2xl font-bold">{(post.reach || 0).toLocaleString()}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">Reach</div>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-center mb-2">
                        <TrendingUp className="w-5 h-5 text-purple-500 mr-2" />
                        <span className="text-2xl font-bold">
                          {post.engagement ? `${post.engagement}%` : 'N/A'}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">Engagement</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Engagement Rate</span>
                      <span className="text-sm text-muted-foreground">{post.engagement ? `${post.engagement}%` : 'N/A'}</span>
                    </div>
                    <Progress value={post.engagement || 0} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="glass border-border/20 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    AI Performance Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {getInsights().map((insight, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
                          {index + 1}
                        </div>
                        <span className="text-sm">{insight}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-3">
                <Button className="gradient-primary flex-1">
                  <Download className="w-4 h-4 mr-2" />Export Report
                </Button>
                <Button variant="outline">
                  <Target className="w-4 h-4 mr-2" />Optimize
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Weekly Summary */}
        <Card className="glass border-border/20 mt-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Weekly Performance Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {posts.length > 0 && posts.some(p => p.engagement) ? (posts.reduce((s, p) => s + (p.engagement || 0), 0) / posts.filter(p => p.engagement).length).toFixed(1) : '0'}%
                </div>
                <div className="text-sm text-muted-foreground">Avg. Engagement</div>
                <Badge variant="secondary" className="mt-2"><TrendingUp className="w-3 h-3 mr-1" />Live</Badge>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {posts.length > 0 ? (posts.reduce((s, p) => s + (p.reach || 0), 0) / 1000).toFixed(1) : '0'}K
                </div>
                <div className="text-sm text-muted-foreground">Total Reach</div>
                <Badge variant="secondary" className="mt-2"><TrendingUp className="w-3 h-3 mr-1" />Live</Badge>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {user?.followersCount ? (user.followersCount / 1000).toFixed(1) : '0'}K
                </div>
                <div className="text-sm text-muted-foreground">Followers</div>
                <Badge variant="secondary" className="mt-2"><TrendingUp className="w-3 h-3 mr-1" />Live</Badge>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{posts.length}</div>
                <div className="text-sm text-muted-foreground">Posts Analyzed</div>
                <Badge variant="outline" className="mt-2">All synced</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PerformanceReportsPage;