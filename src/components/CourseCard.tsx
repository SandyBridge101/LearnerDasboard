import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Users, Clock } from "lucide-react";
import { Track } from "@/data/courses";

interface CourseCardProps {
  id: string;
  track: Track;
  title: string;
  image: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const CourseCard = ({
  id,
  title,
  description,
  track,
  image,
  createdAt,
  updatedAt,
}: CourseCardProps) => {
  const categoryColors = {
    software: "bg-course-software",
    data: "bg-course-data", 
    cloud: "bg-course-cloud",
    uiux: "bg-course-uiux"
  };

  return (
    <Card className="group hover:shadow-strong transition-all duration-300 hover:-translate-y-1 bg-card-gradient border-border/50">
      <div className="aspect-video relative overflow-hidden rounded-t-lg">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className={`absolute top-3 left-3 px-2 py-1 rounded text-xs font-semibold text-white ${categoryColors[track.duration]}`}>
          {track.name.toUpperCase()}
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(track.duration) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-sm font-semibold ml-1">{track.duration}</span>
          </div>
        </div>
        
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {description}
        </p>
        
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span>{track.instructor}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{track.instructor}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-primary">
            ${track.price}
          </div>
          <Badge variant="secondary">{track.price === 0 ? "Free" : "Paid"}</Badge>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link to={`/courses/${id}`}>
            Preview course
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;