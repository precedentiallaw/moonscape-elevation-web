
import { useState, useEffect } from "react";
import { X, Menu, ChevronRight } from "lucide-react";
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
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavClick = (id: string) => {
    onNavClick(id);
    setIsOpen(false);
  };

  // Handle swipe gestures
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (lang === "en" && isLeftSwipe) {
      setIsOpen(false);
    } else if (lang === "ar" && isRightSwipe) {
      setIsOpen(false);
    }
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleMenu}
        className="md:hidden p-3 hover:bg-slate-100/80 transition-all duration-300 hover:scale-105 active:scale-95"
        aria-label="Toggle menu"
      >
        <Menu className="w-6 h-6" />
      </Button>

      {/* Enhanced Mobile Menu Overlay */}
      {isOpen && (
        <>
          {/* Backdrop with blur effect */}
          <div 
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden transition-all duration-500"
            onClick={toggleMenu}
          />
          
          {/* Slide-in menu with improved animations */}
          <div 
            className={`fixed top-0 ${lang === "ar" ? "left-0" : "right-0"} h-full w-80 max-w-[85vw] bg-white/95 backdrop-blur-xl shadow-2xl border-l border-slate-200/50 transform transition-all duration-500 ease-out z-50 md:hidden`}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {/* Header with close button */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100/50 bg-gradient-to-r from-slate-50 to-white">
              <div className="text-xl font-serif font-light text-slate-900 tracking-wide">
                <span className="text-gradient-gold">Moon</span>scape
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={toggleMenu}
                className="p-2 hover:bg-slate-100/80 rounded-full transition-all duration-300 hover:scale-110 active:scale-95"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            {/* Navigation with enhanced touch targets */}
            <nav className="p-6 space-y-2">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="group flex items-center justify-between w-full text-left text-lg text-slate-700 hover:text-slate-900 font-medium py-4 px-4 rounded-xl hover:bg-gradient-to-r hover:from-slate-50 hover:to-slate-100 transition-all duration-300 transform hover:translate-x-1 active:scale-98 min-h-[56px]"
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    animation: 'slideInFromRight 0.5s ease-out forwards'
                  }}
                >
                  <span>{item.label}</span>
                  <ChevronRight className={`w-5 h-5 text-slate-400 group-hover:text-amber-600 transition-all duration-300 ${lang === "ar" ? "rotate-180" : ""}`} />
                </button>
              ))}
            </nav>
            
            {/* Enhanced language toggle */}
            <div className="absolute bottom-8 left-6 right-6">
              <div className="p-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl border border-slate-200/50">
                <Button
                  variant="outline"
                  onClick={onLanguageToggle}
                  className="w-full bg-white/80 hover:bg-white border-slate-200 hover:border-amber-300 text-slate-900 font-medium py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-98 min-h-[48px]"
                >
                  <span className="text-base">
                    {lang === "en" ? "العربية" : "English"}
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};
