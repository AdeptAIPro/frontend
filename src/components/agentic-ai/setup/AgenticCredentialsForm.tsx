import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from '@/utils/zod-polyfill';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { initializeOpenAI, isOpenAIInitialized } from '@/services/llm/OpenAIService';
import { Eye, EyeOff, CheckCircle, AlertCircle, KeyRound, Database } from 'lucide-react';
import { toast } from 'sonner';
import { FixedLabel } from '@/utils/shadcn-patches';

// Form validation schema
const formSchema = z.object({
  openaiApiKey: z.string().min(1, { message: 'OpenAI API key is required' })
});

type FormValues = z.infer<typeof formSchema>;

interface AgenticCredentialsFormProps {
  onCredentialsSet: (credentials: FormValues) => void;
  initialCredentials?: Partial<FormValues>;
}

const AgenticCredentialsForm: React.FC<AgenticCredentialsFormProps> = ({ 
  onCredentialsSet,
  initialCredentials
}) => {
  const [showOpenAIKey, setShowOpenAIKey] = useState(false);
  const [isTestingOpenAI, setIsTestingOpenAI] = useState(false);
  const [openAIStatus, setOpenAIStatus] = useState<'untested' | 'success' | 'failed'>('untested');
  
  // Load credentials from localStorage
  useEffect(() => {
    const savedCredentials = localStorage.getItem('agenticCredentials');
    if (savedCredentials) {
      try {
        const parsed = JSON.parse(savedCredentials);
        // Initialize form with saved values
        form.setValue('openaiApiKey', parsed.openaiApiKey || '');
        
        // Check if OpenAI can be initialized with saved key
        if (parsed.openaiApiKey) {
          const isInitialized = isOpenAIInitialized();
          if (!isInitialized) {
            const success = initializeOpenAI(parsed.openaiApiKey);
            setOpenAIStatus(success ? 'success' : 'failed');
          } else {
            setOpenAIStatus('success');
          }
        }
      } catch (e) {
        console.error("Failed to parse saved credentials:", e);
      }
    }
  }, []);
  
  // Set up form with validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      openaiApiKey: initialCredentials?.openaiApiKey || ''
    }
  });
  
  // Test OpenAI connection
  const testOpenAI = async () => {
    const openaiApiKey = form.getValues('openaiApiKey');
    
    if (!openaiApiKey) {
      toast.error("Please enter an OpenAI API key");
      return;
    }
    
    setIsTestingOpenAI(true);
    
    try {
      const success = initializeOpenAI(openaiApiKey);
      setOpenAIStatus(success ? 'success' : 'failed');
      
      if (success) {
        toast.success("Successfully connected to OpenAI");
      } else {
        toast.error("Failed to initialize OpenAI client");
      }
    } catch (error) {
      console.error("Error testing OpenAI connection:", error);
      setOpenAIStatus('failed');
      toast.error("Failed to connect to OpenAI API");
    } finally {
      setIsTestingOpenAI(false);
    }
  };
  
  // Save credentials to localStorage and notify parent
  const onSubmit = (values: FormValues) => {
    localStorage.setItem('agenticCredentials', JSON.stringify(values));
    
    // Initialize services with the credentials
    initializeOpenAI(values.openaiApiKey);
    
    // Notify parent component
    onCredentialsSet(values);
    
    toast.success("Credentials saved successfully");
  };

  return (
    <Card className="w-full shadow-lg border-2 border-adept/20">
      <CardHeader className="bg-gradient-to-r from-adept/10 to-transparent">
        <CardTitle className="flex items-center gap-2">
          <KeyRound className="h-5 w-5 text-adept" />
          API Credentials Setup
        </CardTitle>
        <CardDescription>
          Configure your OpenAI credentials to enable AI agent functionality
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6">
        <Alert variant="warning" className="mb-6 bg-amber-50 border-amber-200">
          <AlertCircle className="h-4 w-4 text-amber-500" />
          <AlertTitle>Important security information</AlertTitle>
          <AlertDescription>
            Your API keys will be stored securely in your browser&apos;s local storage.
            For production use, we recommend storing these credentials in a secure backend service.
          </AlertDescription>
        </Alert>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <Database className="h-5 w-5 mr-2 text-primary" />
                  OpenAI Configuration
                </h3>
                
                <FormField
                  control={form.control}
                  name="openaiApiKey"
                  render={({ field }) => (
                    <FormItem>
                      <FixedLabel>OpenAI API Key</FixedLabel>
                      <div className="flex space-x-2">
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              type={showOpenAIKey ? "text" : "password"}
                              placeholder="sk-..."
                              className="pr-10"
                            />
                            <button
                              type="button"
                              className="absolute inset-y-0 right-0 flex items-center px-3"
                              onClick={() => setShowOpenAIKey(!showOpenAIKey)}
                            >
                              {showOpenAIKey ? (
                                <EyeOff className="h-4 w-4 text-gray-400" />
                              ) : (
                                <Eye className="h-4 w-4 text-gray-400" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={testOpenAI}
                          disabled={isTestingOpenAI || !form.getValues('openaiApiKey')}
                        >
                          {isTestingOpenAI ? "Testing..." : "Test"}
                        </Button>
                      </div>
                      <div className="mt-1">
                        {openAIStatus === 'success' && (
                          <div className="text-sm text-green-600 flex items-center">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Connected to OpenAI
                          </div>
                        )}
                        {openAIStatus === 'failed' && (
                          <div className="text-sm text-red-600 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            Failed to connect to OpenAI
                          </div>
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <CardFooter className="flex justify-between px-0">
              <Button 
                type="button"
                variant="outline"
                onClick={() => {
                  localStorage.removeItem('agenticCredentials');
                  form.reset();
                  setOpenAIStatus('untested');
                  toast.success("Credentials cleared");
                }}
              >
                Clear Credentials
              </Button>
              <Button type="submit">Save Credentials</Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AgenticCredentialsForm;
