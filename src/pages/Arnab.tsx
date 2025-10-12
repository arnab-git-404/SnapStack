import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PhotoCard } from '@/components/PhotoCard';
import { YearFilter } from '@/components/YearFilter';
import { getArnabPhotosByCategory, getArnabAvailableYears } from '@/data/arnabPhotos';

const Arnab = () => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  
  const categoryPhotos = getArnabPhotosByCategory('arnab');
  const categoryYears = getArnabAvailableYears().filter(year =>
    categoryPhotos.some(photo => photo.year === year)
  );
  
  const filteredPhotos = selectedYear
    ? categoryPhotos.filter(photo => photo.year === selectedYear)
    : categoryPhotos;

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 py-24 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Arnab</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mb-8">
            A journey through moments and memories
          </p>
          
          <YearFilter
            years={categoryYears}
            selectedYear={selectedYear}
            onYearChange={setSelectedYear}
          />
        </motion.div>

        {/* {filteredPhotos.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredPhotos.map((photo, index) => (
              <PhotoCard key={photo.id} photo={photo} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-muted-foreground text-lg">
              No photos found for {selectedYear}
            </p>
          </motion.div>
        )} */}

        {filteredPhotos.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredPhotos.map((photo, index) => (
              <PhotoCard key={photo.id} photo={photo} index={index} allPhotos={filteredPhotos} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-muted-foreground text-lg">
              No photos found for {selectedYear}
            </p>
          </motion.div>
        )}

      </div>

      <Footer />
    </div>
  );
};

export default Arnab;
