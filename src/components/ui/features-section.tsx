import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Bot, 
  BarChart3, 
  Calendar, 
  Workflow,
  Sparkles,
  Target,
  Clock,
  Shield,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturesSection = () => {
  const mainFeatures = [
    {
      icon: Bot,
      title: 'AI Content Generation',
      description: 'Create engaging captions, hashtags, and content ideas powered by advanced AI that understands your brand voice.',
      benefits: ['10x faster content creation', 'Brand-consistent messaging', 'Trend-aware suggestions'],
      href: '/features/ai-content',
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      icon: BarChart3,
      title: 'Performance Analytics',
      description: 'Deep insights into your content performance with actionable recommendations to boost engagement.',
      benefits: ['Real-time analytics', 'Competitor benchmarking', 'Growth predictions'],
      href: '/features/analytics',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      icon: Calendar,
      title: 'Smart Scheduling',
      description: 'AI-optimized posting times based on your audience behavior and engagement patterns.',
      benefits: ['Optimal timing predictions', 'Multi-timezone support', 'Bulk scheduling'],
      href: '/features/scheduling',
      gradient: 'from-green-500 to-blue-600'
    },
    {
      icon: Workflow,
      title: 'Content Workflow',
      description: 'Streamlined approval process from content creation to publishing with team collaboration.',
      benefits: ['Team collaboration', 'Approval workflows', 'Brand safety checks'],
      href: '/features/workflow',
      gradient: 'from-orange-500 to-red-600'
    }
  ];

  const additionalFeatures = [
    { icon: Sparkles, title: 'AI-Powered Hashtags', description: 'Smart hashtag suggestions for maximum reach' },
    { icon: Target, title: 'Audience Insights', description: 'Deep understanding of your followers' },
    { icon: Clock, title: 'Save 10+ Hours/Week', description: 'Automate repetitive tasks and focus on creativity' },
    { icon: Shield, title: 'Brand Safety', description: 'AI moderation to protect your brand reputation' }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          <span className="gradient-hero bg-clip-text text-transparent">
            Powerful Features
          </span>{' '}
          <span className="text-foreground">for Instagram Success</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Everything you need to automate, optimize, and scale your Instagram presence with AI-powered tools.
        </p>
      </div>

      {/* Main Features Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
        {mainFeatures.map((feature, index) => (
          <Card 
            key={feature.title}
            className="glass border-border/20 hover-lift hover-glow transition-smooth group cursor-pointer"
          >
            <CardContent className="p-8">
              <div className="flex items-start space-x-4 mb-6">
                <div className={`w-12 h-12 rounded-lg gradient-primary flex items-center justify-center group-hover:shadow-glow transition-smooth`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-smooth">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>

              {/* Benefits List */}
              <div className="space-y-2 mb-6">
                {feature.benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-sm text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>

              <Link to={feature.href}>
                <Button 
                  variant="ghost" 
                  className="group-hover:bg-muted/50 transition-smooth p-0 h-auto font-medium"
                >
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-smooth" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {additionalFeatures.map((feature, index) => (
          <div 
            key={feature.title}
            className="glass rounded-lg p-6 text-center hover-scale transition-smooth border border-border/20"
          >
            <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <feature.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="text-center glass rounded-2xl p-12 border border-border/20 hover-glow transition-smooth">
        <h3 className="text-3xl font-bold mb-4">
          Ready to Transform Your Instagram Strategy?
        </h3>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands of creators and businesses already using AutoGram to grow their Instagram presence.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/signup">
            <Button 
              size="lg" 
              className="gradient-primary hover-glow transition-smooth shadow-primary"
            >
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Link to="/demo">
            <Button 
              variant="outline" 
              size="lg"
              className="glass border-border/50 hover:bg-muted/50 transition-smooth"
            >
              Schedule Demo
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;