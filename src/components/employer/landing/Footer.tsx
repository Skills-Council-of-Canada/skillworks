
export const Footer = () => {
  return (
    <footer className="bg-secondary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">TradesConnect</h3>
            <p className="text-white">
              Building the future of trade workforce
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="/about" className="text-white hover:text-white/90">About</a></li>
              <li><a href="/contact" className="text-white hover:text-white/90">Contact</a></li>
              <li><a href="/support" className="text-white hover:text-white/90">Support</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-2">
              <li><a href="/features" className="text-white hover:text-white/90">Features</a></li>
              <li><a href="/pricing" className="text-white hover:text-white/90">Pricing</a></li>
              <li><a href="/faq" className="text-white hover:text-white/90">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="/privacy" className="text-white hover:text-white/90">Privacy Policy</a></li>
              <li><a href="/terms" className="text-white hover:text-white/90">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/10 text-center text-white">
          <p>&copy; {new Date().getFullYear()} TradesConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
