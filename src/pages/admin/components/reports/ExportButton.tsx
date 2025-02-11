
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";

interface ExportButtonProps {
  data: any[];
  filename: string;
  type: "csv" | "pdf";
}

export const ExportButton = ({ data, filename, type }: ExportButtonProps) => {
  const exportData = () => {
    if (type === "csv") {
      const headers = Object.keys(data[0]).join(",");
      const rows = data.map(item => Object.values(item).join(",")).join("\n");
      const csvContent = `${headers}\n${rows}`;
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${filename}.csv`;
      link.click();
    }
    // PDF export can be implemented later with a PDF library
  };

  return (
    <Button 
      onClick={exportData} 
      variant="outline" 
      size="sm"
      className="gap-2"
    >
      <FileDown className="h-4 w-4" />
      Export {type.toUpperCase()}
    </Button>
  );
};
