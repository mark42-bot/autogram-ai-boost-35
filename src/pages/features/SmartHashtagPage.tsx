import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Bot, 
  Hash, 
  ArrowRight,
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
  Wand2,
  RefreshCw,
  TrendingUp,
  Target
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/ui/navigation';

const SmartHashtagPage = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [inputText, setInputText] = useState('Fitness workout motivation');
  const [generatedHashtags, setGeneratedHashtags] = useState<string[][]>([]);
  const [postImages, setPostImages] = useState<string[]>([]);

  const instagramPosts = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
      username: "fitness_guru_mike",
      timeAgo: "1h",
      likes: "1,247"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&h=400&fit=crop",
      username: "strength_builder",
      timeAgo: "3h",
      likes: "892"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=400&fit=crop",
      username: "cardio_queen",
      timeAgo: "5h",
      likes: "1,534"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=400&h=400&fit=crop",
      username: "gym_life_daily",
      timeAgo: "1d",
      likes: "2,103"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1546483875-ad9014c88eba?w=400&h=400&fit=crop",
      username: "workout_warrior",
      timeAgo: "2d",
      likes: "967"
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=400&fit=crop",
      username: "fit_lifestyle",
      timeAgo: "3d",
      likes: "1,428"
    }
  ];

  const aiHashtagSets = [
    [
      "#fitness", "#workout", "#motivation", "#fitnessmotivation", "#gymlife", 
      "#strength", "#fitfam", "#health", "#training", "#exercise", 
      "#bodybuilding", "#muscle", "#gains", "#dedication", "#discipline",
      "#fitgoals", "#transformation", "#pushyourlimits", "#nevergiveup", "#beastmode"
    ],
    [
      "#strengthtraining", "#powerlifting", "#deadlift", "#squat", "#benchpress",
      "#lifting", "#ironaddiction", "#strongwoman", "#powerbuilding", "#heavyweights",
      "#strengthgoals", "#liftinglife", "#compound", "#progressive", "#strongnotskinny",
      "#girlswholift", "#strengthcoach", "#personalrecord", "#fitstrong", "#musclebuilding"
    ],
    [
      "#cardio", "#running", "#hiit", "#endurance", "#heartrate",
      "#burncalories", "#cardiovascular", "#stamina", "#sweatit", "#cardioworkout",
      "#fatburn", "#runner", "#marathontraining", "#intervaltraining", "#activelifestyle",
      "#fitnesschallenge", "#cardiogoals", "#endurantraining", "#healthylifestyle", "#getfit"
    ],
    [
      "#gymtime", "#workoutmotivation", "#fitnessjourney", "#trainhard", "#noexcuses",
      "#gymrat", "#fitnesscommunity", "#workoutbuddies", "#gymflow", "#fitnessfirst",
      "#traininsane", "#workoutmode", "#fitnesslover", "#gymaddict", "#exercisemotivation",
      "#fitnessinspiration", "#workouttime", "#gymgrind", "#fitnessgoals", "#activelife"
    ],
    [
      "#bodyweightworkout", "#calisthenics", "#homeworkout", "#functionalfitness", "#mobility",
      "#flexibility", "#bodyweight", "#noequipmentworkout", "#athomefitness", "#movementqualitycommunitygetting",
      "#functional", "#core", "#balance", "#stability", "#naturalmovement",
      "#bodyweighttraining", "#minimalistfitness", "#movementpractice", "#skillbuilding", "#adaptation"
    ],
    [
      "#healthylifestyle", "#wellness", "#selfcare", "#mindandbody", "#holistichealth",
      "#nutrition", "#recovery", "#sleep", "#stressmanagement", "#mentalhealth",
      "#worklifebalance", "#healthyhabits", "#preventivehealth", "#longevity", "#vitality",
      "#wellbeing", "#healthymindset", "#lifestyle", "#balance", "#sustainablehealth"
    ]
  ];

  const simulateGeneration = async () => {
    setIsGenerating(true);
    setCurrentStep(0);
    setGeneratedHashtags([]);

    try {
      // Import Gemini service dynamically
      const { geminiService } = await import('@/services/gemini.service');
      const hashtagSets = await geminiService.generateHashtags(inputText, 6);
      
      // Display hashtag sets one by one for visual effect
      for (let i = 0; i < hashtagSets.length; i++) {
        setCurrentStep(i + 1);
        await new Promise(resolve => setTimeout(resolve, 1800));
        setGeneratedHashtags(prev => [...prev, hashtagSets[i]]);
      }
    } catch (error) {
      console.error('Failed to generate hashtags:', error);
      // Fallback to original mock data if API fails
      for (let i = 0; i < aiHashtagSets.length; i++) {
        setCurrentStep(i + 1);
        await new Promise(resolve => setTimeout(resolve, 1800));
        setGeneratedHashtags(prev => [...prev, aiHashtagSets[i]]);
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
            <Hash className="w-4 h-4 mr-2" />
            Smart Hashtag Research
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-hero bg-clip-text text-transparent">
              Smart Hashtag
            </span>
            <br />
            <span className="text-foreground">Research & Analysis</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Discover trending and niche hashtags optimized for your content and audience. Boost your reach with AI-powered hashtag strategies.
          </p>
        </div>

        {/* Generation Interface */}
        <Card className="glass border-border/20 mb-12">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Wand2 className="w-6 h-6 text-primary animate-float" />
              <h2 className="text-2xl font-semibold">Generate Smart Hashtags</h2>
            </div>
            
            <div className="flex gap-4 mb-6">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter your content topic (e.g., Fitness workout motivation)"
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
                  <Hash className="w-4 h-4 mr-2" />
                )}
                Research Hashtags
              </Button>
            </div>

            {isGenerating && (
              <div className="text-center py-8">
                <div className="inline-flex items-center gap-3 text-lg text-primary">
                  <Bot className="w-6 h-6 animate-pulse" />
                  <span>AI is analyzing trending hashtags and optimizing for your niche... {currentStep}/6</span>
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
                opacity: generatedHashtags[index] ? 1 : 0.7,
                transform: generatedHashtags[index] ? 'scale(1)' : 'scale(0.95)'
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

                <p className="text-sm font-semibold">{post.likes} likes</p>

                {/* Basic Caption */}
                <p className="text-sm">
                  <span className="font-semibold">{post.username}</span>{' '}
                  Pushing limits and breaking barriers! 💪 Today's session was intense but so worth it.
                </p>

                {/* AI Generated Hashtags */}
                {generatedHashtags[index] && (
                  <div className="animate-fade-in">
                    <div className="bg-primary/10 rounded-lg p-3 border border-primary/20">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge className="gradient-primary text-xs">
                          <Bot className="w-3 h-3 mr-1" />
                          AI Optimized
                        </Badge>
                        <Badge variant="outline" className="text-xs border-green-500 text-green-600">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          High Reach
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {generatedHashtags[index].slice(0, 15).map((hashtag, hashIndex) => (
                          <span 
                            key={hashIndex}
                            className="inline-block bg-primary/20 text-primary px-2 py-1 rounded text-xs font-medium hover:bg-primary/30 cursor-pointer transition-colors"
                            style={{ animationDelay: `${hashIndex * 100}ms` }}
                          >
                            {hashtag}
                          </span>
                        ))}
                        <button className="text-xs text-primary hover:underline">
                          +{generatedHashtags[index].length - 15} more
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {!generatedHashtags[index] && !isGenerating && (
                  <div className="text-center py-4 text-muted-foreground border-2 border-dashed border-border/50 rounded-lg">
                    <Hash className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Smart hashtags will appear here</p>
                  </div>
                )}

                {isGenerating && currentStep === index + 1 && (
                  <div className="text-center py-4">
                    <div className="flex items-center justify-center gap-2 text-primary">
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span className="text-sm">Analyzing trending hashtags...</span>
                    </div>
                  </div>
                )}

                <p className="text-xs text-muted-foreground">View all 28 comments</p>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link to="/signup">
            <Button size="lg" className="gradient-primary hover-glow shadow-primary">
              Start Smart Hashtag Research
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SmartHashtagPage;