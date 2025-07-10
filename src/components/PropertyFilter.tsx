
import { useState, useEffect } from "react";
import { Search, Filter, MapPin, DollarSign, Home, X, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

interface FilterState {
  search: string;
  location: string;
  priceRange: [number, number];
  propertyType: string;
  bedrooms: string;
  amenities: string[];
}

interface PropertyFilterProps {
  onFilterChange: (filters: FilterState) => void;
  className?: string;
}

export const PropertyFilter = ({ onFilterChange, className = "" }: PropertyFilterProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    location: "",
    priceRange: [1000000, 10000000],
    propertyType: "",
    bedrooms: "",
    amenities: []
  });

  const locations = [
    "Dubai Marina",
    "Downtown Dubai", 
    "Emirates Hills",
    "Palm Jumeirah",
    "Business Bay",
    "DIFC",
    "JBR",
    "City Walk"
  ];

  const propertyTypes = [
    "Apartment",
    "Villa", 
    "Penthouse",
    "Townhouse",
    "Studio"
  ];

  const amenityOptions = [
    "Swimming Pool",
    "Gym",
    "Parking",
    "Balcony",
    "Garden",
    "Security",
    "Concierge",
    "Beach Access"
  ];

  const updateFilter = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const toggleAmenity = (amenity: string) => {
    const newAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter(a => a !== amenity)
      : [...filters.amenities, amenity];
    updateFilter('amenities', newAmenities);
  };

  const clearFilters = () => {
    const clearedFilters: FilterState = {
      search: "",
      location: "",
      priceRange: [1000000, 10000000],
      propertyType: "",
      bedrooms: "",
      amenities: []
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const formatPrice = (price: number) => {
    return `${(price / 1000000).toFixed(1)}M AED`;
  };

  const activeFiltersCount = [
    filters.search,
    filters.location,
    filters.propertyType,
    filters.bedrooms,
    ...filters.amenities
  ].filter(Boolean).length + (filters.priceRange[0] !== 1000000 || filters.priceRange[1] !== 10000000 ? 1 : 0);

  return (
    <div className={`bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-200/50 ${className}`}>
      {/* Mobile-First Search Bar */}
      <div className="p-4 border-b border-slate-100">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            placeholder="Search properties..."
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            className="pl-12 pr-4 py-3 text-base bg-slate-50/50 border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-300"
          />
        </div>
        
        {/* Filter Toggle */}
        <div className="flex items-center justify-between mt-4">
          <Button
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 border-slate-200 rounded-xl px-4 py-2 transition-all duration-300"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="bg-amber-100 text-amber-800 text-xs px-2 py-1">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
          
          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              onClick={clearFilters}
              className="text-slate-500 hover:text-slate-700 text-sm px-3 py-1 rounded-lg"
            >
              Clear all
            </Button>
          )}
        </div>
      </div>

      {/* Expandable Filters */}
      {isExpanded && (
        <div className="p-4 space-y-6 animate-fade-in">
          {/* Location Filter */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <MapPin className="w-4 h-4" />
              Location
            </label>
            <Select value={filters.location} onValueChange={(value) => updateFilter('location', value)}>
              <SelectTrigger className="bg-slate-50/50 border-slate-200 rounded-xl">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent className="bg-white/95 backdrop-blur-xl">
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price Range */}
          <div className="space-y-4">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <DollarSign className="w-4 h-4" />
              Price Range
            </label>
            <div className="px-2">
              <Slider
                value={filters.priceRange}
                onValueChange={(value) => updateFilter('priceRange', value as [number, number])}
                min={500000}
                max={20000000}
                step={100000}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-2">
                <span>{formatPrice(filters.priceRange[0])}</span>
                <span>{formatPrice(filters.priceRange[1])}</span>
              </div>
            </div>
          </div>

          {/* Property Type */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <Home className="w-4 h-4" />
              Property Type
            </label>
            <Select value={filters.propertyType} onValueChange={(value) => updateFilter('propertyType', value)}>
              <SelectTrigger className="bg-slate-50/50 border-slate-200 rounded-xl">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent className="bg-white/95 backdrop-blur-xl">
                {propertyTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Bedrooms */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-700">Bedrooms</label>
            <div className="flex gap-2 flex-wrap">
              {["Studio", "1", "2", "3", "4", "5+"].map((bedroom) => (
                <Button
                  key={bedroom}
                  variant={filters.bedrooms === bedroom ? "default" : "outline"}
                  onClick={() => updateFilter('bedrooms', filters.bedrooms === bedroom ? "" : bedroom)}
                  className={`px-4 py-2 rounded-xl text-sm transition-all duration-300 ${
                    filters.bedrooms === bedroom 
                      ? "bg-amber-600 text-white hover:bg-amber-700" 
                      : "bg-slate-50 hover:bg-slate-100 border-slate-200"
                  }`}
                >
                  {bedroom}
                </Button>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-700">Amenities</label>
            <div className="flex flex-wrap gap-2">
              {amenityOptions.map((amenity) => (
                <Button
                  key={amenity}
                  variant="outline"
                  onClick={() => toggleAmenity(amenity)}
                  className={`px-3 py-2 rounded-xl text-xs transition-all duration-300 ${
                    filters.amenities.includes(amenity)
                      ? "bg-amber-100 text-amber-800 border-amber-300"
                      : "bg-slate-50 hover:bg-slate-100 border-slate-200"
                  }`}
                >
                  {amenity}
                  {filters.amenities.includes(amenity) && (
                    <X className="w-3 h-3 ml-1" />
                  )}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
