
export const PropertyCardSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-64 bg-slate-200 rounded-lg mb-6"></div>
    <div className="space-y-3">
      <div className="h-4 bg-slate-200 rounded w-1/4"></div>
      <div className="h-6 bg-slate-200 rounded w-3/4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-slate-200 rounded"></div>
        <div className="h-4 bg-slate-200 rounded"></div>
        <div className="h-4 bg-slate-200 rounded w-2/3"></div>
      </div>
      <div className="h-10 bg-slate-200 rounded mt-6"></div>
    </div>
  </div>
);

export const VideoLoadingState = () => (
  <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
    <div className="text-center text-white">
      <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-sm font-light">Loading Experience...</p>
    </div>
  </div>
);
