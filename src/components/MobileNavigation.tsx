
import { useState } from "react";
import { X, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileNavigationProps {
  navItems: Array<{ label: string; id: string }>;
  lang: "en" | "ar";
  onLanguageToggle: () => void;
  onNavClick: (id: string) => void;
}

export const MobileNavigation = ({ 
  navItems, 
  lang, 
  onLanguageToggle, 
  onNavClick 
}: MobileNavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavClick = (id: string) => {
    onNavClick(id);
    setIsOpen(false);
  };

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleMenu}
        className="md:hidden"
      >
        <Menu className="w-5 h-5" />
      </Button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={toggleMenu} />
          <div className={`fixed top-0 ${lang === "ar" ? "left-0" : "right-0"} h-full w-80 bg-white shadow-xl transform transition-transform duration-300`}>
            <div className="flex items-center justify-between p-6 border-b">
              <div className="text-xl font-medium text-slate-900">Menu</div>
              <Button variant="ghost" size="sm" onClick={toggleMenu}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <nav className="p-6">
              <div className="space-y-6">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className="block w-full text-left text-lg text-slate-700 hover:text-slate-900 font-medium py-2"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={onLanguageToggle}
                  className="w-full"
                >
                  {lang === "en" ? "العربية" : "English"}
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};
