import { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Heart, Loader2, Edit, Save, X, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function ProfilePage() {
  const server = import.meta.env.VITE_SERVER_URL;
  const navigate = useNavigate();

  const { user, fetchUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    partnerName: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        partnerName: user.partnerName || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/update-profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update profile");
      }

      setSuccess("Profile updated successfully!");
      await fetchUser();
      setIsEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        name: user.name || "",
        partnerName: user.partnerName || "",
        email: user.email || "",
      });
    }
    setIsEditing(false);
    setError("");
    setSuccess("");
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const getInitials = (name: string | undefined) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(`${server}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        toast.success("Logged out successfully");
        navigate("/login");
      }

    } catch (error) {
      toast.error("Failed to log out");
      console.error("Logout error:", error);
    }
  };

  return (
    <div className=" mt-16 max-w-2xl mx-auto py-8 px-4">
      <Card className="shadow-lg">
        <CardHeader className="text-center pb-6">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-lg bg-pink-100 text-pink-600">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <Heart className="h-6 w-6 text-pink-500 fill-pink-500" />
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-lg bg-pink-100 text-pink-600">
                {getInitials(user.partnerName)}
              </AvatarFallback>
            </Avatar>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            {user.name} & {user.partnerName}
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Manage your couple's profile
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {success && (
            <div className="p-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded-md text-center">
              {success}
            </div>
          )}
          {error && (
            <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md text-center">
              {error}
            </div>
          )}

          {!isEditing ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Your Name
                </span>
                <span className="text-gray-900 dark:text-gray-100">
                  {user.name}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Partner's Name
                </span>
                <span className="text-gray-900 dark:text-gray-100">
                  {user.partnerName ? user.partnerName : "N/A"}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Email
                </span>
                <span className="text-gray-900 dark:text-gray-100">
                  {user.email}
                </span>
              </div>
              <div className="pt-4 grid grid-cols-2 gap-2">
                <Button onClick={() => setIsEditing(true)} className="w-full">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
                <Button onClick={() => handleLogout()} className="w-full">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="partnerName">Partner's Name</Label>
                <Input
                  id="partnerName"
                  name="partnerName"
                  type="text"
                  value={formData.partnerName ? formData.partnerName : "N/A"}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <Button type="submit" disabled={isLoading} className="flex-1">
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}
                  {isLoading ? "Saving..." : "Save"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isLoading}
                  className="flex-1"
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
