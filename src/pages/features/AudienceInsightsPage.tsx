import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  Globe, 
  TrendingUp, 
  MapPin,
  ArrowRight,
  Heart,
  MessageCircle,
  Share,
  Clock,
  Calendar,
  Smartphone
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AudienceInsightsPage = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentPost, setCurrentPost] = useState(0);
  const [showInsights, setShowInsights] = useState(false);

  const audienceData = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=400&fit=crop",
      caption: "Weekend workspace vibes 💻 Who else is working on their passion projects today?",
      insights: {
        demographics: {
          age: { '18-24': 28, '25-34': 42, '35-44': 20, '45+': 10 },
          gender: { female: 65, male: 32, other: 3 },
          education: { 'High School': 15, 'College': 45, 'Graduate': 40 }
        },
        geography: {
          countries: [
            { name: 'United States', percentage: 45, engagement: 8.2 },
            { name: 'Canada', percentage: 18, engagement: 9.1 },
            { name: 'United Kingdom', percentage: 12, engagement: 7.8 },
            { name: 'Australia', percentage: 10, engagement: 8.9 },
            { name: 'Germany', percentage: 8, engagement: 7.5 }
          ],
          cities: ['New York', 'Toronto', 'London', 'Sydney', 'Berlin']
        },
        behavior: {
          activeHours: { morning: 25, afternoon: 35, evening: 30, night: 10 },
          deviceUsage: { mobile: 78, desktop: 15, tablet: 7 },
          avgSessionTime: '4m 32s',
          returnVisitors: 67
        },
        interests: [
          { topic: 'Entrepreneurship', percentage: 85 },
          { topic: 'Technology', percentage: 72 },
          { topic: 'Design', percentage: 68 },
          { topic: 'Marketing', percentage: 61 },
          { topic: 'Productivity', percentage: 59 }
        ]
      }
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop",
      caption: "Data-driven decisions lead to exponential growth 📊 What metrics matter most to you?",
      insights: {
        demographics: {
          age: { '18-24': 22, '25-34': 48, '35-44': 25, '45+': 5 },
          gender: { female: 58, male: 40, other: 2 },
          education: { 'High School': 10, 'College': 35, 'Graduate': 55 }
        },
        geography: {
          countries: [
            { name: 'United States', percentage: 38, engagement: 9.1 },
            { name: 'Germany', percentage: 22, engagement: 8.7 },
            { name: 'Netherlands', percentage: 15, engagement: 9.3 },
            { name: 'Sweden', percentage: 12, engagement: 8.9 },
            { name: 'France', percentage: 8, engagement: 7.8 }
          ],
          cities: ['San Francisco', 'Berlin', 'Amsterdam', 'Stockholm', 'Paris']
        },
        behavior: {
          activeHours: { morning: 30, afternoon: 40, evening: 25, night: 5 },
          deviceUsage: { mobile: 72, desktop: 22, tablet: 6 },
          avgSessionTime: '6m 18s',
          returnVisitors: 74
        },
        interests: [
          { topic: 'Analytics', percentage: 92 },
          { topic: 'Business Intelligence', percentage: 88 },
          { topic: 'Data Science', percentage: 79 },
          { topic: 'Marketing Analytics', percentage: 71 },
          { topic: 'Growth Hacking', percentage: 65 }
        ]
      }
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop",
      caption: "Building the future, one collaboration at a time 🚀 Tag your dream team!",
      insights: {
        demographics: {
          age: { '18-24': 35, '25-34': 38, '35-44': 22, '45+': 5 },
          gender: { female: 52, male: 46, other: 2 },
          education: { 'High School': 20, 'College': 50, 'Graduate': 30 }
        },
        geography: {
          countries: [
            { name: 'United States', percentage: 42, engagement: 8.8 },
            { name: 'India', percentage: 20, engagement: 9.5 },
            { name: 'United Kingdom', percentage: 15, engagement: 8.2 },
            { name: 'Brazil', percentage: 12, engagement: 9.0 },
            { name: 'Canada', percentage: 8, engagement: 8.6 }
          ],
          cities: ['Los Angeles', 'Mumbai', 'London', 'São Paulo', 'Vancouver']
        },
        behavior: {
          activeHours: { morning: 20, afternoon: 30, evening: 40, night: 10 },
          deviceUsage: { mobile: 82, desktop: 12, tablet: 6 },
          avgSessionTime: '3m 45s',
          returnVisitors: 58
        },
        interests: [
          { topic: 'Team Building', percentage: 89 },
          { topic: 'Leadership', percentage: 82 },
          { topic: 'Startup Culture', percentage: 76 },
          { topic: 'Remote Work', percentage: 69 },
          { topic: 'Innovation', percentage: 64 }
        ]
      }
    }
  ];

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setCurrentPost(0);
    setShowInsights(false);
    
    const analyzePost = (index: number) => {
      if (index < audienceData.length) {
        setTimeout(() => {
          setCurrentPost(index);
          setTimeout(() => {
            setShowInsights(true);
            setTimeout(() => {
              analyzePost(index + 1);
            }, 3000);
          }, 1500);
        }, 500);
      } else {
        setIsAnalyzing(false);
      }
    };
    
    analyzePost(0);
  };

  useEffect(() => {
    startAnalysis();
  }, []);

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <Badge className="gradient-primary mb-6 px-4 py-2">
          <Users className="w-4 h-4 mr-2" />
          Deep Audience Understanding
        </Badge>
        
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          <span className="gradient-hero bg-clip-text text-transparent">
            Audience
          </span>
          <br />
          <span className="text-foreground">Insights</span>
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Understand your audience like never before with AI-powered demographic analysis, behavioral insights, and engagement patterns.
        </p>

        <Button 
          onClick={startAnalysis}
          className="gradient-primary hover-glow shadow-primary mb-12"
          disabled={isAnalyzing}
        >
          {isAnalyzing ? (
            <>
              <Clock className="w-4 h-4 mr-2 animate-spin" />
              Analyzing Audience...
            </>
          ) : (
            <>
              <Users className="w-4 h-4 mr-2" />
              Restart Analysis
            </>
          )}
        </Button>
      </div>

      {/* Posts with Audience Insights */}
      <div className="space-y-16">
        {audienceData.map((post, index) => (
          <Card 
            key={post.id} 
            className={`glass border-border/20 overflow-hidden transition-all duration-1000 ${
              isAnalyzing && index === currentPost 
                ? 'ring-2 ring-primary border-primary/50 shadow-primary/20 shadow-2xl animate-pulse-glow' 
                : index <= currentPost ? 'opacity-100' : 'opacity-40'
            }`}
          >
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                {/* Instagram Post */}
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 p-6">
                  <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg max-w-sm mx-auto">
                    <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full"></div>
                      <div className="ml-3">
                        <p className="font-semibold text-sm text-gray-900 dark:text-white">your_brand</p>
                        <p className="text-xs text-gray-500">Sponsored</p>
                      </div>
                    </div>
                    
                    <div className="aspect-square">
                      <img 
                        src={post.image} 
                        alt="Instagram post" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-center space-x-4 mb-3">
                        <Heart className="w-6 h-6 text-red-500" />
                        <MessageCircle className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                        <Share className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                      </div>
                      
                      <p className="text-sm text-gray-900 dark:text-white mb-2">
                        <span className="font-semibold">your_brand</span> {post.caption}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Audience Demographics */}
                <div className="p-6 space-y-6">
                  <div className={`transition-all duration-1000 ${
                    showInsights && index <= currentPost ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary animate-pulse" />
                      Demographics
                    </h3>

                    {/* Age Distribution */}
                    <Card className="glass border-border/20 p-4 mb-4">
                      <h4 className="font-semibold mb-3">Age Groups</h4>
                      <div className="space-y-2">
                        {Object.entries(post.insights.demographics.age).map(([age, percentage]) => (
                          <div key={age} className="flex items-center justify-between">
                            <span className="text-sm">{age}</span>
                            <div className="flex items-center gap-2">
                              <Progress value={percentage as number} className="w-16 h-2" />
                              <span className="text-sm font-medium w-8">{percentage}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>

                    {/* Gender Split */}
                    <Card className="glass border-border/20 p-4 mb-4">
                      <h4 className="font-semibold mb-3">Gender Distribution</h4>
                      <div className="space-y-2">
                        {Object.entries(post.insights.demographics.gender).map(([gender, percentage]) => (
                          <div key={gender} className="flex items-center justify-between">
                            <span className="text-sm capitalize">{gender}</span>
                            <div className="flex items-center gap-2">
                              <Progress value={percentage as number} className="w-16 h-2" />
                              <span className="text-sm font-medium w-8">{percentage}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>

                    {/* Device Usage */}
                    <Card className="glass border-border/20 p-4">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Smartphone className="w-4 h-4" />
                        Device Usage
                      </h4>
                      <div className="space-y-2">
                        {Object.entries(post.insights.behavior.deviceUsage).map(([device, percentage]) => (
                          <div key={device} className="flex items-center justify-between">
                            <span className="text-sm capitalize">{device}</span>
                            <div className="flex items-center gap-2">
                              <Progress value={percentage as number} className="w-16 h-2" />
                              <span className="text-sm font-medium w-8">{percentage}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>
                </div>

                {/* Geographic & Behavioral Insights */}
                <div className="p-6 space-y-6">
                  <div className={`transition-all duration-1000 delay-500 ${
                    showInsights && index <= currentPost ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Globe className="w-5 h-5 text-primary animate-pulse" />
                      Geographic Insights
                    </h3>

                    {/* Top Countries */}
                    <Card className="glass border-border/20 p-4 mb-4">
                      <h4 className="font-semibold mb-3">Top Countries</h4>
                      <div className="space-y-3">
                        {post.insights.geography.countries.map((country, idx) => (
                          <div key={country.name} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                                #{idx + 1}
                              </span>
                              <span className="text-sm">{country.name}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-medium">{country.percentage}%</span>
                              <Badge variant="outline" className="text-xs">
                                {country.engagement}% eng
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>

                    {/* Interest Analysis */}
                    <Card className="glass border-border/20 p-4 mb-4">
                      <h4 className="font-semibold mb-3">Top Interests</h4>
                      <div className="space-y-2">
                        {post.insights.interests.slice(0, 3).map((interest) => (
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

                    {/* Behavioral Metrics */}
                    <Card className="glass border-border/20 p-4">
                      <h4 className="font-semibold mb-3">Behavior Insights</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Avg. Session Time</span>
                          <span className="font-medium">{post.insights.behavior.avgSessionTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Return Visitors</span>
                          <span className="font-medium">{post.insights.behavior.returnVisitors}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Peak Activity</span>
                          <span className="font-medium">Afternoon</span>
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
            Get Audience Insights
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AudienceInsightsPage;