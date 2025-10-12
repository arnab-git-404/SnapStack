import { motion, AnimatePresence } from 'framer-motion';
import { Photo } from '@/data/photos';
import { Calendar, MapPin, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

interface PhotoCardProps {
  photo: Photo;
  index: number;
  allPhotos?: Photo[];
}

export const PhotoCard = ({ photo, index, allPhotos }: PhotoCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(index);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || !allPhotos) return;
      
      if (e.key === 'Escape') {
        setIsOpen(false);
      } else if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : allPhotos.length - 1));
      } else if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev < allPhotos.length - 1 ? prev + 1 : 0));
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, allPhotos]);

  const handlePrevious = () => {
    if (!allPhotos) return;
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : allPhotos.length - 1));
  };

  const handleNext = () => {
    if (!allPhotos) return;
    setCurrentIndex((prev) => (prev < allPhotos.length - 1 ? prev + 1 : 0));
  };

  const currentPhoto = allPhotos ? allPhotos[currentIndex] : photo;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group cursor-pointer"
        onClick={() => {
          setCurrentIndex(index);
          setIsOpen(true);
        }}
      >
        <div className="relative overflow-hidden bg-card rounded-sm aspect-square mb-3 shadow-md hover:shadow-xl transition-shadow duration-300">
          <motion.img
            src={photo.imageUrl}
            alt={photo.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            loading="lazy"
          />
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-4"
          >
            <p className="text-white text-sm font-medium mb-1">{photo.title}</p>
            {photo.location && (
              <div className="flex items-center gap-1 text-white/80 text-xs mb-1">
                <MapPin className="w-3 h-3" />
                <span>{photo.location}</span>
              </div>
            )}
            <div className="flex items-center gap-1 text-white/80 text-xs">
              <Calendar className="w-3 h-3" />
              <span>{photo.year}</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm overflow-y-auto"
            onClick={() => setIsOpen(false)}
          >
            <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
              {/* Close button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                className="fixed top-4 right-4 z-20 text-white bg-black/50 hover:bg-black/70 rounded-full p-3 transition-colors backdrop-blur-sm"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </motion.button>

              {/* Navigation buttons - Desktop only */}
              {allPhotos && allPhotos.length > 1 && (
                <>
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevious();
                    }}
                    className="hidden md:block fixed left-4 top-1/2 -translate-y-1/2 z-20 text-white bg-black/50 hover:bg-black/70 rounded-full p-3 transition-colors backdrop-blur-sm"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </motion.button>

                  <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    className="hidden md:block fixed right-4 top-1/2 -translate-y-1/2 z-20 text-white bg-black/50 hover:bg-black/70 rounded-full p-3 transition-colors backdrop-blur-sm"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </motion.button>
                </>
              )}

              {/* Photo counter */}
              {allPhotos && allPhotos.length > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="fixed top-4 left-1/2 -translate-x-1/2 z-20 text-white bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full text-sm"
                >
                  {currentIndex + 1} / {allPhotos.length}
                </motion.div>
              )}

              {/* Image container */}
              <motion.div
                key={currentIndex}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="relative w-full max-w-6xl"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={currentPhoto.imageUrl}
                  alt={currentPhoto.title}
                  className="w-full h-auto rounded-lg"
                />
                
                {/* Photo info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-6 bg-black/80 backdrop-blur-sm p-6 rounded-lg"
                >
                  <h3 className="text-white text-2xl font-semibold mb-3">{currentPhoto.title}</h3>
                  <div className="flex flex-wrap items-center gap-4">
                    {currentPhoto.location && (
                      <div className="flex items-center gap-2 text-white/90 text-sm">
                        <MapPin className="w-4 h-4" />
                        <span>{currentPhoto.location}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-white/90 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{currentPhoto.year}</span>
                    </div>
                  </div>
                </motion.div>

                {/* Mobile Navigation Buttons */}
                {allPhotos && allPhotos.length > 1 && (
                  <div className="flex md:hidden justify-center gap-4 mt-6">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrevious();
                      }}
                      className="text-white bg-black/50 hover:bg-black/70 rounded-full p-3 transition-colors backdrop-blur-sm"
                      aria-label="Previous photo"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNext();
                      }}
                      className="text-white bg-black/50 hover:bg-black/70 rounded-full p-3 transition-colors backdrop-blur-sm"
                      aria-label="Next photo"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};