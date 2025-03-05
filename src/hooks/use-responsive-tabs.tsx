import { useState, useEffect } from "react";
import { useIsMobile } from "./use-mobile";

export function useResponsiveTabs<T extends string>(
  defaultTab: T,
  tabs: Array<{ value: T; label: string }>
) {
  const [activeTab, setActiveTab] = useState<T>(defaultTab);
  const isMobile = useIsMobile();
  
  // Option to get a shortened version of the tab label for mobile
  const getTabLabel = (label: string) => {
    if (!isMobile) return label;
    
    // For "Active Projects", return "Active"
    if (label.includes("Active")) return "Active";
    // For "Completed Projects", return "Completed"
    if (label.includes("Completed")) return "Completed";
    // Otherwise return the original label
    return label;
  };

  return {
    activeTab,
    setActiveTab,
    isMobile,
    getTabLabel,
    tabs
  };
}
