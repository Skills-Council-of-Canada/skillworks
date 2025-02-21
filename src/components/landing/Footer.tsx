
import { Link2 } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-secondary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              Skill <Link2 className="h-4 w-4" /> Works
            </h3>
            <p className="text-white/60">
              Connecting employers with skilled trade professionals
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="/about" className="text-white/60 hover:text-white">About</a></li>
              <li><a href="/careers" className="text-white/60 hover:text-white">Careers</a></li>
              <li><a href="/contact" className="text-white/60 hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="/blog" className="text-white/60 hover:text-white">Blog</a></li>
              <li><a href="/guides" className="text-white/60 hover:text-white">Guides</a></li>
              <li><a href="/faq" className="text-white/60 hover:text-white">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="/privacy" className="text-white/60 hover:text-white">Privacy Policy</a></li>
              <li><a href="/terms" className="text-white/60 hover:text-white">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/10 text-center text-white/60">
          <p>&copy; {new Date().getFullYear()} Skill Works. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
