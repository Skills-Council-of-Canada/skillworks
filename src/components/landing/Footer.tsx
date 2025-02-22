
import { Link2 } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-secondary text-white py-12">
      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="mb-4">
              <img 
                src="/lovable-uploads/c833d97b-87f6-4982-a302-11033ec11603.png" 
                alt="Skill Works Logo" 
                className="h-8"
              />
            </div>
            <p className="text-white/60">
              Connecting employers with skilled trade professionals
            </p>
            <ul className="mt-4 space-y-2">
              <li><a href="https://www.skillscouncil.ca/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white">About Skills Council of Canada</a></li>
            </ul>
          </div>
          <div className="flex justify-end">
            <img 
              src="/lovable-uploads/8bbf2276-ce55-4852-8104-36d43f6e2082.png" 
              alt="Skills Council of Canada Logo" 
              className="h-20 object-contain"
            />
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/10 text-center text-white/60">
          <p>&copy; 2025 Skills Council of Canada. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
