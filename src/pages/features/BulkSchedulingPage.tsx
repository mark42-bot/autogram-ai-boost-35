import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft,
  BarChart, 
  Upload, 
  Calendar, 
  Clock,
  CheckCircle,
  AlertCircle,
  Play,
  Pause,
  RotateCcw,
  Zap,
  Settings,
  Target,
  Sparkles,
  FileText,
  Image as ImageIcon
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BulkSchedulingPage = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processingStep, setProcessingStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  // Sample bulk upload posts
  const bulkPosts = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=400&fit=crop',
      caption: 'Start your week with motivation and coffee ☕ #mondaymotivation #productivity',
      scheduledDate: 'Mon, Dec 4, 2023',
      scheduledTime: '7:00 AM',
      status: 'processed',
      aiScore: 92
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop',
      caption: 'Team collaboration drives innovation 🚀 #teamwork #innovation #success',
      scheduledDate: 'Tue, Dec 5, 2023',
      scheduledTime: '2:00 PM',
      status: 'processing',
      aiScore: 88
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop',
      caption: 'Behind the scenes of creative processes ✨ #creativity #behindthescenes',
      scheduledDate: 'Wed, Dec 6, 2023',
      scheduledTime: '4:30 PM',
      status: 'pending',
      aiScore: 85
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=400&fit=crop',
      caption: 'Workspace vibes for maximum productivity 💼 #workspace #productivity',
      scheduledDate: 'Thu, Dec 7, 2023',
      scheduledTime: '9:00 AM',
      status: 'processed',
      aiScore: 90
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=400&h=400&fit=crop',
      caption: 'End the week on a high note 🎯 #fridayfeeling #achievement',
      scheduledDate: 'Fri, Dec 8, 2023',
      scheduledTime: '5:00 PM',
      status: 'pending',
      aiScore: 87
    }
  ];

  const processingSteps = [
    'Uploading content...',
    'Analyzing images with AI...',
    'Generating optimized captions...',
    'Calculating optimal timing...',
    'Finalizing schedule...'
  ];

  useEffect(() => {
    if (isProcessing) {
      const timer = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            setProcessingStep((stepPrev) => {
              if (stepPrev >= processingSteps.length - 1) {
                setIsProcessing(false);
                return stepPrev;
              }
              return stepPrev + 1;
            });
            return 100;
          }
          return prev + 5;
        });
      }, 200);

      return () => clearInterval(timer);
    }
  }, [isProcessing, processingSteps.length]);

  const startBulkUpload = () => {
    setIsProcessing(true);
    setUploadProgress(0);
    setProcessingStep(0);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processed':
        return 'text-green-500';
      case 'processing':
        return 'text-blue-500';
      case 'pending':
        return 'text-yellow-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processed':
        return <CheckCircle className="w-4 h-4" />;
      case 'processing':
        return <Zap className="w-4 h-4 animate-pulse" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Navigation */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/features/scheduling')}
          className="mb-8 hover:bg-muted"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Scheduling
        </Button>

        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="gradient-primary mb-6 px-4 py-2">
            <BarChart className="w-4 h-4 mr-2" />
            Bulk Scheduling
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-hero bg-clip-text text-transparent">
              Schedule
            </span>
            <br />
            <span className="text-foreground">Weeks in Minutes</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Upload multiple posts at once and let AI optimize timing, captions, and hashtags for maximum engagement.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Bulk Upload Interface */}
          <Card className="glass border-border/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-primary" />
                Bulk Content Upload
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Upload Zone */}
              <div className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center transition-colors hover:border-primary/50">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <ImageIcon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Drop your content here</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Upload up to 50 images or videos at once
                </p>
                <Button 
                  onClick={startBulkUpload}
                  disabled={isProcessing}
                  className="gradient-primary"
                >
                  {isProcessing ? (
                    <>
                      <Zap className="w-4 h-4 mr-2 animate-pulse" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Select Files
                    </>
                  )}
                </Button>
              </div>

              {/* Processing Status */}
              {(isProcessing || uploadProgress > 0) && (
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          {processingSteps[processingStep]}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {uploadProgress}%
                        </span>
                      </div>
                      
                      <Progress value={uploadProgress} className="h-2" />
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Zap className="w-4 h-4 text-primary" />
                        AI is optimizing your content for maximum engagement
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Upload Statistics */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">5</div>
                  <div className="text-xs text-muted-foreground">Posts Uploaded</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">7</div>
                  <div className="text-xs text-muted-foreground">Days Scheduled</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">88%</div>
                  <div className="text-xs text-muted-foreground">Avg AI Score</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Schedule Preview */}
          <Card className="glass border-border/20">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Schedule Preview
                </span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 max-h-[600px] overflow-y-auto">
              {bulkPosts.map((post, index) => (
                <div 
                  key={post.id}
                  className={`border rounded-lg p-4 transition-all duration-300 ${
                    post.status === 'processing' 
                      ? 'border-primary bg-primary/5 animate-pulse-glow' 
                      : 'border-border'
                  }`}
                >
                  <div className="flex gap-4">
                    {/* Post Image */}
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={post.image} 
                        alt="Scheduled post" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Post Details */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge 
                          variant="outline" 
                          className={`${getStatusColor(post.status)} border-current`}
                        >
                          {getStatusIcon(post.status)}
                          <span className="ml-1 capitalize">{post.status}</span>
                        </Badge>
                        
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            <Target className="w-3 h-3 mr-1" />
                            AI Score: {post.aiScore}%
                          </Badge>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {post.caption}
                      </p>
                      
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>📅 {post.scheduledDate}</span>
                        <span>🕐 {post.scheduledTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* AI Features Showcase */}
        <Card className="glass border-border/20 mt-12 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              AI-Powered Bulk Optimization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500/10 text-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8" />
                </div>
                <h3 className="font-semibold mb-2">Smart Caption Generation</h3>
                <p className="text-sm text-muted-foreground">
                  AI analyzes each image and generates engaging captions tailored to your brand voice and audience.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8" />
                </div>
                <h3 className="font-semibold mb-2">Optimal Timing</h3>
                <p className="text-sm text-muted-foreground">
                  Automatically schedules posts at times when your audience is most active for maximum engagement.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-semibold mb-2">Quality Assurance</h3>
                <p className="text-sm text-muted-foreground">
                  AI scores each post for potential engagement and suggests improvements before scheduling.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center mt-8">
          <Button variant="outline" size="lg">
            <Settings className="w-4 h-4 mr-2" />
            Configure Settings
          </Button>
          <Button size="lg" className="gradient-primary">
            <Play className="w-4 h-4 mr-2" />
            Start Bulk Upload
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkSchedulingPage;