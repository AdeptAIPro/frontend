import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppError } from "@/utils/error-handler"; 

interface ErrorResultsProps {
  error: Error | AppError | string;
  onRetry: () => void;
}

const ErrorResults: React.FC<ErrorResultsProps> = ({ error, onRetry }) => {
  return (
    <Card className="border-muted/50 bg-muted/5">
      <CardContent className="flex flex-col items-center justify-center p-6 animate-pulse">
        <Loader className="h-10 w-10 mb-4 animate-spin text-muted-foreground" />
        <h3 className="text-lg font-medium text-muted-foreground mb-2">Loading...</h3>
        <p className="text-center text-muted-foreground/70 mb-4">
          Please wait while we process your request.
        </p>
        <Button 
          variant="outline" 
          onClick={onRetry}
          className="border-muted/30 text-muted hover:bg-muted/10"
        >
          Cancel
        </Button>
      </CardContent>
    </Card>
  );
};

export default ErrorResults;
