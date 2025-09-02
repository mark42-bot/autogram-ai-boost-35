import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Bot, 
  Sparkles, 
  Target, 
  Zap,
  ArrowRight,
  MessageSquare,
  Hash,
  Image
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AIContentPage = () => {
  const features = [
    {
      icon: MessageSquare,
      title: 'AI Caption Generation',
      description: 'Generate engaging, on-brand captions that match your unique voice and style.'
    },
    {
      icon: Hash,
      title: 'Smart Hashtag Research',
      description: 'Discover trending and niche hashtags optimized for your content and audience.'
    },
    {
      icon: Image,
      title: 'Content Ideas',
      description: 'Never run out of ideas with AI-powered content suggestions tailored to your niche.'
    }
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <Badge className="gradient-primary mb-6 px-4 py-2">
          <Bot className="w-4 h-4 mr-2" />
          AI-Powered Content Creation
        </Badge>
        
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          <span className="gradient-hero bg-clip-text text-transparent">
            AI Content
          </span>
          <br />
          <span className="text-foreground">Generation</span>
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Let AI handle the writing while you focus on creating. Generate captions, hashtags, and content ideas that perfectly match your brand voice.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {features.map((feature) => (
          <Card key={feature.title} className="glass border-border/20 hover-scale transition-smooth">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center">
        <Link to="/signup">
          <Button size="lg" className="gradient-primary hover-glow shadow-primary">
            Try AI Content Generation
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AIContentPage;