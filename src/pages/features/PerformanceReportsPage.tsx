import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft,
  TrendingUp, 
  Users, 
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
  Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PerformanceReportsPage = () => {
  const [currentPost, setCurrentPost] = useState(0);
  const [animationStep, setAnimationStep] = useState(0);
  const navigate = useNavigate();

  // Sample Instagram posts with performance data
  const performancePosts = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop',
      caption: 'Building dreams one step at a time ✨ #entrepreneurlife #motivation #success',
      metrics: {
        likes: 2847,
        comments: 156,
        shares: 89,
        reach: 12400,
        engagement: 26.8,
        saves: 234
      },
      insights: [
        'Peak engagement at 7-9 PM',
        'High save rate indicates valuable content',
        'Comments show strong community engagement'
      ]
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=400&fit=crop',
      caption: 'Coffee and productivity go hand in hand ☕ Ready to tackle Monday! #mondaymotivation #productivity',
      metrics: {
        likes: 1923,
        comments: 87,
        shares: 45,
        reach: 8760,
        engagement: 23.4,
        saves: 167
      },
      insights: [
        'Monday posts perform consistently well',
        'Coffee content resonates with audience',
        'Strong engagement in morning hours'
      ]
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=400&fit=crop',
      caption: 'Team collaboration at its finest! Innovation happens when great minds come together 🚀 #teamwork #innovation',
      metrics: {
        likes: 3421,
        comments: 203,
        shares: 178,
        reach: 15670,
        engagement: 31.2,
        saves: 298
      },
      insights: [
        'Team content drives highest engagement',
        'Behind-the-scenes posts are popular',
        'High share rate shows viral potential'
      ]
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimationStep((prev) => (prev + 1) % 4);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const nextPost = () => {
    setCurrentPost((prev) => (prev + 1) % performancePosts.length);
    setAnimationStep(0);
  };

  const prevPost = () => {
    setCurrentPost((prev) => (prev - 1 + performancePosts.length) % performancePosts.length);
    setAnimationStep(0);
  };

  const currentPostData = performancePosts[currentPost];

  return (
    <div className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Navigation */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/features/analytics')}
          className="mb-8 hover:bg-muted"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Analytics
        </Button>

        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="gradient-primary mb-6 px-4 py-2">
            <PieChart className="w-4 h-4 mr-2" />
            Performance Reports
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-hero bg-clip-text text-transparent">
              Detailed
            </span>
            <br />
            <span className="text-foreground">Performance Analytics</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get comprehensive insights into your content performance with AI-powered analytics and actionable recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Instagram Post Simulation */}
          <Card className="glass border-border/20">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  Live Performance Analysis
                </span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={prevPost}>
                    ←
                  </Button>
                  <Button variant="outline" size="sm" onClick={nextPost}>
                    →
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Instagram Post Mockup */}
              <div className="bg-white dark:bg-gray-900 rounded-lg border shadow-lg max-w-sm mx-auto">
                {/* Post Header */}
                <div className="flex items-center p-4 border-b">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    AG
                  </div>
                  <div className="ml-3">
                    <div className="font-semibold text-sm">autogram_ai</div>
                    <div className="text-xs text-gray-500">Sponsored</div>
                  </div>
                </div>

                {/* Post Image */}
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src={currentPostData.image} 
                    alt="Instagram post" 
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Animated Metrics Overlay */}
                  {animationStep > 0 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="text-white text-center animate-fade-in">
                        <div className={`text-2xl font-bold mb-2 ${animationStep >= 1 ? 'animate-scale-in' : ''}`}>
                          {animationStep === 1 && `❤️ ${currentPostData.metrics.likes}`}
                          {animationStep === 2 && `👀 ${currentPostData.metrics.reach}`}
                          {animationStep === 3 && `📊 ${currentPostData.metrics.engagement}%`}
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

                {/* Post Actions */}
                <div className="p-4">
                  <div className="flex items-center gap-4 mb-3">
                    <Heart className="w-6 h-6" />
                    <MessageCircle className="w-6 h-6" />
                    <Share className="w-6 h-6" />
                  </div>
                  
                  <div className="text-sm mb-2">
                    <span className="font-semibold">{currentPostData.metrics.likes.toLocaleString()} likes</span>
                  </div>
                  
                  <div className="text-sm">
                    <span className="font-semibold">autogram_ai</span> {currentPostData.caption}
                  </div>
                  
                  <div className="text-xs text-gray-500 mt-2">
                    View all {currentPostData.metrics.comments} comments
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <div className="space-y-6">
            {/* Metrics Overview */}
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
                      <span className="text-2xl font-bold">{currentPostData.metrics.likes.toLocaleString()}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">Likes</div>
                  </div>
                  
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-center mb-2">
                      <MessageCircle className="w-5 h-5 text-blue-500 mr-2" />
                      <span className="text-2xl font-bold">{currentPostData.metrics.comments}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">Comments</div>
                  </div>
                  
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-center mb-2">
                      <Eye className="w-5 h-5 text-green-500 mr-2" />
                      <span className="text-2xl font-bold">{currentPostData.metrics.reach.toLocaleString()}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">Reach</div>
                  </div>
                  
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-center mb-2">
                      <TrendingUp className="w-5 h-5 text-purple-500 mr-2" />
                      <span className="text-2xl font-bold">{currentPostData.metrics.engagement}%</span>
                    </div>
                    <div className="text-sm text-muted-foreground">Engagement</div>
                  </div>
                </div>

                {/* Engagement Rate Progress */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Engagement Rate</span>
                    <span className="text-sm text-muted-foreground">{currentPostData.metrics.engagement}%</span>
                  </div>
                  <Progress value={currentPostData.metrics.engagement} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Save Rate</span>
                    <span className="text-sm text-muted-foreground">{((currentPostData.metrics.saves / currentPostData.metrics.reach) * 100).toFixed(1)}%</span>
                  </div>
                  <Progress value={(currentPostData.metrics.saves / currentPostData.metrics.reach) * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* AI Insights */}
            <Card className="glass border-border/20 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  AI Performance Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {currentPostData.insights.map((insight, index) => (
                    <div key={index} className="flex items-start gap-3 animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
                      <div className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <span className="text-sm">{insight}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button className="gradient-primary flex-1">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button variant="outline">
                <Target className="w-4 h-4 mr-2" />
                Optimize Next Post
              </Button>
            </div>
          </div>
        </div>

        {/* Additional Analytics */}
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
                <div className="text-3xl font-bold text-primary mb-2">24.5%</div>
                <div className="text-sm text-muted-foreground">Avg. Engagement Rate</div>
                <Badge variant="secondary" className="mt-2">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +12% from last week
                </Badge>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">45.2K</div>
                <div className="text-sm text-muted-foreground">Total Reach</div>
                <Badge variant="secondary" className="mt-2">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +8% from last week
                </Badge>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">1.8K</div>
                <div className="text-sm text-muted-foreground">New Followers</div>
                <Badge variant="secondary" className="mt-2">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +25% from last week
                </Badge>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">7.2</div>
                <div className="text-sm text-muted-foreground">Posts Published</div>
                <Badge variant="outline" className="mt-2">
                  Optimal frequency
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PerformanceReportsPage;