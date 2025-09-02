import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft, Search, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <Card className="glass border-border/20 max-w-md w-full">
        <CardContent className="p-12 text-center">
          {/* Logo */}
          <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-8">
            <Zap className="w-8 h-8 text-white" />
          </div>
          
          {/* 404 Display */}
          <div className="mb-6">
            <h1 className="text-8xl font-bold gradient-hero bg-clip-text text-transparent mb-4">
              404
            </h1>
            <h2 className="text-2xl font-bold mb-2">Page Not Found</h2>
            <p className="text-muted-foreground">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Link to="/">
              <Button className="w-full gradient-primary hover-glow shadow-primary">
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            
            <Link to="/contact">
              <Button variant="outline" className="w-full glass border-border/50 hover:bg-muted/50">
                <Search className="w-4 h-4 mr-2" />
                Contact Support
              </Button>
            </Link>
          </div>
          
          {/* Additional Help */}
          <div className="mt-8 pt-6 border-t border-border/20">
            <p className="text-sm text-muted-foreground mb-4">
              Looking for something specific?
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-xs">
              <Link to="/features/ai-content" className="text-primary hover:text-primary/80">
                AI Content
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link to="/pricing" className="text-primary hover:text-primary/80">
                Pricing
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link to="/about" className="text-primary hover:text-primary/80">
                About
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link to="/contact" className="text-primary hover:text-primary/80">
                Contact
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
