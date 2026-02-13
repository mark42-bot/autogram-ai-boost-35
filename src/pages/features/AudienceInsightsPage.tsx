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

  // Simulated audience data per post
  const getAudienceData = (postIndex: number) => ({
    demographics: {
      age: { '18-24': 25 + postIndex * 3, '25-34': 42 - postIndex * 2, '35-44': 20 + postIndex, '45+': 13 - postIndex },
      gender: { female: 55 + postIndex * 2, male: 42 - postIndex * 2, other: 3 },
    },
    geography: [
      { name: 'United States', percentage: 45 - postIndex * 2, engagement: 8.2 + postIndex * 0.3 },
      { name: 'Canada', percentage: 18 + postIndex, engagement: 9.1 },
      { name: 'United Kingdom', percentage: 12, engagement: 7.8 + postIndex * 0.2 },
      { name: 'Australia', percentage: 10 + postIndex, engagement: 8.9 },
      { name: 'Germany', percentage: 8, engagement: 7.5 + postIndex * 0.4 },
    ],
    devices: { mobile: 78 + postIndex, desktop: 15 - postIndex, tablet: 7 },
    interests: [
      { topic: 'Entrepreneurship', percentage: 85 - postIndex * 3 },
      { topic: 'Technology', percentage: 72 + postIndex * 2 },
      { topic: 'Design', percentage: 68 - postIndex },
      { topic: 'Marketing', percentage: 61 + postIndex * 2 },
      { topic: 'Productivity', percentage: 59 + postIndex },
    ]
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
  const audience = getAudienceData(currentPost);

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

              {/* Demographics */}
              <div className={`p-6 space-y-6 transition-all duration-700 ${showInsights ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Demographics
                </h3>

                <Card className="glass border-border/20 p-4">
                  <h4 className="font-semibold mb-3">Age Groups</h4>
                  <div className="space-y-2">
                    {Object.entries(audience.demographics.age).map(([age, pct]) => (
                      <div key={age} className="flex items-center justify-between">
                        <span className="text-sm">{age}</span>
                        <div className="flex items-center gap-2">
                          <Progress value={pct} className="w-16 h-2" />
                          <span className="text-sm font-medium w-8">{pct}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="glass border-border/20 p-4">
                  <h4 className="font-semibold mb-3">Gender</h4>
                  <div className="space-y-2">
                    {Object.entries(audience.demographics.gender).map(([gender, pct]) => (
                      <div key={gender} className="flex items-center justify-between">
                        <span className="text-sm capitalize">{gender}</span>
                        <div className="flex items-center gap-2">
                          <Progress value={pct} className="w-16 h-2" />
                          <span className="text-sm font-medium w-8">{pct}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="glass border-border/20 p-4">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Smartphone className="w-4 h-4" /> Devices
                  </h4>
                  <div className="space-y-2">
                    {Object.entries(audience.devices).map(([device, pct]) => (
                      <div key={device} className="flex items-center justify-between">
                        <span className="text-sm capitalize">{device}</span>
                        <div className="flex items-center gap-2">
                          <Progress value={pct} className="w-16 h-2" />
                          <span className="text-sm font-medium w-8">{pct}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Geography & Interests */}
              <div className={`p-6 space-y-6 transition-all duration-700 delay-300 ${showInsights ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  Geography
                </h3>

                <Card className="glass border-border/20 p-4">
                  <h4 className="font-semibold mb-3">Top Countries</h4>
                  <div className="space-y-3">
                    {audience.geography.map((country, idx) => (
                      <div key={country.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">#{idx + 1}</span>
                          <span className="text-sm">{country.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium">{country.percentage}%</span>
                          <Badge variant="outline" className="text-xs">{country.engagement}% eng</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="glass border-border/20 p-4">
                  <h4 className="font-semibold mb-3">Top Interests</h4>
                  <div className="space-y-2">
                    {audience.interests.map((interest) => (
                      <div key={interest.topic} className="flex items-center justify-between">
                        <span className="text-sm">{interest.topic}</span>
                        <div className="flex items-center gap-2">
                          <Progress value={interest.percentage} className="w-16 h-2" />
                          <span className="text-sm font-medium w-8">{interest.percentage}%</span>
                        </div>
                      </div>
                    ))}
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