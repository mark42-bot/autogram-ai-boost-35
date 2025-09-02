import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  X, 
  Zap, 
  ChevronDown,
  BarChart3,
  Calendar,
  Workflow,
  Bot
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navigationItems = [
    { 
      name: 'Features', 
      href: '#',
      hasDropdown: true,
      dropdownItems: [
        { name: 'AI Content Generation', href: '/features/ai-content', icon: Bot },
        { name: 'Performance Analytics', href: '/features/analytics', icon: BarChart3 },
        { name: 'Auto-Scheduling', href: '/features/scheduling', icon: Calendar },
        { name: 'Content Workflow', href: '/features/workflow', icon: Workflow }
      ]
    },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Tutorials', href: '/tutorials' },
    { name: 'Community', href: '/community' },
    { name: 'About', href: '/about' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-primary bg-clip-text text-transparent">
              AutoGram
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <div key={item.name} className="relative">
                {item.hasDropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setIsProductsOpen(true)}
                    onMouseLeave={() => setIsProductsOpen(false)}
                  >
                    <button className="flex items-center space-x-1 text-foreground/80 hover:text-foreground transition-smooth">
                      <span>{item.name}</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    
                    {isProductsOpen && (
                      <div className="absolute top-full left-0 mt-2 w-64 glass rounded-lg shadow-card p-2 border border-border/20">
                        {item.dropdownItems?.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.href}
                            className="flex items-center space-x-3 px-3 py-2 text-sm rounded-md hover:bg-muted/50 transition-smooth"
                          >
                            <subItem.icon className="w-4 h-4 text-primary" />
                            <span>{subItem.name}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    className={cn(
                      "text-foreground/80 hover:text-foreground transition-smooth",
                      isActive(item.href) && "text-primary font-medium"
                    )}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="sm" className="gradient-primary hover-glow transition-smooth">
                Get Started Free
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-muted/50 transition-smooth"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border/20 mt-2 pt-4 pb-6">
            <div className="flex flex-col space-y-4">
              {navigationItems.map((item) => (
                <div key={item.name}>
                  {item.hasDropdown ? (
                    <div>
                      <button className="flex items-center justify-between w-full text-left py-2 text-foreground/80">
                        <span>{item.name}</span>
                        <ChevronDown className="w-4 h-4" />
                      </button>
                      <div className="ml-4 mt-2 space-y-2">
                        {item.dropdownItems?.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.href}
                            className="flex items-center space-x-3 py-2 text-sm text-foreground/70 hover:text-foreground"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <subItem.icon className="w-4 h-4 text-primary" />
                            <span>{subItem.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      className="block py-2 text-foreground/80 hover:text-foreground"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              
              <div className="border-t border-border/20 pt-4 space-y-2">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    Login
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full gradient-primary hover-glow">
                    Get Started Free
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;