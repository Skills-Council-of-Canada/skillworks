
import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { UploadCloud } from "lucide-react";

interface TaskSubmissionFormProps {
  taskId: string;
  submissionType: 'text' | 'file' | 'link';
  onSuccess?: () => void;
}

export const TaskSubmissionForm = ({ taskId, submissionType, onSuccess }: TaskSubmissionFormProps) => {
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const submitMutation = useMutation({
    mutationFn: async () => {
      let fileUrls: string[] = [];

      // Handle file uploads if present
      if (files.length > 0) {
        for (const file of files) {
          const fileName = `${crypto.randomUUID()}-${file.name}`;
          const { error: uploadError } = await supabase.storage
            .from('task-submissions')
            .upload(fileName, file);

          if (uploadError) throw uploadError;

          const { data: { publicUrl } } = supabase.storage
            .from('task-submissions')
            .getPublicUrl(fileName);

          fileUrls.push(publicUrl);
        }
      }

      const { data, error } = await supabase
        .from('task_submissions')
        .insert([{
          task_id: taskId,
          content,
          file_urls: fileUrls,
          status: 'pending'
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['task', taskId] });
      toast({
        title: "Success",
        description: "Task submitted successfully",
      });
      setContent("");
      setFiles([]);
      onSuccess?.();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to submit task",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMutation.mutate();
  };

  const renderSubmissionInput = () => {
    switch (submissionType) {
      case 'text':
        return (
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter your submission..."
            className="min-h-[200px]"
            required
          />
        );
      case 'file':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <UploadCloud className="w-8 h-8 mb-4 text-gray-500" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                </div>
                <Input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files) {
                      setFiles(Array.from(e.target.files));
                    }
                  }}
                  multiple
                />
              </label>
            </div>
            {files.length > 0 && (
              <div className="space-y-2">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-100 rounded">
                    <span className="text-sm">{file.name}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setFiles(files.filter((_, i) => i !== index))}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case 'link':
        return (
          <Input
            type="url"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter submission URL..."
            required
          />
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {renderSubmissionInput()}
      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={submitMutation.isPending}
        >
          Submit Task
        </Button>
      </div>
    </form>
  );
};
