import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Bot, 
  Lightbulb, 
  ArrowRight,
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
  Wand2,
  RefreshCw,
  Sparkles,
  Play,
  Camera,
  Image as ImageIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/ui/navigation';

const ContentIdeasPage = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [inputText, setInputText] = useState('Travel photography lifestyle');
  const [generatedIdeas, setGeneratedIdeas] = useState<string[]>([]);

  const instagramPosts = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop",
      username: "wanderlust_photos",
      timeAgo: "2h",
      likes: "2,847",
      type: "photo"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
      username: "mountain_explorer",
      timeAgo: "4h",
      likes: "1,923",
      type: "video"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=400&fit=crop",
      username: "beach_vibes_daily",
      timeAgo: "6h",
      likes: "3,456",
      type: "photo"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&h=400&fit=crop",
      username: "sunset_chaser",
      timeAgo: "1d",
      likes: "4,192",
      type: "carousel"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h-400&fit=crop",
      username: "city_adventures",
      timeAgo: "2d",
      likes: "2,378",
      type: "photo"
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop",
      username: "nature_storyteller",
      timeAgo: "3d",
      likes: "5,621",
      type: "video"
    }
  ];

  const aiContentIdeas = [
    "Behind-the-scenes: Show your camera gear setup and photography process in different environments",
    "Create a time-lapse video of sunrise from your hotel balcony with city skyline transformation",
    "Share a carousel post comparing the same location in different seasons with photography tips",
    "Document your morning routine while traveling: coffee spots, local breakfast, and getting ready",
    "Create a 'Photography vs Reality' series showing the effort behind your perfect travel shots",
    "Share your top 5 photo editing apps with before/after examples from your recent travels"
  ];

  const contentTypes = [
    { icon: ImageIcon, label: "Photo Post", color: "text-blue-500" },
    { icon: Play, label: "Video Content", color: "text-red-500" },
    { icon: Camera, label: "Photo Carousel", color: "text-green-500" }
  ];

  const simulateGeneration = async () => {
    setIsGenerating(true);
    setCurrentStep(0);
    setGeneratedIdeas([]);

    try {
      // Import Gemini service dynamically
      const { geminiService } = await import('@/services/gemini.service');
      const contentIdeas = await geminiService.generateContentIdeas(inputText, 6);
      
      // Display ideas one by one for visual effect
      for (let i = 0; i < contentIdeas.length; i++) {
        setCurrentStep(i + 1);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setGeneratedIdeas(prev => [...prev, contentIdeas[i]]);
      }
    } catch (error) {
      console.error('Failed to generate content ideas:', error);
      // Fallback to original mock data if API fails
      for (let i = 0; i < aiContentIdeas.length; i++) {
        setCurrentStep(i + 1);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setGeneratedIdeas(prev => [...prev, aiContentIdeas[i]]);
      }
    }
    
    setIsGenerating(false);
  };

  const getContentTypeIcon = (type: string) => {
    switch(type) {
      case 'video': return Play;
      case 'carousel': return Camera;
      default: return ImageIcon;
    }
  };

  const getContentTypeColor = (type: string) => {
    switch(type) {
      case 'video': return 'text-red-500';
      case 'carousel': return 'text-green-500';
      default: return 'text-blue-500';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="gradient-primary mb-6 px-4 py-2">
            <Lightbulb className="w-4 h-4 mr-2" />
            AI Content Ideas
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-hero bg-clip-text text-transparent">
              Never Run Out
            </span>
            <br />
            <span className="text-foreground">of Content Ideas</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            AI-powered content suggestions tailored to your niche. Get creative ideas that engage your audience and boost your content strategy.
          </p>
        </div>

        {/* Generation Interface */}
        <Card className="glass border-border/20 mb-12">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Wand2 className="w-6 h-6 text-primary animate-float" />
              <h2 className="text-2xl font-semibold">Generate Content Ideas</h2>
            </div>
            
            <div className="flex gap-4 mb-6">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter your niche/interest (e.g., Travel photography lifestyle)"
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
                Generate Ideas
              </Button>
            </div>

            {/* Content Type Options */}
            <div className="flex gap-4 mb-6">
              {contentTypes.map((type, index) => (
                <Badge key={index} variant="outline" className="flex items-center gap-2 px-3 py-2">
                  <type.icon className={`w-4 h-4 ${type.color}`} />
                  {type.label}
                </Badge>
              ))}
            </div>

            {isGenerating && (
              <div className="text-center py-8">
                <div className="inline-flex items-center gap-3 text-lg text-primary">
                  <Bot className="w-6 h-6 animate-pulse" />
                  <span>AI is brainstorming creative content ideas for your niche... {currentStep}/6</span>
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
                opacity: generatedIdeas[index] ? 1 : 0.7,
                transform: generatedIdeas[index] ? 'scale(1)' : 'scale(0.95)'
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
                <div className="flex items-center gap-2">
                  {React.createElement(getContentTypeIcon(post.type), { 
                    className: `w-4 h-4 ${getContentTypeColor(post.type)}` 
                  })}
                  <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
                </div>
              </div>

              {/* Image */}
              <div className="aspect-square overflow-hidden relative">
                <img 
                  src={post.image} 
                  alt="Instagram post" 
                  className="w-full h-full object-cover"
                />
                {post.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center">
                      <Play className="w-6 h-6 text-white ml-1" />
                    </div>
                  </div>
                )}
                {post.type === 'carousel' && (
                  <div className="absolute top-4 right-4">
                    <Camera className="w-5 h-5 text-white drop-shadow-lg" />
                  </div>
                )}
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

                <p className="text-sm font-semibold">{post.likes} likes</p>

                {/* Basic Caption */}
                <p className="text-sm">
                  <span className="font-semibold">{post.username}</span>{' '}
                  Exploring new perspectives and capturing moments that tell a story ✨📸
                </p>

                {/* AI Generated Content Idea */}
                {generatedIdeas[index] && (
                  <div className="animate-fade-in">
                    <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge className="gradient-primary text-xs">
                          <Bot className="w-3 h-3 mr-1" />
                          AI Content Idea
                        </Badge>
                        <Badge variant="outline" className="text-xs border-purple-500 text-purple-600">
                          <Lightbulb className="w-3 h-3 mr-1" />
                          Creative
                        </Badge>
                      </div>
                      <p className="text-sm text-foreground/90 leading-relaxed font-medium">
                        💡 {generatedIdeas[index]}
                      </p>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline" className="text-xs">
                          Use This Idea
                        </Button>
                        <Button size="sm" variant="ghost" className="text-xs">
                          Save for Later
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {!generatedIdeas[index] && !isGenerating && (
                  <div className="text-center py-4 text-muted-foreground border-2 border-dashed border-border/50 rounded-lg">
                    <Lightbulb className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Content idea will appear here</p>
                  </div>
                )}

                {isGenerating && currentStep === index + 1 && (
                  <div className="text-center py-4">
                    <div className="flex items-center justify-center gap-2 text-primary">
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span className="text-sm">Generating creative ideas...</span>
                    </div>
                  </div>
                )}

                <p className="text-xs text-muted-foreground">View all 156 comments</p>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link to="/signup">
            <Button size="lg" className="gradient-primary hover-glow shadow-primary">
              Get Unlimited Content Ideas
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContentIdeasPage;