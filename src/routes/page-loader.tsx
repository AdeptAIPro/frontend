import React from 'react';
import { Loader2 } from 'lucide-react';
import im from "../pages/ca.svg"

export const PageLoader: React.FC = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center space-y-4">
   
      <img
        src={im}// Replace with your image path
        alt="Loading"
        className="h-16 w-16 animate-bounce"
      />
    </div>
  );
};
