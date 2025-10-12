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
