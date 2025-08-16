import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  Upload, 
  File, 
  Video, 
  FileText, 
  BookOpen, 
  X,
  Check,
  AlertCircle
} from "lucide-react";

const VaultUpload = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [contentType, setContentType] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();

  const contentTypes = [
    { value: 'webinar-recording', label: 'Webinar Recording', icon: Video },
    { value: 'pdf', label: 'PDF Document', icon: FileText },
    { value: 'course', label: 'Course Material', icon: BookOpen },
    { value: 'other', label: 'Other', icon: File },
  ];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    setFiles(prev => [...prev, ...selectedFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags(prev => [...prev, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setTags(prev => prev.filter(t => t !== tag));
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !contentType || files.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields and select at least one file.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          toast({
            title: "Upload Complete",
            description: "Your content has been successfully uploaded to the vault.",
          });
          // Reset form
          setTitle('');
          setDescription('');
          setContentType('');
          setTags([]);
          setFiles([]);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 300);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getContentIcon = (type: string) => {
    const contentType = contentTypes.find(ct => ct.value === type);
    const IconComponent = contentType?.icon || File;
    return <IconComponent className="w-5 h-5" />;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Upload Content</h1>
        <p className="text-muted-foreground">Add new content to your vault for participants to access</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Upload Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Content Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpload} className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter content title"
                    required
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your content..."
                    rows={4}
                  />
                </div>

                {/* Content Type */}
                <div className="space-y-2">
                  <Label>Content Type *</Label>
                  <Select value={contentType} onValueChange={setContentType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select content type" />
                    </SelectTrigger>
                    <SelectContent>
                      {contentTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-2">
                            <type.icon className="w-4 h-4" />
                            {type.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Add a tag"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    />
                    <Button type="button" onClick={addTag} variant="outline">
                      Add
                    </Button>
                  </div>
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="gap-1">
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="hover:text-destructive"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* File Upload */}
                <div className="space-y-2">
                  <Label>Files *</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Drag and drop files here, or click to browse
                    </p>
                    <Input
                      type="file"
                      multiple
                      onChange={handleFileSelect}
                      className="hidden"
                      id="file-upload"
                      accept=".pdf,.mp4,.mov,.avi,.wmv,.doc,.docx,.ppt,.pptx"
                    />
                    <Label htmlFor="file-upload" className="cursor-pointer">
                      <Button type="button" variant="outline" className="pointer-events-none">
                        Choose Files
                      </Button>
                    </Label>
                  </div>
                </div>

                {/* Selected Files */}
                {files.length > 0 && (
                  <div className="space-y-2">
                    <Label>Selected Files</Label>
                    <div className="space-y-2">
                      {files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <div className="flex items-center gap-3">
                            <File className="w-5 h-5 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">{file.name}</p>
                              <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Upload Progress */}
                {uploading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Uploading...</span>
                      <span>{Math.round(uploadProgress)}%</span>
                    </div>
                    <Progress value={uploadProgress} />
                  </div>
                )}

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full gap-2" 
                  disabled={uploading || files.length === 0}
                >
                  {uploading ? (
                    <>
                      <AlertCircle className="w-4 h-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      Upload Content
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Upload Guidelines */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Upload Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-sm mb-2">Supported File Types</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Videos: MP4, MOV, AVI, WMV</li>
                  <li>• Documents: PDF, DOC, DOCX</li>
                  <li>• Presentations: PPT, PPTX</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-sm mb-2">File Size Limits</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Maximum file size: 2GB</li>
                  <li>• Total upload limit: 10GB</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-sm mb-2">Best Practices</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Use descriptive titles</li>
                  <li>• Add relevant tags for discoverability</li>
                  <li>• Include detailed descriptions</li>
                  <li>• Choose appropriate content type</li>
                </ul>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center gap-2 text-success">
                  <Check className="w-4 h-4" />
                  <span className="text-sm font-medium">Automatic Processing</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Uploaded content will be automatically processed and made available to participants.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VaultUpload;