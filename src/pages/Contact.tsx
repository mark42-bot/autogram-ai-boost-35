import Navigation from '@/components/ui/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  MessageCircle, 
  Phone, 
  MapPin,
  Clock,
  ArrowRight,
  Zap,
  Users,
  Building
} from 'lucide-react';

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  const contactMethods = [
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      action: 'Start Chat',
      available: true
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send us a detailed message',
      action: 'support@autogram.ai',
      available: true
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Talk to our team directly',
      action: 'Schedule Call',
      available: false,
      note: 'Available for Enterprise customers'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        {/* Header */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <Badge className="gradient-primary mb-6 px-4 py-2">
            <Users className="w-4 h-4 mr-2" />
            We're here to help
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-foreground">Get in</span>{' '}
            <span className="gradient-hero bg-clip-text text-transparent">
              Touch
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Have questions about AutoGram? Need help getting started? Our team is ready to assist you.
          </p>
        </section>

        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Contact Methods */}
            <div className="lg:col-span-1 space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Contact Options</h2>
                <p className="text-muted-foreground mb-6">
                  Choose the best way to reach us based on your needs.
                </p>
              </div>

              {contactMethods.map((method) => (
                <Card key={method.title} className="glass border-border/20 hover-scale transition-smooth">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                        <method.icon className="w-6 h-6 text-white" />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{method.title}</h3>
                        <p className="text-muted-foreground text-sm mb-3">
                          {method.description}
                        </p>
                        
                        {method.available ? (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="glass border-border/50 hover:bg-muted/50"
                          >
                            {method.action}
                          </Button>
                        ) : (
                          <div>
                            <Badge variant="secondary" className="mb-2">
                              Coming Soon
                            </Badge>
                            <p className="text-xs text-muted-foreground">
                              {method.note}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Office Info */}
              <Card className="glass border-border/20">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4 flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    Our Office
                  </h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>123 Innovation Drive</p>
                    <p>San Francisco, CA 94107</p>
                    <p>United States</p>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-border/20">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>Mon-Fri: 9AM-6PM PST</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="glass border-border/20">
                <CardHeader>
                  <CardTitle className="text-2xl">Send us a Message</CardTitle>
                  <p className="text-muted-foreground">
                    We'll get back to you within 24 hours.
                  </p>
                </CardHeader>
                
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          placeholder="Your first name"
                          className="glass border-border/50"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          placeholder="Your last name"
                          className="glass border-border/50"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        className="glass border-border/50"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        placeholder="Your company name"
                        className="glass border-border/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        placeholder="How can we help you?"
                        className="glass border-border/50"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us more about your question or request..."
                        className="glass border-border/50 min-h-[120px]"
                        required
                      />
                    </div>

                    <Button 
                      type="submit" 
                      size="lg"
                      className="w-full gradient-primary hover-glow shadow-primary"
                    >
                      Send Message
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <section className="py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Quick Answers</h2>
              <p className="text-muted-foreground">
                Common questions we get about AutoGram.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">How quickly can I get started?</h3>
                  <p className="text-muted-foreground text-sm">
                    You can sign up and start using AutoGram in under 5 minutes. Our onboarding process is designed to get you creating content immediately.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Do you offer custom plans?</h3>
                  <p className="text-muted-foreground text-sm">
                    Yes! For agencies and large organizations, we offer custom Enterprise plans with additional features and dedicated support.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Is my data secure?</h3>
                  <p className="text-muted-foreground text-sm">
                    Absolutely. We use enterprise-grade security, SOC 2 compliance, and never store your Instagram credentials permanently.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Can I cancel anytime?</h3>
                  <p className="text-muted-foreground text-sm">
                    Yes, you can cancel your subscription at any time from your account settings. No long-term contracts or cancellation fees.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Contact;