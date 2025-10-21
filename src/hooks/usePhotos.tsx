import { useState, useEffect } from "react";
import { Photo } from "@/data/arnabPhotos";

export const usePhotos = (category: Photo["category"]) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/users/photos/${category}`,
          { credentials: "include" }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch photos");
        }

        const data = await response.json();
        setPhotos(data.photos);
        setError(null);
      } catch (err) {
        console.error("Error fetching photos:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch photos");
        setPhotos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category]);

  const years = Array.from(new Set(photos.map((photo) => photo.year))).sort(
    (a, b) => b - a
  );

  return { photos, years, loading, error };
};
