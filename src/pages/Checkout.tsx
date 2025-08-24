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

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Layout from "@/components/Layout";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Checkout = () => {
  const { courses, loading, error } = useCourses();
  const { slug } = useParams<{ slug: string }>();
  const course = courses.find(c => c.id === slug);
  const [load, setLoading] = useState(false);
  const navigate = useNavigate();
  console.log(course)
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    cardNumber: "",
    country: "",
    phone: "",
    location: "",
    preferred: ""
  });

  

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCompletePurchase = async () => {
    try {
      
      const user_id =localStorage.getItem("user_id");
      console.log("user",user_id)
      const enroll_payload={
        learner: user_id,
        track: course.track.id,
        amount: Number(course.track.price),
        paystack_callback_url: "https://checkout.paystack.com",
        status: "pending",
        transaction_url: "https://checkout.paystack.com",
        paystack_reference: "None"
      }
      console.log("Enroll attempt:", enroll_payload);
      // Example API call
      const res = await fetch("https://deenaber.pythonanywhere.com/enrollments/create/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(enroll_payload),
      });


      if (!res.ok) {
        toast({
        title: "Failed",
        description: "There is an error trying to check out",});
        throw new Error(`Checkout failed ${res.json()}`);
      }

      const data = await res.json();
      console.log("Login success:", data);

      // Show success toast
      toast({
        title: "Enroll Successful 🎉",
        description: "Your course has been created. Redirecting to Course Dashboard...",
      });

      // Redirect after short delay
      setTimeout(() => navigate("/dashboard"), 2000);

      // Reset form after success
      setFormData({
        firstName: "",
        email: "",
        cardNumber: "",
        country: "",
        phone: "",
        location: "",
        preferred: ""
      });

    } catch (err) {
      console.error("Error during signup:", err);
    } finally {
      setLoading(false);
    }

    console.log("Login attempt:", formData);
    toast({
      title: "Purchase Completed!",
      description: "Your payment of $350.00 USD has been processed successfully.",
    });
  };

  return (
    <Layout>
      <div className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center">Checkout</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Billing Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input 
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card number</Label>
                <Input 
                  id="cardNumber"
                  value={formData.cardNumber}
                  onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                  placeholder="1234 5678 9012 3456"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input 
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input 
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="New York, NY"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferred">Preferred</Label>
                <Select value={formData.preferred} onValueChange={(value) => handleInputChange('preferred', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="phone">Phone</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input 
                  id="description"
                  placeholder="Additional notes..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Payment Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Complete payment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-foreground mb-2">{course?.track?.price ?? "Loading..."}</div>
                <p className="text-muted-foreground">Total amount</p>
              </div>

              {/*
              <div className="space-y-2">
                <Label htmlFor="amount">Select amount</Label>
                <Select defaultValue="350">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="350">{course?.track?.price ?? "Loading..."}</SelectItem>
                    <SelectItem value="500">$500.00 USD</SelectItem>
                    <SelectItem value="750">$750.00 USD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              */}

              <Button 
                className="w-full h-12 text-lg"
                onClick={handleCompletePurchase}
              >
                Complete my purchase →
              </Button>

              <div className="text-xs text-muted-foreground text-center">
                By completing this purchase, you agree to our terms of service and privacy policy.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;