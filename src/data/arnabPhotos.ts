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
    id: 'a2',
    title: 'DurgaPuja',
    category: 'arnab',
    year: 2025,
    location: 'Ranaghat',
    description: 'A vibrant celebration of culture',
    imageUrl: '/Arnab/01.jpeg',
  },
  {
     id: 'a1',
     title: 'Free Hand Body Building',
     category: 'arnab',
     year: 2021,
     location: 'Bolpur',
     description: 'A breathtaking journey through the mountains',
     imageUrl: '/Arnab/02.jpg',
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
