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
{
    id: 't0',
    title: 'Birthday Gift to Arnab',
    category: 'together',
    year: 2025,
    location: 'From Deblina',
    description: 'Our first Sketch',
    imageUrl: '/Together/sketch.png',
},
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
    title: 'Cafe Date',
    category: 'together',
    year: 2025,
    location: 'Ranaghat',
    description: 'Enjoying a cozy cafe date',
    imageUrl: '/Together/02.jpeg',
  },
  {
    id: 't3',
    title: 'Saptami, Durgapuja',
    category: 'together',
    year: 2025,
    location: 'Ranaghat',
    description: 'Walking hand in hand at sunset',
    imageUrl: '/Together/03.jpeg',
  },
  {
    id: 't4',
    title: 'Astami, Durgapuja',
    category: 'together',
    year: 2025,
    location: 'Ranaghat',
    description: 'Cherishing moments together',
    imageUrl: '/Together/04.jpeg',
  },
  {
    id: 't5',
    title: 'DurgaPuja',
    category: 'together',
    year: 2025,
    location: 'Ranaghat',
    description: 'A beautiful day spent together',
    imageUrl: '/Together/05.jpeg',
  },
  {
    id: 't6',
    title: 'Joyful Moments',
    category: 'together',
    year: 2025,
    location: 'Ranaghat',
    description: 'Capturing joyful moments together',
    imageUrl: '/Together/06.jpeg',
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
