import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Bot, 
  Sparkles, 
  Target, 
  Zap,
  ArrowRight,
  MessageSquare,
  Hash,
  Image,
  Copy,
  RefreshCw,
  Wand2
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AIContentPage = () => {
  const [activeDemo, setActiveDemo] = useState('captions');
  const [isGenerating, setIsGenerating] = useState(false);
  const [inputText, setInputText] = useState('Coffee shop morning vibes');
  
  const features = [
    {
      icon: MessageSquare,
      title: 'AI Caption Generation',
      description: 'Generate engaging, on-brand captions that match your unique voice and style.',
      id: 'ai-caption'
    },
    {
      icon: Hash,
      title: 'Smart Hashtag Research',
      description: 'Discover trending and niche hashtags optimized for your content and audience.',
      id: 'smart-hashtag'
    },
    {
      icon: Image,
      title: 'Content Ideas',
      description: 'Never run out of ideas with AI-powered content suggestions tailored to your niche.',
      id: 'content-ideas'
    }
  ];

  const demoData = {
    captions: [
      "☕ Starting my day with the perfect brew at my favorite corner café. There's something magical about that first sip that sets the tone for everything ahead. #MorningRituals #CoffeeLovers",
      "The aroma of freshly ground beans and the gentle hum of morning conversations - this is where inspiration lives. What's your go-to morning fuel? ☕✨",
      "Finding peace in the chaos of the morning rush. Sometimes the best ideas come over a simple cup of coffee. What's brewing in your mind today? 💭"
    ],
    hashtags: [
      "#CoffeeShop #MorningVibes #CoffeeLovers #LocalCafe #MorningRitual #CoffeeAddict #PerfectBrew #CafeLife #MorningMotivation #CoffeeTime #BaristArt #FreshBrew #MorningBliss #CoffeeDaily #LocalBusiness"
    ],
    ideas: [
      "Behind-the-scenes: How your favorite coffee is made",
      "Compare different brewing methods and their flavors",
      "Interview with the local barista about coffee trends",
      "Create a morning routine checklist featuring your coffee",
      "Review different coffee shops in your area",
      "Share your coffee shop work setup for productivity"
    ]
  };

  const simulateGeneration = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

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

      {/* Interactive Features Demo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {features.map((feature) => (
          <Link key={feature.title} to={`/features/${feature.id}`}>
            <Card className="glass border-border/20 hover-scale transition-smooth cursor-pointer h-full">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-6 transition-all duration-300 hover:gradient-primary group">
                  <feature.icon className="w-8 h-8 text-muted-foreground group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground mb-4">{feature.description}</p>
                <Badge className="gradient-primary">
                  <ArrowRight className="w-4 h-4 mr-1" />
                  View Examples
                </Badge>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Features Overview */}
      <Card className="glass border-border/20 mb-16">
        <CardContent className="p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Powerful AI Content Tools</h2>
          <p className="text-muted-foreground text-lg mb-8">
            Click on any feature above to see live examples and interactive demos of how our AI creates content that converts.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold mb-2">AI-Powered</h4>
              <p className="text-sm text-muted-foreground">Advanced algorithms analyze your content and generate personalized results</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Brand-Aligned</h4>
              <p className="text-sm text-muted-foreground">Content that matches your unique voice and brand personality</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Instant Results</h4>
              <p className="text-sm text-muted-foreground">Generate multiple variations in seconds, not hours</p>
            </div>
          </div>
        </CardContent>
      </Card>

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