import { motion } from 'framer-motion';
import { ArtworkCard } from '@/components/ArtworkCard';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { artworks } from '@/data/artworks';

const Gallery = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 py-24 mt-16">
        <div className="mb-12">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Gallery</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Browse our curated selection of contemporary moments
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {artworks.map((artwork, index) => (
            <ArtworkCard key={artwork.id} artwork={artwork} index={index} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Gallery;
