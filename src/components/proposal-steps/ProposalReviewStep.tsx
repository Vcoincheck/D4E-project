import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { 
  CheckCircle, 
  Clock, 
  Users, 
  Vote, 
  FileText, 
  Link, 
  Upload,
  AlertTriangle,
  Info
} from 'lucide-react';

interface ProposalReviewStepProps {
  data: any;
  onUpdate: (data: any) => void;
}

export function ProposalReviewStep({ data }: ProposalReviewStepProps) {
  const mockDAOs = {
    'cardano-innovation': 'Cardano Innovation DAO',
    'sundaeswap': 'SundaeSwap DAO',
    'minswap': 'MinSwap Protocol',
    'catalyst': 'Catalyst Community'
  };

  const categories = {
    funding: 'Funding Request',
    governance: 'Governance Change', 
    operation: 'Operational Decision',
    technical: 'Technical Upgrade',
    partnership: 'Partnership',
    treasury: 'Treasury Management',
    community: 'Community Initiative',
    other: 'Other'
  };

  const votingTypes = {
    'single-choice': 'Single Choice (Yes/No)',
    'single-choice-abstain': 'Yes/No/Abstain',
    'multiple-choice': 'Multiple Choice',
    'weighted': 'Weighted Voting',
    'quadratic': 'Quadratic Voting',
    'ranking': 'Ranked Choice'
  };

  const handleSubmit = () => {
    console.log('Submitting proposal:', data);
    // Handle proposal submission
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Proposal Overview */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Proposal Overview
          </CardTitle>
          <CardDescription>
            Review your proposal details before submission.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium mb-1">Target DAO</div>
              <div className="text-muted-foreground">
                {mockDAOs[data.selectedDAO as keyof typeof mockDAOs] || 'Not selected'}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium mb-1">Category</div>
              <Badge variant="outline">
                {categories[data.category as keyof typeof categories] || 'Not selected'}
              </Badge>
            </div>
          </div>
          
          <div>
            <div className="text-sm font-medium mb-2">Proposal Title</div>
            <div className="bg-muted/50 p-3 rounded-lg border">
              {data.title || 'No title provided'}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Proposal Details */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Content Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="text-sm font-medium mb-2">Description</div>
            <div className="bg-muted/50 p-3 rounded-lg border max-h-32 overflow-y-auto text-sm">
              {data.description || 'No description provided'}
            </div>
          </div>

          {data.motivation && (
            <div>
              <div className="text-sm font-medium mb-2">Motivation</div>
              <div className="bg-muted/50 p-3 rounded-lg border max-h-24 overflow-y-auto text-sm">
                {data.motivation}
              </div>
            </div>
          )}

          {data.budget && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium mb-1">Budget</div>
                <div className="text-muted-foreground">{data.budget}</div>
              </div>
              <div>
                <div className="text-sm font-medium mb-1">Timeline</div>
                <div className="text-muted-foreground">{data.timeline || 'Not specified'}</div>
              </div>
            </div>
          )}

          {data.success_metrics && data.success_metrics.length > 0 && (
            <div>
              <div className="text-sm font-medium mb-2">Success Metrics ({data.success_metrics.length})</div>
              <div className="space-y-1">
                {data.success_metrics.slice(0, 3).map((metric: string, index: number) => (
                  <div key={index} className="text-sm text-muted-foreground">• {metric}</div>
                ))}
                {data.success_metrics.length > 3 && (
                  <div className="text-xs text-muted-foreground">+{data.success_metrics.length - 3} more</div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Voting Configuration */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Vote className="h-5 w-5" />
            Voting Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium mb-1">Voting Method</div>
              <Badge variant="outline">
                {votingTypes[data.votingType as keyof typeof votingTypes] || 'Not configured'}
              </Badge>
            </div>
            <div>
              <div className="text-sm font-medium mb-1">Duration</div>
              <div className="text-muted-foreground flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {data.votingDuration || 'Not set'} days
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium mb-1">Minimum Quorum</div>
              <div className="text-muted-foreground flex items-center gap-1">
                <Users className="h-4 w-4" />
                {data.quorumRequired || 'Not set'}%
              </div>
            </div>
            <div>
              <div className="text-sm font-medium mb-1">Pass Threshold</div>
              <div className="text-muted-foreground">
                {data.passThreshold || 'Not set'}%
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            {data.allowDelegation && (
              <Badge variant="secondary" className="gap-1">
                <CheckCircle className="h-3 w-3" />
                Delegation Allowed
              </Badge>
            )}
            {data.enableDiscussion && (
              <Badge variant="secondary" className="gap-1">
                <CheckCircle className="h-3 w-3" />
                Discussion Enabled
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Supporting Materials */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Supporting Materials
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="font-medium text-lg">
                {data.attachments ? data.attachments.length : 0}
              </div>
              <div className="text-sm text-muted-foreground">Files Attached</div>
            </div>
            <div className="text-center">
              <div className="font-medium text-lg">
                {data.links ? data.links.length : 0}
              </div>
              <div className="text-sm text-muted-foreground">External Links</div>
            </div>
            <div className="text-center">
              <div className="font-medium text-lg">
                {data.attachments && data.attachments.length > 0
                  ? formatFileSize(data.attachments.reduce((total: number, file: File) => total + file.size, 0))
                  : '0 MB'}
              </div>
              <div className="text-sm text-muted-foreground">Total Size</div>
            </div>
          </div>

          {data.attachments && data.attachments.length > 0 && (
            <div>
              <div className="text-sm font-medium mb-2">Attached Files</div>
              <div className="space-y-1">
                {data.attachments.slice(0, 3).map((file: File, index: number) => (
                  <div key={index} className="text-sm text-muted-foreground">
                    📎 {file.name} ({formatFileSize(file.size)})
                  </div>
                ))}
                {data.attachments.length > 3 && (
                  <div className="text-xs text-muted-foreground">+{data.attachments.length - 3} more files</div>
                )}
              </div>
            </div>
          )}

          {data.links && data.links.length > 0 && (
            <div>
              <div className="text-sm font-medium mb-2">External Links</div>
              <div className="space-y-1">
                {data.links.slice(0, 3).map((link: any, index: number) => (
                  <div key={index} className="text-sm text-muted-foreground flex items-center gap-1">
                    <Link className="h-3 w-3" />
                    {link.title}
                  </div>
                ))}
                {data.links.length > 3 && (
                  <div className="text-xs text-muted-foreground">+{data.links.length - 3} more links</div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Important Notes */}
      <Card className="border-2 border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-orange-300">
            <Info className="h-5 w-5" />
            Before You Submit
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-orange-700 dark:text-orange-300">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
            <div>Once submitted, you cannot edit your proposal. Make sure all details are correct.</div>
          </div>
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
            <div>Your proposal will be visible to all DAO members and may take time to be reviewed.</div>
          </div>
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
            <div>Ensure you have the necessary permissions and meet any DAO-specific requirements.</div>
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <Card className="border-2">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div>
              <h3 className="font-medium mb-2">Ready to Submit?</h3>
              <p className="text-sm text-muted-foreground">
                Your proposal will be submitted to {mockDAOs[data.selectedDAO as keyof typeof mockDAOs]} for community review and voting.
              </p>
            </div>
            <Button onClick={handleSubmit} size="lg" className="gap-2">
              <CheckCircle className="h-5 w-5" />
              Submit Proposal to DAO
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
