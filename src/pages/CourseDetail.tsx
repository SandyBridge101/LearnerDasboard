import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CourseCard from "@/components/CourseCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCourses } from "@/data/courses";
import { useNavigate } from "react-router-dom";
import { 
  ChevronRight, 
  Clock, 
  Users, 
  BookOpen, 
  User,
  Calendar,
  Star 
} from "lucide-react";

const CourseDetail = () => {
  const { courses, loading, error } = useCourses();
  const { slug } = useParams<{ slug: string }>();
  const course = courses.find(c => c.id === slug);
  const navigate = useNavigate();
  console.log(courses,course)


  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Course not found</h1>
          <Button asChild>
            <Link to="/courses">Back to Courses</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedCourses = courses.filter(c => c.track.id !== course.track.id).slice(0, 2);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Breadcrumb */}
      <div className="border-b bg-muted/20">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/courses" className="hover:text-primary">courses</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="capitalize">{course.track.name}</span>
          </div>
        </div>
      </div>

      {/* Course Header */}
      <section className="bg-primary py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
                {course.title} Track
              </h1>
              
              <p className="text-lg text-primary-foreground/90 mb-6">
                {course.description}
              </p>

              <div className="grid grid-cols-3 gap-6 text-primary-foreground">
                <div>
                  <div className="font-semibold">Instructor</div>
                  <div className="text-primary-foreground/80">{course.track.instructor}</div>
                </div>
                <div>
                  <div className="font-semibold">Duration</div>
                  <div className="text-primary-foreground/80">{course.track.duration}</div>
                </div>
                <div>
                  <div className="font-semibold">1 review</div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < Math.floor((new Date(course.createdAt).getUTCMonth() + 1) / 12) 
                            ? "fill-yellow-400 text-yellow-400" 
                            : "text-primary-foreground/40"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Course Image */}
            <div className="relative">
              <div className="bg-white rounded-xl p-6 shadow-strong">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full aspect-square object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Course Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">

              {/*
              <h2 className="text-2xl font-bold text-foreground mb-6">
                What you'll learn
              </h2>
              
              <div className="space-y-4 mb-12">
                {course.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-muted-foreground">{feature}</p>
                  </div>
                ))}
              </div>
              */}

              {/* Related Courses */}
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Explore related courses
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {relatedCourses.map((relatedCourse) => (
                  <div key={relatedCourse.id} className="flex gap-4 p-4 border rounded-lg hover:shadow-medium transition-shadow">
                    <img
                      src={relatedCourse.image}
                      alt={relatedCourse.title}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{relatedCourse.title}</h3>
                      <p className="text-muted-foreground text-sm line-clamp-2">
                        {relatedCourse.description}
                      </p>
                      <Link to={`/courses/${relatedCourse.id}`}>
                        View course
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card border rounded-xl p-6 sticky top-6">
                <h3 className="font-bold text-lg mb-4">Course Details</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Duration</div>
                      <div className="text-sm text-muted-foreground">{course.track.duration}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Description</div>
                      <div className="text-sm text-muted-foreground">{course.track.description}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Instructor</div>
                      <div className="text-sm text-muted-foreground">{course.track.instructor}</div>
                    </div>
                  </div>
                  {/*
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Date</div>
                      <div className="text-sm text-muted-foreground">{new Date(course.createdAt)}</div>
                    </div>
                  </div>
                  */}
                  

                </div>

                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-primary">${course.track.price}</div>
                </div>

                <Button asChild className="w-full" size="lg">
                  <Link to={`/checkout/${course.id}`}>
                    Enroll
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CourseDetail;