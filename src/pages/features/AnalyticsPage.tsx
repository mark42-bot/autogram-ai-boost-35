import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useInstagramAuth } from '@/contexts/InstagramAuthContext';
import { 
  BarChart3, 
  Instagram,
  ArrowRight,
  Activity,
  PieChart,
  Users,
  CheckCircle,
  ExternalLink,
  TrendingUp,
  Eye,
  Heart
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AnalyticsPage = () => {
  const { user, isConnected, isConnecting, login } = useInstagramAuth();

  const features = [
    {
      icon: Activity,
      title: 'Real-time Analytics',
      description: 'Monitor your performance with live data and instant insights into your content success.',
      href: '/features/real-time-analytics'
    },
    {
      icon: Users,
      title: 'Audience Insights',
      description: 'Understand your followers better with detailed demographics and behavior analysis.',
      href: '/features/audience-insights'
    },
    {
      icon: PieChart,
      title: 'Performance Reports',
      description: 'Get comprehensive reports on engagement, reach, and growth metrics.',
      href: '/features/performance-reports'
    }
  ];

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
          Connect your Instagram account to unlock powerful analytics, audience insights, and performance reports for your posts.
        </p>
      </div>

      {/* Instagram Login Section */}
      {!isConnected ? (
        <Card className="glass border-border/20 max-w-2xl mx-auto mb-16">
          <CardHeader className="text-center pb-2">
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center">
              <Instagram className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-2xl">Connect Your Instagram</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-center text-muted-foreground">
              Log in with your Instagram account to analyze your real posts, track performance metrics, and get AI-powered insights.
            </p>

            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 space-y-3">
              <h4 className="font-semibold text-foreground">What you'll unlock:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  Real-time analytics for all your Instagram posts
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  Deep audience demographics & behavior insights
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  AI-powered performance reports & recommendations
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  Engagement trends and optimal posting times
                </li>
              </ul>
            </div>

            <Button
              onClick={login}
              disabled={isConnecting}
              className="w-full h-14 text-lg bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 text-white"
            >
              {isConnecting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                  Connecting to Instagram...
                </>
              ) : (
                <>
                  <Instagram className="w-5 h-5 mr-3" />
                  Log in with Instagram
                </>
              )}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              We only access your basic profile info and media.{' '}
              <a href="#" className="text-primary hover:underline inline-flex items-center gap-1">
                Learn more <ExternalLink className="w-3 h-3" />
              </a>
            </p>
          </CardContent>
        </Card>
      ) : (
        /* Connected State - Account Overview */
        <Card className="glass border-border/20 max-w-4xl mx-auto mb-16">
          <CardContent className="p-8">
            <div className="flex items-center gap-6 mb-8">
              <img 
                src={user!.profilePictureUrl} 
                alt={user!.username}
                className="w-20 h-20 rounded-full border-4 border-primary/30 object-cover"
              />
              <div>
                <h2 className="text-2xl font-bold">@{user!.username}</h2>
                <p className="text-muted-foreground">{user!.accountType} Account</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Connected
                  </Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-6">
              <div className="text-center p-4 bg-muted/30 rounded-xl">
                <p className="text-3xl font-bold text-foreground">{user!.followersCount.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Followers</p>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded-xl">
                <p className="text-3xl font-bold text-foreground">{user!.followingCount}</p>
                <p className="text-sm text-muted-foreground">Following</p>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded-xl">
                <p className="text-3xl font-bold text-foreground">{user!.mediaCount}</p>
                <p className="text-sm text-muted-foreground">Posts</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground text-center">
              Select a section below to analyze your posts in detail.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Feature Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {features.map((feature) => (
          <Link key={feature.title} to={feature.href}>
            <Card className="glass border-border/20 hover-scale transition-smooth cursor-pointer h-full">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground mb-4">{feature.description}</p>
                <Button className="gradient-primary">
                  {isConnected ? 'View My Analytics' : 'View Examples'}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* CTA */}
      {!isConnected && (
        <div className="text-center">
          <Button onClick={login} size="lg" className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 text-white hover-glow">
            <Instagram className="w-5 h-5 mr-2" />
            Connect Instagram & Start Analyzing
          </Button>
        </div>
      )}
    </div>
  );
};

export default AnalyticsPage;