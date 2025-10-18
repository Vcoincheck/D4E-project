import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { FileText, Plus, X, AlertCircle, Lightbulb } from 'lucide-react';

interface ProposalDetailsStepProps {
  data: any;
  onUpdate: (data: any) => void;
}

export function ProposalDetailsStep({ data, onUpdate }: ProposalDetailsStepProps) {
  const [formData, setFormData] = useState({
    description: data.description || '',
    motivation: data.motivation || '',
    specification: data.specification || '',
    implementation: data.implementation || '',
    budget: data.budget || '',
    timeline: data.timeline || '',
    success_metrics: data.success_metrics || [],
    risks: data.risks || [],
  });

  const [newMetric, setNewMetric] = useState('');
  const [newRisk, setNewRisk] = useState('');
  
  // Use a ref to track if the component has been initialized
  const isInitializedRef = useRef(false);

  // Update form data when props.data changes (but not on first render)
  useEffect(() => {
    if (!isInitializedRef.current) {
      isInitializedRef.current = true;
      return;
    }
    
    setFormData({
      description: data.description || '',
      motivation: data.motivation || '',
      specification: data.specification || '',
      implementation: data.implementation || '',
      budget: data.budget || '',
      timeline: data.timeline || '',
      success_metrics: data.success_metrics || [],
      risks: data.risks || [],
    });
  }, [data]);

  // Call onUpdate only when formData changes (not on initialization)
  useEffect(() => {
    if (!isInitializedRef.current) {
      return;
    }
    
    onUpdate(formData);
  }, [formData, onUpdate]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addMetric = () => {
    if (newMetric.trim()) {
      setFormData(prev => ({
        ...prev,
        success_metrics: [...prev.success_metrics, newMetric.trim()]
      }));
      setNewMetric('');
    }
  };

  const removeMetric = (index: number) => {
    setFormData(prev => ({
      ...prev,
      success_metrics: prev.success_metrics.filter((_, i) => i !== index)
    }));
  };

  const addRisk = () => {
    if (newRisk.trim()) {
      setFormData(prev => ({
        ...prev,
        risks: [...prev.risks, newRisk.trim()]
      }));
      setNewRisk('');
    }
  };

  const removeRisk = (index: number) => {
    setFormData(prev => ({
      ...prev,
      risks: prev.risks.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="space-y-6">
      {/* Description */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Proposal Description
          </CardTitle>
          <CardDescription>
            Provide a comprehensive description of your proposal. This is the main content that DAO members will read.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="description">Full Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your proposal in detail. Include what you're proposing, why it's needed, and how it will benefit the DAO..."
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="mt-1 min-h-[150px]"
            />
            <div className="text-xs text-muted-foreground mt-1">
              {formData.description.length} characters • Rich text and markdown supported
            </div>
          </div>

          <div>
            <Label htmlFor="motivation">Motivation & Rationale</Label>
            <Textarea
              id="motivation"
              placeholder="Explain why this proposal is important and what problem it solves..."
              value={formData.motivation}
              onChange={(e) => handleInputChange('motivation', e.target.value)}
              className="mt-1 min-h-[100px]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Technical Specification */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle>Technical Specification</CardTitle>
          <CardDescription>
            Provide technical details about how this proposal will be implemented.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="specification">Technical Details</Label>
            <Textarea
              id="specification"
              placeholder="Include technical specifications, requirements, dependencies, or architectural changes..."
              value={formData.specification}
              onChange={(e) => handleInputChange('specification', e.target.value)}
              className="mt-1 min-h-[120px]"
            />
          </div>

          <div>
            <Label htmlFor="implementation">Implementation Plan</Label>
            <Textarea
              id="implementation"
              placeholder="Describe the step-by-step implementation process, milestones, and deliverables..."
              value={formData.implementation}
              onChange={(e) => handleInputChange('implementation', e.target.value)}
              className="mt-1 min-h-[120px]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Budget & Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-2">
          <CardHeader>
            <CardTitle>Budget Requirements</CardTitle>
            <CardDescription>
              Specify funding needs if applicable.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="budget">Budget (ADA)</Label>
              <Input
                id="budget"
                placeholder="e.g. 50,000 ADA"
                value={formData.budget}
                onChange={(e) => handleInputChange('budget', e.target.value)}
                className="mt-1"
              />
              <div className="text-xs text-muted-foreground mt-1">
                Leave empty if no funding required
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader>
            <CardTitle>Timeline</CardTitle>
            <CardDescription>
              Expected completion timeframe.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="timeline">Duration</Label>
              <Input
                id="timeline"
                placeholder="e.g. 3-4 months"
                value={formData.timeline}
                onChange={(e) => handleInputChange('timeline', e.target.value)}
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Success Metrics */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Success Metrics
          </CardTitle>
          <CardDescription>
            Define how success will be measured for this proposal.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="e.g. 25% increase in developer activity"
              value={newMetric}
              onChange={(e) => setNewMetric(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addMetric()}
            />
            <Button onClick={addMetric} size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          {formData.success_metrics.length > 0 && (
            <div className="space-y-2">
              {formData.success_metrics.map((metric, index) => (
                <div key={index} className="flex items-center justify-between bg-emerald-50 dark:bg-emerald-950/20 p-3 rounded-lg border border-emerald-200 dark:border-emerald-800">
                  <span className="text-sm">{metric}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeMetric(index)}
                    className="h-6 w-6 p-0 hover:bg-emerald-100 dark:hover:bg-emerald-900/30"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Risks & Considerations */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Risks & Considerations
          </CardTitle>
          <CardDescription>
            Identify potential risks and how they will be mitigated.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="e.g. Technical complexity may cause delays"
              value={newRisk}
              onChange={(e) => setNewRisk(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addRisk()}
            />
            <Button onClick={addRisk} size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          {formData.risks.length > 0 && (
            <div className="space-y-2">
              {formData.risks.map((risk, index) => (
                <div key={index} className="flex items-center justify-between bg-orange-50 dark:bg-orange-950/20 p-3 rounded-lg border border-orange-200 dark:border-orange-800">
                  <span className="text-sm">{risk}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeRisk(index)}
                    className="h-6 w-6 p-0 hover:bg-orange-100 dark:hover:bg-orange-900/30"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Progress Summary */}
      <Card className="border-2 border-dashed">
        <CardContent className="p-4">
          <div className="text-sm text-muted-foreground">
            <strong>Next:</strong> Configure voting parameters and timeline for your proposal
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
