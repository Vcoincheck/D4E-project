import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Separator } from '../../ui/separator';
import { Alert, AlertDescription } from '../../ui/alert';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  Users, 
  Vote, 
  Wallet, 
  Settings,
  Shield,
  Clock
} from 'lucide-react';

interface ReviewConfirmStepProps {
  data: any;
  onUpdate: (data: any) => void;
}

export function ReviewConfirmStep({ data }: ReviewConfirmStepProps) {
  const estimatedDeploymentTime = '2-3 minutes';
  const estimatedCosts = {
    deployment: 50,
    governance: 25,
    treasury: 10,
    total: 85
  };

  const criticalChecks = [
    {
      id: 'treasury-setup',
      label: 'Treasury configuration is secure',
      status: data.treasuryType ? 'complete' : 'warning',
      description: data.treasuryType === 'multisig' ? 'Multi-sig treasury configured' : 'DAO-controlled treasury'
    },
    {
      id: 'governance-params',
      label: 'Governance parameters are reasonable',
      status: data.quorumPercentage?.[0] >= 10 ? 'complete' : 'warning',
      description: `${data.quorumPercentage?.[0] || 0}% quorum threshold`
    },
    {
      id: 'voting-mechanism',
      label: 'Voting mechanism selected',
      status: data.votingMechanism ? 'complete' : 'incomplete',
      description: data.votingMechanism?.replace('-', ' ') || 'Not configured'
    }
  ];

  const renderValue = (value: any, fallback = 'Not set') => {
    if (value === null || value === undefined || value === '') return fallback;
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    if (Array.isArray(value)) return value.length > 0 ? value.join(', ') : fallback;
    return value.toString();
  };

  return (
    <div className="space-y-6">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          Please review all configurations carefully. While many settings can be changed later through governance, 
          some core parameters are permanent after deployment.
        </AlertDescription>
      </Alert>

      {/* Pre-deployment Checks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5" />
            Pre-deployment Checks
          </CardTitle>
          <CardDescription>
            Critical configuration validation before deployment.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {criticalChecks.map((check) => (
            <div key={check.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
              <div className="flex items-center gap-3">
                {check.status === 'complete' && (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                )}
                {check.status === 'warning' && (
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                )}
                {check.status === 'incomplete' && (
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                )}
                <div>
                  <div className="font-medium text-sm">{check.label}</div>
                  <div className="text-xs text-muted-foreground">{check.description}</div>
                </div>
              </div>
              <Badge variant={
                check.status === 'complete' ? 'secondary' :
                check.status === 'warning' ? 'secondary' : 'destructive'
              }>
                {check.status}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* DAO Information Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            DAO Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium text-muted-foreground">Name</div>
              <div className="font-medium">{renderValue(data.name)}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">Token Symbol</div>
              <div className="font-medium">{renderValue(data.symbol)}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">Category</div>
              <div className="font-medium">{renderValue(data.category)}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">Tags</div>
              <div className="flex flex-wrap gap-1">
                {data.tags?.length > 0 ? (
                  data.tags.map((tag: string) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))
                ) : (
                  <span className="text-muted-foreground">None</span>
                )}
              </div>
            </div>
          </div>
          {data.description && (
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-2">Description</div>
              <p className="text-sm p-3 bg-muted rounded-lg">{data.description}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Governance Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Vote className="h-5 w-5" />
            Governance Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium text-muted-foreground">Quorum Threshold</div>
              <div className="font-medium">{renderValue(data.quorumPercentage?.[0])}%</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">Voting Period</div>
              <div className="font-medium">{renderValue(data.votingPeriodDays)} days</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">Proposal Threshold</div>
              <div className="font-medium">{renderValue(data.proposalThreshold)} tokens</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">Execution Delay</div>
              <div className="font-medium">{renderValue(data.executionDelay)} days</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">Voting Mechanism</div>
              <div className="font-medium capitalize">{renderValue(data.votingMechanism?.replace('-', ' '))}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">Support Threshold</div>
              <div className="font-medium">{renderValue(data.supportThreshold?.[0])}%</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Treasury Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Treasury Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium text-muted-foreground">Treasury Type</div>
              <div className="font-medium capitalize">{renderValue(data.treasuryType?.replace('-', ' '))}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">Initial Funding</div>
              <div className="font-medium">{renderValue(data.initialFunding)} ADA</div>
            </div>
            {data.treasuryType === 'multisig' && (
              <>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Multisig Signers</div>
                  <div className="font-medium">{data.multisigSigners?.length || 0}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Required Signatures</div>
                  <div className="font-medium">{renderValue(data.requiredSignatures)}</div>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Members */}
      {data.members?.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Initial Members ({data.members.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {data.members.slice(0, 5).map((member: any) => (
                <div key={member.id} className="flex items-center justify-between p-2 border border-border rounded">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs">
                      {member.name?.charAt(0) || 'M'}
                    </div>
                    <span className="text-sm">{member.name || 'Anonymous'}</span>
                    <Badge variant="outline" className="text-xs">{member.role}</Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">{member.tokenAllocation} tokens</span>
                </div>
              ))}
              {data.members.length > 5 && (
                <div className="text-center text-sm text-muted-foreground">
                  +{data.members.length - 5} more members
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Deployment Costs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Deployment Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Smart Contract Deployment</span>
              <span className="text-sm">{estimatedCosts.deployment} ADA</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Governance Setup</span>
              <span className="text-sm">{estimatedCosts.governance} ADA</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Treasury Initialization</span>
              <span className="text-sm">{estimatedCosts.treasury} ADA</span>
            </div>
            <Separator />
            <div className="flex justify-between font-medium">
              <span>Total Estimated Cost</span>
              <span>{estimatedCosts.total} ADA</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div>
              <div className="font-medium text-sm">Estimated Deployment Time</div>
              <div className="text-xs text-muted-foreground">Including blockchain confirmations</div>
            </div>
            <Badge variant="outline">{estimatedDeploymentTime}</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Final Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Ready to Deploy
          </CardTitle>
          <CardDescription>
            Once deployed, your DAO will be live on the Cardano blockchain.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Make sure you have sufficient ADA in your wallet to cover deployment costs and initial treasury funding.
            </AlertDescription>
          </Alert>

          <Button size="lg" className="w-full gap-2">
            <CheckCircle2 className="h-5 w-5" />
            Deploy DAO to Cardano
          </Button>

          <p className="text-center text-xs text-muted-foreground mt-2">
            By deploying, you agree to the platform terms and Cardano network fees
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
