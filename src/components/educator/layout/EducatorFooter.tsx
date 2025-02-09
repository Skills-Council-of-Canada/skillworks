
export const EducatorFooter = () => {
  return (
    <footer className="h-16 border-t flex items-center justify-between px-6 bg-card text-sm text-muted-foreground">
      <div>
        © {new Date().getFullYear()} Education Portal. All rights reserved.
      </div>
      <div className="flex gap-4">
        <a href="#" className="hover:text-foreground">Terms</a>
        <a href="#" className="hover:text-foreground">Privacy</a>
        <a href="#" className="hover:text-foreground">Support</a>
      </div>
    </footer>
  );
};
