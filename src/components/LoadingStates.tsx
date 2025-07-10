
import { Sparkles, Eye, MapPin } from "lucide-react";

export const PropertyCardSkeleton = () => (
  <div className="animate-pulse group">
    <div className="relative h-64 md:h-80 bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 rounded-2xl mb-6 overflow-hidden">
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-[shimmer_2s_infinite]" />
      
      {/* Skeleton badges */}
      <div className="absolute top-4 left-4 flex gap-2">
        <div className="h-6 w-16 bg-slate-300 rounded-full"></div>
        <div className="h-6 w-12 bg-slate-300 rounded-full"></div>
      </div>
    </div>
    
    <div className="space-y-4 px-2">
      {/* Location skeleton */}
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-slate-200 rounded"></div>
        <div className="h-3 bg-slate-200 rounded w-1/3"></div>
      </div>
      
      {/* Title skeleton */}
      <div className="space-y-2">
        <div className="h-6 bg-slate-200 rounded w-3/4"></div>
        <div className="h-5 bg-slate-300 rounded w-1/2"></div>
      </div>
      
      {/* Features skeleton */}
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-4 h-4 bg-slate-200 rounded-full"></div>
            <div className="h-3 bg-slate-200 rounded flex-1"></div>
          </div>
        ))}
      </div>
      
      {/* Buttons skeleton */}
      <div className="flex gap-3 pt-4">
        <div className="h-10 bg-slate-200 rounded-lg flex-1"></div>
        <div className="h-10 w-10 bg-slate-200 rounded-lg"></div>
      </div>
    </div>
  </div>
);

export const VideoLoadingState = () => (
  <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
    <div className="text-center text-white max-w-md mx-auto px-6">
      {/* Advanced loading animation */}
      <div className="relative w-20 h-20 mx-auto mb-8">
        <div className="absolute inset-0 border-4 border-white/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-transparent border-t-white rounded-full animate-spin"></div>
        <div className="absolute inset-2 border-2 border-transparent border-t-amber-400 rounded-full animate-spin animate-reverse" style={{ animationDuration: '1.5s' }}></div>
        <Sparkles className="absolute inset-0 m-auto w-6 h-6 text-amber-400 animate-pulse" />
      </div>
      
      <h3 className="text-xl font-serif font-light mb-3 animate-pulse">
        Loading Experience
      </h3>
      <p className="text-sm text-white/70 font-light leading-relaxed">
        Preparing your luxury journey through Dubai's finest properties
      </p>
      
      {/* Progress dots */}
      <div className="flex justify-center gap-2 mt-6">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 bg-white/40 rounded-full animate-pulse"
            style={{ 
              animationDelay: `${i * 0.2}s`,
              animationDuration: '1.5s'
            }}
          />
        ))}
      </div>
    </div>
  </div>
);

export const MobileOptimizedLoader = () => (
  <div className="fixed inset-0 bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center z-50">
    <div className="text-center text-white px-6 max-w-sm mx-auto">
      <div className="relative w-16 h-16 mx-auto mb-6">
        <div className="absolute inset-0 border-3 border-white/30 rounded-full animate-spin"></div>
        <div className="absolute inset-1 border-2 border-amber-400 rounded-full animate-ping"></div>
      </div>
      
      <h3 className="text-lg font-serif mb-2">Moonscape</h3>
      <div className="w-32 h-1 bg-white/20 rounded-full mx-auto overflow-hidden">
        <div className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full animate-[loading_2s_ease-in-out_infinite]"></div>
      </div>
    </div>
  </div>
);

export const PropertySearchLoader = () => (
  <div className="flex items-center justify-center py-12">
    <div className="text-center max-w-md mx-auto px-6">
      <div className="relative w-12 h-12 mx-auto mb-4">
        <MapPin className="w-full h-full text-amber-600 animate-bounce" />
        <div className="absolute inset-0 border-2 border-amber-600/30 rounded-full animate-ping"></div>
      </div>
      <p className="text-slate-600 font-medium">Discovering premium properties...</p>
      <div className="flex justify-center gap-1 mt-3">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 bg-amber-600 rounded-full animate-pulse"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  </div>
);

export const ImageLoadingPlaceholder = ({ className = "" }: { className?: string }) => (
  <div className={`bg-gradient-to-br from-slate-100 to-slate-200 animate-pulse relative overflow-hidden ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-[shimmer_1.5s_infinite]"></div>
    <div className="absolute inset-0 flex items-center justify-center">
      <Eye className="w-8 h-8 text-slate-300" />
    </div>
  </div>
);

// Enhanced keyframes for mobile optimization
const additionalStyles = `
  @keyframes loading {
    0% { transform: translateX(-100%); }
    50% { transform: translateX(0%); }
    100% { transform: translateX(100%); }
  }
  
  @keyframes shimmer {
    0% { transform: translateX(-100%) skewX(-12deg); }
    100% { transform: translateX(200%) skewX(-12deg); }
  }
  
  @media (prefers-reduced-motion: reduce) {
    .animate-spin,
    .animate-pulse,
    .animate-bounce,
    .animate-ping {
      animation: none;
    }
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = additionalStyles;
  document.head.appendChild(styleSheet);
}
