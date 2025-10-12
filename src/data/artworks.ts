export interface Artwork {
  id: string;
  title: string;
  artist: string;
  year: number;
  medium: string;
  dimensions: string;
  description: string;
  artistBio: string;
  imageUrl: string;
  featured?: boolean;
}

export const artworks: Artwork[] = [
  {
    id: '1',
    title: 'Whispers of Dawn',
    artist: 'Elena Moreau',
    year: 2024,
    medium: 'Oil on Canvas',
    dimensions: '120 × 90 cm',
    description: 'A mesmerizing exploration of light and shadow, capturing the ephemeral moment when night surrenders to day. The piece invites viewers into a contemplative space where abstract forms suggest landscapes both familiar and dreamlike.',
    artistBio: 'Elena Moreau is a contemporary painter based in Paris. Her work explores the intersection of memory, landscape, and emotion through a distinctive use of color and texture. She has exhibited internationally and her pieces are held in private collections across Europe and North America.',
    imageUrl: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800&q=80',
    featured: true,
  },
  {
    id: '2',
    title: 'Urban Symphony',
    artist: 'Marcus Chen',
    year: 2023,
    medium: 'Mixed Media',
    dimensions: '150 × 100 cm',
    description: 'An energetic composition that captures the rhythm and chaos of metropolitan life. Bold strokes and layered textures create a visual cacophony that speaks to the complexity of modern urban existence.',
    artistBio: 'Marcus Chen is a New York-based artist known for his dynamic mixed-media works that explore urban identity and cultural intersection. His innovative techniques combine traditional painting with digital elements and found materials.',
    imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&q=80',
  },
  {
    id: '3',
    title: 'Solitude in Blue',
    artist: 'Sofia Andersson',
    year: 2024,
    medium: 'Acrylic on Canvas',
    dimensions: '100 × 80 cm',
    description: 'A profound meditation on isolation and introspection. The artist uses a restrained palette to create depth and emotion, inviting viewers to explore their own relationship with solitude and self-reflection.',
    artistBio: 'Stockholm-based Sofia Andersson creates contemplative works that examine themes of solitude, memory, and the human condition. Her minimalist approach and subtle use of color have garnered critical acclaim throughout Scandinavia.',
    imageUrl: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&q=80',
  },
  {
    id: '4',
    title: 'Golden Horizon',
    artist: 'Diego Ramirez',
    year: 2023,
    medium: 'Oil and Gold Leaf',
    dimensions: '110 × 110 cm',
    description: 'A stunning interplay of warm tones and metallic accents that evokes the timeless beauty of sunset vistas. The incorporation of gold leaf adds a luminous quality that changes with ambient light.',
    artistBio: 'Diego Ramirez, based in Barcelona, is celebrated for his innovative use of traditional materials in contemporary contexts. His works bridge classical techniques with modern sensibilities, creating pieces that feel both timeless and current.',
    imageUrl: 'https://images.unsplash.com/photo-1578926314433-e2789279f4aa?w=800&q=80',
  },
  {
    id: '5',
    title: 'Fragmented Memories',
    artist: 'Yuki Tanaka',
    year: 2024,
    medium: 'Digital Print on Canvas',
    dimensions: '90 × 120 cm',
    description: 'An innovative digital work that explores the fluid nature of memory and perception. Layered imagery and subtle distortions create a dreamlike quality that questions the reliability of recollection.',
    artistBio: 'Tokyo-based digital artist Yuki Tanaka pushes the boundaries between photography and painting. Her work has been featured in prominent galleries across Asia and has earned recognition for its technical innovation and emotional depth.',
    imageUrl: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&q=80',
  },
  {
    id: '6',
    title: 'Eternal Return',
    artist: 'Isabella Rossi',
    year: 2023,
    medium: 'Watercolor on Paper',
    dimensions: '70 × 100 cm',
    description: 'A delicate exploration of cyclical patterns in nature and life. The fluid medium perfectly captures the transient beauty of natural forms and the eternal dance of creation and dissolution.',
    artistBio: 'Isabella Rossi is an Italian watercolorist whose ethereal works celebrate the beauty of impermanence. Her delicate technique and philosophical approach have made her a rising star in the contemporary art scene.',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80',
  },
];
