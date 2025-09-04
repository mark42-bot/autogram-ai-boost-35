import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft,
  Globe, 
  Clock, 
  Calendar, 
  MapPin,
  Zap,
  Users,
  TrendingUp,
  Target,
  Settings,
  CheckCircle,
  Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MultiTimezonePage = () => {
  const [selectedTimezone, setSelectedTimezone] = useState(0);
  const [animatingPost, setAnimatingPost] = useState(-1);
  const navigate = useNavigate();

  // Sample timezone data with optimal posting times
  const timezones = [
    {
      city: 'New York',
      timezone: 'EST (UTC-5)',
      localTime: '2:30 PM',
      optimalTime: '7:00 PM',
      audienceSize: '2.4K',
      engagement: '28.5%',
      flag: '🇺🇸'
    },
    {
      city: 'London',
      timezone: 'GMT (UTC+0)',
      localTime: '7:30 PM',
      optimalTime: '9:00 PM',
      audienceSize: '1.8K',
      engagement: '31.2%',
      flag: '🇬🇧'
    },
    {
      city: 'Tokyo',
      timezone: 'JST (UTC+9)',
      localTime: '4:30 AM',
      optimalTime: '8:00 AM',
      audienceSize: '1.2K',
      engagement: '25.8%',
      flag: '🇯🇵'
    },
    {
      city: 'Sydney',
      timezone: 'AEDT (UTC+11)',
      localTime: '6:30 AM',
      optimalTime: '6:00 PM',
      audienceSize: '950',
      engagement: '33.1%',
      flag: '🇦🇺'
    }
  ];

  // Sample scheduled posts
  const scheduledPosts = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop',
      caption: 'Global innovation starts with diverse perspectives 🌍 #innovation #diversity',
      scheduledTime: '7:00 PM EST',
      timezones: ['New York', 'Toronto', 'Miami'],
      status: 'scheduled'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=400&fit=crop',
      caption: 'Morning productivity session in full swing ☕ #productivity #teamwork',
      scheduledTime: '8:00 AM JST',
      timezones: ['Tokyo', 'Seoul', 'Manila'],
      status: 'posting'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=400&fit=crop',
      caption: 'Evening inspiration for the creative minds 🎨 #creativity #inspiration',
      scheduledTime: '6:00 PM AEDT',
      timezones: ['Sydney', 'Melbourne', 'Brisbane'],
      status: 'scheduled'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimatingPost((prev) => (prev + 1) % scheduledPosts.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Navigation */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/features/scheduling')}
          className="mb-8 hover:bg-muted"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Scheduling
        </Button>

        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="gradient-primary mb-6 px-4 py-2">
            <Globe className="w-4 h-4 mr-2" />
            Multi-Timezone Support
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-hero bg-clip-text text-transparent">
              Global
            </span>
            <br />
            <span className="text-foreground">Audience Reach</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Optimize your content for audiences worldwide with intelligent timezone scheduling and local engagement insights.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* World Map Simulation */}
          <Card className="glass border-border/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Global Audience Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Timezone Cards */}
              <div className="space-y-4 mb-6">
                {timezones.map((tz, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                      selectedTimezone === index 
                        ? 'border-primary bg-primary/5 shadow-lg' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedTimezone(index)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{tz.flag}</span>
                        <div>
                          <div className="font-semibold">{tz.city}</div>
                          <div className="text-sm text-muted-foreground">{tz.timezone}</div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="font-semibold">{tz.localTime}</div>
                        <div className="text-sm text-muted-foreground">Local Time</div>
                      </div>
                    </div>
                    
                    {selectedTimezone === index && (
                      <div className="mt-4 pt-4 border-t grid grid-cols-3 gap-4 animate-fade-in">
                        <div className="text-center">
                          <div className="text-lg font-bold text-primary">{tz.optimalTime}</div>
                          <div className="text-xs text-muted-foreground">Optimal Post Time</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-primary">{tz.audienceSize}</div>
                          <div className="text-xs text-muted-foreground">Audience Size</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-primary">{tz.engagement}</div>
                          <div className="text-xs text-muted-foreground">Avg. Engagement</div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Settings className="w-4 h-4 mr-2" />
                  Configure
                </Button>
                <Button size="sm" className="gradient-primary flex-1">
                  <Zap className="w-4 h-4 mr-2" />
                  Auto-Optimize
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Scheduled Posts */}
          <Card className="glass border-border/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Multi-Timezone Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {scheduledPosts.map((post, index) => (
                <div 
                  key={post.id}
                  className={`border rounded-lg p-4 transition-all duration-500 ${
                    animatingPost === index 
                      ? 'border-primary bg-primary/5 shadow-lg animate-pulse-glow' 
                      : 'border-border'
                  }`}
                >
                  <div className="flex gap-4">
                    {/* Post Image */}
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={post.image} 
                        alt="Scheduled post" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Post Details */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge 
                          variant={post.status === 'posting' ? 'default' : 'secondary'}
                          className={post.status === 'posting' ? 'gradient-primary animate-pulse' : ''}
                        >
                          {post.status === 'posting' ? (
                            <>
                              <Zap className="w-3 h-3 mr-1" />
                              Posting Now
                            </>
                          ) : (
                            <>
                              <Clock className="w-3 h-3 mr-1" />
                              Scheduled
                            </>
                          )}
                        </Badge>
                        
                        <div className="text-sm font-medium">{post.scheduledTime}</div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {post.caption}
                      </p>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Targeting:</span>
                        {post.timezones.map((tz, tzIndex) => (
                          <Badge key={tzIndex} variant="outline" className="text-xs">
                            {tz}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* AI Optimization Insights */}
        <Card className="glass border-border/20 mt-12 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              AI Timezone Optimization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8" />
                </div>
                <h3 className="font-semibold mb-2">Smart Scheduling</h3>
                <p className="text-sm text-muted-foreground">
                  AI analyzes audience activity patterns across all timezones to suggest optimal posting times.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="font-semibold mb-2">Audience Insights</h3>
                <p className="text-sm text-muted-foreground">
                  Get detailed insights about audience behavior and engagement patterns in each timezone.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500/10 text-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8" />
                </div>
                <h3 className="font-semibold mb-2">Precision Targeting</h3>
                <p className="text-sm text-muted-foreground">
                  Target specific regions with content optimized for local culture and timing preferences.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Summary */}
        <Card className="glass border-border/20 mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Global Performance Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">12</div>
                <div className="text-sm text-muted-foreground">Active Timezones</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">8.4K</div>
                <div className="text-sm text-muted-foreground">Global Audience</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">29.7%</div>
                <div className="text-sm text-muted-foreground">Avg. Engagement</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">94%</div>
                <div className="text-sm text-muted-foreground">Optimal Timing Success</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MultiTimezonePage;