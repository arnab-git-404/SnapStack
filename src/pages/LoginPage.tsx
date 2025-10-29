
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { useUser } from "@/context/UserContext";

// Demo accounts
const demoAccounts = [
  {
    label: "Demo User",
    email: "test@gmail.com",
    password: "Abcd@1234",
  },
];

export default function Login() {

  const { setUser, setIsAuthenticated } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setError("");
  //   setIsLoading(true);

  //   const loginPromise = fetch(
  //     `${import.meta.env.VITE_SERVER_URL}/api/auth/login`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       credentials: "include",
  //       body: JSON.stringify({ email, password }),
  //     }
  //   ).then(async (response) => {
  //     if (response.status === 404) {
  //       throw new Error("User not found. Please check your email.");
  //     }

  //     if (response.status === 401) {
  //       throw new Error("Invalid Password. Please try again.");
  //     }

  //     if (!response.ok) {
  //       throw new Error("Login failed. Please try again.");
  //     }

  //     const data = await response.json();
  //     return data;
  //   });

  //   try {
  //     await toast.promise(loginPromise, {
  //       loading: "Logging in...",
  //       success: "Login successful!",
  //       error: (err) => err.message || "An error occurred",
  //     });

  //     setUser(data.user);
  //     setIsAuthenticated(true);
  //     navigate("/");
  //   } catch (err) {
  //     setError(err instanceof Error ? err.message : "An error occurred");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");
  setIsLoading(true);
 
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;


  try {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password , timezone}),
      }
    );

    if (response.status === 404) {
      throw new Error("User not found. Please check your email.");
    }

    if (response.status === 401) {
      throw new Error("Invalid Password. Please try again.");
    }

    if (!response.ok) {
      throw new Error("Login failed. Please try again.");
    }

    const data = await response.json();
    
    if (data.user.isActivated === false) {
      toast( "Please contact with admin to activate your account.", {
        icon: '🔒',
      });
      return;
    }

    // Update context with returned user data
    setUser(data.user);
    setIsAuthenticated(true);
    
    toast.success("Login successful!");
    navigate("/home");
  } catch (err) {
    toast.error(err instanceof Error ? err.message : "An error occurred");
    setError(err instanceof Error ? err.message : "An error occurred");
  } finally {
    setIsLoading(false);
  }
};

  const fillDemoAccount = (email: string, password: string) => {
    setEmail(email);
    setPassword(password);
    setShowPassword(true);
    toast.success("Demo credentials filled!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-8 px-5">
      <Card className="w-full max-w-md border rounded-2xl mt-20">
        <CardHeader className="space-y-1  ">
          <div className="text-center mb-5">
           
            <h1 onClick={() => navigate('/')} className=" hover:cursor-pointer text-4xl md:text-5xl font-bold mb-3">
              SnapStack
            </h1>
            <p className="text-muted-foreground text-lg">
              Welcome Back! Please login to your account
            </p>
          </div>

          {/* <CardTitle className="text-2xl font-bold text-center">
            Login
          </CardTitle> */}
          {/* <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription> */}
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-2">
            {/* {error && (
              <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">
                {error}
              </div>
            )} */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
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
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-4 w-4 text-gray-500" />
                  ) : (
                    <EyeIcon className="h-4 w-4 text-gray-500" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-end">
              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
            
            {/* Demo Accounts Section */}
            <div className="w-full space-y-3">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or try demo accounts
                  </span>
                </div>
              </div>
              
              <div className=" flex justify-center ">
                {demoAccounts.map((account, index) => (
                  <Button
                    key={index}
                    type="button"
                    // variant="outline"
                    size="sm"
                    onClick={() => fillDemoAccount(account.email, account.password)}
                    disabled={isLoading}
                    className="text-xs"
                  >
                    {account.label}
                  </Button>
                ))}
              </div>
            </div>

            <p className="text-sm text-center ">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}