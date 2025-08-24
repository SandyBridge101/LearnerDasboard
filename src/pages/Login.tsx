import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    try {
      console.log("Login attempt:", formData);

      const userdata = {
        email: email,
        password: password,
      };
      // Example API call
      const res = await fetch("https://deenaber.pythonanywhere.com/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userdata),
      });


      if (!res.ok) {
        toast({
        title: "Failed",
        description: "There is an error trying to log in",});
        throw new Error(`Login failed ${res.json()}`);
      }

      const data = await res.json();
      localStorage.setItem("user_id", data.user.id);
      localStorage.setItem("user_first_name", data.user.first_name);
      localStorage.setItem("user_last_name", data.user.last_name);
      localStorage.setItem("user_email", data.user.email);
      localStorage.setItem("user_contact", data.user.contact);
      localStorage.setItem("user_location", data.user.location);
      console.log("Login success:", data.user);

      // Show success toast
      toast({
        title: "Login Successful 🎉",
        description: "Your account has been created. Redirecting to Dashboard...",
      });

      // Redirect after short delay
      setTimeout(() => navigate("/dashboard"), 2000);

      // Reset form after success
      setFormData({
        email: "",
        password: "",
      });

    } catch (err) {
      console.error("Error during signup:", err);
    } finally {
      setLoading(false);
    }

    console.log("Login attempt:", { email, password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-4">
            <div className="bg-primary rounded p-1.5">
              <BookOpen className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-primary">CClient</span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Log in to continue your learning journey
          </h1>
        </div>

        <Card className="shadow-strong">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl text-center">Welcome back!</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="text-right">
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" className="w-full" size="lg">
                Log In
              </Button>
            </form>

            <div className="mt-6 text-center">
              <span className="text-muted-foreground">Don't have an account? </span>
              <Link to="/signup" className="text-primary hover:underline font-medium">
                Sign up here
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Links */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 text-primary">
            <div className="bg-primary rounded p-1">
              <BookOpen className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-bold">CClient</span>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            © copyright 2025 - G-client, All rights reserved
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;