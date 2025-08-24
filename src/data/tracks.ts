import softwareImage from "@/assets/course-software.jpg";
import dataImage from "@/assets/course-data.jpg";
import cloudImage from "@/assets/course-cloud.jpg";
import { useEffect, useState } from "react";
import { trace } from "console";
const API_BASE_URL = 'https://deenaber.pythonanywhere.com';

export interface Track {
  id: string;                // UUID
  name: string;              // Track name
  price: string;             // price as string (convert to number if needed)
  instructor: string;        // instructor name
  duration: string;          // duration, maybe in hours/days
  image: string;             // image URL
  description: string;       // description of the track
  created_at: string;        // ISO timestamp
  updated_at: string;        // ISO timestamp
  average_rating: number | null;  // could be null if not rated yet
  ratings: Rating[];         // list of rating objects (empty if none)
}
export interface Rating {
  // e.g.:
  user: string;       // UUID of user
  score: number;      // rating score (1-5, etc.)
  comment?: string;   // optional feedback
}

export const useTracks = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [trackLoading, setLoading] = useState<boolean>(true);
  const [trackError, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/tracks`);
        if (!res.ok) throw new Error("Failed to fetch tracks");

        const data = await res.json();
        console.log("Track Data: ",data);
        // adjust mapping if API response shape differs
        setTracks(
            data.map((t: any) => ({
            id: t.id,                     // UUID string
            name: t.name,                 // Track name
            price: parseFloat(t.price),   // convert string price -> number
            instructor: t.instructor,     // instructor name
            duration: t.duration,         // duration as string (e.g., "10")
            image: t.image,               // image URL
            description: t.description,   // description text
            created_at: t.created_at,     // ISO timestamp
            updated_at: t.updated_at,     // ISO timestamp
            average_rating: t.average_rating, // number | null
            ratings: t.ratings || []      // default to empty array if undefined
            }))
        );
        
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();
  }, []);
  
  return { tracks, trackLoading, trackError };
};