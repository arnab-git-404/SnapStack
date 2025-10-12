import { motion } from 'framer-motion';
import { useParams, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { artworks } from '@/data/artworks';

const ArtworkDetail = () => {
  const { id } = useParams();
  const artwork = artworks.find(art => art.id === id);

  if (!artwork) {
    return <Navigate to="/gallery" replace />;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 py-24 mt-16">

        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="sticky top-8">
              <div className="aspect-[4/5] overflow-hidden rounded-sm bg-card">
                <img
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <p className="text-sm uppercase tracking-widest text-accent mb-3">
                Artwork Details
              </p>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {artwork.title}
              </h1>
              <div className="space-y-1 text-lg text-muted-foreground mb-6">
                <p className="text-xl text-foreground font-medium">{artwork.artist}</p>
                <p>{artwork.year}</p>
                <p>{artwork.medium}</p>
                <p>{artwork.dimensions}</p>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                {artwork.description}
              </p>
            </div>

            <div className="border-t border-border pt-8">
              <h2 className="text-2xl font-bold mb-4">About the Artist</h2>
              <p className="text-muted-foreground leading-relaxed">
                {artwork.artistBio}
              </p>
            </div>

            <div className="border-t border-border pt-8">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-foreground hover:bg-foreground hover:text-background"
                asChild
              >
                <a href="mailto:hello@ateliergallery.com">
                  Inquire About This Artwork
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ArtworkDetail;
