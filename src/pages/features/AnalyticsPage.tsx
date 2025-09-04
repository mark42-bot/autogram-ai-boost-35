import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Target,
  ArrowRight,
  Activity,
  PieChart,
  Eye,
  Heart,
  MessageCircle,
  Share,
  Calendar,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AnalyticsPage = () => {
  const [activeMetric, setActiveMetric] = useState('realtime');
  
  const features = [
    {
      icon: Activity,
      title: 'Real-time Analytics',
      description: 'Monitor your performance with live data and instant insights into your content success.',
      id: 'realtime'
    },
    {
      icon: Users,
      title: 'Audience Insights',
      description: 'Understand your followers better with detailed demographics and behavior analysis.',
      id: 'audience'
    },
    {
      icon: PieChart,
      title: 'Performance Reports',
      description: 'Get comprehensive reports on engagement, reach, and growth metrics.',
      id: 'reports'
    }
  ];

  const analyticsData = {
    posts: [
      { title: 'Morning Coffee Vibes', likes: 1247, comments: 89, shares: 34, reach: 5432, date: '2 hours ago' },
      { title: 'Weekend Productivity Tips', likes: 892, comments: 156, shares: 67, reach: 3421, date: '1 day ago' },
      { title: 'Behind the Scenes', likes: 1567, comments: 234, shares: 89, reach: 7234, date: '2 days ago' },
      { title: 'Customer Spotlight', likes: 2134, comments: 187, shares: 123, reach: 8765, date: '3 days ago' }
    ],
    metrics: {
      totalFollowers: 15742,
      growthRate: 12.5,
      avgEngagement: 4.8,
      totalReach: 125000
    },
    demographics: {
      ageGroups: [
        { range: '18-24', percentage: 25 },
        { range: '25-34', percentage: 35 },
        { range: '35-44', percentage: 22 },
        { range: '45-54', percentage: 12 },
        { range: '55+', percentage: 6 }
      ],
      topCountries: ['United States', 'Canada', 'United Kingdom', 'Australia', 'Germany']
    }
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <Badge className="gradient-primary mb-6 px-4 py-2">
          <BarChart3 className="w-4 h-4 mr-2" />
          Data-Driven Growth
        </Badge>
        
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          <span className="gradient-hero bg-clip-text text-transparent">
            Performance
          </span>
          <br />
          <span className="text-foreground">Analytics</span>
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Make informed decisions with comprehensive analytics and insights that help you understand what works and optimize for growth.
        </p>
      </div>

      {/* Interactive Features Demo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {features.map((feature) => (
          <Link key={feature.title} to={`/features/${feature.id === 'realtime' ? 'real-time-analytics' : feature.id === 'audience' ? 'audience-insights' : 'performance-reports'}`}>
            <Card className="glass border-border/20 hover-scale transition-smooth cursor-pointer">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
                <Button className="mt-4 gradient-primary">
                  View Examples
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Live Analytics Dashboard Demo */}
      <Card className="glass border-border/20 mb-16">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <BarChart3 className="w-6 h-6 text-primary animate-float" />
            Live Analytics Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {activeMetric === 'realtime' && (
            <div className="space-y-6">
              {/* Real-time Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="glass border-border/20 p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{analyticsData.metrics.totalFollowers.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Total Followers</p>
                    </div>
                  </div>
                </Card>
                <Card className="glass border-border/20 p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">+{analyticsData.metrics.growthRate}%</p>
                      <p className="text-sm text-muted-foreground">Growth Rate</p>
                    </div>
                  </div>
                </Card>
                <Card className="glass border-border/20 p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                      <Heart className="w-5 h-5 text-purple-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{analyticsData.metrics.avgEngagement}%</p>
                      <p className="text-sm text-muted-foreground">Avg Engagement</p>
                    </div>
                  </div>
                </Card>
                <Card className="glass border-border/20 p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center">
                      <Eye className="w-5 h-5 text-orange-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{analyticsData.metrics.totalReach.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Total Reach</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Recent Posts Performance */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Recent Posts Performance</h4>
                <div className="space-y-3">
                  {analyticsData.posts.map((post, index) => (
                    <Card key={index} className="glass border-border/20 p-4 hover-scale transition-smooth">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h5 className="font-medium">{post.title}</h5>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.date}
                          </p>
                        </div>
                        <div className="flex gap-6 text-sm">
                          <div className="text-center">
                            <div className="flex items-center gap-1 text-red-500">
                              <Heart className="w-4 h-4" />
                              {post.likes}
                            </div>
                            <p className="text-xs text-muted-foreground">Likes</p>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center gap-1 text-blue-500">
                              <MessageCircle className="w-4 h-4" />
                              {post.comments}
                            </div>
                            <p className="text-xs text-muted-foreground">Comments</p>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center gap-1 text-green-500">
                              <Share className="w-4 h-4" />
                              {post.shares}
                            </div>
                            <p className="text-xs text-muted-foreground">Shares</p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeMetric === 'audience' && (
            <div className="space-y-6">
              <h4 className="text-lg font-semibold">Audience Demographics</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Age Groups */}
                <Card className="glass border-border/20 p-6">
                  <h5 className="font-medium mb-4">Age Distribution</h5>
                  <div className="space-y-4">
                    {analyticsData.demographics.ageGroups.map((group, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{group.range}</span>
                          <span>{group.percentage}%</span>
                        </div>
                        <Progress value={group.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Top Countries */}
                <Card className="glass border-border/20 p-6">
                  <h5 className="font-medium mb-4">Top Countries</h5>
                  <div className="space-y-3">
                    {analyticsData.demographics.topCountries.map((country, index) => (
                      <div key={index} className="flex items-center justify-between p-2 hover:bg-muted/30 rounded">
                        <span className="text-sm">{index + 1}. {country}</span>
                        <Badge variant="outline">{Math.floor(Math.random() * 20 + 10)}%</Badge>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          )}

          {activeMetric === 'reports' && (
            <div className="space-y-6">
              <h4 className="text-lg font-semibold">Performance Reports</h4>
              
              {/* Weekly Summary */}
              <Card className="glass border-border/20 p-6">
                <h5 className="font-medium mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  This Week Summary
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg">
                    <p className="text-2xl font-bold text-blue-500">847</p>
                    <p className="text-sm text-muted-foreground">New Followers</p>
                    <p className="text-xs text-green-500 mt-1">↑ 23% from last week</p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-lg">
                    <p className="text-2xl font-bold text-green-500">12.4K</p>
                    <p className="text-sm text-muted-foreground">Total Engagement</p>
                    <p className="text-xs text-green-500 mt-1">↑ 18% from last week</p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg">
                    <p className="text-2xl font-bold text-purple-500">54.2K</p>
                    <p className="text-sm text-muted-foreground">Impressions</p>
                    <p className="text-xs text-green-500 mt-1">↑ 31% from last week</p>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>

      {/* CTA */}
      <div className="text-center">
        <Link to="/signup">
          <Button size="lg" className="gradient-primary hover-glow shadow-primary">
            Start Analyzing Performance
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AnalyticsPage;