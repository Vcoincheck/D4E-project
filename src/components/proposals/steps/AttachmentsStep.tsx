import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Upload, FileText, Link, X, Plus, ExternalLink, Download } from 'lucide-react';

interface AttachmentsStepProps {
  data: any;
  onUpdate: (data: any) => void;
}

export function AttachmentsStep({ data, onUpdate }: AttachmentsStepProps) {
  const [formData, setFormData] = useState({
    attachments: data.attachments || [],
    links: data.links || [],
    additionalInfo: data.additionalInfo || '',
  });

  const [newLinkTitle, setNewLinkTitle] = useState('');
  const [newLinkUrl, setNewLinkUrl] = useState('');
  
  // Use a ref to track if the component has been initialized
  const isInitializedRef = useRef(false);

  // Update form data when props.data changes (but not on first render)
  useEffect(() => {
    if (!isInitializedRef.current) {
      isInitializedRef.current = true;
      return;
    }
    
    setFormData({
      attachments: data.attachments || [],
      links: data.links || [],
      additionalInfo: data.additionalInfo || '',
    });
  }, [data]);

  // Call onUpdate only when formData changes (not on initialization)
  useEffect(() => {
    if (!isInitializedRef.current) {
      return;
    }
    
    onUpdate(formData);
  }, [formData, onUpdate]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }));
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const addLink = () => {
    if (newLinkTitle.trim() && newLinkUrl.trim()) {
      setFormData(prev => ({
        ...prev,
        links: [...prev.links, { title: newLinkTitle.trim(), url: newLinkUrl.trim() }]
      }));
      setNewLinkTitle('');
      setNewLinkUrl('');
    }
  };

  const removeLink = (index: number) => {
    setFormData(prev => ({
      ...prev,
      links: prev.links.filter((_, i) => i !== index)
    }));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (filename: string) => {
    const extension = filename.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return '📄';
      case 'doc':
      case 'docx':
        return '📝';
      case 'xls':
      case 'xlsx':
        return '📊';
      case 'ppt':
      case 'pptx':
        return '📽️';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return '🖼️';
      default:
        return '📎';
    }
  };

  return (
    <div className="space-y-6">
      {/* File Attachments */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            File Attachments
          </CardTitle>
          <CardDescription>
            Upload supporting documents, images, or other relevant files.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Upload Area */}
          <div className="relative border-2 border-dashed border-border rounded-lg p-6 text-center hover:bg-muted/50 transition-colors cursor-pointer">
            <div className="w-12 h-12 bg-muted border border-border rounded-lg mx-auto mb-4 flex items-center justify-center">
              <Upload className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="text-sm text-muted-foreground mb-2">
              Click to upload or drag and drop
            </div>
            <div className="text-xs text-muted-foreground">
              PDF, DOC, XLS, PPT, images up to 10MB each
            </div>
            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.gif"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>

          {/* Uploaded Files List */}
          {formData.attachments.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Uploaded Files ({formData.attachments.length})</h4>
              <div className="space-y-2">
                {formData.attachments.map((file: File, index: number) => (
                  <div key={index} className="flex items-center justify-between bg-muted/50 p-3 rounded-lg border border-border">
                    <div className="flex items-center gap-3">
                      <div className="text-lg">{getFileIcon(file.name)}</div>
                      <div>
                        <div className="font-medium text-sm">{file.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {formatFileSize(file.size)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="text-muted-foreground">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                        className="text-destructive hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* External Links */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link className="h-5 w-5" />
            External Links
          </CardTitle>
          <CardDescription>
            Add links to external resources, documentation, or references.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Add Link Form */}
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <Label htmlFor="link-title">Link Title</Label>
                <Input
                  id="link-title"
                  placeholder="e.g. Technical Specification"
                  value={newLinkTitle}
                  onChange={(e) => setNewLinkTitle(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="link-url">URL</Label>
                <Input
                  id="link-url"
                  placeholder="https://..."
                  value={newLinkUrl}
                  onChange={(e) => setNewLinkUrl(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
            <Button onClick={addLink} size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Link
            </Button>
          </div>

          {/* Links List */}
          {formData.links.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Added Links ({formData.links.length})</h4>
              <div className="space-y-2">
                {formData.links.map((link: any, index: number) => (
                  <div key={index} className="flex items-center justify-between bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center gap-3">
                      <ExternalLink className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      <div>
                        <div className="font-medium text-sm">{link.title}</div>
                        <div className="text-xs text-muted-foreground truncate max-w-md">
                          {link.url}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeLink(index)}
                      className="text-destructive hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Additional Information */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Additional Information
          </CardTitle>
          <CardDescription>
            Provide any other relevant information or context for your proposal.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="additional-info">Additional Notes</Label>
            <Textarea
              id="additional-info"
              placeholder="Add any other relevant information, acknowledgments, or context that doesn't fit elsewhere..."
              value={formData.additionalInfo}
              onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
              className="mt-1 min-h-[120px]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card className="border-2 bg-muted/30">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="font-medium text-lg">{formData.attachments.length}</div>
              <div className="text-muted-foreground">Files Attached</div>
            </div>
            <div className="text-center">
              <div className="font-medium text-lg">{formData.links.length}</div>
              <div className="text-muted-foreground">External Links</div>
            </div>
            <div className="text-center">
              <div className="font-medium text-lg">
                {formData.attachments.reduce((total: number, file: File) => total + file.size, 0) > 0 
                  ? formatFileSize(formData.attachments.reduce((total: number, file: File) => total + file.size, 0))
                  : '0 MB'}
              </div>
              <div className="text-muted-foreground">Total Size</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Summary */}
      <Card className="border-2 border-dashed">
        <CardContent className="p-4">
          <div className="text-sm text-muted-foreground">
            <strong>Next:</strong> Review all proposal details and submit to your DAO for voting
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
