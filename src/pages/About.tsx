import Navigation from '@/components/ui/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, 
  Users, 
  Globe, 
  Award,
  ArrowRight,
  Linkedin,
  Twitter,
  Github
} from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const team = [
    {
      name: 'Alex Chen',
      role: 'CEO & Co-founder',
      bio: 'Former Instagram PM with 8 years building social media platforms',
      image: '/api/placeholder/150/150',
      linkedin: '#',
      twitter: '#'
    },
    {
      name: 'Sarah Rodriguez',
      role: 'CTO & Co-founder', 
      bio: 'AI/ML expert, previously at OpenAI and Google DeepMind',
      image: '/api/placeholder/150/150',
      linkedin: '#',
      twitter: '#'
    },
    {
      name: 'Marcus Johnson',
      role: 'Head of Product',
      bio: 'Product leader focused on creator economy and social commerce',
      image: '/api/placeholder/150/150',
      linkedin: '#',
      twitter: '#'
    }
  ];

  const values = [
    {
      icon: Users,
      title: 'Creator-First',
      description: 'Everything we build is designed to empower creators and help them succeed.'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'We push the boundaries of AI to make content creation effortless and effective.'
    },
    {
      icon: Globe,
      title: 'Accessibility',
      description: 'Premium tools should be accessible to creators of all sizes and backgrounds.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for excellence in every feature, interaction, and customer experience.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <Badge className="gradient-primary mb-6 px-4 py-2">
            <Zap className="w-4 h-4 mr-2" />
            Founded in 2023
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-hero bg-clip-text text-transparent">
              Empowering Creators
            </span>
            <br />
            <span className="text-foreground">with AI Innovation</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
            We believe every creator deserves access to powerful tools that help them focus on what they do best - creating amazing content and building meaningful connections with their audience.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="gradient-primary hover-glow shadow-primary">
                Join Our Mission
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="glass border-border/50">
                Get In Touch
              </Button>
            </Link>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                AutoGram was born from a simple observation: creators spend too much time on repetitive tasks and not enough time creating. We set out to change that by building the most intelligent, intuitive Instagram automation platform ever created.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Our AI doesn't just automate - it learns your unique voice, understands your audience, and helps you create content that truly resonates. We're not just building tools; we're building the future of content creation.
              </p>
            </div>
            
            <Card className="glass border-border/20 p-8">
              <CardContent className="space-y-8">
                <div>
                  <div className="text-4xl font-bold gradient-hero bg-clip-text text-transparent">50K+</div>
                  <div className="text-muted-foreground">Active Creators</div>
                </div>
                <div>
                  <div className="text-4xl font-bold gradient-hero bg-clip-text text-transparent">10M+</div>
                  <div className="text-muted-foreground">Posts Automated</div>
                </div>
                <div>
                  <div className="text-4xl font-bold gradient-hero bg-clip-text text-transparent">300%</div>
                  <div className="text-muted-foreground">Average Growth Rate</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Our Values</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              The principles that guide everything we do and every decision we make.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <Card key={value.title} className="glass border-border/20 p-6 text-center hover-scale transition-smooth">
                <CardContent className="space-y-4">
                  <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center mx-auto">
                    <value.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Meet Our Team</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              The passionate people behind AutoGram who are dedicated to empowering creators worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member) => (
              <Card key={member.name} className="glass border-border/20 overflow-hidden hover-lift transition-smooth">
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {member.bio}
                  </p>
                  
                  <div className="flex justify-center space-x-3">
                    <Button variant="ghost" size="sm" className="p-2">
                      <Linkedin className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="p-2">
                      <Twitter className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <Card className="glass border-border/20 p-12 text-center">
            <CardContent>
              <h2 className="text-3xl font-bold mb-4">
                Ready to Join Our Community?
              </h2>
              <p className="text-muted-foreground mb-8 text-lg">
                Be part of the creator revolution. Start automating your Instagram success today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/signup">
                  <Button size="lg" className="gradient-primary hover-glow shadow-primary">
                    Get Started Free
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg" className="glass border-border/50">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default About;