import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface YearFilterProps {
  years: number[];
  selectedYear: number | null;
  onYearChange: (year: number | null) => void;
}

export const YearFilter = ({ years, selectedYear, onYearChange }: YearFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={selectedYear === null ? 'default' : 'outline'}
        size="sm"
        onClick={() => onYearChange(null)}
        className="rounded-full"
      >
        All Years
      </Button>
      {years.map((year) => (
        <Button
          key={year}
          variant={selectedYear === year ? 'default' : 'outline'}
          size="sm"
          onClick={() => onYearChange(year)}
          className="rounded-full"
        >
          {year}
        </Button>
      ))}
    </div>
  );
};
