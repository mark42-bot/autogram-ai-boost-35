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
      id: 'captions'
    },
    {
      icon: Hash,
      title: 'Smart Hashtag Research',
      description: 'Discover trending and niche hashtags optimized for your content and audience.',
      id: 'hashtags'
    },
    {
      icon: Image,
      title: 'Content Ideas',
      description: 'Never run out of ideas with AI-powered content suggestions tailored to your niche.',
      id: 'ideas'
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
          <Card 
            key={feature.title} 
            className={`glass border-border/20 hover-scale transition-smooth cursor-pointer ${
              activeDemo === feature.id ? 'ring-2 ring-primary border-primary/50' : ''
            }`}
            onClick={() => setActiveDemo(feature.id)}
          >
            <CardContent className="p-8 text-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 ${
                activeDemo === feature.id ? 'gradient-primary animate-pulse-glow' : 'bg-muted'
              }`}>
                <feature.icon className={`w-8 h-8 transition-colors duration-300 ${
                  activeDemo === feature.id ? 'text-white' : 'text-muted-foreground'
                }`} />
              </div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
              {activeDemo === feature.id && (
                <Badge className="mt-4 gradient-primary">
                  Try Demo Below
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Live Demo Section */}
      <Card className="glass border-border/20 mb-16">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <Wand2 className="w-6 h-6 text-primary animate-float" />
            Live AI Demo - {features.find(f => f.id === activeDemo)?.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Input Section */}
          <div className="space-y-4">
            <label className="text-sm font-medium text-muted-foreground">
              {activeDemo === 'captions' ? 'Describe your content:' : 
               activeDemo === 'hashtags' ? 'Enter your topic:' : 
               'Enter your niche/interest:'}
            </label>
            <div className="flex gap-2">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={
                  activeDemo === 'captions' ? 'e.g., Coffee shop morning vibes' :
                  activeDemo === 'hashtags' ? 'e.g., Coffee, Morning routine' :
                  'e.g., Coffee, Lifestyle, Photography'
                }
                className="glass border-border/20"
              />
              <Button 
                onClick={simulateGeneration}
                disabled={isGenerating || !inputText.trim()}
                className="gradient-primary hover-glow"
              >
                {isGenerating ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
                Generate
              </Button>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold flex items-center gap-2">
              <Bot className="w-5 h-5 text-primary" />
              AI Generated Results
            </h4>
            
            {activeDemo === 'captions' && (
              <div className="space-y-3">
                {demoData.captions.map((caption, index) => (
                  <Card key={index} className="glass border-border/20 p-4 hover-scale transition-smooth">
                    <div className="flex justify-between items-start gap-3">
                      <p className="text-sm leading-relaxed flex-1">{caption}</p>
                      <Button size="sm" variant="ghost" className="hover:bg-primary/20">
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {activeDemo === 'hashtags' && (
              <Card className="glass border-border/20 p-4">
                <div className="flex flex-wrap gap-2">
                  {demoData.hashtags[0].split(' ').map((hashtag, index) => (
                    <Badge key={index} variant="outline" className="hover-scale cursor-pointer border-primary/50 hover:bg-primary/20">
                      {hashtag}
                    </Badge>
                  ))}
                </div>
                <Button size="sm" className="mt-3 gradient-primary">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy All Hashtags
                </Button>
              </Card>
            )}

            {activeDemo === 'ideas' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {demoData.ideas.map((idea, index) => (
                  <Card key={index} className="glass border-border/20 p-4 hover-scale transition-smooth cursor-pointer hover:border-primary/50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-bold">{index + 1}</span>
                      </div>
                      <p className="text-sm">{idea}</p>
                    </div>
                  </Card>
                ))}
              </div>
            )}
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