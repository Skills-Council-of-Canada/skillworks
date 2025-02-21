
export const Footer = () => {
  return (
    <footer className="bg-white text-secondary py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">TradesConnect</h3>
            <p className="text-secondary/70">
              Building the future of trade workforce
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="/about" className="text-secondary/70 hover:text-primary">About</a></li>
              <li><a href="/contact" className="text-secondary/70 hover:text-primary">Contact</a></li>
              <li><a href="/support" className="text-secondary/70 hover:text-primary">Support</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-2">
              <li><a href="/features" className="text-secondary/70 hover:text-primary">Features</a></li>
              <li><a href="/pricing" className="text-secondary/70 hover:text-primary">Pricing</a></li>
              <li><a href="/faq" className="text-secondary/70 hover:text-primary">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="/privacy" className="text-secondary/70 hover:text-primary">Privacy Policy</a></li>
              <li><a href="/terms" className="text-secondary/70 hover:text-primary">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-secondary/10 text-center text-secondary/70">
          <p>&copy; {new Date().getFullYear()} TradesConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

