import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/ui/navigation';
import { 
  Check, 
  Star, 
  Zap, 
  Crown, 
  Building, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: 'Basic',
      icon: Zap,
      description: 'Perfect for individual creators getting started',
      monthlyPrice: 29,
      yearlyPrice: 290,
      popular: false,
      features: [
        'AI Content Generation (50 posts/month)',
        'Basic Analytics & Insights',
        'Post Scheduling (1 account)',
        'Hashtag Suggestions',
        'Email Support',
        'Basic Templates'
      ],
      limitations: [
        '1 Instagram account',
        'Standard support',
        'Basic AI features'
      ],
      cta: 'Start Free Trial',
      href: '/signup?plan=basic'
    },
    {
      name: 'Premium',
      icon: Star,
      description: 'For serious creators and small businesses',
      monthlyPrice: 79,
      yearlyPrice: 790,
      popular: true,
      features: [
        'Unlimited AI Content Generation',
        'Advanced Analytics & Reports',
        'Multi-Account Management (3 accounts)',
        'Smart Scheduling with AI optimization',
        'Advanced Hashtag Research',
        'Team Collaboration',
        'Priority Support',
        'Custom Brand Voice Training',
        'Content Approval Workflow',
        'Competitor Analysis'
      ],
      limitations: [],
      cta: 'Start Free Trial',
      href: '/signup?plan=premium'
    },
    {
      name: 'Enterprise',
      icon: Building,
      description: 'For agencies and large organizations',
      monthlyPrice: 199,
      yearlyPrice: 1990,
      popular: false,
      features: [
        'Everything in Premium',
        'Unlimited Instagram Accounts',
        'White-label Solution',
        'Advanced Team Management',
        'Custom Integrations',
        'Dedicated Account Manager',
        'Custom AI Model Training',
        'Advanced Security & Compliance',
        'API Access',
        '24/7 Phone Support',
        'Custom Reporting',
        'Onboarding & Training'
      ],
      limitations: [],
      cta: 'Contact Sales',
      href: '/contact?plan=enterprise'
    }
  ];

  const faqs = [
    {
      question: 'Can I switch plans anytime?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.'
    },
    {
      question: 'Is there a free trial?',
      answer: 'Yes! We offer a 14-day free trial for all plans. No credit card required to start.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and bank transfers for annual plans.'
    },
    {
      question: 'Can I cancel anytime?',
      answer: 'Absolutely. You can cancel your subscription at any time from your account settings. No cancellation fees.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        {/* Header */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <Badge className="gradient-primary mb-6 px-4 py-2">
            <Sparkles className="w-4 h-4 mr-2" />
            14-day free trial • No credit card required
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-hero bg-clip-text text-transparent">
              Simple Pricing
            </span>
            <br />
            <span className="text-foreground">for Every Creator</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            Choose the perfect plan for your Instagram growth journey. All plans include our core AI features and 24/7 support.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-16">
            <span className={cn("text-sm", !isYearly ? "text-foreground font-medium" : "text-muted-foreground")}>
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={cn(
                "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out",
                isYearly ? "bg-primary" : "bg-muted"
              )}
            >
              <span
                className={cn(
                  "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                  isYearly ? "translate-x-5" : "translate-x-0"
                )}
              />
            </button>
            <span className={cn("text-sm", isYearly ? "text-foreground font-medium" : "text-muted-foreground")}>
              Yearly
            </span>
            {isYearly && (
              <Badge variant="secondary" className="ml-2">
                Save 17%
              </Badge>
            )}
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <Card 
                key={plan.name}
                className={cn(
                  "relative glass border-border/20 hover-lift transition-smooth",
                  plan.popular && "border-primary/50 shadow-primary"
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="gradient-primary px-4 py-1">
                      <Crown className="w-4 h-4 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-6">
                  <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <plan.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                  <p className="text-muted-foreground text-sm mb-4">
                    {plan.description}
                  </p>
                  
                  <div className="space-y-1">
                    <div className="flex items-baseline justify-center space-x-2">
                      <span className="text-4xl font-bold">
                        ${isYearly ? Math.floor(plan.yearlyPrice / 12) : plan.monthlyPrice}
                      </span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                    {isYearly && (
                      <div className="text-sm text-muted-foreground">
                        Billed yearly (${plan.yearlyPrice})
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <Link to={plan.href}>
                    <Button 
                      className={cn(
                        "w-full transition-smooth",
                        plan.popular 
                          ? "gradient-primary hover-glow shadow-primary" 
                          : "glass border-border/50 hover:bg-muted/50"
                      )}
                    >
                      {plan.cta}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">What's included:</h4>
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">
              Everything you need to know about our pricing and plans.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <div key={index} className="space-y-3">
                <h3 className="font-semibold">{faq.question}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="glass rounded-2xl p-12 text-center border border-border/20">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Growing?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of creators already using AutoGram to automate their Instagram success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="gradient-primary hover-glow shadow-primary">
                  Start Your Free Trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/demo">
                <Button variant="outline" size="lg" className="glass border-border/50">
                  Schedule Demo
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Pricing;