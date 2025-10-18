import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Textarea } from './ui/textarea';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { 
  ArrowLeft, 
  Users, 
  Calendar,
  Clock,
  ExternalLink,
  Copy,
  Share2,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Eye,
  Vote,
  TrendingUp,
  Activity,
  Hash,
  FileText,
  Globe
} from 'lucide-react';

interface Proposal {
  id: string;
  title: string;
  description: string;
  author: string;
  authorAvatar?: string;
  status: 'active' | 'passed' | 'failed' | 'closed';
  category: string;
  created: string;
  startDate: string;
  endDate: string;
  daysLeft: number;
  votes: {
    for: number;
    against: number;
    abstain: number;
    total: number;
  };
  choices: string[];
  strategy: string;
  snapshot: string;
  quorum: number;
  participation: number;
  ipfsHash?: string;
  discussion?: string;
}

interface ProposalDetailsProps {
  onBackToDAO: (daoName: string) => void;
  proposal?: Proposal;
}

export function ProposalDetails({ onBackToDAO, proposal }: ProposalDetailsProps) {
  const [activeTab, setActiveTab] = useState('information');
  const [selectedChoice, setSelectedChoice] = useState('');
  const [votingPower, setVotingPower] = useState('2,500');
  const [userComment, setUserComment] = useState('');
  const [hasVoted, setHasVoted] = useState(false);

  // Mock proposal data if none provided
  const mockProposal: Proposal = {
    id: '0x008f190725018c3db0e6464bf31d44f09a4d7773fd1486dff0c52c27b8aba289',
    title: 'Increase Treasury Allocation for Development and Smart Contract Auditing',
    description: `## Summary

This proposal requests the allocation of additional funds from the DAO treasury to support critical development initiatives and comprehensive smart contract auditing processes.

## Background

As our ecosystem continues to grow, we need to ensure that our smart contracts are thoroughly audited and that we have sufficient resources for ongoing development. Recent security audits have identified areas for improvement, and we want to proactively address these concerns.

## Proposal Details

### Funding Allocation
- **Development Team Expansion**: ₳150,000
- **Smart Contract Auditing**: ₳75,000
- **Security Infrastructure**: ₳50,000
- **Emergency Response Fund**: ₳25,000

### Timeline
- Q1 2025: Team hiring and initial audits
- Q2 2025: Development sprint and security improvements
- Q3 2025: Final audits and deployment
- Q4 2025: Monitoring and optimization

### Expected Outcomes
1. Enhanced security posture across all smart contracts
2. Faster development cycles with expanded team
3. Improved user confidence and adoption
4. Reduced technical debt and vulnerabilities

## Technical Implementation

The allocated funds will be distributed through a multi-signature treasury wallet with the following parameters:
- 3-of-5 signature requirement for fund disbursement
- Quarterly milestone-based releases
- Public transparency reports for all expenditures

## Risk Assessment

**Low Risk**: All proposed initiatives follow established best practices  
**Mitigation**: Funds will be released incrementally based on achieved milestones

## Conclusion

This allocation represents a strategic investment in the long-term security and growth of our ecosystem. The proposed budget is conservative and based on current market rates for development and auditing services.`,
    author: 'Apple Inc DAO',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face',
    status: 'active',
    category: 'Funding',
    created: '2025-01-10T14:30:00Z',
    startDate: '2025-01-10T14:30:00Z',
    endDate: '2025-01-17T14:30:00Z',
    daysLeft: 5,
    votes: {
      for: 1024,
      against: 512,
      abstain: 64,
      total: 1600
    },
    choices: ['For', 'Against', 'Abstain'],
    strategy: 'upgrade platform to V2',
    snapshot: '18,847,392',
    quorum: 5,
    participation: 68.4,
    ipfsHash: 'QmXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    discussion: 'https://forum.cardano-dao.io/t/proposal-increase-treasury-allocation/1234'
  };

  const currentProposal = proposal || mockProposal;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-blue-500 text-white">Active</Badge>;
      case 'passed':
        return <Badge className="bg-green-500 text-white">Passed</Badge>;
      case 'failed':
        return <Badge className="bg-red-500 text-white">Failed</Badge>;
      case 'closed':
        return <Badge variant="secondary">Closed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'passed':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const calculateVotePercentages = () => {
    const totalVotes = currentProposal.votes.for + currentProposal.votes.against + currentProposal.votes.abstain;
    if (totalVotes === 0) return { forPercent: 0, againstPercent: 0, abstainPercent: 0 };
    
    return {
      forPercent: Math.round((currentProposal.votes.for / totalVotes) * 100),
      againstPercent: Math.round((currentProposal.votes.against / totalVotes) * 100),
      abstainPercent: Math.round((currentProposal.votes.abstain / totalVotes) * 100)
    };
  };

  const votePercentages = calculateVotePercentages();

  const handleVote = () => {
    if (selectedChoice) {
      setHasVoted(true);
      // In a real app, this would submit the vote to the blockchain
      console.log('Voting:', selectedChoice, 'with power:', votingPower);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const mockDiscussion = [
    {
      id: 1,
      author: 'Alice Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b8e5?w=64&h=64&fit=crop&crop=face',
      content: 'This proposal makes a lot of sense. The security audits are crucial for maintaining user trust.',
      timestamp: '2025-01-12T09:30:00Z',
      likes: 12
    },
    {
      id: 2,
      author: 'Bob Martinez',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face',
      content: 'I support the development fund allocation, but I think we should consider phasing the auditing costs over multiple quarters.',
      timestamp: '2025-01-12T11:45:00Z',
      likes: 8
    },
    {
      id: 3,
      author: 'Carol Johnson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face',
      content: 'The emergency response fund is a great addition. We learned from recent DeFi exploits that having quick response capabilities is essential.',
      timestamp: '2025-01-12T15:15:00Z',
      likes: 15
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-blue-950 dark:via-gray-900 dark:to-green-950">
      {/* Sub Header */}
      <div className="border-b border-border/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => onBackToDAO(currentProposal.author)} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to DAO
            </Button>
            <div className="flex items-center gap-3">
              {getStatusIcon(currentProposal.status)}
              <div>
                <h1 className="text-xl font-semibold">{currentProposal.title}</h1>
                <p className="text-sm text-muted-foreground">
                  by {currentProposal.author} • {currentProposal.category}
                </p>
              </div>
            </div>
            <div className="ml-auto flex items-center gap-2">
              {getStatusBadge(currentProposal.status)}
              <Button size="sm" variant="outline" className="gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">

            {/* Proposal Content */}
            <Card className="border border-border rounded-lg bg-card/90 backdrop-blur-xl shadow-lg">
              <CardContent className="p-6">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="information">Information</TabsTrigger>
                    <TabsTrigger value="votes">Votes</TabsTrigger>
                    <TabsTrigger value="discussion">Discussion</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="information" className="mt-6">
                    <div className="prose prose-sm max-w-none dark:prose-invert">
                      <div dangerouslySetInnerHTML={{ __html: currentProposal.description.replace(/\n/g, '<br />').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/##\s(.*?)(<br \/>|$)/g, '<h2>$1</h2>').replace(/###\s(.*?)(<br \/>|$)/g, '<h3>$1</h3>').replace(/^-\s(.*?)(<br \/>|$)/gm, '<li>$1</li>').replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>') }} />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="votes" className="mt-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-green-600">{currentProposal.votes.for.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">For ({votePercentages.forPercent}%)</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-red-600">{currentProposal.votes.against.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">Against ({votePercentages.againstPercent}%)</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-gray-600">{currentProposal.votes.abstain.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">Abstain ({votePercentages.abstainPercent}%)</div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-semibold">Voting Results</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>For</span>
                          <span>{votePercentages.forPercent}%</span>
                        </div>
                        <Progress value={votePercentages.forPercent} className="h-2 bg-gray-200">
                          <div className="h-full bg-green-500 transition-all" style={{ width: `${votePercentages.forPercent}%` }} />
                        </Progress>
                        
                        <div className="flex justify-between text-sm">
                          <span>Against</span>
                          <span>{votePercentages.againstPercent}%</span>
                        </div>
                        <Progress value={votePercentages.againstPercent} className="h-2 bg-gray-200">
                          <div className="h-full bg-red-500 transition-all" style={{ width: `${votePercentages.againstPercent}%` }} />
                        </Progress>
                        
                        <div className="flex justify-between text-sm">
                          <span>Abstain</span>
                          <span>{votePercentages.abstainPercent}%</span>
                        </div>
                        <Progress value={votePercentages.abstainPercent} className="h-2 bg-gray-200">
                          <div className="h-full bg-gray-500 transition-all" style={{ width: `${votePercentages.abstainPercent}%` }} />
                        </Progress>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="discussion" className="mt-6 space-y-4">
                    {mockDiscussion.map((comment) => (
                      <Card key={comment.id} className="p-4">
                        <div className="flex gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={comment.avatar} alt={comment.author} />
                            <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-sm">{comment.author}</span>
                              <span className="text-xs text-muted-foreground">
                                {formatDate(comment.timestamp)}
                              </span>
                            </div>
                            <p className="text-sm mb-2">{comment.content}</p>
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="ghost" className="h-6 px-2 gap-1">
                                <ThumbsUp className="h-3 w-3" />
                                {comment.likes}
                              </Button>
                              <Button size="sm" variant="ghost" className="h-6 px-2">
                                Reply
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                    
                    <Card className="p-4">
                      <div className="space-y-3">
                        <Label htmlFor="new-comment">Add a comment</Label>
                        <Textarea
                          id="new-comment"
                          placeholder="Share your thoughts..."
                          rows={3}
                        />
                        <Button size="sm">Post Comment</Button>
                      </div>
                    </Card>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Voting Card - Only show if proposal is active */}
            {currentProposal.status === 'active' && !hasVoted && (
              <Card className="border border-border rounded-lg bg-card/90 backdrop-blur-xl shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Vote className="h-5 w-5 text-blue-600" />
                    Cast Your Vote
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Your voting power: {votingPower} CDAO tokens
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RadioGroup value={selectedChoice} onValueChange={setSelectedChoice}>
                    {currentProposal.choices.map((choice, index) => (
                      <div key={index} className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted/50">
                        <RadioGroupItem value={choice} id={choice} />
                        <Label htmlFor={choice} className="flex-1 cursor-pointer">
                          {choice}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Label htmlFor="comment">Add a comment (optional)</Label>
                    <Textarea
                      id="comment"
                      placeholder="Share your thoughts on this proposal..."
                      value={userComment}
                      onChange={(e) => setUserComment(e.target.value)}
                      rows={3}
                    />
                  </div>
                  
                  <Button 
                    onClick={handleVote} 
                    disabled={!selectedChoice}
                    className="w-full gap-2"
                  >
                    <Vote className="h-4 w-4" />
                    Submit Vote
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Vote Confirmation */}
            {hasVoted && (
              <Card className="border border-green-200 dark:border-green-800 bg-card/90 backdrop-blur-xl shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 text-green-600">
                    <CheckCircle2 className="h-6 w-6" />
                    <div>
                      <h3 className="font-semibold">Vote Submitted Successfully</h3>
                      <p className="text-sm text-muted-foreground">
                        Your vote for "{selectedChoice}" has been recorded on-chain.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            {/* Proposal Status */}
            <Card className="border border-border rounded-lg bg-card/90 backdrop-blur-xl shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Proposal Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Status</span>
                  {getStatusBadge(currentProposal.status)}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Ends</span>
                  <span className="font-medium">{formatDate(currentProposal.endDate)}</span>
                </div>
                {currentProposal.daysLeft > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Time Left</span>
                    <span className="font-medium text-orange-600">{currentProposal.daysLeft} days</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Participation</span>
                  <span className="font-medium">{currentProposal.participation}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Quorum</span>
                  <span className="font-medium">{currentProposal.quorum}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Threshold</span>
                  <span className="font-medium">67%</span>
                </div>
              </CardContent>
            </Card>

            {/* Proposal Details */}
            <Card className="border border-border rounded-lg bg-card/90 backdrop-blur-xl shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <span className="text-sm text-muted-foreground">Author</span>
                  <div className="flex items-center gap-2 mt-1">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={currentProposal.authorAvatar} alt={currentProposal.author} />
                      <AvatarFallback>{currentProposal.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{currentProposal.author}</span>
                  </div>
                </div>
                
                <div>
                  <span className="text-sm text-muted-foreground">Strategy</span>
                  <div className="font-medium">{currentProposal.strategy}</div>
                </div>
                
                <div>
                  <span className="text-sm text-muted-foreground">Snapshot</span>
                  <div className="font-medium">#{currentProposal.snapshot}</div>
                </div>
                
                <div>
                  <span className="text-sm text-muted-foreground">Created</span>
                  <div className="font-medium">{formatDate(currentProposal.created)}</div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Hash className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Proposal ID</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(currentProposal.id)}
                      className="h-6 w-6 p-0 ml-auto"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                  <code className="text-xs bg-muted px-2 py-1 rounded break-all">{currentProposal.id}</code>
                </div>
                
                {currentProposal.ipfsHash && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">IPFS</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(currentProposal.ipfsHash!)}
                        className="h-6 w-6 p-0 ml-auto"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                    <code className="text-xs bg-muted px-2 py-1 rounded break-all">{currentProposal.ipfsHash}</code>
                  </div>
                )}
                
                {currentProposal.discussion && (
                  <Button variant="outline" className="w-full gap-2" asChild>
                    <a href={currentProposal.discussion} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="h-4 w-4" />
                      View Discussion
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Voting Power */}
            <Card className="border border-border rounded-lg bg-card/90 backdrop-blur-xl shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Your Voting Power
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-2xl font-bold">{votingPower}</div>
                  <div className="text-sm text-muted-foreground">CDAO tokens</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Snapshot block: #{currentProposal.snapshot}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
