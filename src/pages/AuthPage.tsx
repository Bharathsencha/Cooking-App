import { auth } from "../firebase/config";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Changed from wouter to react-router-dom
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/use-auth";

interface LoginFormData {
  username: string;
  password: string;
}

interface RegisterFormData {
  username: string;
  password: string;
}

export default function AuthPage() {
  const navigate = useNavigate(); // Changed from useLocation to useNavigate
  const { user, loading } = useAuth();
  const loginForm = useForm<LoginFormData>();
  const registerForm = useForm<RegisterFormData>();

  useEffect(() => {
    if (user) {
      console.log("User is authenticated, redirecting to home...");
      navigate("/home"); // Changed from setLocation to navigate
    }
  }, [user, navigate]);

  if (user) return null;
  if (loading) return null;

  const handleLogin = async (data: LoginFormData) => {
    try {
      await signInWithEmailAndPassword(auth, data.username, data.password);
      navigate("/home"); // Changed from setLocation to navigate
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please check your credentials and try again.");
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    console.log("Attempting Google login...");

    try {
      await signInWithPopup(auth, provider);
      navigate("/home"); // Changed from setLocation to navigate
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 p-8 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent">
              Welcome to Foodieshare
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form
                  onSubmit={loginForm.handleSubmit(handleLogin)}
                  className="space-y-4"
                >
                  <div>
                    <Label htmlFor="login-username">Username</Label>
                    <Input id="login-username" {...loginForm.register("username")} />
                  </div>
                  <div>
                    <Label htmlFor="login-password">Password</Label>
                    <Input type="password" id="login-password" {...loginForm.register("password")} />
                  </div>
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                </form>
                <Button onClick={handleGoogleLogin} className="w-full mt-4">
                  Login with Google
                </Button>
              </TabsContent>

              <TabsContent value="register">
                <form
                  onSubmit={registerForm.handleSubmit(() => {})}
                  className="space-y-4"
                >
                  <div>
                    <Label htmlFor="register-username">Username</Label>
                    <Input id="register-username" {...registerForm.register("username")} />
                  </div>
                  <div>
                    <Label htmlFor="register-password">Password</Label>
                    <Input type="password" id="register-password" {...registerForm.register("password")} />
                  </div>
                  <Button type="submit" className="w-full">
                    Register
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <div className="w-1/2 bg-gradient-to-br from-orange-100 to-red-50 p-8 flex items-center justify-center">
        <div className="max-w-lg text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Share Your Culinary Journey</h2>
          <p className="text-lg text-gray-700 mb-8">
            Join our community of food lovers. Share recipes, discover new dishes, and connect with
            fellow cooking enthusiasts.
          </p>
          <img
            src="https://images.unsplash.com/photo-1464454709131-ffd692591ee5"
            alt="Food"
            className="rounded-lg shadow-xl"
          />
        </div>
      </div>
    </div>
  );
}