
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import AuthLayout from '@/layouts/AuthLayout';
import AnimatedContainer from '@/components/AnimatedContainer';

const FaceVerification = () => {
  const [captureStatus, setCaptureStatus] = useState<'idle' | 'capturing' | 'processing' | 'success' | 'error'>('idle');
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
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
  
  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    setCaptureStatus('capturing');
    
    const context = canvasRef.current.getContext('2d');
    if (!context) return;
    
    // Set canvas dimensions to match video
    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    
    // Draw the current video frame on the canvas
    context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    
    // Simulate processing
    setCaptureStatus('processing');
    let currentProgress = 0;
    
    const progressInterval = setInterval(() => {
      currentProgress += 5;
      setProgress(currentProgress);
      
      if (currentProgress >= 100) {
        clearInterval(progressInterval);
        
        // Simulate face verification match (success in this demo)
        setTimeout(() => {
          setCaptureStatus('success');
          
          toast({
            title: "Face verification successful",
            description: "Your identity has been verified. Proceeding to liveness check.",
          });
          
          // Navigate to liveness detection after a brief delay
          setTimeout(() => {
            navigate('/liveness-detection');
          }, 1500);
        }, 500);
      }
    }, 100);
  };
  
  return (
    <AuthLayout 
      title="Face Verification" 
      subtitle="Please position your face within the frame for verification"
    >
      <div className="space-y-6">
        <AnimatedContainer className="webcam-container">
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted 
            className="rounded-lg w-full"
          />
          
          <div className="webcam-overlay">
            <div className="face-oval"></div>
            
            {captureStatus === 'idle' && (
              <div className="instruction-box">
                <p>Position your face in the center and click "Capture Photo"</p>
              </div>
            )}
            
            {captureStatus === 'processing' && (
              <div className="instruction-box">
                <p className="mb-2">Analyzing your photo...</p>
                <Progress value={progress} className="h-2" />
              </div>
            )}
            
            {captureStatus === 'success' && (
              <div className="instruction-box bg-green-500/80">
                <div className="flex items-center justify-center gap-2 text-white">
                  <Check size={20} />
                  <p>Verification successful</p>
                </div>
              </div>
            )}
            
            {captureStatus === 'error' && (
              <div className="instruction-box bg-red-500/80">
                <div className="flex items-center justify-center gap-2 text-white">
                  <AlertCircle size={20} />
                  <p>Verification failed. Please try again.</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Canvas for capturing the image (hidden) */}
          <canvas ref={canvasRef} className="hidden" />
        </AnimatedContainer>
        
        <AnimatedContainer delay="short" className="flex justify-center">
          <Button 
            size="lg"
            className="gap-2"
            onClick={capturePhoto}
            disabled={captureStatus !== 'idle'}
          >
            <Camera size={20} />
            <span>Capture Photo</span>
          </Button>
        </AnimatedContainer>
        
        <AnimatedContainer delay="medium" className="rounded-lg border p-4 text-sm text-muted-foreground">
          <h3 className="mb-2 font-medium text-foreground">Guidelines for best results:</h3>
          <ul className="list-inside list-disc space-y-1">
            <li>Ensure your face is clearly visible and well-lit</li>
            <li>Remove glasses, masks or any face coverings</li>
            <li>Face directly towards the camera</li>
            <li>Maintain a neutral expression</li>
          </ul>
        </AnimatedContainer>
      </div>
    </AuthLayout>
  );
};

export default FaceVerification;
