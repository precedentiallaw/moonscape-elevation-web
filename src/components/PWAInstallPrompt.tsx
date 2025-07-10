
import { useState, useEffect } from "react";
import { Download, X, Smartphone, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Show prompt after a delay for better UX
      setTimeout(() => {
        setShowPrompt(true);
      }, 5000);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;
    
    if (result.outcome === 'accepted') {
      console.log('PWA installed');
    }
    
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Don't show again for this session
    sessionStorage.setItem('pwa-prompt-dismissed', 'true');
  };

  // Don't show if already installed or dismissed this session
  if (isInstalled || sessionStorage.getItem('pwa-prompt-dismissed') || !showPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:w-96 z-50 animate-slide-up">
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/50 p-6">
        <div className="flex items-start gap-4">
          <div className="bg-gradient-to-br from-amber-100 to-amber-200 rounded-full p-3 flex-shrink-0">
            <Smartphone className="w-6 h-6 text-amber-700" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-serif font-semibold text-lg text-slate-900 mb-2">
              Install Moonscape App
            </h3>
            <p className="text-sm text-slate-600 mb-4 leading-relaxed">
              Get instant access to Dubai's luxury properties. Browse, search, and book viewings offline.
            </p>
            
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-sm text-slate-500">Fast & Secure</span>
            </div>
            
            <div className="flex gap-3">
              <Button
                onClick={handleInstallClick}
                className="flex-1 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-medium py-2 rounded-xl transition-all duration-300 hover:shadow-lg"
              >
                <Download className="w-4 h-4 mr-2" />
                Install
              </Button>
              
              <Button
                variant="ghost"
                onClick={handleDismiss}
                className="p-2 hover:bg-slate-100 rounded-xl transition-all duration-300"
                aria-label="Dismiss"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
