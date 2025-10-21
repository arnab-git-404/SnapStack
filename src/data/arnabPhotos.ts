// import { useEffect } from "react";

// export interface Photo {
//   title: string;
//   category: "arnab" | "deblina" | "together";
//   year: number;
//   location?: string;
//   description?: string;
//   imageUrl: string;
// }

// // export const arnabPhotos: Photo[] = [
// //   {
// //     id: "a2",
// //     title: "DurgaPuja",
// //     category: "arnab",
// //     year: 2025,
// //     location: "Ranaghat",
// //     description: "A vibrant celebration of culture",
// //     imageUrl: "/Arnab/01.jpeg",
// //   },
// //   {
// //     id: "a1",
// //     title: "Free Hand Body Building",
// //     category: "arnab",
// //     year: 2021,
// //     location: "Bolpur",
// //     description: "A breathtaking journey through the mountains",
// //     imageUrl: "/Arnab/02.jpg",
// //   },
// // ];

// const fetchPhotos = async (category: Photo["category"]): Promise<Photo[]> => {
//   try {
//     const response = await fetch(
//       `${import.meta.env.VITE_SERVER_URL}/api/users/photos/${category}`
//     );

//     if (!response.ok) {
//       throw new Error("Failed to fetch photos");
//     }

//     const data = await response.json();
//     console.log("Fetched photos:", data.photos
//     );

//     return data.photos as Photo[];

//   } catch (error) {
//     console.error("Error fetching photos:", error);
//     return [];
//   }
// };

// fetchPhotos("together");

// export const getArnabPhotosByCategory = (category: Photo["category"]) => {
//   return fetchPhotos.filter((photo) => photo.category === category);
// };

// export const getArnabPhotosByYear = (year: number) => {
//   return arnabPhotos.filter((photo) => photo.year === year);
// };

// export const getArnabAvailableYears = () => {
//   const years = arnabPhotos.map((photo) => photo.year);
//   return Array.from(new Set(years)).sort((a, b) => b - a);
// };




import { useEffect } from "react";

export interface Photo {
  title: string;
  category: "arnab" | "deblina" | "together";
  year: number;
  location?: string;
  description?: string;
  imageUrl: string;
}


const fetchPhotos = async (category: Photo["category"]): Promise<Photo[]> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/users/photos/${category}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch photos");
    }

    const data = await response.json();
    console.log("Fetched photos:", data.photos);

    return data.photos as Photo[];

  } catch (error) {
    console.error("Error fetching photos:", error);
    return [];
  }
};

export const getArnabPhotosByCategory = async (category: Photo["category"]) => {
  const photos = await fetchPhotos(category);
  console.log("Photos in getArnabPhotosByCategory:", photos);
  return photos;
};

export const getArnabPhotosByYear = async (year: number) => {
  const photos = await fetchPhotos("arnab");
  return photos.filter((photo) => photo.year === year);
};


export const getArnabAvailableYears = async (category: Photo["category"]) => {
  const photos = await fetchPhotos(category);
  const years = photos.map((photo) => photo.year);
  return Array.from(new Set(years)).sort((a, b) => b - a);
};