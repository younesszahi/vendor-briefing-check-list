"use client";

import { Progress } from "@/components/ui/progress";

interface FormProgressProps {
  currentStep: number;
  totalSteps: number;
}

export default function FormProgress({ currentStep, totalSteps }: FormProgressProps) {
  const progressPercentage = (currentStep / totalSteps) * 100;
  
  return (
    <div className="progress-container">
      <Progress value={progressPercentage} className="h-2 bg-secondary" />
      <div className="mt-1 text-xs text-muted-foreground flex justify-between">
        <span>Section {currentStep} of {totalSteps}</span>
        <span>{Math.round(progressPercentage)}% complete</span>
      </div>
    </div>
  );
}