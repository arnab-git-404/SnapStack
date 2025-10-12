export interface Photo {
  id: string;
  title: string;
  category: 'arnab' | 'deblina' | 'together';
  year: number;
  location?: string;
  description?: string;
  imageUrl: string;
}


export const arnabPhotos: Photo[] =[
 {
    id: 'a1',
    title: 'Mountain Adventure',
    category: 'arnab',
    year: 2024,
    location: 'Himalayas',
    description: 'A breathtaking journey through the mountains',
    imageUrl: '/Screenshot 2024-01-22 023925.jpg',
  },
  {
    id: 'a2',
    title: 'Urban Explorer',
    category: 'arnab',
    year: 2023,
    location: 'Tokyo',
    description: 'Exploring the vibrant streets of Tokyo',
    imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80',
  },
  {
    id: 'a3',
    title: 'Coastal Wanderer',
    category: 'arnab',
    year: 2023,
    location: 'Goa',
    description: 'Sunset by the sea',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
  },
];


export const getArnabPhotosByCategory = (category: Photo['category']) => {
  return arnabPhotos.filter(photo => photo.category === category);
};

export const getArnabPhotosByYear = (year: number) => {
  return arnabPhotos.filter(photo => photo.year === year);
};

export const getArnabAvailableYears = () => {
  const years = arnabPhotos.map(photo => photo.year);
  return Array.from(new Set(years)).sort((a, b) => b - a);
};
