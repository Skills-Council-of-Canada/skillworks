
export const Footer = () => {
  return (
    <footer className="bg-white text-secondary py-12">
      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="mb-4">
              <img 
                src="/lovable-uploads/8bbf2276-ce55-4852-8104-36d43f6e2082.png" 
                alt="Skills Council of Canada Logo" 
                className="h-8"
              />
            </div>
            <p className="text-secondary/70">
              Building the future of trade workforce
            </p>
            <ul className="mt-4 space-y-2">
              <li><a href="https://www.skillscouncil.ca/" target="_blank" rel="noopener noreferrer" className="text-secondary/70 hover:text-primary">About Skills Council of Canada</a></li>
            </ul>
          </div>
          <div className="flex justify-end">
            <img 
              src="/lovable-uploads/8803d62e-86da-4278-91b7-5992abfc4aa7.png" 
              alt="Skills Council of Canada Logo" 
              className="h-20 object-contain"
            />
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-secondary/10 text-center text-secondary/70">
          <p>&copy; 2025 Skills Council of Canada. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
