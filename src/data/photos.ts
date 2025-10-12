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
  // Arnab Photos
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
  {
    id: 'a4',
    title: 'Desert Dreams',
    category: 'arnab',
    year: 2022,
    location: 'Rajasthan',
    description: 'Lost in the golden sands',
    imageUrl: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80',
  },
  {
    id: 'a5',
    title: 'Winter Wonderland',
    category: 'arnab',
    year: 2022,
    location: 'Kashmir',
    description: 'Snow-covered peaks and valleys',
    imageUrl: 'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?w=800&q=80',
  },
  {
    id: 'a6',
    title: 'City Lights',
    category: 'arnab',
    year: 2021,
    location: 'Mumbai',
    description: 'The city that never sleeps',
    imageUrl: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&q=80',
  },

  // Deblina Photos
  {
    id: 'd1',
    title: 'Garden Serenity',
    category: 'deblina',
    year: 2024,
    location: 'Darjeeling',
    description: 'Among the tea gardens',
    imageUrl: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&q=80',
  },
  {
    id: 'd2',
    title: 'Artistic Soul',
    category: 'deblina',
    year: 2023,
    location: 'Kolkata',
    description: 'Capturing the artistic spirit',
    imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80',
  },
  {
    id: 'd3',
    title: 'Morning Bloom',
    category: 'deblina',
    year: 2023,
    location: 'Shillong',
    description: 'Surrounded by nature',
    imageUrl: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800&q=80',
  },
  {
    id: 'd4',
    title: 'Cultural Heritage',
    category: 'deblina',
    year: 2022,
    location: 'Jaipur',
    description: 'Exploring rich traditions',
    imageUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&q=80',
  },
  {
    id: 'd5',
    title: 'Peaceful Retreat',
    category: 'deblina',
    year: 2022,
    location: 'Rishikesh',
    description: 'Finding inner peace',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80',
  },
  {
    id: 'd6',
    title: 'Autumn Vibes',
    category: 'deblina',
    year: 2021,
    location: 'Sikkim',
    description: 'Colors of the season',
    imageUrl: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800&q=80',
  },

  // Together Photos
  {
    id: 't1',
    title: 'Perfect Moment',
    category: 'together',
    year: 2024,
    location: 'Paris',
    description: 'Creating memories together',
    imageUrl: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80',
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
]


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
