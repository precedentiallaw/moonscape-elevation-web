
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface PropertyFilterProps {
  onFilterChange: (filter: string) => void;
}

const PropertyFilter = ({ onFilterChange }: PropertyFilterProps) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Apartments', 'Villas', 'Off-Plan'];

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    onFilterChange(filter);
  };

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-12">
      {filters.map((filter) => (
        <Button
          key={filter}
          variant={activeFilter === filter ? "default" : "outline"}
          onClick={() => handleFilterClick(filter)}
          className={`px-6 py-2 transition-all duration-300 ${
            activeFilter === filter
              ? 'bg-moonscape-blue text-white shadow-md'
              : 'bg-white text-moonscape-charcoal border-moonscape-platinum hover:bg-moonscape-light-gray'
          }`}
        >
          {filter}
        </Button>
      ))}
    </div>
  );
};

export default PropertyFilter;
