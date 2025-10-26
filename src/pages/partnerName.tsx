import { useState } from "react";
import { motion } from "framer-motion";
import { PhotoCard } from "@/components/PhotoCard";
import { YearFilter } from "@/components/YearFilter";
import { usePhotos } from "@/hooks/usePhotos";


const Deblina = () => {

  const partnerName = import.meta.env.VITE_CLIENT_PARTNER_NAME;

  const [selectedYear, setSelectedYear] = useState<number | null>(null);


  const { photos, years, loading, error } = usePhotos(partnerName);

  const filteredPhotos = selectedYear
    ? photos.filter((photo) => photo.year === selectedYear)
    : photos;

  return (
    <div className="min-h-screen">

      <div className="max-w-7xl mx-auto px-6 py-24 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">{partnerName}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mb-8">
            Capturing beauty in every moment
          </p>

          <YearFilter
            years={years}
            selectedYear={selectedYear}
            onYearChange={setSelectedYear}
          />
        </motion.div>

        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-muted-foreground text-lg">Loading photos...</p>
          </motion.div>
        ) : filteredPhotos.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredPhotos.map((photo, index) => (
              <PhotoCard
                key={photo.imageUrl}
                photo={photo}
                index={index}
                allPhotos={filteredPhotos}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-muted-foreground text-lg">
              No photos found {selectedYear ? `for ${selectedYear}` : ""}
            </p>
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default Deblina;
