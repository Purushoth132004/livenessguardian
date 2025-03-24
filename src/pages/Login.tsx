
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/layouts/AuthLayout';
import { useToast } from '@/hooks/use-toast';

// Form schema with Aadhaar validation
const formSchema = z.object({
  aadhaar: z.string()
    .min(12, 'Aadhaar number must be 12 digits')
    .max(12, 'Aadhaar number must be 12 digits')
    .regex(/^[0-9]+$/, 'Aadhaar number must contain only digits'),
  otp: z.string()
    .length(6, 'OTP must be 6 digits')
    .regex(/^[0-9]+$/, 'OTP must contain only digits')
    .optional(),
});

type FormData = z.infer<typeof formSchema>;

const Login = () => {
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      aadhaar: '',
      otp: '',
    },
  });

  const onSubmitAadhaar = async () => {
    // Get the current form values
    const aadhaarValue = form.getValues('aadhaar');
    
    // Validate Aadhaar number manually
    if (aadhaarValue.length !== 12 || !/^\d+$/.test(aadhaarValue)) {
      form.setError('aadhaar', { 
        message: 'Please enter a valid 12-digit Aadhaar number' 
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call to send OTP
    setTimeout(() => {
      setIsLoading(false);
      setOtpSent(true);
      
      toast({
        title: "OTP Sent Successfully",
        description: `A verification code has been sent to the phone number linked with Aadhaar ${aadhaarValue}`,
      });
    }, 1500);
  };

  const onVerifyOtp = async (data: FormData) => {
    setIsLoading(true);
    
    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Authentication Successful",
        description: "Your identity has been verified. Proceeding to verification steps.",
      });
      
      // Navigate to the face verification page
      navigate('/face-verification');
    }, 1500);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    if (otpSent) {
      const data = form.getValues();
      // Validate OTP
      if (!data.otp || data.otp.length !== 6 || !/^\d+$/.test(data.otp)) {
        form.setError('otp', {
          message: 'Please enter a valid 6-digit OTP'
        });
        return;
      }
      onVerifyOtp(data);
    } else {
      onSubmitAadhaar();
    }
  };

  return (
    <AuthLayout 
      title={otpSent ? "Verify OTP" : "Pensioner Login"} 
      subtitle={otpSent 
        ? "Enter the 6-digit code sent to your Aadhaar linked mobile number" 
        : "Please enter your 12-digit Aadhaar number to proceed"
      }
    >
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!otpSent ? (
            <FormField
              control={form.control}
              name="aadhaar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Aadhaar Number</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter 12-digit Aadhaar number" 
                      {...field} 
                      maxLength={12}
                      className="text-lg tracking-wider"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>One-Time Password (OTP)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter 6-digit OTP" 
                      {...field} 
                      maxLength={6}
                      className="text-lg tracking-wider"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 
              'Processing...' : 
              otpSent ? 'Verify OTP' : 'Send OTP'
            }
          </Button>
          
          {otpSent && (
            <div className="text-center">
              <Button 
                variant="link" 
                type="button" 
                onClick={() => {
                  setOtpSent(false);
                  form.setValue('otp', '');
                }}
                className="text-sm"
              >
                Change Aadhaar number
              </Button>
              <Button 
                variant="link" 
                type="button" 
                onClick={() => {
                  toast({
                    title: "OTP Resent",
                    description: "A new verification code has been sent to your mobile",
                  });
                }}
                className="text-sm"
              >
                Resend OTP
              </Button>
            </div>
          )}
        </form>
      </Form>
    </AuthLayout>
  );
};

export default Login;
