import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Clock, 
  Globe, 
  Zap,
  ArrowRight,
  Timer,
  BarChart,
  PlayCircle,
  PauseCircle,
  Settings,
  TrendingUp,
  MapPin,
  Users
} from 'lucide-react';
import { Link } from 'react-router-dom';

const SchedulingPage = () => {
  const [activeFeature, setActiveFeature] = useState('timing');
  const [isSchedulerRunning, setIsSchedulerRunning] = useState(true);
  
  const features = [
    {
      icon: Timer,
      title: 'AI-Optimized Timing',
      description: 'Automatically schedule posts for when your audience is most active and engaged.',
      id: 'timing'
    },
    {
      icon: Globe,
      title: 'Multi-Timezone Support',
      description: 'Reach global audiences with smart scheduling across different time zones.',
      id: 'timezone'
    },
    {
      icon: BarChart,
      title: 'Bulk Scheduling',
      description: 'Plan weeks or months of content in advance with our intuitive bulk scheduling tools.',
      id: 'bulk'
    }
  ];

  const schedulingData = {
    optimalTimes: [
      { time: '9:00 AM', engagement: 89, day: 'Monday' },
      { time: '1:00 PM', engagement: 94, day: 'Monday' },
      { time: '7:00 PM', engagement: 76, day: 'Monday' },
      { time: '10:00 AM', engagement: 85, day: 'Tuesday' },
      { time: '3:00 PM', engagement: 91, day: 'Tuesday' }
    ],
    timezones: [
      { region: 'New York (EST)', time: '2:00 PM', status: 'scheduled' },
      { region: 'London (GMT)', time: '7:00 PM', status: 'posted' },
      { region: 'Tokyo (JST)', time: '3:00 AM+1', status: 'scheduled' },
      { region: 'Sydney (AEDT)', time: '5:00 AM+1', status: 'scheduled' }
    ],
    queuedPosts: [
      { title: 'Morning Motivation Monday', scheduledFor: 'Today 9:00 AM', platform: 'Instagram', status: 'ready' },
      { title: 'Coffee Shop Feature', scheduledFor: 'Today 1:00 PM', platform: 'Facebook', status: 'ready' },
      { title: 'Behind the Scenes Video', scheduledFor: 'Tomorrow 10:00 AM', platform: 'TikTok', status: 'pending' },
      { title: 'Product Showcase', scheduledFor: 'Tomorrow 3:00 PM', platform: 'Instagram', status: 'pending' }
    ]
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <Badge className="gradient-primary mb-6 px-4 py-2">
          <Calendar className="w-4 h-4 mr-2" />
          Smart Automation
        </Badge>
        
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          <span className="gradient-hero bg-clip-text text-transparent">
            Auto
          </span>
          <br />
          <span className="text-foreground">Scheduling</span>
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Never miss the perfect posting moment. Our AI analyzes your audience behavior to schedule content when it will get maximum engagement.
        </p>
      </div>

      {/* Interactive Features Demo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {features.map((feature) => (
          <Link key={feature.title} to={`/features/${feature.id === 'timing' ? 'optimal-timing' : feature.id === 'timezone' ? 'multi-timezone' : 'bulk-scheduling'}`}>
            <Card className="glass border-border/20 hover-scale transition-smooth cursor-pointer">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
                <Button className="mt-4 gradient-primary">
                  See Examples
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Live Scheduling Dashboard */}
      <Card className="glass border-border/20 mb-16">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Calendar className="w-6 h-6 text-primary animate-float" />
              Smart Scheduling Dashboard
            </CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Auto-Scheduler</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsSchedulerRunning(!isSchedulerRunning)}
                className={`glass border-border/20 ${isSchedulerRunning ? 'text-green-500' : 'text-red-500'}`}
              >
                {isSchedulerRunning ? <PlayCircle className="w-4 h-4" /> : <PauseCircle className="w-4 h-4" />}
                {isSchedulerRunning ? 'Running' : 'Paused'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {activeFeature === 'timing' && (
            <div className="space-y-6">
              <h4 className="text-lg font-semibold flex items-center gap-2">
                <Timer className="w-5 h-5 text-primary" />
                AI-Optimized Posting Times
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="glass border-border/20 p-6">
                  <h5 className="font-medium mb-4">Optimal Times This Week</h5>
                  <div className="space-y-3">
                    {schedulingData.optimalTimes.map((time, index) => (
                      <div key={index} className="flex items-center justify-between p-3 hover:bg-muted/30 rounded">
                        <div>
                          <p className="font-medium">{time.day} at {time.time}</p>
                          <p className="text-sm text-muted-foreground">Predicted engagement</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-green-500">{time.engagement}%</p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <TrendingUp className="w-3 h-3" />
                            +{Math.floor(Math.random() * 10 + 5)}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="glass border-border/20 p-6">
                  <h5 className="font-medium mb-4">Queue Status</h5>
                  <div className="space-y-3">
                    {schedulingData.queuedPosts.map((post, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border border-border/20 rounded">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{post.title}</p>
                          <p className="text-xs text-muted-foreground">{post.scheduledFor} • {post.platform}</p>
                        </div>
                        <Badge variant={post.status === 'ready' ? 'default' : 'secondary'}>
                          {post.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          )}

          {activeFeature === 'timezone' && (
            <div className="space-y-6">
              <h4 className="text-lg font-semibold flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                Global Timezone Management
              </h4>
              
              <Card className="glass border-border/20 p-6">
                <h5 className="font-medium mb-4">Current Post Distribution</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {schedulingData.timezones.map((timezone, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-border/20 rounded-lg hover:bg-muted/30">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-primary" />
                        <div>
                          <p className="font-medium text-sm">{timezone.region}</p>
                          <p className="text-xs text-muted-foreground">Local time: {timezone.time}</p>
                        </div>
                      </div>
                      <Badge variant={timezone.status === 'posted' ? 'default' : 'secondary'}>
                        {timezone.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="glass border-border/20 p-6">
                <h5 className="font-medium mb-4">Audience Distribution</h5>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">North America</span>
                    <span className="text-sm font-medium">45%</span>
                  </div>
                  <div className="w-full bg-muted/30 rounded-full h-2">
                    <div className="bg-gradient-primary h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Europe</span>
                    <span className="text-sm font-medium">30%</span>
                  </div>
                  <div className="w-full bg-muted/30 rounded-full h-2">
                    <div className="bg-gradient-primary h-2 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Asia-Pacific</span>
                    <span className="text-sm font-medium">25%</span>
                  </div>
                  <div className="w-full bg-muted/30 rounded-full h-2">
                    <div className="bg-gradient-primary h-2 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeFeature === 'bulk' && (
            <div className="space-y-6">
              <h4 className="text-lg font-semibold flex items-center gap-2">
                <BarChart className="w-5 h-5 text-primary" />
                Bulk Scheduling Overview
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="glass border-border/20 p-4 text-center">
                  <div className="text-2xl font-bold text-blue-500">24</div>
                  <div className="text-sm text-muted-foreground">Posts Scheduled</div>
                  <div className="text-xs text-green-500 mt-1">This Week</div>
                </Card>
                <Card className="glass border-border/20 p-4 text-center">
                  <div className="text-2xl font-bold text-purple-500">156</div>
                  <div className="text-sm text-muted-foreground">Total in Queue</div>
                  <div className="text-xs text-blue-500 mt-1">Next 30 Days</div>
                </Card>
                <Card className="glass border-border/20 p-4 text-center">
                  <div className="text-2xl font-bold text-green-500">3</div>
                  <div className="text-sm text-muted-foreground">Platforms</div>
                  <div className="text-xs text-muted-foreground mt-1">Instagram, Facebook, TikTok</div>
                </Card>
              </div>

              <Card className="glass border-border/20 p-6">
                <h5 className="font-medium mb-4">Upcoming Week Overview</h5>
                <div className="grid grid-cols-7 gap-2 text-center text-xs">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                    <div key={day} className="space-y-2">
                      <div className="font-medium text-muted-foreground">{day}</div>
                      <div className="space-y-1">
                        {[1, 2, 3].map((slot) => (
                          <div key={slot} className={`h-8 rounded border-2 border-dashed ${
                            Math.random() > 0.3 ? 'border-primary bg-primary/20' : 'border-border/50'
                          } flex items-center justify-center`}>
                            {Math.random() > 0.3 && <div className="w-2 h-2 bg-primary rounded-full"></div>}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
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
            Start Smart Scheduling
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SchedulingPage;