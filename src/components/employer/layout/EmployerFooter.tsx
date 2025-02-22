
export const EmployerFooter = () => {
  return (
    <footer className="h-16 border-t flex items-center justify-between px-6 text-sm text-muted-foreground">
      <div className="flex items-center gap-4">
        <img 
          src="/lovable-uploads/c833d97b-87f6-4982-a302-11033ec11603.png" 
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
