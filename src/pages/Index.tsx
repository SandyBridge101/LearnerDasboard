import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CourseCard from "@/components/CourseCard";
import Footer from "@/components/Footer";
import { useCourses } from "@/data/courses";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";


const Index = () => {
  //const featuredCourses = courses.slice(0, 3);
  const { courses, loading, error } = useCourses();
  const featuredCourses = courses.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      
      {/* Our Solutions Section */}
      <section className="py-16 bg-section-gradient">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Our solutions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Create your account quickly with just your email or social media login. Then explore a wide range of courses.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
          
          <div className="text-center">
            <Button asChild size="lg">
              <Link to="/courses">View All Courses</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              We are proud
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We take pride in our achievements and commitment to excellence. Our work is characterized by innovation, quality, and success.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">4+</div>
              <div className="text-lg font-medium text-foreground">Courses</div>
            </div>
            <div className="p-6">
              <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">200+</div>
              <div className="text-lg font-medium text-foreground">Course students</div>
            </div>
            <div className="p-6">
              <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">250+</div>
              <div className="text-lg font-medium text-foreground">Hours of content</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
            It's time to start investing in yourself
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Unlock your full potential by learning skills that will set you apart. Invest time in knowledge and consistently build on your skills.
          </p>
          <Button size="lg" variant="secondary">
            Get started
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
