import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Bot, 
  Sparkles, 
  ArrowRight,
  MessageSquare,
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
  Wand2,
  RefreshCw
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/ui/navigation';

const AICaptionPage = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [inputText, setInputText] = useState('Coffee shop morning vibes');
  const [generatedCaptions, setGeneratedCaptions] = useState<string[]>([]);
  const [postImages, setPostImages] = useState<string[]>([]);

  const instagramPosts = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=400&fit=crop",
      username: "coffeelover_jane",
      timeAgo: "2h"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=400&fit=crop",
      username: "morningvibes_co",
      timeAgo: "4h"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop",
      username: "cafe_wanderer",
      timeAgo: "1d"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop",
      username: "beans_and_dreams",
      timeAgo: "2d"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1521302200778-33500795e128?w=400&h=400&fit=crop",
      username: "daily_coffee_fix",
      timeAgo: "3d"
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      username: "latte_artist",
      timeAgo: "5d"
    }
  ];

  const aiCaptions = [
    "☕ Starting my day with the perfect brew at my favorite corner café. There's something magical about that first sip that sets the tone for everything ahead. The aroma, the warmth, the moment of peace before the world wakes up ✨ #MorningRituals #CoffeeLovers #PerfectStart",
    
    "The gentle hum of morning conversations and the rich scent of freshly ground beans - this is where inspiration lives. Sometimes the best ideas come not from rushing, but from sitting still with a warm cup in hand ☕💭 What's brewing in your mind today? #CoffeeThoughts #MorningInspiration",
    
    "Finding my sanctuary in the chaos of the morning rush. This little corner table has witnessed countless dreams, plans, and quiet moments of reflection. Here's to the simple ritual that grounds us all ☕🌅 #MorningPeace #CoffeeTime #QuietMoments",
    
    "Every cup tells a story - from the farmers who grew these beans to the barista who crafted this perfect pour. Grateful for the journey that brings this moment of joy to my morning routine ☕🙏 #CoffeeJourney #Grateful #LocalCafe",
    
    "The art of slow mornings: good coffee, natural light, and the promise of a new day. Sometimes the most productive thing you can do is simply be present with your coffee ☕✨ #SlowMorning #Mindfulness #CoffeeArt",
    
    "This corner café isn't just a coffee shop - it's a community hub where strangers become friends over shared tables and warm conversations. Here's to the spaces that bring us together ☕❤️ #CommunityVibes #LocalLove #CoffeeConnections"
  ];

  const simulateGeneration = async () => {
    setIsGenerating(true);
    setCurrentStep(0);
    setGeneratedCaptions([]);

    try {
      // Import Gemini service dynamically
      const { geminiService } = await import('@/services/gemini.service');
      
      // Generate images and captions
      const [aiCaptions, images] = await Promise.all([
        geminiService.generateCaptions(inputText, 6),
        geminiService.generateImages(inputText, 6)
      ]);
      
      setPostImages(images);
      
      // Display captions one by one for visual effect
      for (let i = 0; i < aiCaptions.length; i++) {
        setCurrentStep(i + 1);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setGeneratedCaptions(prev => [...prev, aiCaptions[i]]);
      }
    } catch (error) {
      console.error('Failed to generate captions:', error);
      // Fallback to original mock data if API fails
      for (let i = 0; i < aiCaptions.length; i++) {
        setCurrentStep(i + 1);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setGeneratedCaptions(prev => [...prev, aiCaptions[i]]);
      }
    }
    
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="gradient-primary mb-6 px-4 py-2">
            <MessageSquare className="w-4 h-4 mr-2" />
            AI Caption Generation
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-hero bg-clip-text text-transparent">
              AI-Powered
            </span>
            <br />
            <span className="text-foreground">Caption Generation</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Watch AI create engaging, on-brand captions that match your unique voice and style. Generate multiple variations instantly.
          </p>
        </div>

        {/* Generation Interface */}
        <Card className="glass border-border/20 mb-12">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Wand2 className="w-6 h-6 text-primary animate-float" />
              <h2 className="text-2xl font-semibold">Generate AI Captions</h2>
            </div>
            
            <div className="flex gap-4 mb-6">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Describe your content (e.g., Coffee shop morning vibes)"
                className="glass border-border/20 flex-1"
              />
              <Button 
                onClick={simulateGeneration}
                disabled={isGenerating || !inputText.trim()}
                className="gradient-primary hover-glow"
              >
                {isGenerating ? (
                  <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <Sparkles className="w-4 h-4 mr-2" />
                )}
                Generate Captions
              </Button>
            </div>

            {isGenerating && (
              <div className="text-center py-8">
                <div className="inline-flex items-center gap-3 text-lg text-primary">
                  <Bot className="w-6 h-6 animate-pulse" />
                  <span>AI is analyzing your content and generating captions... {currentStep}/6</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mt-4">
                  <div 
                    className="gradient-primary h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${(currentStep / 6) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Instagram Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {instagramPosts.map((post, index) => (
            <Card 
              key={post.id} 
              className="glass border-border/20 overflow-hidden hover-scale transition-smooth"
              style={{ 
                animationDelay: `${index * 200}ms`,
                opacity: generatedCaptions[index] ? 1 : 0.7,
                transform: generatedCaptions[index] ? 'scale(1)' : 'scale(0.95)'
              }}
            >
              {/* Instagram Header */}
              <div className="flex items-center justify-between p-4 border-b border-border/20">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full"></div>
                  <div>
                    <p className="font-semibold text-sm">{post.username}</p>
                    <p className="text-xs text-muted-foreground">{post.timeAgo}</p>
                  </div>
                </div>
                <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
              </div>

              {/* Image */}
              <div className="aspect-square overflow-hidden">
                <img 
                  src={postImages[index] || post.image} 
                  alt="Instagram post" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Instagram Actions */}
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Heart className="w-6 h-6 hover:text-red-500 cursor-pointer transition-colors" />
                    <MessageCircle className="w-6 h-6 hover:text-primary cursor-pointer transition-colors" />
                    <Send className="w-6 h-6 hover:text-primary cursor-pointer transition-colors" />
                  </div>
                  <Bookmark className="w-6 h-6 hover:text-primary cursor-pointer transition-colors" />
                </div>

                <p className="text-sm font-semibold">324 likes</p>

                {/* AI Generated Caption */}
                {generatedCaptions[index] && (
                  <div className="animate-fade-in">
                    <p className="text-sm leading-relaxed">
                      <span className="font-semibold">{post.username}</span>{' '}
                      <span className="bg-primary/20 px-1 rounded text-primary font-medium">
                        {generatedCaptions[index]}
                      </span>
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className="gradient-primary text-xs">
                        <Bot className="w-3 h-3 mr-1" />
                        AI Generated
                      </Badge>
                    </div>
                  </div>
                )}

                {!generatedCaptions[index] && !isGenerating && (
                  <div className="text-center py-4 text-muted-foreground">
                    <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Caption will appear here</p>
                  </div>
                )}

                {isGenerating && currentStep === index + 1 && (
                  <div className="text-center py-4">
                    <div className="flex items-center justify-center gap-2 text-primary">
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span className="text-sm">Generating caption...</span>
                    </div>
                  </div>
                )}

                <p className="text-xs text-muted-foreground">View all 12 comments</p>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link to="/signup">
            <Button size="lg" className="gradient-primary hover-glow shadow-primary">
              Start Generating AI Captions
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AICaptionPage;