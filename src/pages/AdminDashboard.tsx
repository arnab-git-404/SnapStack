import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-hot-toast";
import { Upload, LogOut, Github, Database } from "lucide-react";
import {
  uploadImageToGitHub,
  savePhotoToMongoDB,
} from "@/services/photoService";

interface PhotoFormData {
  title: string;
  category: "arnab" | "deblina" | "together";
  year: number;
  location: string;
  description: string;
  imageFile: File | null;
}

const AdminDashboard = () => {
  const server = import.meta.env.VITE_SERVER_URL;

  const navigate = useNavigate();
  const [formData, setFormData] = useState<PhotoFormData>({
    title: "",
    category: "together",
    year: new Date().getFullYear(),
    location: "",
    description: "",
    imageFile: null,
  });
  const [preview, setPreview] = useState<string>("");
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size should be less than 10MB");
        return;
      }

      setFormData({ ...formData, imageFile: file });

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.imageFile) {
      toast.error("Please select an image");
      return;
    }

    if (!formData.title.trim()) {
      toast.error("Please enter a title");
      return;
    }

    setUploading(true);

    try {
      // Create FormData object for multipart/form-data
      const uploadData = new FormData();
      uploadData.append("title", formData.title);
      uploadData.append("category", formData.category);
      uploadData.append("year", formData.year.toString());
      uploadData.append("location", formData.location);
      uploadData.append("description", formData.description);
      uploadData.append("photo", formData.imageFile);

      const response = await toast.promise(
        fetch(`${server}/api/users/upload-photo`, {
          method: "POST",
          body: uploadData,
        }).then((response) => {
          if (!response.ok) {
            throw new Error("Upload failed");
          }
          return response.json();
        }),
        {
          loading: "Uploading...",
          success: "✅ Upload complete! Photo is now live!",
          error: "❌ Upload failed",
        }
      );

      // Reset form
      setFormData({
        title: "",
        category: "together",
        year: new Date().getFullYear(),
        location: "",
        description: "",
        imageFile: null,
      });
      setPreview("");
    } catch (error: any) {
      toast.error(`❌ Failed to upload: ${error.message}`);
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen dark:from-gray-900 dark:to-gray-800 py-8 px-4 mt-20">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
              <Database className="w-10 h-10" />
              Admin Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Upload photos to GitHub & MongoDB
            </p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="gap-2">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="border-purple-200 bg-purple-50 dark:bg-purple-900/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Github className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="font-semibold text-purple-900 dark:text-purple-100 text-sm">
                    GitHub Storage
                  </p>
                  <p className="text-xs text-purple-700 dark:text-purple-300">
                    Images hosted
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50 dark:bg-green-900/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Database className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-semibold text-green-900 dark:text-green-100 text-sm">
                    MongoDB Database
                  </p>
                  <p className="text-xs text-green-700 dark:text-green-300">
                    Metadata stored
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Upload New Photo
            </CardTitle>
            <CardDescription>Image → GitHub | Data → MongoDB</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Image Upload */}
              <div className="space-y-2">
                <Label htmlFor="image">Photo *</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="cursor-pointer"
                />
                {preview && (
                  <div className="mt-4 relative w-full h-64 rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Perfect Moment"
                  required
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value: "arnab" | "deblina" | "together") =>
                    setFormData({ ...formData, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="arnab">Arnab</SelectItem>
                    <SelectItem value="deblina">Deblina</SelectItem>
                    <SelectItem value="together">Together</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Year and Location */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="year">Year *</Label>
                  <Input
                    id="year"
                    type="number"
                    value={formData.year}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        year: parseInt(e.target.value),
                      })
                    }
                    min="2000"
                    max="2100"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    placeholder="Ranaghat"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="A beautiful moment captured..."
                  rows={4}
                />
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full" disabled={uploading}>
                {uploading ? (
                  <>Uploading...</>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Photo
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* How it works */}
        <Card className="mt-6 border-blue-200 bg-blue-50 dark:bg-blue-900/20">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
              ⚡ How it works:
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800 dark:text-blue-200">
              <li>Upload image → Stored on GitHub (CDN)</li>
              <li>Save metadata → Stored in MongoDB</li>
              <li>Website fetches data from MongoDB in real-time</li>
              <li>Photos appear instantly - NO refresh needed!</li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
