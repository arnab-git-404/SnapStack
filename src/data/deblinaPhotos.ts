export interface Photo {
  id: string;
  title: string;
  category: "arnab" | "deblina" | "together";
  year: number;
  location?: string;
  description?: string;
  imageUrl: string;
}


export const deblinaPhotos: Photo[] = [
  {
    id: "d0",
    title: "College",
    category: "deblina",
    year: 2025,
    location: "Law College",
    description: "A cozy day spent indoors",
    imageUrl: "/Deblina/07.jpeg",
  },
  {
    id: "d1",
    title: "Durgapuja",
    category: "deblina",
    year: 2022,
    location: "Ranaghat",
    description: "A breathtaking journey through the mountains",
    imageUrl: "/Deblina/01.jpg",
  },
  {
    id: "d2",
    title: "Casual",
    category: "deblina",
    year: 2022,
    location: "Home",
    description: "A cozy day spent indoors",
    imageUrl: "/Deblina/02.jpg",
  },
  {
    id: "d3",
    title: "Durgapuja",
    category: "deblina",
    year: 2025,
    location: "Ranaghat",
    description: "A vibrant celebration of culture",
    imageUrl: "/Deblina/03.jpeg",
  },
  {
    id: "d4",
    title: "Durgapuja",
    category: "deblina",
    year: 2025,
    location: "Ranaghat",
    description: "A vibrant celebration of culture",
    imageUrl: "/Deblina/04.jpeg",
  },
  {
    id: "d5",
    title: "Durgapuja",
    category: "deblina",
    year: 2025,
    location: "Ranaghat",
    description: "A vibrant celebration of culture",
    imageUrl: "/Deblina/05.jpeg",
  },
  {
    id: "d6",
    title: "Durgapuja",
    category: "deblina",
    year: 2025,
    location: "Ranaghat",
    description: "A vibrant celebration of culture",
    imageUrl: "/Deblina/06.jpeg",
  },
];

export const getDeblinaPhotosByCategory = (category: Photo["category"]) => {
  return deblinaPhotos.filter((photo) => photo.category === category);
};

export const getDeblinaPhotosByYear = (year: number) => {
  return deblinaPhotos.filter((photo) => photo.year === year);
};

export const getDeblinaAvailableYears = () => {
  const years = deblinaPhotos.map((photo) => photo.year);
  return Array.from(new Set(years)).sort((a, b) => b - a);
};
