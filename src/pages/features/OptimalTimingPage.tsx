import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Timer, 
  Clock, 
  TrendingUp, 
  Calendar,
  ArrowRight,
  Heart,
  MessageCircle,
  Share,
  Globe,
  Zap,
  Target
} from 'lucide-react';
import { Link } from 'react-router-dom';

const OptimalTimingPage = () => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [currentPost, setCurrentPost] = useState(0);
  const [showTiming, setShowTiming] = useState(false);

  const timingData = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=400&fit=crop",
      caption: "Monday motivation starts with perfect timing ⏰ When your audience is most engaged!",
      originalTime: "2:00 PM",
      optimalTime: "9:15 AM",
      improvementPercentage: 67,
      engagement: {
        original: { likes: 892, comments: 45, shares: 12, reach: 3240 },
        optimized: { likes: 1489, comments: 127, shares: 34, reach: 8765 }
      },
      timingInsights: {
        audienceActiveHours: [
          { hour: '8:00 AM', activity: 45, engagement: 6.2 },
          { hour: '9:00 AM', activity: 78, engagement: 8.9 },
          { hour: '10:00 AM', activity: 85, engagement: 9.2 },
          { hour: '11:00 AM', activity: 72, engagement: 7.8 },
          { hour: '12:00 PM', activity: 58, engagement: 6.5 },
          { hour: '1:00 PM', activity: 42, engagement: 5.1 },
          { hour: '2:00 PM', activity: 38, engagement: 4.8 }
        ],
        weeklyPattern: {
          Monday: { engagement: 8.9, reach: 95 },
          Tuesday: { engagement: 7.2, reach: 87 },
          Wednesday: { engagement: 6.8, reach: 82 },
          Thursday: { engagement: 7.5, reach: 89 },
          Friday: { engagement: 6.1, reach: 78 }
        },
        competitorAnalysis: {
          averagePostTime: "1:30 PM",
          saturationLevel: "High",
          recommendedShift: "+2 hours earlier"
        }
      }
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop",
      caption: "Data shows the perfect moment to share insights 📊 Timing is everything in content!",
      originalTime: "6:00 PM",
      optimalTime: "2:30 PM",
      improvementPercentage: 84,
      engagement: {
        original: { likes: 1245, comments: 78, shares: 23, reach: 4567 },
        optimized: { likes: 2291, comments: 189, shares: 67, reach: 12843 }
      },
      timingInsights: {
        audienceActiveHours: [
          { hour: '12:00 PM', activity: 62, engagement: 7.1 },
          { hour: '1:00 PM', activity: 75, engagement: 8.3 },
          { hour: '2:00 PM', activity: 89, engagement: 9.8 },
          { hour: '3:00 PM', activity: 92, engagement: 9.5 },
          { hour: '4:00 PM', activity: 78, engagement: 8.1 },
          { hour: '5:00 PM', activity: 65, engagement: 7.2 },
          { hour: '6:00 PM', activity: 45, engagement: 5.9 }
        ],
        weeklyPattern: {
          Monday: { engagement: 8.1, reach: 88 },
          Tuesday: { engagement: 9.8, reach: 96 },
          Wednesday: { engagement: 9.2, reach: 94 },
          Thursday: { engagement: 8.7, reach: 91 },
          Friday: { engagement: 7.3, reach: 83 }
        },
        competitorAnalysis: {
          averagePostTime: "5:45 PM",
          saturationLevel: "Very High",
          recommendedShift: "+3.5 hours earlier"
        }
      }
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop",
      caption: "Analytics reveal the sweet spot for maximum engagement 🎯 AI-powered timing optimization!",
      originalTime: "11:00 AM",
      optimalTime: "3:45 PM",
      improvementPercentage: 72,
      engagement: {
        original: { likes: 967, comments: 54, shares: 18, reach: 3890 },
        optimized: { likes: 1664, comments: 156, shares: 45, reach: 9234 }
      },
      timingInsights: {
        audienceActiveHours: [
          { hour: '11:00 AM', activity: 58, engagement: 6.8 },
          { hour: '12:00 PM', activity: 62, engagement: 7.1 },
          { hour: '1:00 PM', activity: 71, engagement: 7.9 },
          { hour: '2:00 PM', activity: 78, engagement: 8.4 },
          { hour: '3:00 PM', activity: 88, engagement: 9.1 },
          { hour: '4:00 PM', activity: 94, engagement: 9.7 },
          { hour: '5:00 PM', activity: 82, engagement: 8.8 }
        ],
        weeklyPattern: {
          Monday: { engagement: 7.8, reach: 85 },
          Tuesday: { engagement: 8.4, reach: 89 },
          Wednesday: { engagement: 9.7, reach: 97 },
          Thursday: { engagement: 9.1, reach: 93 },
          Friday: { engagement: 8.2, reach: 87 }
        },
        competitorAnalysis: {
          averagePostTime: "11:30 AM",
          saturationLevel: "Medium",
          recommendedShift: "+4.5 hours later"
        }
      }
    }
  ];

  const startOptimization = () => {
    setIsOptimizing(true);
    setCurrentPost(0);
    setShowTiming(false);
    
    const optimizePost = (index: number) => {
      if (index < timingData.length) {
        setTimeout(() => {
          setCurrentPost(index);
          setTimeout(() => {
            setShowTiming(true);
            setTimeout(() => {
              optimizePost(index + 1);
            }, 4000);
          }, 2000);
        }, 500);
      } else {
        setIsOptimizing(false);
      }
    };
    
    optimizePost(0);
  };

  useEffect(() => {
    startOptimization();
  }, []);

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <Badge className="gradient-primary mb-6 px-4 py-2">
          <Timer className="w-4 h-4 mr-2" />
          AI-Powered Timing Optimization
        </Badge>
        
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          <span className="gradient-hero bg-clip-text text-transparent">
            Optimal
          </span>
          <br />
          <span className="text-foreground">Timing</span>
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Maximize your content reach with AI-powered timing optimization. Post when your audience is most active and engaged.
        </p>

        <Button 
          onClick={startOptimization}
          className="gradient-primary hover-glow shadow-primary mb-12"
          disabled={isOptimizing}
        >
          {isOptimizing ? (
            <>
              <Clock className="w-4 h-4 mr-2 animate-spin" />
              Optimizing Timing...
            </>
          ) : (
            <>
              <Timer className="w-4 h-4 mr-2" />
              Restart Optimization
            </>
          )}
        </Button>
      </div>

      {/* Timing Optimization Results */}
      <div className="space-y-16">
        {timingData.map((post, index) => (
          <Card 
            key={post.id} 
            className={`glass border-border/20 overflow-hidden transition-all duration-1000 ${
              isOptimizing && index === currentPost 
                ? 'ring-2 ring-primary border-primary/50 shadow-primary/20 shadow-2xl animate-pulse-glow' 
                : index <= currentPost ? 'opacity-100' : 'opacity-40'
            }`}
          >
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Before & After Comparison */}
                <div className="p-6 space-y-6">
                  <div className={`transition-all duration-1000 ${
                    showTiming && index <= currentPost ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}>
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                      <Target className="w-6 h-6 text-primary animate-pulse" />
                      Timing Optimization
                      {isOptimizing && index === currentPost && (
                        <Badge className="gradient-primary animate-bounce">
                          Analyzing...
                        </Badge>
                      )}
                    </h3>

                    {/* Instagram Post Preview */}
                    <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30 p-4 mb-6">
                      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg max-w-sm mx-auto">
                        <div className="flex items-center p-3 border-b border-gray-200 dark:border-gray-700">
                          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-full"></div>
                          <div className="ml-2">
                            <p className="font-semibold text-xs text-gray-900 dark:text-white">your_brand</p>
                          </div>
                        </div>
                        
                        <div className="aspect-square">
                          <img 
                            src={post.image} 
                            alt="Instagram post" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="p-3">
                          <p className="text-xs text-gray-900 dark:text-white">
                            <span className="font-semibold">your_brand</span> {post.caption}
                          </p>
                        </div>
                      </div>
                    </Card>

                    {/* Timing Comparison */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <Card className="glass border-border/20 p-4 border-red-200 dark:border-red-800">
                        <h4 className="font-semibold text-red-600 dark:text-red-400 mb-3 flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          Original Time
                        </h4>
                        <p className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">{post.originalTime}</p>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>Likes:</span>
                            <span>{post.engagement.original.likes.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Comments:</span>
                            <span>{post.engagement.original.comments}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Reach:</span>
                            <span>{post.engagement.original.reach.toLocaleString()}</span>
                          </div>
                        </div>
                      </Card>

                      <Card className="glass border-border/20 p-4 border-green-200 dark:border-green-800">
                        <h4 className="font-semibold text-green-600 dark:text-green-400 mb-3 flex items-center gap-2">
                          <Zap className="w-4 h-4" />
                          Optimal Time
                        </h4>
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">{post.optimalTime}</p>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>Likes:</span>
                            <span>{post.engagement.optimized.likes.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Comments:</span>
                            <span>{post.engagement.optimized.comments}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Reach:</span>
                            <span>{post.engagement.optimized.reach.toLocaleString()}</span>
                          </div>
                        </div>
                      </Card>
                    </div>

                    {/* Performance Improvement */}
                    <Card className="glass border-border/20 p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                          +{post.improvementPercentage}%
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">Performance Improvement</p>
                        <Progress value={post.improvementPercentage} className="w-full h-3 mb-4" />
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="font-semibold text-green-600 dark:text-green-400">
                              +{Math.round((post.engagement.optimized.likes / post.engagement.original.likes - 1) * 100)}%
                            </p>
                            <p className="text-muted-foreground">More Likes</p>
                          </div>
                          <div>
                            <p className="font-semibold text-blue-600 dark:text-blue-400">
                              +{Math.round((post.engagement.optimized.comments / post.engagement.original.comments - 1) * 100)}%
                            </p>
                            <p className="text-muted-foreground">More Comments</p>
                          </div>
                          <div>
                            <p className="font-semibold text-purple-600 dark:text-purple-400">
                              +{Math.round((post.engagement.optimized.reach / post.engagement.original.reach - 1) * 100)}%
                            </p>
                            <p className="text-muted-foreground">More Reach</p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>

                {/* Timing Analytics */}
                <div className="p-6 space-y-6 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20">
                  <div className={`transition-all duration-1000 delay-1000 ${
                    showTiming && index <= currentPost ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary animate-pulse" />
                      Timing Analytics
                    </h3>

                    {/* Hourly Activity Pattern */}
                    <Card className="glass border-border/20 p-4 mb-4">
                      <h4 className="font-semibold mb-3">Audience Activity Throughout Day</h4>
                      <div className="space-y-2">
                        {post.timingInsights.audienceActiveHours.map((hour) => (
                          <div key={hour.hour} className="flex items-center justify-between">
                            <span className="text-sm">{hour.hour}</span>
                            <div className="flex items-center gap-3">
                              <Progress value={hour.activity} className="w-20 h-2" />
                              <Badge 
                                variant={hour.hour === post.optimalTime ? "default" : "outline"}
                                className={hour.hour === post.optimalTime ? "gradient-primary text-white" : ""}
                              >
                                {hour.engagement}%
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>

                    {/* Weekly Pattern */}
                    <Card className="glass border-border/20 p-4 mb-4">
                      <h4 className="font-semibold mb-3">Weekly Engagement Pattern</h4>
                      <div className="space-y-2">
                        {Object.entries(post.timingInsights.weeklyPattern).map(([day, data]) => (
                          <div key={day} className="flex items-center justify-between">
                            <span className="text-sm">{day}</span>
                            <div className="flex items-center gap-3">
                              <Progress value={data.reach} className="w-16 h-2" />
                              <span className="text-sm font-medium">{data.engagement}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>

                    {/* AI Recommendations */}
                    <Card className="glass border-border/20 p-4">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-primary" />
                        AI Recommendations
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Competition Level:</span>
                          <Badge variant="outline">{post.timingInsights.competitorAnalysis.saturationLevel}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Suggested Shift:</span>
                          <span className="font-medium text-primary">{post.timingInsights.competitorAnalysis.recommendedShift}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Expected Boost:</span>
                          <span className="font-medium text-green-500">+{post.improvementPercentage}%</span>
                        </div>
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
            Optimize My Timing
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default OptimalTimingPage;