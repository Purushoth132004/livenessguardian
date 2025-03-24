
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Check, RefreshCw, Eye, MessagesSquare, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import AuthLayout from '@/layouts/AuthLayout';
import AnimatedContainer from '@/components/AnimatedContainer';

type LivenessStep = 'intro' | 'blink' | 'mouth' | 'turn' | 'complete';

const LivenessDetection = () => {
  const [currentStep, setCurrentStep] = useState<LivenessStep>('intro');
  const [isRecording, setIsRecording] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Instructions for each step
  const stepInstructions = {
    intro: "We'll verify you're physically present by checking three simple actions",
    blink: "Please blink your eyes a few times naturally",
    mouth: "Please open and close your mouth slowly",
    turn: "Please turn your head slightly left and right",
    complete: "All verifications complete! Proceeding to your dashboard..."
  };

  // Icons for each step
  const stepIcons = {
    intro: Play,
    blink: Eye,
    mouth: MessagesSquare,
    turn: RotateCw,
    complete: Check
  };
  
  useEffect(() => {
    let stream: MediaStream | null = null;
    
    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'user', width: 640, height: 480 } 
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        toast({
          title: "Camera access failed",
          description: "Please ensure your camera is connected and you've granted permission to use it.",
          variant: "destructive",
        });
      }
    };
    
    startCamera();
    
    // Cleanup function to stop the camera when component unmounts
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [toast]);
  
  const startVerification = () => {
    setCurrentStep('blink');
    processStep('blink');
  };
  
  const processStep = (step: LivenessStep) => {
    setIsRecording(true);
    let progressValue = 0;
    
    const interval = setInterval(() => {
      progressValue += 2;
      setProgress(progressValue);
      
      if (progressValue >= 100) {
        clearInterval(interval);
        setIsRecording(false);
        
        // Move to next step
        if (step === 'blink') {
          setCurrentStep('mouth');
          toast({
            title: "Blink detected",
            description: "Great! Now let's move to the next verification step.",
          });
        } else if (step === 'mouth') {
          setCurrentStep('turn');
          toast({
            title: "Mouth movement verified",
            description: "Perfect! One last step to complete verification.",
          });
        } else if (step === 'turn') {
          setCurrentStep('complete');
          toast({
            title: "All steps verified!",
            description: "Liveness verification completed successfully.",
          });
          
          // Navigate to dashboard after completion
          setTimeout(() => {
            navigate('/dashboard');
          }, 2000);
        }
      }
    }, 50);
  };
  
  const handleNextStep = () => {
    if (currentStep === 'mouth') {
      processStep('mouth');
    } else if (currentStep === 'turn') {
      processStep('turn');
    }
  };
  
  // Animation classes for different verification steps
  const blinkAnimation = currentStep === 'blink' && isRecording ? 'animate-blink' : '';
  const mouthAnimation = currentStep === 'mouth' && isRecording ? 'animate-mouth' : '';
  const turnAnimation = currentStep === 'turn' && isRecording ? 'animate-head' : '';
  
  // Progress indicator
  const getStepProgress = () => {
    switch (currentStep) {
      case 'intro': return 0;
      case 'blink': return 25;
      case 'mouth': return 50;
      case 'turn': return 75;
      case 'complete': return 100;
    }
  };
  
  return (
    <AuthLayout 
      title="Liveness Detection" 
      subtitle="Let's verify that you're physically present"
    >
      <div className="space-y-6">
        {/* Step progress indicator */}
        <AnimatedContainer className="mb-6">
          <div className="h-2 w-full rounded-full bg-gray-200">
            <div 
              className="h-2 rounded-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${getStepProgress()}%` }}
            ></div>
          </div>
          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            <span>Start</span>
            <span>Blink</span>
            <span>Mouth</span>
            <span>Turn</span>
            <span>Complete</span>
          </div>
        </AnimatedContainer>
        
        <AnimatedContainer className="webcam-container">
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted 
            className={`w-full rounded-lg ${blinkAnimation} ${mouthAnimation} ${turnAnimation}`}
          />
          
          <div className="webcam-overlay">
            <div className="face-oval"></div>
            
            <div className="instruction-box">
              <div className="flex items-center justify-center gap-2">
                {React.createElement(stepIcons[currentStep], { size: 20 })}
                <p>{stepInstructions[currentStep]}</p>
              </div>
              
              {isRecording && (
                <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/20">
                  <div 
                    className="h-full bg-white transition-all"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              )}
            </div>
          </div>
          
          {/* Canvas for capturing frames (hidden) */}
          <canvas ref={canvasRef} className="hidden" />
        </AnimatedContainer>
        
        <AnimatedContainer delay="short" className="flex justify-center">
          {currentStep === 'intro' && (
            <Button 
              size="lg"
              className="gap-2"
              onClick={startVerification}
            >
              <Play size={20} />
              <span>Start Verification</span>
            </Button>
          )}
          
          {(currentStep === 'mouth' || currentStep === 'turn') && !isRecording && (
            <Button 
              size="lg"
              className="gap-2"
              onClick={handleNextStep}
            >
              <RefreshCw size={20} />
              <span>Continue to Next Step</span>
            </Button>
          )}
          
          {currentStep === 'complete' && (
            <Button 
              size="lg"
              className="gap-2 bg-green-600 hover:bg-green-700"
              disabled
            >
              <Check size={20} />
              <span>Verification Complete</span>
            </Button>
          )}
        </AnimatedContainer>
        
        {currentStep !== 'intro' && currentStep !== 'complete' && (
          <AnimatedContainer delay="medium" className="rounded-lg border p-4 text-sm text-muted-foreground">
            <h3 className="mb-2 font-medium text-foreground">
              {currentStep === 'blink' && "Blink Detection"}
              {currentStep === 'mouth' && "Mouth Movement Detection"}
              {currentStep === 'turn' && "Head Movement Detection"}
            </h3>
            <p>
              {currentStep === 'blink' && "Please blink naturally a few times while facing the camera. This verifies eye movement."}
              {currentStep === 'mouth' && "Please open and close your mouth slowly. This verifies facial mobility."}
              {currentStep === 'turn' && "Please turn your head slightly to the left and right. This verifies head movement."}
            </p>
          </AnimatedContainer>
        )}
      </div>
    </AuthLayout>
  );
};

export default LivenessDetection;
