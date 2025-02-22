
export const EducatorFooter = () => {
  return (
    <footer className="h-16 border-t flex items-center justify-between px-6 bg-card text-sm text-muted-foreground">
      <div className="flex items-center gap-4">
        <img 
          src="/lovable-uploads/c833d97b-87f6-4982-a302-11033ec11603.png" 
          alt="Skill Works Logo" 
          className="h-6"
        />
        <span>&copy; 2025</span>
      </div>
      <div className="flex gap-4">
        <a href="#" className="hover:text-foreground">Terms</a>
        <a href="#" className="hover:text-foreground">Privacy</a>
        <a href="#" className="hover:text-foreground">Support</a>
      </div>
    </footer>
  );
};
