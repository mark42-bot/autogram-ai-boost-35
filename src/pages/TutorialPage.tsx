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

// Interactive Human Guide for Website Tour
const HumanGuideModel = ({ currentStep, isPlaying }: { currentStep: number; isPlaying: boolean }) => {
  const guideRef = useRef<any>();
  const [time, setTime] = useState(0);
  const [isWaving, setIsWaving] = useState(false);
  const [speechBubbleVisible, setSpeechBubbleVisible] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prev => prev + 0.016);
    }, 16);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Show speech bubble when step changes
    setSpeechBubbleVisible(true);
    setIsWaving(true);
    
    const waveTimer = setTimeout(() => setIsWaving(false), 1000);
    const bubbleTimer = setTimeout(() => setSpeechBubbleVisible(false), 4000);
    
    return () => {
      clearTimeout(waveTimer);
      clearTimeout(bubbleTimer);
    };
  }, [currentStep]);

  const tourSteps = [
    { 
      position: [0, 0, 0], 
      color: '#3b82f6', 
      title: "Welcome! I'm Alex, your AI guide",
      speech: "Hi there! Ready to explore your AI social media assistant?",
      gesture: "wave"
    },
    { 
      position: [-2, 0, 1], 
      color: '#8b5cf6', 
      title: "Upload Your Content",
      speech: "First, let's upload some amazing content to work with!",
      gesture: "point-left"
    },
    { 
      position: [2, 0, 1], 
      color: '#06d6a0', 
      title: "AI Magic Happens",
      speech: "Watch as AI creates perfect captions and hashtags!",
      gesture: "point-right"
    },
    { 
      position: [0, 1.5, 0], 
      color: '#f72585', 
      title: "Perfect Timing",
      speech: "Schedule posts when your audience is most active!",
      gesture: "point-up"
    },
    { 
      position: [-1.5, -0.5, 0], 
      color: '#ffbe0b', 
      title: "Track Performance",
      speech: "See how your content performs with detailed analytics!",
      gesture: "point-down"
    },
    { 
      position: [1.5, -0.5, 0], 
      color: '#ff6b6b', 
      title: "Team Collaboration",
      speech: "Work seamlessly with your team on every campaign!",
      gesture: "celebrate"
    },
    { 
      position: [0, 0.5, -1], 
      color: '#4ecdc4', 
      title: "Automate Everything",
      speech: "Set up smart workflows that run on autopilot!",
      gesture: "magic"
    },
    { 
      position: [0, 0, 0], 
      color: '#45b7d1', 
      title: "You're Ready!",
      speech: "Congratulations! You're now a social media pro!",
      gesture: "celebrate"
    }
  ];

  const currentStepData = tourSteps[currentStep] || tourSteps[0];

  // Human character (stylized representation)
  const HumanCharacter = () => (
    <group 
      ref={guideRef}
      position={[-3, 0, 2]}
      rotation={[0, Math.PI / 4, 0]}
    >
      {/* Head */}
      <Sphere position={[0, 1.7, 0]} scale={[0.4, 0.4, 0.4]}>
        <meshStandardMaterial color="#FFDBAC" />
      </Sphere>
      
      {/* Eyes */}
      <Sphere position={[-0.1, 1.8, 0.3]} scale={[0.05, 0.05, 0.05]}>
        <meshStandardMaterial color="#000000" />
      </Sphere>
      <Sphere position={[0.1, 1.8, 0.3]} scale={[0.05, 0.05, 0.05]}>
        <meshStandardMaterial color="#000000" />
      </Sphere>
      
      {/* Body */}
      <Box position={[0, 1, 0]} scale={[0.6, 0.8, 0.3]}>
        <meshStandardMaterial color="#4f46e5" />
      </Box>
      
      {/* Arms */}
      <Box 
        position={[-0.5, 1.2, 0]} 
        scale={[0.15, 0.6, 0.15]}
        rotation={[0, 0, isWaving ? Math.sin(time * 8) * 0.5 - 0.3 : -0.2]}
      >
        <meshStandardMaterial color="#FFDBAC" />
      </Box>
      <Box 
        position={[0.5, 1.2, 0]} 
        scale={[0.15, 0.6, 0.15]}
        rotation={[0, 0, currentStepData.gesture === 'point-right' ? -0.8 : 0.2]}
      >
        <meshStandardMaterial color="#FFDBAC" />
      </Box>
      
      {/* Legs */}
      <Box position={[-0.2, 0.3, 0]} scale={[0.15, 0.6, 0.15]}>
        <meshStandardMaterial color="#1e40af" />
      </Box>
      <Box position={[0.2, 0.3, 0]} scale={[0.15, 0.6, 0.15]}>
        <meshStandardMaterial color="#1e40af" />
      </Box>
    </group>
  );

  // Interactive Feature Displays
  const FeatureDisplay = ({ step, index }: { step: any; index: number }) => (
    <group position={step.position as [number, number, number]}>
      {/* Feature Icon */}
      <Box 
        scale={index === currentStep ? [0.8, 0.8, 0.8] : [0.5, 0.5, 0.5]}
        rotation={[
          Math.sin(time + index) * 0.1,
          time * 0.3 + index,
          Math.cos(time + index) * 0.1
        ]}
      >
        <meshStandardMaterial 
          color={step.color}
          emissive={step.color}
          emissiveIntensity={index === currentStep ? 0.4 : 0.2}
        />
      </Box>
      
      {/* Interactive Particles */}
      {index === currentStep && (
        <group>
          {Array.from({ length: 8 }).map((_, i) => (
            <Sphere
              key={i}
              position={[
                Math.cos((time + i) * 2) * 1.5,
                Math.sin((time + i) * 1.5) * 0.5,
                Math.sin((time + i) * 2) * 1.5
              ]}
              scale={0.05}
            >
              <meshStandardMaterial 
                color={step.color} 
                emissive={step.color}
                emissiveIntensity={0.8}
              />
            </Sphere>
          ))}
        </group>
      )}
      
      {/* Connection beam to guide */}
      {index === currentStep && (
        <mesh>
          <cylinderGeometry args={[0.02, 0.02, 
            Math.sqrt(
              Math.pow(-3 - step.position[0], 2) +
              Math.pow(1.2 - step.position[1], 2) +
              Math.pow(2 - step.position[2], 2)
            ), 8
          ]} />
          <meshBasicMaterial 
            color={step.color} 
            transparent 
            opacity={0.6}
          />
        </mesh>
      )}
    </group>
  );

  // Speech Bubble
  const SpeechBubble = () => (
    speechBubbleVisible && (
      <group position={[-1.5, 2.5, 2]}>
        {/* Bubble */}
        <Sphere scale={[1.2, 0.6, 0.1]}>
          <meshStandardMaterial 
            color="#ffffff"
            transparent
            opacity={0.9}
          />
        </Sphere>
        
        {/* Speech text */}
        <Text
          position={[0, 0, 0.2]}
          fontSize={0.12}
          color="#333333"
          anchorX="center"
          anchorY="middle"
          maxWidth={2}
        >
          {currentStepData.speech}
        </Text>
        
        {/* Bubble tail */}
        <mesh position={[-0.3, -0.3, 0]}>
          <coneGeometry args={[0.1, 0.2, 3]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      </group>
    )
  );

  return (
    <group>
      {/* Interactive Platform */}
      <Plane 
        args={[12, 10]} 
        position={[0, -1, 0]} 
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial 
          color="#0f172a" 
          transparent 
          opacity={0.1}
        />
      </Plane>
      
      {/* Grid Effect */}
      {Array.from({ length: 10 }).map((_, i) => (
        <mesh key={`grid-${i}`} position={[-5 + i, -0.9, 0]}>
          <planeGeometry args={[0.05, 10]} />
          <meshBasicMaterial 
            color="#1e293b" 
            transparent 
            opacity={0.3}
          />
        </mesh>
      ))}

      <HumanCharacter />
      <SpeechBubble />
      
      {/* Feature Displays */}
      {tourSteps.map((step, index) => (
        <FeatureDisplay key={index} step={step} index={index} />
      ))}
      
      {/* Progress Indicator */}
      <group position={[0, -0.5, 0]}>
        <Text
          fontSize={0.3}
          color="#64748b"
          anchorX="center"
          anchorY="middle"
        >
          {currentStepData.title}
        </Text>
      </group>
      
      {/* Ambient Effect */}
      <mesh position={[0, 0, 0]} rotation={[0, time * 0.1, 0]}>
        <ringGeometry args={[5, 5.5, 64]} />
        <meshBasicMaterial 
          color={currentStepData.color}
          transparent 
          opacity={0.1}
        />
      </mesh>
    </group>
  );
};

const TutorialPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const tutorialSteps = [
    {
      title: "Welcome! Meet Alex, Your AI Guide",
      description: "Hi there! I'm Alex, your personal AI assistant. I'll walk you through every feature and help you become a social media pro!",
      icon: <Smartphone className="w-6 h-6" />,
      actions: ["👋 Meet your AI guide Alex", "🎯 Understand the tour structure", "🚀 Get ready for an amazing journey"],
      duration: "2 min",
      guideAction: "Alex waves hello and introduces the platform"
    },
    {
      title: "Upload Your Amazing Content",
      description: "Let's start by uploading your photos or videos. Watch as Alex shows you how our AI instantly analyzes everything!",
      icon: <Upload className="w-6 h-6" />,
      actions: ["📸 Click 'Upload Content'", "⚡ Watch AI analysis in action", "🎨 See content insights appear", "✨ Get ready for magic!"],
      duration: "3 min",
      guideAction: "Alex points to upload area and demonstrates the process"
    },
    {
      title: "AI Caption Magic Happens Here",
      description: "This is where the real magic happens! Alex will show you how AI creates perfect captions that sound just like you.",
      icon: <Zap className="w-6 h-6" />,
      actions: ["🤖 Watch AI generate captions", "🎯 Choose your brand voice", "✏️ Customize and refine", "💫 See the perfect results"],
      duration: "4 min",
      guideAction: "Alex demonstrates AI caption generation with enthusiasm"
    },
    {
      title: "Smart Hashtag Research",
      description: "Alex reveals the secret to viral content: data-driven hashtags! Learn how to maximize your reach with trending tags.",
      icon: <BarChart3 className="w-6 h-6" />,
      actions: ["📊 Explore hashtag analytics", "🔥 Find trending topics", "📈 Check performance data", "💯 Copy optimized sets"],
      duration: "3 min",
      guideAction: "Alex points to trending hashtags and explains their power"
    },
    {
      title: "Perfect Timing Secrets",
      description: "Alex shares the insider secret: when to post for maximum engagement! Your audience activity patterns revealed.",
      icon: <Calendar className="w-6 h-6" />,
      actions: ["🕐 Discover peak activity times", "⏰ Set smart schedules", "🔄 Create recurring posts", "📈 Watch engagement soar"],
      duration: "5 min",
      guideAction: "Alex shows optimal posting times with excitement"
    },
    {
      title: "Track Your Success",
      description: "Alex guides you through the analytics dashboard where you'll see your content's performance and audience insights.",
      icon: <Users className="w-6 h-6" />,
      actions: ["📊 Explore your dashboard", "💰 Track engagement ROI", "👥 Understand your audience", "📑 Export detailed reports"],
      duration: "4 min",
      guideAction: "Alex celebrates your growing metrics and success"
    },
    {
      title: "Automation Made Simple",
      description: "Alex shows you how to set up smart workflows that work while you sleep. Automation has never been this easy!",
      icon: <Settings className="w-6 h-6" />,
      actions: ["⚙️ Configure smart workflows", "✅ Set approval processes", "🤖 Enable auto-scheduling", "🧪 Test automation magic"],
      duration: "6 min",
      guideAction: "Alex demonstrates automated workflows with amazement"
    },
    {
      title: "You're Now a Social Media Pro!",
      description: "Congratulations! Alex is so proud of you. You've mastered everything and you're ready to create viral content!",
      icon: <CheckCircle className="w-6 h-6" />,
      actions: ["🎉 Celebrate your achievement", "🚀 Launch your first campaign", "✨ Create viral content", "💪 Dominate social media"],
      duration: "5 min",
      guideAction: "Alex celebrates your success with confetti and cheers"
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
                  <Users className="w-5 h-5 text-primary" />
                  Meet Alex - Your AI Guide
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
                  <HumanGuideModel currentStep={currentStep} isPlaying={isPlaying} />
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
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <span>🎯 What Alex will show you:</span>
                  </h4>
                  <div className="space-y-3">
                    {tutorialSteps[currentStep].actions.map((action, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
                        <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center text-white text-sm font-bold animate-pulse">
                          {index + 1}
                        </div>
                        <span className="text-sm font-medium">{action}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg">
                    <p className="text-sm text-muted-foreground italic">
                      💡 <strong>Alex says:</strong> "{tutorialSteps[currentStep].guideAction}"
                    </p>
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

            {/* Interactive Tips from Alex */}
            <Card className="glass border-border/20 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 border-green-200 dark:border-green-800">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="w-5 h-5 text-green-600" />
                  🤖 Alex's Pro Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-lg">👋</span>
                    <p><strong>Interact with me:</strong> Rotate the 3D scene to see me from different angles!</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-lg">⚡</span>
                    <p><strong>Auto-play mode:</strong> Let me guide you through everything automatically!</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-lg">🎯</span>
                    <p><strong>Follow along:</strong> I'll point to each feature as we explore together!</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-lg">🚀</span>
                    <p><strong>Practice time:</strong> Try each feature in the real app after our tour!</p>
                  </div>
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