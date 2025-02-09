
export const AdminFooter = () => {
  return (
    <footer className="border-t py-4 px-6">
      <div className="flex justify-between items-center text-sm text-muted-foreground">
        <div>
          <a href="/terms" className="hover:underline">Terms</a>
          {" · "}
          <a href="/privacy" className="hover:underline">Privacy</a>
        </div>
        <div>
          <a href="/support" className="hover:underline">Contact Support</a>
        </div>
      </div>
    </footer>
  );
};
