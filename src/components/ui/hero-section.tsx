import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Play, Zap, TrendingUp, Users, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroBackground from '@/assets/hero-bg.jpg';
import dashboardMockup from '@/assets/dashboard-mockup.jpg';

const HeroSection = () => {
  const stats = [
    { icon: Users, value: '50K+', label: 'Active Users' },
    { icon: TrendingUp, value: '300%', label: 'Avg Growth' },
    { icon: Clock, value: '10hrs', label: 'Time Saved/Week' }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 gradient-primary rounded-full opacity-20 animate-float" />
        <div className="absolute top-40 right-20 w-32 h-32 gradient-card rounded-full opacity-10 animate-float" style={{animationDelay: '1s'}} />
        <div className="absolute bottom-32 left-20 w-16 h-16 bg-accent/20 rounded-full animate-float" style={{animationDelay: '2s'}} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex">
            <Badge className="gradient-primary px-4 py-2 text-sm font-medium border-0 hover-glow transition-smooth">
              <Zap className="w-4 h-4 mr-2" />
              New: AI-Powered Content Optimization
            </Badge>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="block gradient-hero bg-clip-text text-transparent animate-gradient-x">
              Automate Your
            </span>
            <span className="block text-foreground">
              Instagram Success
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            AI-powered content creation, intelligent scheduling, and performance analytics 
            that help you grow your Instagram presence effortlessly.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/signup">
              <Button 
                size="lg" 
                className="gradient-primary hover-glow transition-smooth text-lg px-8 py-4 h-auto shadow-primary"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/demo">
              <Button 
                variant="outline" 
                size="lg" 
                className="glass border-border/50 hover:bg-muted/50 text-lg px-8 py-4 h-auto transition-smooth"
              >
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div 
                key={stat.label} 
                className="glass rounded-lg p-6 hover-scale transition-smooth border border-border/20"
              >
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Dashboard Mockup */}
          <div className="relative max-w-5xl mx-auto">
            <div className="glass rounded-2xl p-8 shadow-card border border-border/20 hover-lift transition-smooth">
              <img 
                src={dashboardMockup} 
                alt="AutoGram Dashboard Interface" 
                className="w-full rounded-lg shadow-glow"
              />
            </div>
            
            {/* Floating UI Elements */}
            <div className="absolute -top-6 -left-6 glass rounded-lg p-4 border border-border/20 animate-float">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-success rounded-full" />
                <span className="text-sm font-medium">AI Writing</span>
              </div>
            </div>
            
            <div className="absolute -top-6 -right-6 glass rounded-lg p-4 border border-border/20 animate-float" style={{animationDelay: '1s'}}>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">+127% Growth</span>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-6">Trusted by content creators worldwide</p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="text-2xl font-bold">TechCrunch</div>
              <div className="text-2xl font-bold">Forbes</div>
              <div className="text-2xl font-bold">Mashable</div>
              <div className="text-2xl font-bold">Wired</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;