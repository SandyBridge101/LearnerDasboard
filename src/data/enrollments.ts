import softwareImage from "@/assets/course-software.jpg";
import dataImage from "@/assets/course-data.jpg";
import cloudImage from "@/assets/course-cloud.jpg";
import { useEffect, useState } from "react";
import { trace } from "console";
const API_BASE_URL = 'https://deenaber.pythonanywhere.com';

// types/course.ts
export interface Enrollment {
  id: number;
  learner: string;                 // UUID string
  track: string;                   // UUID string
  amount: number;                  // numeric
  paystack_callback_url: string;
  status: "pending" | "completed" | "failed"; // enum of possible statuses
  transaction_url: string;
  paystack_reference: string;
  created_at: string;              // ISO timestamp
  updated_at: string;              // ISO timestamp
}

export const useEnrollments = () => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/enrollments/list`);
        if (!res.ok) throw new Error("Failed to fetch enrollments");

        const data = await res.json();
        console.log("Enrollment Data: ",data);
        // adjust mapping if API response shape differs
        setEnrollments(
          data
          .filter((e: any) => e.learner === localStorage.getItem("user_id"))
          .map((e: any) => ({
            id: e.id,
            learner: e.learner,                 // UUID string
            track: e.track,                 // UUID string
            amount: e.amount,               // numeric
            paystack_callback_url: e.paystack_callback_url,
            status: e.status,// enum of possible statuses
            transaction_url: e.transaction_url,
            paystack_reference: e.paystack_reference,
            created_at: e.created_at,            // ISO timestamp
            updated_at: e.updated_at,         
          }))

          
        );
        
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, []);
  
  return { enrollments, loading, error };
};

