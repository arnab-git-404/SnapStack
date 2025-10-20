import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { artworks } from '@/data/artworks';

const Home = () => {
  const featuredArtwork = artworks.find(art => art.featured);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20 mt-16">
        <div className="max-w-7xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
              Welcome
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A collection filled with love and meaning, capturing moments that touch the heart
            </p>
          </motion.div>

          {featuredArtwork && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="max-w-5xl mx-auto"
            >
              <div className="grid md:grid-cols-2 gap-12 items-center">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                    className="relative overflow-hidden rounded-sm aspect-[4/5]"
                  >
                    <img
                      src='/Home/01.jpeg'
                      alt={featuredArtwork.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>

                <div className="space-y-6">
                  <div>
                    <p className="text-sm uppercase tracking-widest text-accent mb-2">
                      Featured Artwork
                    </p>
                    <h2 className="text-4xl md:text-5xl font-bold mb-3">
                      {featuredArtwork.title}
                    </h2>
                    {/* <p className="text-xl text-muted-foreground mb-2">
                      {featuredArtwork.artist}
                    </p> */}
                    <p className="text-sm text-muted-foreground">
                      2025 • Ranaghat, West Bengal
                    </p>
                  </div>

                  <p className="text-muted-foreground leading-relaxed">
                    {featuredArtwork.description}
                  </p>

                  <Button
                    asChild
                    variant="outline"
                    className="group border-foreground hover:bg-foreground hover:text-background"
                  >
                    {/* <Link to={`/artwork/${featuredArtwork.id}`}>
                      View Artwork
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link> */}

                  </Button>
                </div>


              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-secondary">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Explore Our Collection
          </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Discover exceptional photos from 2020 to {new Date().getFullYear()} <br/>
             Each tells a unique story through the lens.
            </p>
          <Button
            asChild
            size="lg"
            className="bg-foreground text-background hover:bg-foreground/90"
          >
            <Link to="/together">
              View Gallery
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
