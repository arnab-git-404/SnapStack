import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Artwork } from '@/data/artworks';

interface ArtworkCardProps {
  artwork: Artwork;
  index: number;
}

export const ArtworkCard = ({ artwork, index }: ArtworkCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/artwork/${artwork.id}`} className="group block">
        <div className="relative overflow-hidden bg-card rounded-sm aspect-[3/4] mb-4">
          <motion.img
            src={artwork.imageUrl}
            alt={artwork.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/60 flex items-center justify-center"
          >
            <div className="text-center text-white px-6">
              <p className="text-sm uppercase tracking-widest mb-2">View Details</p>
              <p className="text-xs opacity-90">{artwork.medium}</p>
            </div>
          </motion.div>
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-semibold group-hover:text-accent transition-colors">
            {artwork.title}
          </h3>
          <p className="text-sm text-muted-foreground">{artwork.artist}</p>
          <p className="text-xs text-muted-foreground">{artwork.year}</p>
        </div>
      </Link>
    </motion.div>
  );
};
