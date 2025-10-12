export interface Photo {
  id: string;
  title: string;
  category: 'arnab' | 'deblina' | 'together';
  year: number;
  location?: string;
  description?: string;
  imageUrl: string;
}

export const photos: Photo[] = [

  // Together Photos
  {
    id: 't1',
    title: 'Perfect Moment',
    category: 'together',
    year: 2024,
    location: 'Paris',
    description: 'Creating memories together',
    imageUrl: '/Together/01.jpg',
  },
  {
    id: 't2',
    title: 'Adventure Partners',
    category: 'together',
    year: 2024,
    location: 'Switzerland',
    description: 'Exploring the Alps together',
    imageUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80',
  },
  {
    id: 't3',
    title: 'Sunset Love',
    category: 'together',
    year: 2023,
    location: 'Maldives',
    description: 'Watching the sun go down',
    imageUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&q=80',
  },
  {
    id: 't4',
    title: 'City Romance',
    category: 'together',
    year: 2023,
    location: 'New York',
    description: 'Lost in the city',
    imageUrl: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&q=80',
  },
  {
    id: 't5',
    title: 'Tropical Paradise',
    category: 'together',
    year: 2022,
    location: 'Bali',
    description: 'Island adventures',
    imageUrl: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&q=80',
  },
  {
    id: 't6',
    title: 'Winter Together',
    category: 'together',
    year: 2022,
    location: 'Iceland',
    description: 'Chasing northern lights',
    imageUrl: 'https://images.unsplash.com/photo-1523287562758-66c7fc58967f?w=800&q=80',
  },
  {
    id: 't7',
    title: 'First Journey',
    category: 'together',
    year: 2021,
    location: 'Kerala',
    description: 'Where it all began',
    imageUrl: 'https://images.unsplash.com/photo-1521791055366-0d553872125f?w=800&q=80',
  },
  {
    id: 't8',
    title: 'Celebration',
    category: 'together',
    year: 2021,
    location: 'Udaipur',
    description: 'Special moments',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
  },
];




export const getPhotosByCategory = (category: Photo['category']) => {
  return photos.filter(photo => photo.category === category);
};

export const getPhotosByYear = (year: number) => {
  return photos.filter(photo => photo.year === year);
};

export const getAvailableYears = () => {
  const years = photos.map(photo => photo.year);
  return Array.from(new Set(years)).sort((a, b) => b - a);
};
