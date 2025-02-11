
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Book, AlertCircle } from "lucide-react";

interface SupportHeaderProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

export function SupportHeader({ activeTab, setActiveTab }: SupportHeaderProps) {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Support & Helpdesk</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="bg-background">
        <TabsList className="mb-6 bg-card">
          <TabsTrigger value="tickets" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <MessageSquare className="w-4 h-4" />
            Support Tickets
          </TabsTrigger>
          <TabsTrigger value="knowledge" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Book className="w-4 h-4" />
            Knowledge Base
          </TabsTrigger>
          <TabsTrigger value="user-notes" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <AlertCircle className="w-4 h-4" />
            User Notes
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </>
  );
}
