import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import Navigation from '@/components/ui/navigation';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User,
  Zap,
  ArrowRight,
  Chrome,
  Github,
  Apple,
  CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    agreeToTerms: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup logic here
    console.log('Signup attempt:', formData);
  };

  const benefits = [
    'AI-powered content generation',
    'Smart scheduling & optimization', 
    'Advanced analytics & insights',
    '14-day free trial, no credit card required'
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Benefits */}
          <div className="hidden lg:block space-y-8">
            <div>
              <h2 className="text-4xl font-bold mb-4">
                <span className="gradient-hero bg-clip-text text-transparent">
                  Join 50,000+
                </span>
                <br />
                <span className="text-foreground">
                  Successful Creators
                </span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Start growing your Instagram presence with AI-powered automation
              </p>
            </div>

            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-muted-foreground">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="glass rounded-lg p-6 border border-border/20">
              <blockquote className="text-lg italic mb-4">
                "AutoGram helped me grow my following by 300% in just 3 months. The AI content suggestions are incredible!"
              </blockquote>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">SC</span>
                </div>
                <div>
                  <div className="font-semibold">Sarah Chen</div>
                  <div className="text-sm text-muted-foreground">@sarahstyles • 125K followers</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Sign Up Form */}
          <div className="max-w-md w-full mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center">
                  <Zap className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <h1 className="text-3xl font-bold mb-2">
                Get Started Free
              </h1>
              <p className="text-muted-foreground">
                Create your AutoGram account in seconds
              </p>
            </div>

            <Card className="glass border-border/20">
              <CardHeader className="space-y-1 pb-6">
                <CardTitle className="text-center">Create Account</CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Social Signup Buttons */}
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full glass border-border/50 hover:bg-muted/50"
                  >
                    <Chrome className="w-5 h-5 mr-2" />
                    Continue with Google
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      variant="outline" 
                      className="glass border-border/50 hover:bg-muted/50"
                    >
                      <Github className="w-5 h-5 mr-2" />
                      GitHub
                    </Button>
                    <Button 
                      variant="outline" 
                      className="glass border-border/50 hover:bg-muted/50"
                    >
                      <Apple className="w-5 h-5 mr-2" />
                      Apple
                    </Button>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                      Or continue with email
                    </span>
                  </div>
                </div>

                {/* Signup Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="firstName"
                          type="text"
                          placeholder="First name"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          className="pl-10 glass border-border/50"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Last name"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="glass border-border/50"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="pl-10 glass border-border/50"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className="pl-10 pr-10 glass border-border/50"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Must be at least 8 characters long
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked)}
                    />
                    <label htmlFor="terms" className="text-sm text-muted-foreground">
                      I agree to the{' '}
                      <Link to="/terms" className="text-primary hover:text-primary/80">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy" className="text-primary hover:text-primary/80">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full gradient-primary hover-glow transition-smooth shadow-primary"
                    disabled={!formData.agreeToTerms}
                  >
                    Create Account
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </form>

                {/* Login Link */}
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <Link 
                      to="/login" 
                      className="text-primary hover:text-primary/80 font-medium transition-smooth"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Signup;