import { useState, useCallback } from 'react';
import { Button } from './ui/button';
import { useLanguage } from './LanguageProvider';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from './ui/utils';
import { ProposalBasicsStep } from './proposal-steps/ProposalBasicsStep';
import { ProposalDetailsStep } from './proposal-steps/ProposalDetailsStep';
import { VotingConfigStep } from './proposal-steps/VotingConfigStep';
import { AttachmentsStep } from './proposal-steps/AttachmentsStep';
import { ProposalReviewStep } from './proposal-steps/ProposalReviewStep';

const steps = [
  { id: 'basics', title: 'Proposal Basics', description: 'Title, category, and DAO selection' },
  { id: 'details', title: 'Proposal Details', description: 'Description and implementation details' },
  { id: 'voting', title: 'Voting Configuration', description: 'Set voting parameters and timeline' },
  { id: 'attachments', title: 'Supporting Materials', description: 'Add documents and resources' },
  { id: 'review', title: 'Review & Submit', description: 'Final review before submission' },
];

interface CreateProposalWizardProps {
  onBack?: () => void;
}

export function CreateProposalWizard({ onBack }: CreateProposalWizardProps = {}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});

  // Memoize the updateFormData function to prevent infinite loops
  const updateFormData = useCallback((stepData: any) => {
    setFormData(prev => ({ ...prev, ...stepData }));
  }, []);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <ProposalBasicsStep data={formData} onUpdate={updateFormData} />;
      case 1:
        return <ProposalDetailsStep data={formData} onUpdate={updateFormData} />;
      case 2:
        return <VotingConfigStep data={formData} onUpdate={updateFormData} />;
      case 3:
        return <AttachmentsStep data={formData} onUpdate={updateFormData} />;
      case 4:
        return <ProposalReviewStep data={formData} onUpdate={updateFormData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        {/* Progress Sidebar */}
        <div className="w-80 bg-card border-r border-border flex flex-col">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <div 
                className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-lg flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                onClick={onBack}
              >
                <span className="text-white font-bold">📋</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold">Create New Proposal</h1>
                <p className="text-muted-foreground text-sm">Submit to your DAO community</p>
              </div>
            </div>

            <div className="space-y-4">
              {steps.map((step, index) => {
                const isCompleted = index < currentStep;
                const isCurrent = index === currentStep;
                const isAccessible = index <= currentStep;

                return (
                  <div
                    key={step.id}
                    className={cn(
                      "flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors",
                      isCurrent && "bg-primary/10 border border-primary/20",
                      isAccessible && !isCurrent && "hover:bg-muted",
                      !isAccessible && "opacity-50 cursor-not-allowed"
                    )}
                    onClick={() => isAccessible && goToStep(index)}
                  >
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium shrink-0 mt-1",
                      isCompleted && "bg-emerald-500 text-white",
                      isCurrent && "bg-primary text-primary-foreground",
                      !isCompleted && !isCurrent && "bg-muted text-muted-foreground"
                    )}>
                      {isCompleted ? <Check className="h-4 w-4" /> : index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={cn(
                        "font-medium text-sm",
                        isCurrent && "text-primary",
                        isCompleted && "text-foreground",
                        !isCompleted && !isCurrent && "text-muted-foreground"
                      )}>
                        {step.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-auto p-6 border-t border-border">
            <div className="bg-gradient-to-r from-emerald-500/10 to-blue-600/10 rounded-lg p-4">
              <h3 className="font-medium text-sm mb-1">Proposal Guidelines</h3>
              <p className="text-xs text-muted-foreground mb-3">
                Learn how to write effective proposals that engage your community.
              </p>
              <Button size="sm" variant="outline" className="w-full">
                View Guide
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="border-b border-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold">{steps[currentStep].title}</h1>
                <p className="text-muted-foreground mt-1">{steps[currentStep].description}</p>
              </div>
              <div className="text-sm text-muted-foreground">
                Step {currentStep + 1} of {steps.length}
              </div>
            </div>
          </div>

          {/* Step Content */}
          <div className="flex-1 overflow-auto p-6">
            <div className="max-w-2xl mx-auto">
              {renderStepContent()}
            </div>
          </div>

          {/* Navigation */}
          <div className="border-t border-border p-6">
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </Button>
              
              <div className="flex items-center gap-2">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={cn(
                      "w-2 h-2 rounded-full",
                      index <= currentStep ? "bg-primary" : "bg-muted"
                    )}
                  />
                ))}
              </div>

              <Button
                onClick={nextStep}
                disabled={currentStep === steps.length - 1}
                className="gap-2"
              >
                {currentStep === steps.length - 1 ? 'Submit Proposal' : 'Next'}
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
