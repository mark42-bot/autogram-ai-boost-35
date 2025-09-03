import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  TrendingUp, 
  Users, 
  Eye,
  ArrowRight,
  Heart,
  MessageCircle,
  Share,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';

const RealTimeAnalyticsPage = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentPost, setCurrentPost] = useState(0);
  const [showAnalytics, setShowAnalytics] = useState(false);

  const instagramPosts = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=400&fit=crop",
      caption: "Morning coffee vibes ☕ Starting the day right with a perfect brew!",
      likes: 1247,
      comments: 89,
      shares: 34,
      reach: 5432,
      engagement: 7.2,
      impressions: 12847,
      saves: 156,
      date: '2 hours ago',
      analytics: {
        demographics: { '18-24': 25, '25-34': 35, '35-44': 22, '45+': 18 },
        topCountries: ['United States', 'Canada', 'United Kingdom'],
        peakTime: '9:30 AM',
        deviceType: { mobile: 78, desktop: 22 }
      }
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop",
      caption: "Team collaboration at its finest! 🚀 Working together to achieve greatness.",
      likes: 892,
      comments: 156,
      shares: 67,
      reach: 3421,
      engagement: 8.9,
      impressions: 9234,
      saves: 234,
      date: '1 day ago',
      analytics: {
        demographics: { '18-24': 30, '25-34': 40, '35-44': 20, '45+': 10 },
        topCountries: ['United States', 'Germany', 'France'],
        peakTime: '2:15 PM',
        deviceType: { mobile: 82, desktop: 18 }
      }
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop",
      caption: "Behind the scenes of our latest project 📊 Data-driven decisions leading the way!",
      likes: 1567,
      comments: 234,
      shares: 89,
      reach: 7234,
      engagement: 6.8,
      impressions: 15678,
      saves: 345,
      date: '2 days ago',
      analytics: {
        demographics: { '18-24': 20, '25-34': 45, '35-44': 25, '45+': 10 },
        topCountries: ['United States', 'Australia', 'Canada'],
        peakTime: '1:45 PM',
        deviceType: { mobile: 75, desktop: 25 }
      }
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop",
      caption: "Customer success stories fuel our passion! 💡 Here's how we're making a difference.",
      likes: 2134,
      comments: 187,
      shares: 123,
      reach: 8765,
      engagement: 9.2,
      impressions: 18943,
      saves: 456,
      date: '3 days ago',
      analytics: {
        demographics: { '18-24': 22, '25-34': 38, '35-44': 28, '45+': 12 },
        topCountries: ['United States', 'United Kingdom', 'Netherlands'],
        peakTime: '11:20 AM',
        deviceType: { mobile: 80, desktop: 20 }
      }
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=400&fit=crop",
      caption: "Innovation never stops! 🔥 Pushing boundaries and creating the future today.",
      likes: 1823,
      comments: 298,
      shares: 145,
      reach: 6789,
      engagement: 10.1,
      impressions: 16234,
      saves: 389,
      date: '4 days ago',
      analytics: {
        demographics: { '18-24': 35, '25-34': 32, '35-44': 23, '45+': 10 },
        topCountries: ['United States', 'Singapore', 'Japan'],
        peakTime: '3:30 PM',
        deviceType: { mobile: 85, desktop: 15 }
      }
    }
  ];

  const startAnalyticsGeneration = () => {
    setIsGenerating(true);
    setCurrentPost(0);
    setShowAnalytics(false);
    
    const generateAnalytics = (index: number) => {
      if (index < instagramPosts.length) {
        setTimeout(() => {
          setCurrentPost(index);
          setTimeout(() => {
            setShowAnalytics(true);
            setTimeout(() => {
              generateAnalytics(index + 1);
            }, 2000);
          }, 1000);
        }, 500);
      } else {
        setIsGenerating(false);
      }
    };
    
    generateAnalytics(0);
  };

  useEffect(() => {
    startAnalyticsGeneration();
  }, []);

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <Badge className="gradient-primary mb-6 px-4 py-2">
          <Activity className="w-4 h-4 mr-2" />
          Real-time Performance Tracking
        </Badge>
        
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          <span className="gradient-hero bg-clip-text text-transparent">
            Live
          </span>
          <br />
          <span className="text-foreground">Analytics</span>
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Watch your content performance in real-time with AI-powered insights and detailed analytics for every post.
        </p>

        <Button 
          onClick={startAnalyticsGeneration}
          className="gradient-primary hover-glow shadow-primary mb-12"
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <Clock className="w-4 h-4 mr-2 animate-spin" />
              Generating Analytics...
            </>
          ) : (
            <>
              <Activity className="w-4 h-4 mr-2" />
              Regenerate Analytics
            </>
          )}
        </Button>
      </div>

      {/* Instagram Posts with Analytics */}
      <div className="space-y-12">
        {instagramPosts.map((post, index) => (
          <Card 
            key={post.id} 
            className={`glass border-border/20 overflow-hidden transition-all duration-1000 ${
              isGenerating && index === currentPost 
                ? 'ring-2 ring-primary border-primary/50 shadow-primary/20 shadow-2xl animate-pulse-glow' 
                : index <= currentPost ? 'opacity-100' : 'opacity-40'
            }`}
          >
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Instagram Post Mockup */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 p-6">
                  <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg max-w-md mx-auto">
                    {/* Instagram Header */}
                    <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full"></div>
                      <div className="ml-3">
                        <p className="font-semibold text-sm text-gray-900 dark:text-white">your_brand</p>
                        <p className="text-xs text-gray-500">Sponsored</p>
                      </div>
                    </div>
                    
                    {/* Image */}
                    <div className="aspect-square">
                      <img 
                        src={post.image} 
                        alt="Instagram post" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Actions */}
                    <div className="p-4">
                      <div className="flex items-center space-x-4 mb-3">
                        <Heart className="w-6 h-6 text-red-500" />
                        <MessageCircle className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                        <Share className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                      </div>
                      
                      {/* Caption */}
                      <p className="text-sm text-gray-900 dark:text-white mb-2">
                        <span className="font-semibold">your_brand</span> {post.caption}
                      </p>
                      
                      <p className="text-xs text-gray-500">{post.date}</p>
                    </div>
                  </div>
                </div>

                {/* Analytics Panel */}
                <div className="p-6 space-y-6">
                  <div className={`transition-all duration-1000 ${
                    showAnalytics && index <= currentPost ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}>
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                      <Activity className="w-6 h-6 text-primary animate-pulse" />
                      Live Analytics
                      {isGenerating && index === currentPost && (
                        <Badge className="gradient-primary animate-bounce">
                          Analyzing...
                        </Badge>
                      )}
                    </h3>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <Card className="glass border-border/20 p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                            <Heart className="w-5 h-5 text-red-500" />
                          </div>
                          <div>
                            <p className="text-2xl font-bold animate-fade-in">{post.likes.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">Likes</p>
                          </div>
                        </div>
                      </Card>
                      
                      <Card className="glass border-border/20 p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                            <MessageCircle className="w-5 h-5 text-blue-500" />
                          </div>
                          <div>
                            <p className="text-2xl font-bold animate-fade-in">{post.comments}</p>
                            <p className="text-xs text-muted-foreground">Comments</p>
                          </div>
                        </div>
                      </Card>
                      
                      <Card className="glass border-border/20 p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center">
                            <Eye className="w-5 h-5 text-orange-500" />
                          </div>
                          <div>
                            <p className="text-2xl font-bold animate-fade-in">{post.reach.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">Reach</p>
                          </div>
                        </div>
                      </Card>
                      
                      <Card className="glass border-border/20 p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-green-500" />
                          </div>
                          <div>
                            <p className="text-2xl font-bold animate-fade-in">{post.engagement}%</p>
                            <p className="text-xs text-muted-foreground">Engagement</p>
                          </div>
                        </div>
                      </Card>
                    </div>

                    {/* Demographics */}
                    <Card className="glass border-border/20 p-4 mb-4">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary" />
                        Age Demographics
                      </h4>
                      <div className="space-y-2">
                        {Object.entries(post.analytics.demographics).map(([age, percentage]) => (
                          <div key={age} className="flex items-center justify-between">
                            <span className="text-sm">{age}</span>
                            <div className="flex items-center gap-2">
                              <Progress value={percentage as number} className="w-20 h-2" />
                              <span className="text-sm font-medium">{percentage}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>

                    {/* Performance Insights */}
                    <Card className="glass border-border/20 p-4">
                      <h4 className="font-semibold mb-3">AI Insights</h4>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p>• Peak engagement at <span className="text-primary font-medium">{post.analytics.peakTime}</span></p>
                        <p>• Top audience from <span className="text-primary font-medium">{post.analytics.topCountries[0]}</span></p>
                        <p>• <span className="text-primary font-medium">{post.analytics.deviceType.mobile}%</span> viewed on mobile</p>
                        <p>• <span className="text-green-500 font-medium">+{Math.floor(Math.random() * 15 + 5)}%</span> above average engagement</p>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-16">
        <Link to="/signup">
          <Button size="lg" className="gradient-primary hover-glow shadow-primary">
            Start Real-time Analytics
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default RealTimeAnalyticsPage;