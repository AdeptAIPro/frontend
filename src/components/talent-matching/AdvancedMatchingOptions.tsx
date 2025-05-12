import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AlgorithmsTab from "./advanced-options/AlgorithmsTab";
import FiltersTab from "./advanced-options/FiltersTab";
import ModelsTab from "./advanced-options/ModelsTab";
import { MatchingOptions } from "./types";
import { Lock } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export interface AdvancedMatchingOptionsProps {
  matchingOptions: MatchingOptions;
  onMatchingOptionsChange: (options: MatchingOptions) => void;
  isPremiumFeatures?: {
    semanticMatching?: boolean;
    complianceVerification?: boolean;
    culturalFitAnalysis?: boolean;
    advancedFiltering?: boolean;
    [key: string]: boolean | undefined;
  };
  useCrossSourceIntelligence?: boolean;
  setUseCrossSourceIntelligence?: (value: boolean) => void;
}

const AdvancedMatchingOptions: React.FC<AdvancedMatchingOptionsProps> = ({ 
  matchingOptions, 
  onMatchingOptionsChange,
  isPremiumFeatures = {},
  useCrossSourceIntelligence,
  setUseCrossSourceIntelligence
}) => {
  const handleToggleChange = (key: keyof MatchingOptions) => (checked: boolean) => {
    onMatchingOptionsChange({
      ...matchingOptions,
      [key]: checked
    });
  };
  
  return (
    <Card className="border-adept/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          Advanced Matching Configuration
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="ml-2 text-amber-500">
                  <Lock className="h-4 w-4" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Some advanced features require a premium subscription</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="algorithms" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="algorithms">Algorithms</TabsTrigger>
            <TabsTrigger value="models">AI Models</TabsTrigger>
            <TabsTrigger value="filters">Filters</TabsTrigger>
          </TabsList>
          
          <TabsContent value="algorithms">
            <AlgorithmsTab 
              matchingOptions={matchingOptions} 
              handleToggleChange={handleToggleChange}
              setMatchingOptions={onMatchingOptionsChange} 
            />
          </TabsContent>
          
          <TabsContent value="models">
            <ModelsTab 
              matchingOptions={matchingOptions} 
              setMatchingOptions={onMatchingOptionsChange} 
            />
          </TabsContent>
          
          <TabsContent value="filters">
            <FiltersTab 
              matchingOptions={matchingOptions} 
              handleToggleChange={handleToggleChange}
              setMatchingOptions={onMatchingOptionsChange} 
            />
          </TabsContent>
        </Tabs>
 
      </CardContent>
    </Card>
  );
};

export default AdvancedMatchingOptions;
