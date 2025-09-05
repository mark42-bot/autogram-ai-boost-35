import { useState, useRef, Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Box, Sphere, Plane } from '@react-three/drei';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  RotateCcw,
  MousePointer,
  Smartphone,
  Calendar,
  BarChart3,
  Users,
  Zap,
  Upload,
  Settings,
  CheckCircle,
  Clock
} from 'lucide-react';

// Interactive 3D Website Tour Model
const TutorialModel = ({ currentStep }: { currentStep: number }) => {
  const mainDeviceRef = useRef<any>();
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prev => prev + 0.016);
    }, 16);
    return () => clearInterval(timer);
  }, []);

  // Website sections that the tour covers
  const tourSteps = [
    { 
      position: [0, 0, 0], 
      color: '#3b82f6', 
      scale: 1.2,
      title: "Dashboard",
      description: "Main control center"
    },
    { 
      position: [-3, 0.5, 0], 
      color: '#8b5cf6', 
      scale: 1,
      title: "Upload Content",
      description: "Start your workflow"
    },
    { 
      position: [3, 0.5, 0], 
      color: '#06d6a0', 
      scale: 1.1,
      title: "AI Generation",
      description: "Smart captions & hashtags"
    },
    { 
      position: [0, 2, 1], 
      color: '#f72585', 
      scale: 0.9,
      title: "Schedule Posts",
      description: "Optimal timing"
    },
    { 
      position: [-2, -1, 1], 
      color: '#ffbe0b', 
      scale: 1,
      title: "Analytics",
      description: "Performance insights"
    },
    { 
      position: [2, -1, -1], 
      color: '#ff6b6b', 
      scale: 1.1,
      title: "Team Workflow",
      description: "Collaboration tools"
    },
    { 
      position: [0, 1.5, -2], 
      color: '#4ecdc4', 
      scale: 1,
      title: "Automation",
      description: "Smart workflows"
    },
    { 
      position: [0, 0, 0], 
      color: '#45b7d1', 
      scale: 1.3,
      title: "Launch Success",
      description: "Your first campaign"
    }
  ];

  const currentStepData = tourSteps[currentStep] || tourSteps[0];

  return (
    <group>
      {/* Main Platform representing website interface */}
      <Plane 
        args={[10, 8]} 
        position={[0, -2, 0]} 
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial 
          color="#1e293b" 
          transparent 
          opacity={0.1}
          wireframe={true}
        />
      </Plane>

      {/* Central main device (represents current page/feature) */}
      <Box 
        ref={mainDeviceRef}
        position={currentStepData.position as [number, number, number]} 
        scale={currentStepData.scale}
        rotation={[
          Math.sin(time * 0.5) * 0.1, 
          time * 0.3, 
          Math.cos(time * 0.3) * 0.05
        ]}
      >
        <meshStandardMaterial 
          color={currentStepData.color}
          emissive={currentStepData.color}
          emissiveIntensity={0.2}
        />
      </Box>

      {/* Interactive UI Elements floating around */}
      {tourSteps.map((step, index) => (
        <group key={index}>
          <Sphere 
            position={[
              step.position[0] + Math.cos(time + index) * 0.5,
              step.position[1] + Math.sin(time * 0.8 + index) * 0.3,
              step.position[2] + Math.sin(time + index) * 0.3
            ]} 
            scale={index === currentStep ? 0.2 : 0.1}
          >
            <meshStandardMaterial 
              color={step.color}
              emissive={step.color}
              emissiveIntensity={index === currentStep ? 0.6 : 0.2}
            />
          </Sphere>
          
          {/* Connection lines to main device */}
          {index === currentStep && (
            <mesh>
              <cylinderGeometry args={[0.02, 0.02, 
                Math.sqrt(
                  Math.pow(currentStepData.position[0] - step.position[0], 2) +
                  Math.pow(currentStepData.position[1] - step.position[1], 2) +
                  Math.pow(currentStepData.position[2] - step.position[2], 2)
                ), 8
              ]} />
              <meshBasicMaterial color={step.color} transparent opacity={0.5} />
            </mesh>
          )}
        </group>
      ))}

      {/* Floating step indicator */}
      <Text
        position={[currentStepData.position[0], currentStepData.position[1] + 2, currentStepData.position[2]]}
        fontSize={0.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {currentStepData.title}
      </Text>
      
      <Text
        position={[currentStepData.position[0], currentStepData.position[1] + 1.5, currentStepData.position[2]]}
        fontSize={0.3}
        color="#94a3b8"
        anchorX="center"
        anchorY="middle"
      >
        {currentStepData.description}
      </Text>

      {/* Progress Ring */}
      <mesh
        position={[0, -1, 0]}
        rotation={[Math.PI / 2, 0, time * 0.2]}
      >
        <ringGeometry args={[4, 4.2, 64]} />
        <meshBasicMaterial 
          color="#3b82f6" 
          transparent 
          opacity={0.3}
        />
      </mesh>

      {/* Website flow visualization */}
      {currentStep > 0 && (
        <group>
          {Array.from({ length: currentStep }).map((_, i) => (
            <Sphere
              key={`completed-${i}`}
              position={[
                Math.cos((i / tourSteps.length) * Math.PI * 2) * 3,
                0,
                Math.sin((i / tourSteps.length) * Math.PI * 2) * 3
              ]}
              scale={0.15}
            >
              <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.3} />
            </Sphere>
          ))}
        </group>
      )}
    </group>
  );
};

const TutorialPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const tutorialSteps = [
    {
      title: "Welcome to Your AI Social Media Assistant",
      description: "Let's take a quick tour of how to create, optimize, and schedule your Instagram content with AI power.",
      icon: <Smartphone className="w-6 h-6" />,
      actions: ["Open the dashboard", "Explore the main features", "Get familiar with the interface"],
      duration: "2 min"
    },
    {
      title: "Upload Your Content",
      description: "Start by uploading your images or videos. Our AI will analyze your content to suggest the best captions and hashtags.",
      icon: <Upload className="w-6 h-6" />,
      actions: ["Click 'Upload Content'", "Select your image/video", "Wait for AI analysis", "Review content insights"],
      duration: "3 min"
    },
    {
      title: "Generate AI Captions",
      description: "Our AI creates engaging captions tailored to your brand voice and audience. Choose from multiple options or customize them.",
      icon: <Zap className="w-6 h-6" />,
      actions: ["Navigate to AI Caption Generator", "Select your content type", "Choose caption style", "Review and edit suggestions"],
      duration: "4 min"
    },
    {
      title: "Smart Hashtag Research",
      description: "Get data-driven hashtag recommendations based on trending topics and your niche. Maximize your content reach.",
      icon: <BarChart3 className="w-6 h-6" />,
      actions: ["Open Smart Hashtag tool", "Enter your content topic", "Review hashtag performance data", "Copy optimized hashtag sets"],
      duration: "3 min"
    },
    {
      title: "Optimize Posting Times",
      description: "Use AI analytics to find when your audience is most active. Schedule posts for maximum engagement.",
      icon: <Calendar className="w-6 h-6" />,
      actions: ["Check audience activity patterns", "Select optimal posting time", "Set up recurring schedules", "Monitor performance"],
      duration: "5 min"
    },
    {
      title: "Monitor Performance",
      description: "Track your content performance with real-time analytics. Get insights on engagement, reach, and audience behavior.",
      icon: <Users className="w-6 h-6" />,
      actions: ["Access Analytics dashboard", "Review engagement metrics", "Analyze audience insights", "Export performance reports"],
      duration: "4 min"
    },
    {
      title: "Set Up Automation",
      description: "Configure automated workflows for content approval, scheduling, and team collaboration. Save time and stay consistent.",
      icon: <Settings className="w-6 h-6" />,
      actions: ["Configure workflow settings", "Set approval processes", "Enable auto-scheduling", "Test automation rules"],
      duration: "6 min"
    },
    {
      title: "Launch Your First Campaign",
      description: "Put it all together! Create your first optimized post with AI captions, smart hashtags, and perfect timing.",
      icon: <CheckCircle className="w-6 h-6" />,
      actions: ["Combine all tools", "Review final post", "Schedule or publish", "Monitor initial performance"],
      duration: "5 min"
    }
  ];

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCompletedSteps([...completedSteps, currentStep]);
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const restartTutorial = () => {
    setCurrentStep(0);
    setCompletedSteps([]);
    setIsPlaying(false);
  };

  const playPauseHandler = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      const interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < tutorialSteps.length - 1) {
            setCompletedSteps((completed) => [...completed, prev]);
            return prev + 1;
          } else {
            setIsPlaying(false);
            clearInterval(interval);
            return prev;
          }
        });
      }, 4000);
    }
  };

  return (
    <div className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="gradient-primary mb-6 px-4 py-2">
            <Play className="w-4 h-4 mr-2" />
            Interactive Tutorial
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-hero bg-clip-text text-transparent">
              Learn
            </span>
            <br />
            <span className="text-foreground">Step by Step</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Master your AI social media assistant with our interactive 3D tutorial. Learn every feature and become a content creation pro.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 3D Interactive Model */}
          <Card className="glass border-border/20 h-[500px]">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <MousePointer className="w-5 h-5 text-primary" />
                  Interactive 3D Guide
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={prevStep}
                    disabled={currentStep === 0}
                  >
                    <SkipBack className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={playPauseHandler}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={nextStep}
                    disabled={currentStep === tutorialSteps.length - 1}
                  >
                    <SkipForward className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={restartTutorial}
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[400px] p-0">
              <Suspense fallback={
                <div className="h-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              }>
                <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
                  <ambientLight intensity={0.5} />
                  <directionalLight position={[10, 10, 5]} intensity={1} />
                  <pointLight position={[-10, -10, -5]} intensity={0.5} />
                  <TutorialModel currentStep={currentStep} />
                  <OrbitControls 
                    enablePan={true} 
                    enableZoom={true} 
                    enableRotate={true}
                    minDistance={5}
                    maxDistance={20}
                  />
                </Canvas>
              </Suspense>
            </CardContent>
          </Card>

          {/* Tutorial Steps */}
          <div className="space-y-6">
            {/* Progress Bar */}
            <Card className="glass border-border/20 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Progress</h3>
                <span className="text-sm text-muted-foreground">
                  {currentStep + 1} of {tutorialSteps.length}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-3 mb-4">
                <div 
                  className="gradient-primary h-3 rounded-full transition-all duration-500"
                  style={{ width: `${((currentStep + 1) / tutorialSteps.length) * 100}%` }}
                ></div>
              </div>
              <div className="flex gap-2 flex-wrap">
                {tutorialSteps.map((_, index) => (
                  <Badge
                    key={index}
                    variant={
                      index === currentStep 
                        ? "default" 
                        : completedSteps.includes(index) 
                          ? "secondary" 
                          : "outline"
                    }
                    className={
                      index === currentStep 
                        ? "gradient-primary" 
                        : completedSteps.includes(index)
                          ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                          : ""
                    }
                  >
                    {index + 1}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Current Step Details */}
            <Card className={`glass border-border/20 transition-all duration-500 ${
              isPlaying ? 'ring-2 ring-primary border-primary/50 animate-pulse-glow' : ''
            }`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center text-white">
                    {tutorialSteps[currentStep].icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{tutorialSteps[currentStep].title}</h3>
                    <Badge variant="outline" className="mt-1">
                      <Clock className="w-3 h-3 mr-1" />
                      {tutorialSteps[currentStep].duration}
                    </Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  {tutorialSteps[currentStep].description}
                </p>
                
                <div>
                  <h4 className="font-semibold mb-3">What you'll learn:</h4>
                  <div className="space-y-2">
                    {tutorialSteps[currentStep].actions.map((action, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                        <span className="text-sm">{action}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button 
                    onClick={nextStep}
                    disabled={currentStep === tutorialSteps.length - 1}
                    className="gradient-primary flex-1"
                  >
                    {currentStep === tutorialSteps.length - 1 ? 'Complete' : 'Next Step'}
                    <SkipForward className="w-4 h-4 ml-2" />
                  </Button>
                  {currentStep > 0 && (
                    <Button variant="outline" onClick={prevStep}>
                      <SkipBack className="w-4 h-4 mr-2" />
                      Previous
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card className="glass border-border/20 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  Pro Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p>• Use the 3D model controls to explore different angles</p>
                  <p>• Click the auto-play button for hands-free learning</p>
                  <p>• Each step builds on the previous one - don't skip ahead</p>
                  <p>• Practice each feature in the actual app after learning</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tutorial Completion */}
        {currentStep === tutorialSteps.length - 1 && (
          <Card className="glass border-border/20 mt-12 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20">
            <CardContent className="text-center p-8">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Congratulations! 🎉</h3>
              <p className="text-lg text-muted-foreground mb-6">
                You've completed the tutorial! You're now ready to create amazing content with AI assistance.
              </p>
              <div className="flex gap-4 justify-center">
                <Button onClick={restartTutorial} variant="outline">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Restart Tutorial
                </Button>
                <Button className="gradient-primary">
                  Start Creating Content
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TutorialPage;