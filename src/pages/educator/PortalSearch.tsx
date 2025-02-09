
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PortalSearch = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Portal Search</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Search and join educational portals.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortalSearch;
