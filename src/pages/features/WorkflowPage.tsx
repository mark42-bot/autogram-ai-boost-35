import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Workflow, 
  Users, 
  CheckCircle, 
  Shield,
  ArrowRight,
  GitBranch,
  Eye
} from 'lucide-react';
import { Link } from 'react-router-dom';

const WorkflowPage = () => {
  const features = [
    {
      icon: GitBranch,
      title: 'Approval Workflows',
      description: 'Set up custom approval processes to ensure all content meets your brand standards.'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Work seamlessly with your team members, assign roles, and manage permissions.'
    },
    {
      icon: Eye,
      title: 'Content Review',
      description: 'Preview, review, and approve content before it goes live to maintain quality control.'
    }
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <Badge className="gradient-primary mb-6 px-4 py-2">
          <Workflow className="w-4 h-4 mr-2" />
          Team Collaboration
        </Badge>
        
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          <span className="gradient-hero bg-clip-text text-transparent">
            Content
          </span>
          <br />
          <span className="text-foreground">Workflow</span>
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Streamline your content creation process with built-in approval workflows, team collaboration, and quality control features.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {features.map((feature) => (
          <Card key={feature.title} className="glass border-border/20 hover-scale transition-smooth">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center">
        <Link to="/signup">
          <Button size="lg" className="gradient-primary hover-glow shadow-primary">
            Set Up Your Workflow
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default WorkflowPage;