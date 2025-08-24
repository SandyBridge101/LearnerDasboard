import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary to-primary-light overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary-light/80" />
      
      <div className="relative container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
              Unlock Your Potential with
              <span className="block">Industry-Leading Courses!</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-primary-foreground/90 mb-8 max-w-2xl">
              Join thousands of learners gaining real-world skills and advancing their careers. Our expert-led courses are designed to empower you to succeed!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" variant="secondary" asChild className="shadow-medium">
                <Link to="/signup">Get Started</Link>
              </Button>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-strong">
              <img
                src={heroImage}
                alt="Professional woman with laptop"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            
            {/* Floating stats */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-medium">
              <div className="text-2xl font-bold text-primary">4+</div>
              <div className="text-sm text-muted-foreground">Courses</div>
            </div>
            
            <div className="absolute -top-4 -right-4 bg-white rounded-xl p-4 shadow-medium">
              <div className="text-2xl font-bold text-primary">200+</div>
              <div className="text-sm text-muted-foreground">Students</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;