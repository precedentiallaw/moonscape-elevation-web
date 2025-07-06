
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PropertyGalleryProps {
  images: string[];
  title: string;
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
}

export const PropertyGallery = ({ 
  images, 
  title, 
  isOpen, 
  onClose, 
  initialIndex = 0 
}: PropertyGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  if (!isOpen) return null;

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
      <Button
        variant="ghost"
        size="sm"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
      >
        <X className="w-6 h-6" />
      </Button>

      <div className="relative w-full h-full flex items-center justify-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={prevImage}
          className="absolute left-4 z-10 text-white hover:bg-white/20"
        >
          <ChevronLeft className="w-8 h-8" />
        </Button>

        <div className="max-w-4xl max-h-[80vh] mx-4">
          <img
            src={images[currentIndex]}
            alt={`${title} - Image ${currentIndex + 1}`}
            className="w-full h-full object-contain"
          />
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={nextImage}
          className="absolute right-4 z-10 text-white hover:bg-white/20"
        >
          <ChevronRight className="w-8 h-8" />
        </Button>
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};
