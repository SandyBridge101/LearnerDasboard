import softwareImage from "@/assets/course-software.jpg";
import dataImage from "@/assets/course-data.jpg";
import cloudImage from "@/assets/course-cloud.jpg";
import { useEffect, useState } from "react";
import { trace } from "console";
const API_BASE_URL = 'https://deenaber.pythonanywhere.com';

// types/course.ts
export interface ApiTrack {
  id: string;
  name: string;
  price: string;
  instructor: string;
  duration: string;
  image: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface ApiCourse {
  id: string;
  track: ApiTrack;
  title: string;
  image: string;
  description: string;
  created_at: string;
  updated_at: string;
}

// Transformed interfaces for your application
export interface Track {
  id: string;
  name: string;
  price: number;
  instructor: string;
  duration: number;
  image: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Course {
  id: string;
  track: Track;
  title: string;
  image: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
export class CourseService {
  static async fetchCourses(): Promise<Course[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/courses/`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const apiCourses: ApiCourse[] = await response.json();
      
      // Transform API data to match our application interfaces
      return apiCourses.map(course => this.transformApiCourse(course));
    } catch (error) {
      console.error('Failed to fetch courses:', error);
      throw new Error('Unable to load courses. Please try again later.');
    }
  }

  static async fetchCourseBySlug(slug: string): Promise<Course | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/courses/?slug=${slug}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const apiCourses: ApiCourse[] = await response.json();
      
      if (apiCourses.length === 0) {
        return null;
      }
      
      return this.transformApiCourse(apiCourses[0]);
    } catch (error) {
      console.error('Failed to fetch course:', error);
      throw new Error('Unable to load course. Please try again later.');
    }
  }
    // Helper method to transform a single track
  private static transformTrack(apiTrack: ApiTrack): Track {
    return {
      id: apiTrack.id,
      name: apiTrack.name,
      price: parseFloat(apiTrack.price),
      instructor: apiTrack.instructor,
      duration: parseInt(apiTrack.duration, 10),
      image: apiTrack.image,
      description: apiTrack.description,
      createdAt: new Date(apiTrack.created_at),
      updatedAt: new Date(apiTrack.updated_at)
    };
  }

  // Helper method to transform a single course
  private static transformApiCourse(apiCourse: ApiCourse): Course {
    return {
      id: apiCourse.id,
      track: this.transformTrack(apiCourse.track),
      title: apiCourse.title,
      image: apiCourse.image,
      description: apiCourse.description,
      createdAt: new Date(apiCourse.created_at),
      updatedAt: new Date(apiCourse.updated_at)
    };
  }
}


export const useCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/courses`);
        if (!res.ok) throw new Error("Failed to fetch courses");

        const data = await res.json();
        console.log("Course Data: ",data);
        // adjust mapping if API response shape differs
        setCourses(
          data.map((c: any) => ({
            id: c.id,
            title: c.title,
            description: c.description,
            image: c.image,
            track: c.track,
            price: c.track?.price ?? 0,
            instructor: c.track?.instructor ?? "Unknown",
            duration: c.track?.duration,
          }))

          
        );
        
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);
  
  return { courses, loading, error };
};

/*
export const courses: Course[] = [
  {
    id: "1",
    title: "Software Development",
    description: "Unlock your potential with comprehensive training in modern software development",
    longDescription: "Unlock your potential with comprehensive training in modern software development. Become a Full-Stack Web Developer with a single comprehensive course covering HTML, CSS, JavaScript, Node, React, PostgreSQL, Web3, and DApps.",
    image: softwareImage,
    price: 350,
    rating: 4.0,
    students: 50,
    duration: "12 weeks",
    category: "software",
    slug: "software-development",
    instructor: "John Doe",
    lessons: 15,
    startDate: "03/2025",
    features: [
      "Build 15 web development projects for your portfolio, ready to apply for junior developer jobs.",
      "After the course you will be able to build ANY website you want.",
      "Build fully-fledged websites and web apps for your startup or business.",
      "Master frontend development with React, NextJs, HTML, CSS, Vue and Angular",
      "Master backend development with Node, PHP, Python etc."
    ],
    prerequisites: ["Basic computer skills", "High school mathematics"]
  },
  {
    id: "2", 
    title: "Data Science Mastery",
    description: "Equip yourself with the skills to analyze, interpret, and leverage data",
    longDescription: "Equip yourself with the skills to analyze, interpret, and leverage data, becoming an expert in data-driven decision-making. Gain hands-on experience with cutting-edge tools and techniques to extract meaningful insights, optimize processes, and drive business growth.",
    image: dataImage,
    price: 350,
    rating: 4.0,
    students: 50,
    duration: "12 weeks",
    category: "data",
    slug: "data-science-mastery",
    instructor: "John Doe",
    lessons: 10,
    startDate: "03/2025",
    features: [
      "Build 10 data science projects for your portfolio, showcasing your expertise and preparing you for data science roles.",
      "After the course, you will be able to analyze, visualize, and interpret complex datasets with confidence.",
      "Develop end-to-end machine learning models and data-driven applications for real-world problems.",
      "Master data analysis and visualization with Python, Pandas, NumPy, Matplotlib, and Seaborn.",
      "Gain expertise in machine learning, deep learning, and AI with TensorFlow, PyTorch, and Scikit-Learn."
    ],
    prerequisites: ["Basic programming knowledge", "Statistics fundamentals"]
  },
  {
    id: "3",
    title: "Cloud Computing Expertise", 
    description: "Gain hands-on experience in cloud computing, preparing you to design, deploy, and manage scalable solutions",
    longDescription: "Gain hands-on experience in cloud architecture, preparing you to design, deploy, and manage scalable and secure cloud solutions. Learn to work with leading cloud platforms like AWS, Azure, and GCP, mastering key concepts such as infrastructure as code (IaC), serverless computing, containerization, and cloud security.",
    image: cloudImage,
    price: 350,
    rating: 4.0,
    students: 50,
    duration: "12 weeks",
    category: "cloud",
    slug: "cloud-computing-expertise",
    instructor: "John Doe", 
    lessons: 12,
    startDate: "03/2025",
    features: [
      "Cloud architecture principles and best practices.",
      "Deploying and managing applications in AWS, Azure, and GCP.",
      "Infrastructure as Code (Terraform, CloudFormation).",
      "Serverless computing with AWS Lambda, Azure Functions, and Google Cloud Functions.",
      "Containerization and orchestration with Docker and Kubernetes.",
      "CI/CD pipelines and automation for cloud-based applications."
    ],
    prerequisites: ["Basic networking knowledge", "Linux command line familiarity"]
  }
];
*/
