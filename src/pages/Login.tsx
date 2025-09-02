import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/ui/navigation';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  Zap,
  ArrowRight,
  Chrome,
  Github,
  Apple
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt:', { email, password });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center">
                <Zap className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold mb-2">
              Welcome Back
            </h1>
            <p className="text-muted-foreground">
              Sign in to your AutoGram account
            </p>
          </div>

          <Card className="glass border-border/20">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-center">Sign In</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Social Login Buttons */}
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

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 glass border-border/50"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link 
                      to="/forgot-password" 
                      className="text-sm text-primary hover:text-primary/80 transition-smooth"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                </div>

                <Button 
                  type="submit" 
                  className="w-full gradient-primary hover-glow transition-smooth shadow-primary"
                >
                  Sign In
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </form>

              {/* Sign Up Link */}
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{' '}
                  <Link 
                    to="/signup" 
                    className="text-primary hover:text-primary/80 font-medium transition-smooth"
                  >
                    Sign up for free
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Trust Indicators */}
          <div className="text-center space-y-4">
            <div className="flex justify-center space-x-4">
              <Badge variant="outline" className="glass border-border/50">
                <Lock className="w-3 h-3 mr-1" />
                SSL Secured
              </Badge>
              <Badge variant="outline" className="glass border-border/50">
                SOC 2 Compliant
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Your data is protected with enterprise-grade security
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;