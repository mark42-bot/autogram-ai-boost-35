import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, X, Image, Video, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MediaUploadProps {
  onMediaUpload: (files: File[]) => void;
  uploadedMedia: File[];
  onRemoveMedia: (index: number) => void;
  accept?: string;
  maxFiles?: number;
  className?: string;
}

export const MediaUpload = ({ 
  onMediaUpload, 
  uploadedMedia, 
  onRemoveMedia, 
  accept = "image/*,video/*",
  maxFiles = 6,
  className 
}: MediaUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    const validFiles = files.filter(file => 
      file.type.startsWith('image/') || file.type.startsWith('video/')
    ).slice(0, maxFiles - uploadedMedia.length);
    
    if (validFiles.length > 0) {
      onMediaUpload(validFiles);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.slice(0, maxFiles - uploadedMedia.length);
    
    if (validFiles.length > 0) {
      onMediaUpload(validFiles);
    }
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return Image;
    if (file.type.startsWith('video/')) return Video;
    return FileText;
  };

  const getFilePreview = (file: File) => {
    if (file.type.startsWith('image/')) {
      return URL.createObjectURL(file);
    }
    return null;
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Upload Area */}
      <Card
        className={cn(
          "glass border-border/20 transition-all duration-300 cursor-pointer",
          isDragging && "border-primary bg-primary/5",
          uploadedMedia.length >= maxFiles && "opacity-50 cursor-not-allowed"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => uploadedMedia.length < maxFiles && fileInputRef.current?.click()}
      >
        <CardContent className="p-8 text-center">
          <Upload className={cn(
            "w-12 h-12 mx-auto mb-4 transition-colors",
            isDragging ? "text-primary" : "text-muted-foreground"
          )} />
          
          <div className="space-y-2">
            <p className="text-lg font-medium">
              {uploadedMedia.length >= maxFiles 
                ? `Maximum ${maxFiles} files uploaded` 
                : "Upload your media"
              }
            </p>
            <p className="text-sm text-muted-foreground">
              {uploadedMedia.length < maxFiles && (
                <>Drag & drop your images or videos here, or click to browse</>
              )}
            </p>
            <p className="text-xs text-muted-foreground">
              Supports JPG, PNG, GIF, MP4, MOV • Max {maxFiles} files
            </p>
          </div>

          {uploadedMedia.length < maxFiles && (
            <Button className="mt-4 gradient-primary" disabled={uploadedMedia.length >= maxFiles}>
              <Upload className="w-4 h-4 mr-2" />
              Choose Files
            </Button>
          )}
        </CardContent>
      </Card>

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple
        className="hidden"
        onChange={handleFileSelect}
      />

      {/* Uploaded Media Preview */}
      {uploadedMedia.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {uploadedMedia.map((file, index) => {
            const FileIcon = getFileIcon(file);
            const preview = getFilePreview(file);
            
            return (
              <Card key={index} className="glass border-border/20 relative group">
                <CardContent className="p-2">
                  <div className="aspect-square rounded-lg overflow-hidden bg-muted/50 relative">
                    {preview ? (
                      <img 
                        src={preview} 
                        alt={file.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FileIcon className="w-8 h-8 text-muted-foreground" />
                      </div>
                    )}
                    
                    {/* Remove button */}
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute top-1 right-1 w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveMedia(index);
                      }}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mt-1 truncate">
                    {file.name}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};