import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star, Quote, ChevronLeft, ChevronRight, Instagram, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Fashion Influencer',
      handle: '@sarahstyles',
      followers: '125K',
      avatar: '/api/placeholder/60/60',
      content: 'AutoGram completely transformed my Instagram strategy. The AI content suggestions are spot-on, and I\'ve grown my following by 300% in just 3 months!',
      rating: 5,
      metric: '+300% Growth',
      verified: true
    },
    {
      name: 'Marcus Johnson',
      role: 'Fitness Coach',
      handle: '@fitnesswithmarcus',
      followers: '89K',
      avatar: '/api/placeholder/60/60',
      content: 'The scheduling feature is a game-changer. I can plan my entire month of content in just 2 hours. My engagement rates have never been higher.',
      rating: 5,
      metric: '+150% Engagement',
      verified: true
    },
    {
      name: 'Elena Rodriguez',
      role: 'Food Blogger',
      handle: '@elenaeats',
      followers: '67K',
      avatar: '/api/placeholder/60/60',
      content: 'The analytics insights helped me understand my audience better. I now know exactly when to post and what content resonates most.',
      rating: 5,
      metric: '+200% Reach',
      verified: true
    },
    {
      name: 'David Park',
      role: 'Travel Photographer',
      handle: '@davidcaptures',
      followers: '234K',
      avatar: '/api/placeholder/60/60',
      content: 'AutoGram\'s AI captions perfectly match my brand voice. It feels like having a personal content manager who knows my style inside out.',
      rating: 5,
      metric: '+400% Saves',
      verified: true
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-16">
        <Badge className="gradient-primary mb-4 px-4 py-2">
          <Star className="w-4 h-4 mr-2" />
          Loved by 50,000+ Creators
        </Badge>
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          <span className="text-foreground">What Our</span>{' '}
          <span className="gradient-hero bg-clip-text text-transparent">
            Users Say
          </span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Join thousands of successful creators who have transformed their Instagram presence with AutoGram.
        </p>
      </div>

      {/* Main Testimonial Carousel */}
      <div className="relative mb-16">
        <Card className="glass border-border/20 max-w-4xl mx-auto">
          <CardContent className="p-12">
            <div className="flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-12">
              {/* Quote Icon */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center">
                  <Quote className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 text-center lg:text-left">
                <blockquote className="text-2xl md:text-3xl font-medium leading-relaxed mb-8">
                  "{testimonials[currentIndex].content}"
                </blockquote>

                <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={testimonials[currentIndex].avatar} />
                      <AvatarFallback className="gradient-primary text-white">
                        {testimonials[currentIndex].name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold text-lg">
                          {testimonials[currentIndex].name}
                        </h4>
                        {testimonials[currentIndex].verified && (
                          <Instagram className="w-5 h-5 text-primary" />
                        )}
                      </div>
                      <p className="text-muted-foreground">
                        {testimonials[currentIndex].role}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {testimonials[currentIndex].handle} • {testimonials[currentIndex].followers} followers
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <Badge className="gradient-card border border-primary/20">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      {testimonials[currentIndex].metric}
                    </Badge>
                    <div className="flex space-x-1">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <Button
          variant="outline"
          size="icon"
          onClick={prevTestimonial}
          className="absolute left-4 top-1/2 -translate-y-1/2 glass border-border/50 hover:bg-muted/50"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={nextTestimonial}
          className="absolute right-4 top-1/2 -translate-y-1/2 glass border-border/50 hover:bg-muted/50"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>

        {/* Dots Indicator */}
        <div className="flex justify-center space-x-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "w-3 h-3 rounded-full transition-smooth",
                index === currentIndex 
                  ? "bg-primary" 
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              )}
            />
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="glass rounded-lg p-8 text-center border border-border/20 hover-scale transition-smooth">
          <div className="text-4xl font-bold gradient-hero bg-clip-text text-transparent mb-2">
            4.9/5
          </div>
          <div className="text-muted-foreground">Average Rating</div>
          <div className="flex justify-center space-x-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
        </div>

        <div className="glass rounded-lg p-8 text-center border border-border/20 hover-scale transition-smooth">
          <div className="text-4xl font-bold gradient-hero bg-clip-text text-transparent mb-2">
            10M+
          </div>
          <div className="text-muted-foreground">Posts Automated</div>
        </div>

        <div className="glass rounded-lg p-8 text-center border border-border/20 hover-scale transition-smooth">
          <div className="text-4xl font-bold gradient-hero bg-clip-text text-transparent mb-2">
            50K+
          </div>
          <div className="text-muted-foreground">Happy Users</div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;