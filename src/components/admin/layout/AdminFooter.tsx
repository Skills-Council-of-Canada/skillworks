
export const AdminFooter = () => {
  return (
    <footer className="border-t py-4 px-6">
      <div className="flex justify-between items-center text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/8803d62e-86da-4278-91b7-5992abfc4aa7.png" 
            alt="Skill Works Logo" 
            className="h-6"
          />
          <span className="mx-2">·</span>
          <a href="/terms" className="hover:underline">Terms</a>
          <span className="mx-2">·</span>
          <a href="/privacy" className="hover:underline">Privacy</a>
        </div>
        <div>
          <a href="/support" className="hover:underline">Contact Support</a>
        </div>
      </div>
    </footer>
  );
};
