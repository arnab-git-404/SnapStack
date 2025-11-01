// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { toast } from 'react-hot-toast';
// import axios from 'axios';
// import { useUser } from '@/context/UserContext';

// interface InviteDetails {
//   inviterName: string;
//   inviterEmail: string;
//   partnerName: string;
//   partnerEmail: string;
// }

// const AcceptInvitation = () => {

//   const SERVER_URL = import.meta.env.VITE_SERVER_URL;
//   const { setUser, setIsAuthenticated } = useUser();
//   const { token } = useParams<{ token: string }>();
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(false);
//   const [checking, setChecking] = useState(true);
//   const [inviteValid, setInviteValid] = useState(false);
//   const [inviteDetails, setInviteDetails] = useState<InviteDetails | null>(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: ''
//   });

//   useEffect(() => {
//     console.log('Invitation token:', token);
//     if (token) {
//       checkInviteValidity();
//     }
//   }, [token]);

//   const checkInviteValidity = async () => {
//     try {
//       const response = await axios.get(
//         `${SERVER_URL}/api/partner/invite/${token}`
//       );

//       console.log('Invite validity response:', response.data);

//       if (response.data.success) {
//         setInviteValid(true);
//         setInviteDetails(response.data.data);
//         // Pre-fill email and name
//         setFormData(prev => ({
//           ...prev,
//           name: response.data.data.partnerName,
//           email: response.data.data.partnerEmail
//         }));
//       }
//     } catch (error: any) {
//       setInviteValid(false);
//       const message = error.response?.data?.message || 'Invalid or expired invitation';
//       toast.error(message);
//     } finally {
//       setChecking(false);
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Validation
//     if (formData.password !== formData.confirmPassword) {
//       toast.error('Passwords do not match');
//       return;
//     }

//     if (formData.password.length < 6) {
//       toast.error('Password must be at least 6 characters');
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await axios.post(
//         `${SERVER_URL}/api/partner/accept-invite/${token}`,
//         {
//           name: formData.name,
//           email: formData.email,
//           password: formData.password
//         },
//         { withCredentials: true }
//       );

//       if (response.data.success) {
//         toast.success('Partnership activated! 🎉');
//         setIsAuthenticated(true);
//         setUser(response.data.user);
//         setTimeout(() => {
//           navigate('/home');
//         }, 2000);
//       }
//     } catch (error: any) {
//       const message = error.response?.data?.message || 'Failed to accept invitation';
//       toast.error(message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (checking) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Verifying invitation...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!inviteValid) {
//     return (
//       <div className="min-h-screen flex items-center justify-center  p-4">
//         <div className="max-w-md w-full  rounded-2xl shadow-xl p-8 text-center">
//           <div className="text-6xl mb-4">❌</div>
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">
//             Invalid Invitation
//           </h2>
//           <p className="text-gray-600 mb-6">
//             This invitation link is invalid or has expired.
//           </p>
//           <button
//             onClick={() => navigate('/')}
//             className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
//           >
//             Go to Home
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center  p-4">
//       <div className="max-w-md w-full">
//         <div className=" rounded-2xl shadow-2xl p-8">
//           {/* Header */}
//           <div className="text-center mb-8">
//             <div className="text-6xl mb-4">💑</div>
//             <h1 className="text-3xl font-bold  mb-2">
//               Join SnapStack
//             </h1>
//             <p className="">
//               {inviteDetails?.inviterName} invited you to be their partner!
//             </p>
//           </div>

//           {/* Invitation Info */}
//           <div className="bg-gradient-to-r from-purple-500 to-blue-500 border border-purple-200 rounded-lg p-4 mb-6">
//             <div className="flex items-center mb-2">
//               <span className="text-2xl mr-3">👤</span>
//               <div>
//                 <p className="text-sm text-gray-600">Invited by</p>
//                 <p className="font-semibold text-gray-800">
//                   {inviteDetails?.inviterName}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Name */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Your Name
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="Your name"
//                 className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
//                 required
//               />
//             </div>

//             {/* Email (pre-filled, read-only) */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 className="w-full px-4 py-3 rounded-lg border border-gray-300  cursor-not-allowed"
//                 readOnly
//               />
//               <p className="text-xs text-gray-500 mt-1">
//                 This email was specified in the invitation
//               </p>
//             </div>

//             {/* Password */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Create Password
//               </label>
//               <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="••••••••"
//                 className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
//                 required
//                 minLength={6}
//               />
//             </div>

//             {/* Confirm Password */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Confirm Password
//               </label>
//               <input
//                 type="password"
//                 name="confirmPassword"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 placeholder="••••••••"
//                 className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
//                 required
//               />
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {loading ? (
//                 <span className="flex items-center justify-center">
//                   <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//                   </svg>
//                   Accepting Invitation...
//                 </span>
//               ) : (
//                 'Accept & Create Account 🎉'
//               )}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AcceptInvitation;



import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useUser } from '@/context/UserContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Heart, Mail, Lock, User } from 'lucide-react';

interface InviteDetails {
  inviterName: string;
  inviterEmail: string;
  partnerName: string;
  partnerEmail: string;
}

const AcceptInvitation = () => {
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;
  const { setUser, setIsAuthenticated } = useUser();
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [inviteValid, setInviteValid] = useState(false);
  const [inviteDetails, setInviteDetails] = useState<InviteDetails | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    console.log('Invitation token:', token);
    if (token) {
      checkInviteValidity();
    }
  }, [token]);

  const checkInviteValidity = async () => {
    try {
      const response = await axios.get(
        `${SERVER_URL}/api/partner/invite/${token}`
      );

      console.log('Invite validity response:', response.data);

      if (response.data.success) {
        setInviteValid(true);
        setInviteDetails(response.data.data);
        setFormData(prev => ({
          ...prev,
          name: response.data.data.partnerName,
          email: response.data.data.partnerEmail
        }));
      }
    } catch (error: any) {
      setInviteValid(false);
      const message = error.response?.data?.message || 'Invalid or expired invitation';
      toast.error(message);
    } finally {
      setChecking(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${SERVER_URL}/api/partner/accept-invite/${token}`,
        {
          name: formData.name,
          email: formData.email,
          password: formData.password
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success('Partnership activated! 🎉');
        setIsAuthenticated(true);
        setUser(response.data.user);
        setTimeout(() => {
          navigate('/home');
        }, 2000);
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to accept invitation';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-purple-600 mb-4" />
            <p className="text-muted-foreground">Verifying invitation...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!inviteValid) {
    return (
      <div className="min-h-screen flex items-center justify-center  p-4">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center text-center py-12 px-6">
            <div className="text-6xl mb-4">❌</div>
            <h2 className="text-2xl font-bold mb-4">Invalid Invitation</h2>
            <p className="text-muted-foreground mb-6">
              This invitation link is invalid or has expired.
            </p>
            <Button onClick={() => navigate('/')} className="w-full sm:w-auto">
              Go to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl border-2 rounded-2xl mt-20 ">
        <Card className="shadow-2xl">
          <CardHeader className="text-center space-y-4 pb-6">
            {/* <div className="flex justify-center">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-6 rounded-full">
                <Heart className="h-12 w-12 text-white" />
              </div>
            </div> */}
            <CardTitle className="text-3xl sm:text-4xl font-bold">
              Join SnapStack
            </CardTitle>
            <CardDescription className="text-base sm:text-lg">
              {inviteDetails?.inviterName} invited you to be their partner!
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Invitation Info Card */}
            <div className=" border-2  rounded-lg p-4 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="bg-white p-3 rounded-full">
                  <User className="h-6 w-6 text-purple-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted-foreground mb-1">Invited by</p>
                  <p className="font-semibold text-lg break-words">
                    {inviteDetails?.inviterName}
                  </p>
                  <p className="text-sm text-muted-foreground break-all">
                    {inviteDetails?.inviterEmail}
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Your Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  className="h-11"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  readOnly
                  className="h-11 cursor-not-allowed"
                />
                <p className="text-xs text-muted-foreground">
                  This email was specified in the invitation
                </p>
              </div>

              {/* Password Fields */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password" className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    minLength={6}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    className="h-11"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 text-base "
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Accepting Invitation...
                  </>
                ) : (
                  <>
                    Accept & Create Account 🎉
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AcceptInvitation;