
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertCircle, Bold, Italic, List, ListOrdered, Underline } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { ProjectFormData } from "@/types/project";
import { useIsMobile } from "@/hooks/use-mobile";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState, useRef } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const formSchema = z.object({
  title: z.string()
    .min(5, "Project title must be at least 5 characters")
    .max(200, "Project title cannot exceed 200 characters"),
  description: z.string()
    .min(50, "Project description must be at least 50 characters"),
});

interface Props {
  initialData: Partial<ProjectFormData>;
  onSubmit: (data: Partial<ProjectFormData>) => void;
}

const EXAMPLE_PROJECTS = [
  "Install electrical wiring for a residential project",
  "Complete plumbing installation for a commercial kitchen",
  "Renovate and upgrade HVAC system in an office building",
];

const BasicInformationForm = ({ initialData, onSubmit }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData.title || "",
      description: initialData.description || "",
    },
  });
  
  const isMobile = useIsMobile();
  const titleTextareaRef = useRef<HTMLTextAreaElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const [editorContent, setEditorContent] = useState(initialData.description || "");

  const handleGenerateProject = () => {
    console.log("Generate project clicked");
  };

  const handleUseTemplate = () => {
    console.log("Use template clicked");
  };

  const formatText = (format: string) => {
    const selection = window.getSelection();
    const editorDiv = descriptionRef.current;
    if (!selection || !editorDiv) return;
    
    const range = selection.getRangeAt(0);
    
    // Check if the selection is within our editor
    if (!editorDiv.contains(range.commonAncestorContainer)) return;
    
    // Apply the formatting
    const selectedText = range.toString();
    let formattedElement: HTMLElement | null = null;
    
    switch (format) {
      case 'bold':
        formattedElement = document.createElement('strong');
        break;
      case 'italic':
        formattedElement = document.createElement('em');
        break;
      case 'underline':
        formattedElement = document.createElement('u');
        break;
      case 'bullet':
        // If nothing is selected or selection is at the end, create a new bullet point
        if (selectedText.trim() === '') {
          const bulletItem = document.createElement('div');
          bulletItem.className = 'bullet-item';
          bulletItem.textContent = '• ';
          
          // Find the insertion point - if at the end of a line or in an empty editor
          if (editorDiv.textContent === '') {
            editorDiv.appendChild(bulletItem);
          } else {
            const insertionPoint = range.startContainer;
            const insertionOffset = range.startOffset;
            
            // If we're in a text node, split it and insert the bullet point
            if (insertionPoint.nodeType === Node.TEXT_NODE) {
              const textNode = insertionPoint as Text;
              const textBeforeCursor = textNode.textContent?.substring(0, insertionOffset) || '';
              const textAfterCursor = textNode.textContent?.substring(insertionOffset) || '';
              
              // Check if we're at the end of a line
              if (textAfterCursor.trim() === '' && textBeforeCursor.endsWith('\n')) {
                const newTextNode = document.createTextNode(textBeforeCursor);
                textNode.parentNode?.replaceChild(newTextNode, textNode);
                newTextNode.parentNode?.insertBefore(bulletItem, newTextNode.nextSibling);
                
                // Create a text node for text after cursor if needed
                if (textAfterCursor) {
                  const afterTextNode = document.createTextNode(textAfterCursor);
                  bulletItem.parentNode?.insertBefore(afterTextNode, bulletItem.nextSibling);
                }
                
                // Position cursor inside the bullet point
                const newRange = document.createRange();
                newRange.setStart(bulletItem, 1);
                newRange.collapse(true);
                selection.removeAllRanges();
                selection.addRange(newRange);
              } else {
                // If not at end of line, just insert a bullet character
                document.execCommand('insertText', false, '• ');
              }
            } else {
              // Not in a text node, just append the bullet point
              editorDiv.appendChild(bulletItem);
            }
          }
        } else {
          // Format existing content as bullet points
          const lines = selectedText.split('\n');
          const formattedText = lines.map(line => `• ${line}`).join('\n');
          document.execCommand('insertText', false, formattedText);
        }
        break;
      case 'number':
        // Similar logic as bullet points but with numbers
        if (selectedText.trim() === '') {
          document.execCommand('insertText', false, '1. ');
        } else {
          const lines = selectedText.split('\n');
          const formattedText = lines.map((line, i) => `${i + 1}. ${line}`).join('\n');
          document.execCommand('insertText', false, formattedText);
        }
        break;
      default:
        return;
    }
    
    // For bold, italic, underline, wrap the selection
    if (formattedElement) {
      range.surroundContents(formattedElement);
      selection.removeAllRanges();
      selection.addRange(range);
      
      // Update the internal state based on editor content
      syncEditorContent();
    }
  };

  const syncEditorContent = () => {
    if (descriptionRef.current) {
      const content = descriptionRef.current.innerHTML;
      setEditorContent(content);
      form.setValue('description', content, { shouldValidate: true });
    }
  };

  const handleEditorInput = () => {
    syncEditorContent();
  };

  const handleEditorPaste = (e: React.ClipboardEvent) => {
    // Prevent the default paste which would include formatting
    e.preventDefault();
    // Get text only from clipboard
    const text = e.clipboardData.getData('text/plain');
    // Insert as plain text
    document.execCommand('insertText', false, text);
  };

  const resizeTextarea = () => {
    const textarea = titleTextareaRef.current;
    if (!textarea) return;

    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  useEffect(() => {
    resizeTextarea();
    window.addEventListener('resize', resizeTextarea);
    return () => window.removeEventListener('resize', resizeTextarea);
  }, []);

  useEffect(() => {
    // Initialize the editor with any existing content
    if (descriptionRef.current && initialData.description) {
      descriptionRef.current.innerHTML = initialData.description;
    }
  }, [initialData.description]);

  return (
    <div className="space-y-6">
      <Card className="p-4 sm:p-6 bg-[#F1F1F1]">
        <h3 className="font-semibold mb-2">Example Projects</h3>
        <ul className="space-y-2 text-muted-foreground max-w-full">
          {EXAMPLE_PROJECTS.map((example, index) => (
            <li key={index} className="flex items-start break-words">
              <AlertCircle className="h-5 w-5 mr-2 shrink-0 text-primary" />
              <span className="inline-block">{example}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Form {...form}>
        <form
          id="step-1-form"
          onSubmit={form.handleSubmit((data) => {
            console.log("Form submitted", data);
            onSubmit(data);
          })}
          className="space-y-6"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Objective</FormLabel>
                <FormControl>
                  <Textarea 
                    ref={titleTextareaRef}
                    placeholder="Write a short, clear objective for your project"
                    maxLength={200}
                    className="min-h-[40px] overflow-hidden resize-none"
                    onInput={resizeTextarea}
                    rows={1}
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field: { onChange, ...restField } }) => (
              <FormItem>
                <FormLabel>Project Details</FormLabel>
                <div className="space-y-2">
                  <div className="bg-white p-1 rounded-md flex flex-wrap gap-1 items-center border border-input">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0" 
                            type="button"
                            onClick={() => formatText('bold')}
                          >
                            <Bold className="h-4 w-4" />
                            <span className="sr-only">Bold</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Bold</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0" 
                            type="button"
                            onClick={() => formatText('italic')}
                          >
                            <Italic className="h-4 w-4" />
                            <span className="sr-only">Italic</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Italic</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0" 
                            type="button"
                            onClick={() => formatText('underline')}
                          >
                            <Underline className="h-4 w-4" />
                            <span className="sr-only">Underline</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Underline</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    <div className="w-px h-6 bg-border mx-1" />
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0" 
                            type="button"
                            onClick={() => formatText('bullet')}
                          >
                            <List className="h-4 w-4" />
                            <span className="sr-only">Bullet List</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Bullet List</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0" 
                            type="button"
                            onClick={() => formatText('number')}
                          >
                            <ListOrdered className="h-4 w-4" />
                            <span className="sr-only">Numbered List</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Numbered List</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  
                  <FormControl>
                    <div
                      ref={descriptionRef}
                      contentEditable
                      className="min-h-[150px] w-full border rounded-md p-3 bg-white overflow-auto"
                      placeholder="Describe your project in detail..."
                      onInput={handleEditorInput}
                      onPaste={handleEditorPaste}
                      dangerouslySetInnerHTML={{ __html: initialData.description || '' }}
                      {...restField}
                    />
                  </FormControl>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Use the formatting toolbar above to style your text
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-2`}>
            <Button
              type="button"
              onClick={handleGenerateProject}
              className="bg-orange-500 hover:bg-orange-600"
              size={isMobile ? "sm" : "default"}
            >
              Generate Project
            </Button>
            <Button
              type="submit"
              variant="secondary"
              size={isMobile ? "sm" : "default"}
              className="whitespace-normal text-left h-auto py-2"
            >
              Create Project from Scratch
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={handleUseTemplate}
              size={isMobile ? "sm" : "default"}
            >
              Use Template
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default BasicInformationForm;
