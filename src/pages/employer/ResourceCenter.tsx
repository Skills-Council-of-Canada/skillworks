
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { BookOpen, Download, Filter, Search } from "lucide-react";

type Resource = {
  id: string;
  title: string;
  description: string;
  category: "hiring" | "mentorship" | "safety";
  type: "download" | "view";
  url: string;
};

const resources: Resource[] = [
  {
    id: "1",
    title: "Interview Guide",
    description: "Comprehensive guide for conducting effective trade interviews",
    category: "hiring",
    type: "download",
    url: "#",
  },
  {
    id: "2",
    title: "Mentorship Program Setup",
    description: "Step-by-step guide to establish an effective mentorship program",
    category: "mentorship",
    type: "view",
    url: "#",
  },
  {
    id: "3",
    title: "Safety Regulations Handbook",
    description: "Latest safety compliance guidelines and regulations",
    category: "safety",
    type: "download",
    url: "#",
  },
];

const ResourceCenter = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredResources = resources.filter((resource) => {
    const matchesSearch = resource.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: "hiring", label: "Hiring Best Practices" },
    { id: "mentorship", label: "Mentorship Guides" },
    { id: "safety", label: "Safety Compliance" },
  ];

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <div className="flex flex-col gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Resource Center</h1>

        {/* Search and Filter Section */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-foreground/70" />
              <Input
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 text-foreground w-full"
              />
            </div>
            <Button variant="outline" className="gap-2 text-foreground w-full sm:w-auto">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === category.id ? null : category.id
                  )
                }
                className="gap-2 flex-1 sm:flex-none text-sm"
                size="sm"
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredResources.map((resource) => (
          <Card key={resource.id} className="flex flex-col h-full">
            <CardHeader className="flex-grow">
              <CardTitle className="flex items-center gap-2 text-lg text-foreground">
                <BookOpen className="h-5 w-5 text-primary flex-shrink-0" />
                {resource.title}
              </CardTitle>
              <CardDescription className="text-foreground/80">
                {resource.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Button
                variant={resource.type === "download" ? "default" : "outline"}
                className="w-full gap-2"
              >
                {resource.type === "download" ? (
                  <Download className="h-4 w-4" />
                ) : (
                  <BookOpen className="h-4 w-4" />
                )}
                {resource.type === "download" ? "Download" : "View"}
              </Button>
            </CardContent>
          </Card>
        ))}

        {filteredResources.length === 0 && (
          <div className="col-span-full text-center py-8 text-muted-foreground">
            No resources found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourceCenter;
