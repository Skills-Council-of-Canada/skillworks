
export const EmployerFooter = () => {
  return (
    <footer className="h-16 border-t flex items-center justify-between px-6 text-sm text-muted-foreground">
      <div className="flex items-center gap-4">
        <img 
          src="/lovable-uploads/cfed3ac3-8114-4276-9696-c08fcf981494.png" 
          alt="Skill Works Logo" 
          className="h-6"
        />
        <span>All rights reserved.</span>
      </div>
      <div className="flex gap-4">
        <a href="/terms" className="hover:text-foreground">Terms</a>
        <a href="/privacy" className="hover:text-foreground">Privacy</a>
        <a href="/contact" className="hover:text-foreground">Contact</a>
      </div>
    </footer>
  );
};
