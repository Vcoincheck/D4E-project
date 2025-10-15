import { useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { 
  ArrowLeft, 
  Building2, 
  Users, 
  Settings, 
  HelpCircle, 
  Upload, 
  Eye,
  CheckCircle,
  Sparkles
} from 'lucide-react';

interface EnterpriseDAOCreatorProps {
  onBack: () => void;
}

interface CompanyInfo {
  name: string;
  email: string;
  industry: string;
  employeeCount: string;
}

interface GovernanceRules {
  votingStyle: string;
  proposalCreation: string;
  decisionThreshold: string;
}

interface TeamMember {
  name: string;
  role: string;
  department: string;
}

export function EnterpriseDAOCreator({ onBack }: EnterpriseDAOCreatorProps) {
  const [activeStep, setActiveStep] = useState(1);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    name: '',
    email: '',
    industry: '',
    employeeCount: ''
  });
  const [governanceRules, setGovernanceRules] = useState<GovernanceRules>({
    votingStyle: '',
    proposalCreation: '',
    decisionThreshold: ''
  });
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  const steps = [
    { id: 1, title: 'Company Info', icon: Building2, completed: companyInfo.name && companyInfo.email && companyInfo.industry && companyInfo.employeeCount },
    { id: 2, title: 'Team & Departments', icon: Users, completed: teamMembers.length > 0 },
    { id: 3, title: 'Governance Rules', icon: Settings, completed: governanceRules.votingStyle && governanceRules.proposalCreation && governanceRules.decisionThreshold }
  ];

  const industries = [
    { value: 'tech', label: 'Technology' },
    { value: 'finance', label: 'Finance' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'creative', label: 'Creative & Media' },
    { value: 'nonprofit', label: 'Non-Profit' },
    { value: 'education', label: 'Education' },
    { value: 'retail', label: 'Retail' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'other', label: 'Other' }
  ];

  const employeeCounts = [
    { value: '1-5', label: '1-5 employees' },
    { value: '6-50', label: '6-50 employees' },
    { value: '51-100', label: '51-100 employees' },
    { value: '100+', label: 'More than 100 employees' }
  ];

  const addTeamMember = useCallback(() => {
    setTeamMembers(prev => [...prev, { name: '', role: '', department: '' }]);
  }, []);

  const updateTeamMember = useCallback((index: number, field: keyof TeamMember, value: string) => {
    setTeamMembers(prev => prev.map((member, i) => 
      i === index ? { ...member, [field]: value } : member
    ));
  }, []);

  const generateSampleTeam = useCallback(() => {
    const sampleTeams = {
      '1-5': [
        { name: 'Alex Johnson', role: 'Founder & CEO', department: 'Leadership' },
        { name: 'Sarah Chen', role: 'CTO', department: 'Technology' },
        { name: 'Mike Davis', role: 'Head of Sales', department: 'Sales' },
        { name: 'Emma Wilson', role: 'Product Manager', department: 'Product' }
      ],
      '6-50': [
        { name: 'Alex Johnson', role: 'CEO', department: 'Leadership' },
        { name: 'Sarah Chen', role: 'CTO', department: 'Technology' },
        { name: 'Mike Davis', role: 'Head of Sales', department: 'Sales' },
        { name: 'Emma Wilson', role: 'Head of Product', department: 'Product' },
        { name: 'David Kim', role: 'Head of Marketing', department: 'Marketing' },
        { name: 'Lisa Rodriguez', role: 'Head of Operations', department: 'Operations' }
      ],
      '51-100': [
        { name: 'Alex Johnson', role: 'CEO', department: 'Executive' },
        { name: 'Sarah Chen', role: 'CTO', department: 'Technology' },
        { name: 'Mike Davis', role: 'VP Sales', department: 'Sales' },
        { name: 'Emma Wilson', role: 'VP Product', department: 'Product' },
        { name: 'David Kim', role: 'VP Marketing', department: 'Marketing' },
        { name: 'Lisa Rodriguez', role: 'VP Operations', department: 'Operations' },
        { name: 'James Brown', role: 'Head of Finance', department: 'Finance' },
        { name: 'Maria Garcia', role: 'Head of HR', department: 'Human Resources' }
      ],
      '100+': [
        { name: 'Alex Johnson', role: 'CEO', department: 'Executive' },
        { name: 'Sarah Chen', role: 'CTO', department: 'Technology' },
        { name: 'Mike Davis', role: 'VP Sales', department: 'Sales' },
        { name: 'Emma Wilson', role: 'VP Product', department: 'Product' },
        { name: 'David Kim', role: 'VP Marketing', department: 'Marketing' },
        { name: 'Lisa Rodriguez', role: 'VP Operations', department: 'Operations' },
        { name: 'James Brown', role: 'CFO', department: 'Finance' },
        { name: 'Maria Garcia', role: 'VP Human Resources', department: 'Human Resources' },
        { name: 'Robert Taylor', role: 'VP Engineering', department: 'Engineering' },
        { name: 'Jennifer Lee', role: 'VP Legal', department: 'Legal' }
      ]
    };
    
    const sample = sampleTeams[companyInfo.employeeCount as keyof typeof sampleTeams] || sampleTeams['1-5'];
    setTeamMembers(sample);
  }, [companyInfo.employeeCount]);

  const renderOrgChart = () => {
    if (teamMembers.length === 0) return null;

    const departments = [...new Set(teamMembers.map(m => m.department))];
    
    return (
      <div className="space-y-4">
        <h4 className="font-semibold text-center text-foreground">Organization Structure Preview</h4>
        <div className="grid gap-4">
          {departments.map(dept => {
            const deptMembers = teamMembers.filter(m => m.department === dept);
            return (
              <div key={dept} className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg p-4">
                <h5 className="font-medium mb-3 text-blue-700 dark:text-blue-300">{dept}</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {deptMembers.map((member, idx) => (
                    <div key={idx} className="bg-white/60 dark:bg-gray-800/60 rounded-md p-2 text-sm">
                      <div className="font-medium">{member.name || 'Name TBD'}</div>
                      <div className="text-muted-foreground text-xs">{member.role || 'Role TBD'}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderPreview = () => {
    const completedSteps = steps.filter(step => step.completed).length;
    const progress = (completedSteps / steps.length) * 100;

    return (
      <Card className="bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 border-2 border-blue-200/50 dark:border-blue-800/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
            <Eye className="h-5 w-5" />
            DAO Blueprint Preview
          </CardTitle>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500" 
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            {completedSteps} of {steps.length} sections completed
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {companyInfo.name && (
            <div>
              <h4 className="font-medium text-blue-700 dark:text-blue-300">Organization</h4>
              <p className="text-sm">{companyInfo.name} ({companyInfo.industry})</p>
              <p className="text-xs text-muted-foreground">{companyInfo.employeeCount}</p>
            </div>
          )}
          
          {teamMembers.length > 0 && (
            <div>
              <h4 className="font-medium text-blue-700 dark:text-blue-300">Structure</h4>
              <p className="text-sm">{teamMembers.length} members across {[...new Set(teamMembers.map(m => m.department))].length} departments</p>
            </div>
          )}
          
          {governanceRules.votingStyle && (
            <div>
              <h4 className="font-medium text-blue-700 dark:text-blue-300">Governance</h4>
              <div className="text-sm space-y-1">
                <p>Voting: {governanceRules.votingStyle}</p>
                <p>Proposals: {governanceRules.proposalCreation}</p>
                <p>Threshold: {governanceRules.decisionThreshold}</p>
              </div>
            </div>
          )}
          
          {completedSteps === steps.length && (
            <div className="pt-4 border-t border-blue-200 dark:border-blue-800">
              <Button 
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                size="lg"
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Generate DAO Blueprint
              </Button>
              <p className="text-xs text-center mt-2 text-muted-foreground">
                You'll get a visual & editable DAO layout. Blockchain setup comes later.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-blue-950 dark:via-gray-900 dark:to-green-950">
        {/* Header */}
        <div className="border-b border-border/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-xl font-semibold">Let's help you set up your digital organization</h1>
                <p className="text-sm text-muted-foreground">Simple setup, no crypto knowledge required</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* Step Indicator */}
          <div className="mb-12">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = activeStep === step.id;
                const isCompleted = step.completed;
                
                return (
                  <div key={step.id} className="flex items-center">
                    <div 
                      className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                        isCompleted ? 'bg-green-500 border-green-500 text-white' :
                        isActive ? 'bg-blue-500 border-blue-500 text-white' :
                        'bg-white border-gray-300 text-gray-400'
                      }`}
                    >
                      {isCompleted ? <CheckCircle className="h-6 w-6" /> : <Icon className="h-6 w-6" />}
                    </div>
                    <div className="ml-3 hidden sm:block">
                      <p className={`text-sm font-medium ${isActive || isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
                        Step {step.id}
                      </p>
                      <p className={`text-xs ${isActive || isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {step.title}
                      </p>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-16 h-1 mx-4 ${isCompleted ? 'bg-green-500' : 'bg-gray-200'} transition-all duration-300`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Step 1: Company Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: activeStep >= 1 ? 1 : 0.5, y: 0 }}
                className={activeStep >= 1 ? '' : 'pointer-events-none'}
              >
                <Card className="border-2 border-blue-200/50 dark:border-blue-800/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-blue-600" />
                      Company Information
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Tell us about your organization to customize your DAO structure
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Label htmlFor="company-name">Company Name</Label>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button type="button" className="p-0 h-auto bg-transparent border-none">
                                <HelpCircle className="h-4 w-4 text-muted-foreground" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>This will be the official name of your DAO. You can change it later.</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <Input
                          id="company-name"
                          placeholder="e.g., Acme Corp"
                          value={companyInfo.name}
                          onChange={(e) => setCompanyInfo(prev => ({ ...prev, name: e.target.value }))}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Label htmlFor="company-email">Contact Email</Label>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button type="button" className="p-0 h-auto bg-transparent border-none">
                                <HelpCircle className="h-4 w-4 text-muted-foreground" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>We'll use this for important updates about your DAO setup.</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <Input
                          id="company-email"
                          type="email"
                          placeholder="contact@company.com"
                          value={companyInfo.email}
                          onChange={(e) => setCompanyInfo(prev => ({ ...prev, email: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Label>Industry</Label>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button type="button" className="p-0 h-auto bg-transparent border-none">
                                <HelpCircle className="h-4 w-4 text-muted-foreground" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Helps us suggest relevant governance templates for your industry.</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <Select 
                          value={companyInfo.industry}
                          onValueChange={(value) => setCompanyInfo(prev => ({ ...prev, industry: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select industry" />
                          </SelectTrigger>
                          <SelectContent>
                            {industries.map(industry => (
                              <SelectItem key={industry.value} value={industry.value}>
                                {industry.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Label>Company Size</Label>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button type="button" className="p-0 h-auto bg-transparent border-none">
                                <HelpCircle className="h-4 w-4 text-muted-foreground" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Determines the organizational structure and voting mechanisms we'll suggest.</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <Select 
                          value={companyInfo.employeeCount}
                          onValueChange={(value) => setCompanyInfo(prev => ({ ...prev, employeeCount: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select company size" />
                          </SelectTrigger>
                          <SelectContent>
                            {employeeCounts.map(count => (
                              <SelectItem key={count.value} value={count.value}>
                                {count.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {steps[0].completed && (
                      <div className="flex justify-end">
                        <Button onClick={() => setActiveStep(2)} className="bg-blue-600 hover:bg-blue-700">
                          Continue to Team Setup
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Step 2: Team Setup */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: activeStep >= 2 ? 1 : 0.5, y: 0 }}
                className={activeStep >= 2 ? '' : 'pointer-events-none'}
              >
                <Card className="border-2 border-green-200/50 dark:border-green-800/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-green-600" />
                      Team & Department Structure
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Define your team structure for governance roles
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-wrap gap-3">
                      <Button 
                        variant="outline" 
                        onClick={generateSampleTeam}
                        className="border-green-200 dark:border-green-800"
                      >
                        <Sparkles className="h-4 w-4 mr-2" />
                        Generate Sample Team
                      </Button>
                      <Button variant="outline" onClick={addTeamMember}>
                        Add Team Member
                      </Button>
                      <div className="flex items-center gap-2">
                        <Button variant="outline">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload CSV
                        </Button>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button type="button" className="p-0 h-auto bg-transparent border-none">
                              <HelpCircle className="h-4 w-4 text-muted-foreground" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Upload a CSV with columns: Name, Role, Department</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>

                    {teamMembers.length > 0 && (
                      <div className="space-y-4">
                        <h4 className="font-medium">Team Members</h4>
                        <div className="grid gap-3">
                          {teamMembers.map((member, index) => (
                            <div key={index} className="grid grid-cols-3 gap-3 p-3 bg-muted/50 rounded-md">
                              <Input
                                placeholder="Full Name"
                                value={member.name}
                                onChange={(e) => updateTeamMember(index, 'name', e.target.value)}
                              />
                              <Input
                                placeholder="Role/Title"
                                value={member.role}
                                onChange={(e) => updateTeamMember(index, 'role', e.target.value)}
                              />
                              <Input
                                placeholder="Department"
                                value={member.department}
                                onChange={(e) => updateTeamMember(index, 'department', e.target.value)}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {renderOrgChart()}

                    {teamMembers.length > 0 && (
                      <div className="flex justify-between">
                        <Button variant="outline" onClick={() => setActiveStep(1)}>
                          Back
                        </Button>
                        <Button onClick={() => setActiveStep(3)} className="bg-green-600 hover:bg-green-700">
                          Continue to Governance
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Step 3: Governance Setup */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: activeStep >= 3 ? 1 : 0.5, y: 0 }}
                className={activeStep >= 3 ? '' : 'pointer-events-none'}
              >
                <Card className="border-2 border-purple-200/50 dark:border-purple-800/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5 text-purple-600" />
                      Basic Governance Rules
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Set up how decisions will be made in your DAO
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Label>Voting Style</Label>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button type="button" className="p-0 h-auto bg-transparent border-none">
                                <HelpCircle className="h-4 w-4 text-muted-foreground" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Single-choice: One option per vote. Multiple-choice: Can vote for several options. Quadratic: Voting power scales with tokens.</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <Select 
                          value={governanceRules.votingStyle}
                          onValueChange={(value) => setGovernanceRules(prev => ({ ...prev, votingStyle: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Choose voting method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="single-choice">Single Choice (Most Common)</SelectItem>
                            <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                            <SelectItem value="quadratic">Quadratic Voting (Advanced)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Label>Who Can Create Proposals?</Label>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button type="button" className="p-0 h-auto bg-transparent border-none">
                                <HelpCircle className="h-4 w-4 text-muted-foreground" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Anyone: All members can propose. Managers only: Only leadership roles can create proposals.</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <Select 
                          value={governanceRules.proposalCreation}
                          onValueChange={(value) => setGovernanceRules(prev => ({ ...prev, proposalCreation: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select proposal creation rights" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="anyone">Anyone (Democratic)</SelectItem>
                            <SelectItem value="managers">Managers Only (Structured)</SelectItem>
                            <SelectItem value="committee">Committee Members</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Label>Decision Threshold</Label>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button type="button" className="p-0 h-auto bg-transparent border-none">
                                <HelpCircle className="h-4 w-4 text-muted-foreground" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Simple majority: 50% + 1 vote. 2/3 majority: Requires 67% agreement for important decisions.</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <Select 
                          value={governanceRules.decisionThreshold}
                          onValueChange={(value) => setGovernanceRules(prev => ({ ...prev, decisionThreshold: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Choose decision threshold" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="simple-majority">Simple Majority (50% + 1)</SelectItem>
                            <SelectItem value="super-majority">2/3 Majority (67%)</SelectItem>
                            <SelectItem value="consensus">Consensus (90%+)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {steps[2].completed && (
                      <div className="flex justify-between">
                        <Button variant="outline" onClick={() => setActiveStep(2)}>
                          Back
                        </Button>
                        <Badge variant="secondary" className="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Setup Complete!
                        </Badge>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Preview Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                {renderPreview()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
