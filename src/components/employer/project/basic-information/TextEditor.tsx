
import { useState, useRef, useEffect } from "react";
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Underline 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface TextEditorProps {
  initialContent: string;
  onChange: (content: string) => void;
}

const TextEditor = ({ initialContent, onChange }: TextEditorProps) => {
  const descriptionRef = useRef<HTMLDivElement>(null);
  const [editorContent, setEditorContent] = useState(initialContent || "");
  const [isDescriptionEmpty, setIsDescriptionEmpty] = useState(!initialContent);

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
      onChange(content);
      
      // Check if the description is empty (considering HTML tags)
      const div = document.createElement('div');
      div.innerHTML = content;
      const textContent = div.textContent || div.innerText || '';
      setIsDescriptionEmpty(textContent.trim() === '');
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

  const handleEditorFocus = () => {
    setIsDescriptionEmpty(false);
  };

  const handleEditorBlur = () => {
    syncEditorContent();
  };

  useEffect(() => {
    // Initialize the editor with any existing content
    if (descriptionRef.current && initialContent) {
      descriptionRef.current.innerHTML = initialContent;
      setIsDescriptionEmpty(false);
    } else {
      setIsDescriptionEmpty(true);
    }
  }, [initialContent]);

  return (
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
        <div className="relative">
          <div
            ref={descriptionRef}
            contentEditable
            className="min-h-[150px] w-full border rounded-md p-3 bg-white overflow-auto"
            onInput={handleEditorInput}
            onPaste={handleEditorPaste}
            onFocus={handleEditorFocus}
            onBlur={handleEditorBlur}
            dangerouslySetInnerHTML={{ __html: initialContent || '' }}
          />
          {isDescriptionEmpty && (
            <div className="absolute top-3 left-3 text-muted-foreground pointer-events-none">
              Describe your project in detail...
            </div>
          )}
        </div>
      </FormControl>
      <p className="text-xs text-muted-foreground mt-1">
        Use the formatting toolbar above to style your text
      </p>
    </div>
  );
};

export default TextEditor;
