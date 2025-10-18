import { useState } from 'react';
import { Button } from '../ui/button';
import { useLanguage } from '../providers/LanguageProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../ui/utils';
import { DAOInfoStep } from '../wizard/steps/DAOInfoStep';
import { GovernanceSetupStep } from '../wizard/steps/GovernanceSetupStep';
import { VotingMethodStep } from '../wizard/steps/VotingMethodStep';
import { TreasuryMultisigStep } from '../wizard/steps/TreasuryMultisigStep';
import { AddMembersStep } from '../wizard/steps/AddMembersStep';
import { ReviewConfirmStep } from '../wizard/steps/ReviewConfirmStep';



interface CreateDAOWizardProps {
  onBack?: () => void;
}

export function CreateDAOWizard({ onBack }: CreateDAOWizardProps = {}) {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});

  const steps = [
    { id: 'dao-info', title: t('wizard.dao_info'), description: 'Basic information about your DAO' },
    { id: 'governance', title: t('wizard.governance_setup'), description: 'Configure governance parameters' },
    { id: 'voting', title: t('wizard.voting_method'), description: 'Define who can submit proposals' },
    { id: 'treasury', title: t('wizard.treasury_multisig'), description: 'Set up treasury management' },
    { id: 'members', title: t('wizard.add_members'), description: 'Invite initial members' },
    { id: 'review', title: t('wizard.review_confirm'), description: 'Review and deploy your DAO' },
  ];

  const updateFormData = (stepData: any) => {
    setFormData(prev => ({ ...prev, ...stepData }));
  };

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
        return <DAOInfoStep data={formData} onUpdate={updateFormData} />;
      case 1:
        return <GovernanceSetupStep data={formData} onUpdate={updateFormData} />;
      case 2:
        return <VotingMethodStep data={formData} onUpdate={updateFormData} />;
      case 3:
        return <TreasuryMultisigStep data={formData} onUpdate={updateFormData} />;
      case 4:
        return <AddMembersStep data={formData} onUpdate={updateFormData} />;
      case 5:
        return <ReviewConfirmStep data={formData} onUpdate={updateFormData} />;
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
                className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                onClick={onBack}
              >
                <span className="text-white font-bold">₳</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold">{t('wizard.create_dao')}</h1>
                <p className="text-muted-foreground text-sm">Build your governance community</p>
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
                      isCompleted && "bg-green-500 text-white",
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
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-600/10 rounded-lg p-4">
              <h3 className="font-medium text-sm mb-1">Need Help?</h3>
              <p className="text-xs text-muted-foreground mb-3">
                Check our DAO creation guide for best practices and tips.
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
                {t('wizard.step_of').replace('{current}', (currentStep + 1).toString()).replace('{total}', steps.length.toString())}
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
                {t('action.back')}
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
                {currentStep === steps.length - 1 ? 'Deploy DAO' : t('action.next')}
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
