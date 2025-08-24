import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { useEnrollments } from "@/data/enrollments";
import { useTracks } from "@/data/tracks";
import { useState } from "react";

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { enrollments, loading, error } = useEnrollments();
  const { tracks, trackLoading, trackError } = useTracks();

  // collect the track ids from these enrollments
  const enrolledTrackIds = enrollments.map(e => e.track);

  // filter tracks to only those included in enrollments
  const myTracks = tracks.filter(t => enrolledTrackIds.includes(t.id));
  
  console.log('Tracks',tracks);
  console.log('User tracks',myTracks);


  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your activities.</p>
        </div>

        {/* Software Development Team Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Enrollment Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {myTracks.map((track) => (
              <Card key={track.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg text-3xl mb-3">
                      <img 
                      src={track.image} 
                      alt={track.name} 
                      className="w-full h-full object-cover rounded-lg" 
                    />
                  </div>
                  <CardTitle className="text-lg">{track.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{track.duration} week(s)</p>
                  <div className="flex items-center justify-between">
                      {track.instructor}
                    {/*<Button variant="outline" size="sm">View</Button>*/}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Blogs Section */}
        {/*
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-6">Latest Blogs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogs.map((blog) => (
              <Card key={blog.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{blog.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{blog.date}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{blog.description}</p>
                  <Button variant="outline">Read More</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        */}
      </div>
    </Layout>
  );
};

export default Dashboard;