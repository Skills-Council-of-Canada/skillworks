
export const EmployerFooter = () => {
  return (
    <footer className="h-16 border-t flex items-center justify-between px-6 text-sm text-muted-foreground">
      <div>© 2024 Skilled Trades Platform. All rights reserved.</div>
      <div className="flex gap-4">
        <a href="/terms" className="hover:text-foreground">Terms</a>
        <a href="/privacy" className="hover:text-foreground">Privacy</a>
        <a href="/contact" className="hover:text-foreground">Contact</a>
      </div>
    </footer>
  );
};
