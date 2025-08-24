import { Link } from "react-router-dom";
import { BookOpen, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo and Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-primary-foreground rounded p-1.5">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <span className="text-2xl font-bold">CClient</span>
            </div>
          </div>

          {/* Menu */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Menu</h3>
            <div className="space-y-2">
              <Link to="/" className="block hover:text-primary-light transition-colors">
                Home
              </Link>
              <Link to="/courses" className="block hover:text-primary-light transition-colors">
                Courses
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <div className="space-y-2 text-primary-foreground/80">
              <p>+233410022000</p>
              <p>New Reiss, Ghana, Accra</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-foreground/80 text-sm mb-4 md:mb-0">
            © copyright 2025 - G-client, All rights reserved
          </p>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={scrollToTop}
            className="text-primary-foreground hover:text-primary hover:bg-primary-foreground/10"
          >
            Back to top
            <ChevronUp className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;