// // import { useState, useEffect } from "react";
// // import {
// //   Card,
// //   CardContent,
// //   CardDescription,
// //   CardHeader,
// //   CardTitle,
// // } from "@/components/ui/card";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Badge } from "@/components/ui/badge";
// // import { Switch } from "@/components/ui/switch";
// // import {
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableHead,
// //   TableHeader,
// //   TableRow,
// // } from "@/components/ui/table";
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogDescription,
// //   DialogHeader,
// //   DialogTitle,
// //   DialogTrigger,
// // } from "@/components/ui/dialog";
// // import {
// //   Users,
// //   RefreshCw,
// //   Server,
// //   MessageSquare,
// //   Search,
// //   CheckCircle2,
// //   XCircle,
// //   Calendar,
// //   Activity,
// // } from "lucide-react";
// // import toast, { Toaster } from "react-hot-toast";

// // interface User {
// //   id: string;
// //   name: string;
// //   partnerName: string;
// //   email: string;
// //   isActivated: boolean;
// //   createdAt: string;
// // }

// // interface ServerStats {
// //   uptime: {
// //     seconds: number;
// //     formatted: string;
// //   };
// //   memory: {
// //     usedMemoryPercentage: string;
// //   };
// //   cpu: {
// //     usage: string;
// //   };
// // }

// // export default function AdminPanel() {
// //   const [users, setUsers] = useState<User[]>([]);
// //   const [serverStats, setServerStats] = useState<ServerStats | null>(null);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [selectedUser, setSelectedUser] = useState<User | null>(null);

// //   const fetchUsers = async () => {
// //     setIsLoading(true);
// //     try {
// //       const response = await fetch(
// //         `${import.meta.env.VITE_SERVER_URL}/api/admin/all-users`,
// //         {
// //           credentials: "include",
// //         }
// //       );

// //       if (!response.ok) throw new Error("Failed to fetch users");

// //       const data = await response.json();
// //       setUsers(data.users);
// //       toast.success("Users data refreshed");
// //     } catch (error) {
// //       toast.error("Failed to fetch users");
// //       console.error(error);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const fetchServerStats = async () => {
// //     try {
// //       const response = await fetch(
// //         `${import.meta.env.VITE_SERVER_URL}/api/admin/server-stats`,
// //         {
// //           credentials: "include",
// //         }
// //       );

// //       if (!response.ok) throw new Error("Failed to fetch server stats");

// //       const data = await response.json();
// //       console.log("Server Stats:", data);

// //       setServerStats(data.stats);
// //     } catch (error) {
// //       toast.error("Failed to fetch server stats");
// //       console.error(error);
// //     }
// //   };

// //   const toggleUserActivation = async (
// //     userId: string,
// //     currentStatus: boolean
// //   ) => {
// //     try {
// //       const response = await fetch(
// //         `${
// //           import.meta.env.VITE_SERVER_URL
// //         }/api/admin/users/${userId}/activation`,
// //         {
// //           method: "PATCH",
// //           headers: {
// //             "Content-Type": "application/json",
// //           },
// //           credentials: "include",
// //           body: JSON.stringify({ isActivated: !currentStatus }),
// //         }
// //       );

// //       if (!response.ok) throw new Error("Failed to update user status");

// //       setUsers((prevUsers) =>
// //         prevUsers.map((user) =>
// //           user.id === userId ? { ...user, isActivated: !currentStatus } : user
// //         )
// //       );

// //       toast.success(
// //         `User ${!currentStatus ? "activated" : "deactivated"} successfully`
// //       );
// //     } catch (error) {
// //       toast.error("Failed to update user status");
// //       console.error(error);
// //     }
// //   };

// //   const handleRefresh = () => {
// //     fetchUsers();
// //     fetchServerStats();
// //   };

// //   useEffect(() => {
// //     fetchUsers();
// //     fetchServerStats();

// //     // Refresh stats every 30 seconds
// //     const interval = setInterval(fetchServerStats, 30000);
// //     return () => clearInterval(interval);
// //   }, []);

// //   const filteredUsers = users.filter(
// //     (user) =>
// //       user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //       user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //       user.partnerName.toLowerCase().includes(searchQuery.toLowerCase())
// //   );

// //   const formatDate = (dateString: string) => {
// //     return new Date(dateString).toLocaleDateString("en-US", {
// //       year: "numeric",
// //       month: "short",
// //       day: "numeric",
// //     });
// //   };

// //   return (
// //     <div className="container mx-auto py-8 px-4 mt-20">
// //       {/* Header */}
// //       <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
// //         <div>
// //           <h1 className="text-3xl font-bold flex items-center gap-2">
// //             <Users className="h-8 w-8" />
// //             Admin Panel
// //           </h1>
// //           <p className="text-muted-foreground mt-1">
// //             Manage users and monitor system
// //           </p>
// //         </div>
// //         <Button
// //           onClick={handleRefresh}
// //           disabled={isLoading}
// //           className="mt-4 md:mt-0"
// //         >
// //           <RefreshCw
// //             className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
// //           />
// //           Refresh Data
// //         </Button>
// //       </div>

// //       {/* Server Stats */}
// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
// //         <Card>
// //           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// //             <CardTitle className="text-sm font-medium">Total Users</CardTitle>
// //             <Users className="h-4 w-4 text-muted-foreground" />
// //           </CardHeader>
// //           <CardContent>
// //             <div className="text-2xl font-bold">{users.length || 0}</div>
// //           </CardContent>
// //         </Card>

// //         <Card>
// //           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// //             <CardTitle className="text-sm font-medium">Active Users</CardTitle>
// //             <Activity className="h-4 w-4 text-muted-foreground" />
// //           </CardHeader>
// //           <CardContent>
// //             <div className="text-2xl font-bold">
// //               {users.filter((user) => user.isActivated == false).length || 0}
// //             </div>
// //           </CardContent>
// //         </Card>

// //         <Card>
// //           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// //             <CardTitle className="text-sm font-medium">Server Uptime</CardTitle>
// //             <Server className="h-4 w-4 text-muted-foreground" />
// //           </CardHeader>
// //           <CardContent>
// //             <div className="text-2xl font-bold">
// //               {serverStats?.uptime?.formatted || "N/A"}
// //             </div>
// //           </CardContent>
// //         </Card>

// //         <Card>
// //           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// //             <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
// //             <Activity className="h-4 w-4 text-muted-foreground" />
// //           </CardHeader>
// //           <CardContent>
// //             <div className="text-2xl font-bold">
// //               {serverStats?.memory?.usedMemoryPercentage || "N/A"}
// //             </div>
// //           </CardContent>
// //         </Card>

// //         <Card>
// //           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// //             <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
// //             <Activity className="h-4 w-4 text-muted-foreground" />
// //           </CardHeader>
// //           <CardContent>
// //             <div className="text-2xl font-bold">
// //               {serverStats?.cpu?.usage || "N/A"}
// //             </div>
// //           </CardContent>
// //         </Card>
// //       </div>

// //       {/* Users Table */}
// //       <Card>
// //         <CardHeader>
// //           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
// //             <div>
// //               <CardTitle>Users Management</CardTitle>
// //               <CardDescription>
// //                 Manage user accounts and permissions
// //               </CardDescription>
// //             </div>
// //             <div className="relative w-full md:w-80">
// //               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
// //               <Input
// //                 placeholder="Search users..."
// //                 value={searchQuery}
// //                 onChange={(e) => setSearchQuery(e.target.value)}
// //                 className="pl-9"
// //               />
// //             </div>
// //           </div>
// //         </CardHeader>
// //         <CardContent>
// //           <div className="overflow-x-auto">
// //             <Table>
// //               <TableHeader>
// //                 <TableRow>
// //                   <TableHead>User</TableHead>
// //                   <TableHead>Email</TableHead>
// //                   <TableHead>Partner</TableHead>
// //                   <TableHead>Joined</TableHead>
// //                   <TableHead>Status</TableHead>
// //                   <TableHead>Actions</TableHead>
// //                 </TableRow>
// //               </TableHeader>
// //               <TableBody>
// //                 {filteredUsers.length === 0 ? (
// //                   <TableRow>
// //                     <TableCell
// //                       colSpan={6}
// //                       className="text-center text-muted-foreground"
// //                     >
// //                       {isLoading ? "Loading..." : "No users found"}
// //                     </TableCell>
// //                   </TableRow>
// //                 ) : (
// //                   filteredUsers.map((user) => (
// //                     <TableRow key={user.id}>
// //                       <TableCell className="font-medium">{user.name}</TableCell>
// //                       <TableCell>{user.email}</TableCell>
// //                       <TableCell>{user.partnerName}</TableCell>
// //                       <TableCell>
// //                         <div className="flex items-center gap-2">
// //                           <Calendar className="h-4 w-4 text-muted-foreground" />
// //                           {formatDate(user.createdAt)}
// //                         </div>
// //                       </TableCell>
// //                       <TableCell>
// //                         <Badge
// //                           variant={user.isActivated ? "default" : "secondary"}
// //                           className="flex items-center gap-1 w-fit"
// //                         >
// //                           {user.isActivated ? (
// //                             <CheckCircle2 className="h-3 w-3" />
// //                           ) : (
// //                             <XCircle className="h-3 w-3" />
// //                           )}
// //                           {user.isActivated ? "Active" : "Inactive"}
// //                         </Badge>
// //                       </TableCell>
// //                       <TableCell>
// //                         <div className="flex items-center gap-2">
// //                           <Switch
// //                             checked={user.isActivated}
// //                             onCheckedChange={() =>
// //                               toggleUserActivation(user.id, user.isActivated)
// //                             }
// //                           />
// //                           <Dialog>
// //                             <DialogTrigger asChild>
// //                               <Button
// //                                 variant="ghost"
// //                                 size="icon"
// //                                 onClick={() => setSelectedUser(user)}
// //                               >
// //                                 <MessageSquare className="h-4 w-4" />
// //                               </Button>
// //                             </DialogTrigger>
// //                             <DialogContent>
// //                               <DialogHeader>
// //                                 <DialogTitle>Chat with {user.name}</DialogTitle>
// //                                 <DialogDescription>
// //                                   Send a message to this user
// //                                 </DialogDescription>
// //                               </DialogHeader>
// //                               <div className="space-y-4 py-4">
// //                                 <div className="space-y-2">
// //                                   <p className="text-sm">
// //                                     <span className="font-medium">Email:</span>{" "}
// //                                     {user.email}
// //                                   </p>
// //                                   <p className="text-sm">
// //                                     <span className="font-medium">
// //                                       Partner:
// //                                     </span>{" "}
// //                                     {user.partnerName}
// //                                   </p>
// //                                   <p className="text-sm">
// //                                     <span className="font-medium">Status:</span>{" "}
// //                                     {user.isActivated ? "Active" : "Inactive"}
// //                                   </p>
// //                                 </div>
// //                                 <Input placeholder="Type your message..." />
// //                                 <Button className="w-full">Send Message</Button>
// //                               </div>
// //                             </DialogContent>
// //                           </Dialog>
// //                         </div>
// //                       </TableCell>
// //                     </TableRow>
// //                   ))
// //                 )}
// //               </TableBody>
// //             </Table>
// //           </div>
// //         </CardContent>
// //       </Card>
// //     </div>
// //   );
// // }





// 2ND VERSION 
// import { useState, useEffect } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { Switch } from "@/components/ui/switch";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Users,
//   RefreshCw,
//   Server,
//   MessageSquare,
//   Search,
//   CheckCircle2,
//   XCircle,
//   Calendar,
//   Activity,
//   ChevronLeft,
//   ChevronRight,
//   ChevronsLeft,
//   ChevronsRight,
// } from "lucide-react";
// import toast, { Toaster } from "react-hot-toast";

// interface User {
//   id: string;
//   name: string;
//   partnerName: string;
//   email: string;
//   isActivated: boolean;
//   createdAt: string;
// }

// interface ServerStats {
//   uptime: {
//     seconds: number;
//     formatted: string;
//   };
//   memory: {
//     usedMemoryPercentage: string;
//   };
//   cpu: {
//     usage: string;
//   };
// }

// export default function AdminPanel() {
//   const [users, setUsers] = useState<User[]>([]);
//   const [serverStats, setServerStats] = useState<ServerStats | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const fetchUsers = async () => {
//     setIsLoading(true);
//     try {
//       const response = await fetch(
//         `${import.meta.env.VITE_SERVER_URL}/api/admin/all-users`,
//         {
//           credentials: "include",
//         }
//       );

//       if (!response.ok) throw new Error("Failed to fetch users");

//       const data = await response.json();
//       setUsers(data.users);
//       toast.success("Users data refreshed");
//     } catch (error) {
//       toast.error("Failed to fetch users");
//       console.error(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fetchServerStats = async () => {
//     try {
//       const response = await fetch(
//         `${import.meta.env.VITE_SERVER_URL}/api/admin/server-stats`,
//         {
//           credentials: "include",
//         }
//       );

//       if (!response.ok) throw new Error("Failed to fetch server stats");

//       const data = await response.json();
//       setServerStats(data.stats);
//     } catch (error) {
//       toast.error("Failed to fetch server stats");
//       console.error(error);
//     }
//   };

//   const toggleUserActivation = async (
//     userId: string,
//     currentStatus: boolean
//   ) => {
//     try {
//       const response = await fetch(
//         `${
//           import.meta.env.VITE_SERVER_URL
//         }/api/admin/users/${userId}/activation`,
//         {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           credentials: "include",
//           body: JSON.stringify({ isActivated: !currentStatus }),
//         }
//       );

//       if (!response.ok) throw new Error("Failed to update user status");

//       setUsers((prevUsers) =>
//         prevUsers.map((user) =>
//           user.id === userId ? { ...user, isActivated: !currentStatus } : user
//         )
//       );

//       toast.success(
//         `User ${!currentStatus ? "activated" : "deactivated"} successfully`
//       );
//     } catch (error) {
//       toast.error("Failed to update user status");
//       console.error(error);
//     }
//   };

//   const handleRefresh = () => {
//     fetchUsers();
//     fetchServerStats();
//   };

//   useEffect(() => {
//     fetchUsers();
//     fetchServerStats();

//     const interval = setInterval(fetchServerStats, 30000);
//     return () => clearInterval(interval);
//   }, []);

//   const filteredUsers = users.filter(
//     (user) =>
//       user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       user.partnerName.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // Pagination calculations
//   const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
//   const startIndex = (currentPage - 1) * rowsPerPage;
//   const endIndex = startIndex + rowsPerPage;
//   const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

//   // Reset to page 1 when search changes
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchQuery]);

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   return (
//     <div className="min-h-screen ">
//       <div className="container mx-auto py-8 px-4 mt-20">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
//           <div>
//             <h1 className="text-4xl font-bold flex items-center gap-3 text-gray-900 dark:text-white">
//               <div className="p-2 bg-blue-500 rounded-lg">
//                 <Users className="h-8 w-8 text-white" />
//               </div>
//               Admin Panel
//             </h1>
//             <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
//               Manage users and monitor system performance
//             </p>
//           </div>
//           <Button
//             onClick={handleRefresh}
//             disabled={isLoading}
//             className="mt-4 md:mt-0 bg-blue-500 hover:bg-blue-600"
//             size="lg"
//           >
//             <RefreshCw
//               className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
//             />
//             Refresh Data
//           </Button>
//         </div>

//         {/* Server Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
//           <Card className="border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                 Total Users
//               </CardTitle>
//               <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
//                 <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="text-3xl font-bold text-gray-900 dark:text-white">
//                 {users.length || 0}
//               </div>
//               <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//                 Registered accounts
//               </p>
//             </CardContent>
//           </Card>

//           <Card className="border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                 Active Users
//               </CardTitle>
//               <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
//                 <Activity className="h-4 w-4 text-green-600 dark:text-green-400" />
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="text-3xl font-bold text-gray-900 dark:text-white">
//                 {users.filter((user) => user.isActivated).length || 0}
//               </div>
//               <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//                 Currently active
//               </p>
//             </CardContent>
//           </Card>

//           <Card className="border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                 Server Uptime
//               </CardTitle>
//               <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
//                 <Server className="h-4 w-4 text-purple-600 dark:text-purple-400" />
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-gray-900 dark:text-white">
//                 {serverStats?.uptime?.formatted || "N/A"}
//               </div>
//               <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//                 Running time
//               </p>
//             </CardContent>
//           </Card>

//           <Card className="border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                 Memory Usage
//               </CardTitle>
//               <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
//                 <Activity className="h-4 w-4 text-orange-600 dark:text-orange-400" />
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="text-3xl font-bold text-gray-900 dark:text-white">
//                 {serverStats?.memory?.usedMemoryPercentage || "N/A"}
//               </div>
//               <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//                 RAM utilization
//               </p>
//             </CardContent>
//           </Card>

//           <Card className="border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                 CPU Usage
//               </CardTitle>
//               <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
//                 <Activity className="h-4 w-4 text-red-600 dark:text-red-400" />
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="text-3xl font-bold text-gray-900 dark:text-white">
//                 {serverStats?.cpu?.usage || "N/A"}
//               </div>
//               <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//                 Processor load
//               </p>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Users Table */}
//         <Card className="border-2 border-gray-200 dark:border-gray-700 shadow-lg">
//           <CardHeader className="border-b-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
//             <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//               <div>
//                 <CardTitle className="text-2xl text-gray-900 dark:text-white">
//                   Users Management
//                 </CardTitle>
//                 <CardDescription className="text-gray-600 dark:text-gray-400 mt-1">
//                   Manage user accounts and permissions
//                 </CardDescription>
//               </div>
//               <div className="relative w-full md:w-96">
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
//                 <Input
//                   placeholder="Search by name, email or partner..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="pl-10 border-2 border-gray-300 dark:border-gray-600 focus:border-blue-500"
//                 />
//               </div>
//             </div>
//           </CardHeader>
//           <CardContent className="p-0">
//             <div className="overflow-x-auto">
//               <Table>
//                 <TableHeader>
//                   <TableRow className="bg-gray-50 dark:bg-gray-800 border-b-2 border-gray-200 dark:border-gray-700">
//                     <TableHead className="font-bold text-gray-700 dark:text-gray-300">
//                       User
//                     </TableHead>
//                     <TableHead className="font-bold text-gray-700 dark:text-gray-300">
//                       Email
//                     </TableHead>
//                     <TableHead className="font-bold text-gray-700 dark:text-gray-300">
//                       Partner
//                     </TableHead>
//                     <TableHead className="font-bold text-gray-700 dark:text-gray-300">
//                       Joined
//                     </TableHead>
//                     <TableHead className="font-bold text-gray-700 dark:text-gray-300">
//                       Status
//                     </TableHead>
//                     <TableHead className="font-bold text-gray-700 dark:text-gray-300">
//                       Actions
//                     </TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {paginatedUsers.length === 0 ? (
//                     <TableRow>
//                       <TableCell
//                         colSpan={6}
//                         className="text-center text-gray-500 dark:text-gray-400 py-12"
//                       >
//                         {isLoading ? (
//                           <div className="flex items-center justify-center gap-2">
//                             <RefreshCw className="h-5 w-5 animate-spin" />
//                             Loading users...
//                           </div>
//                         ) : (
//                           "No users found"
//                         )}
//                       </TableCell>
//                     </TableRow>
//                   ) : (
//                     paginatedUsers.map((user, index) => (
//                       <TableRow 
//                         key={user.id}
//                         className={`border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
//                           index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-850'
//                         }`}
//                       >
//                         <TableCell className="font-medium text-gray-900 dark:text-white">
//                           {user.name}
//                         </TableCell>
//                         <TableCell className="text-gray-700 dark:text-gray-300">
//                           {user.email}
//                         </TableCell>
//                         <TableCell className="text-gray-700 dark:text-gray-300">
//                           {user.partnerName}
//                         </TableCell>
//                         <TableCell>
//                           <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
//                             <Calendar className="h-4 w-4 text-gray-400" />
//                             {formatDate(user.createdAt)}
//                           </div>
//                         </TableCell>
//                         <TableCell>
//                           <Badge
//                             variant={user.isActivated ? "default" : "secondary"}
//                             className={`flex items-center gap-1 w-fit ${
//                               user.isActivated
//                                 ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-300 dark:border-green-700"
//                                 : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600"
//                             } border-2`}
//                           >
//                             {user.isActivated ? (
//                               <CheckCircle2 className="h-3 w-3" />
//                             ) : (
//                               <XCircle className="h-3 w-3" />
//                             )}
//                             {user.isActivated ? "Active" : "Inactive"}
//                           </Badge>
//                         </TableCell>
//                         <TableCell>
//                           <div className="flex items-center gap-3">
//                             <Switch
//                               checked={user.isActivated}
//                               onCheckedChange={() =>
//                                 toggleUserActivation(user.id, user.isActivated)
//                               }
//                             />
//                             <Dialog>
//                               <DialogTrigger asChild>
//                                 <Button
//                                   variant="ghost"
//                                   size="icon"
//                                   onClick={() => setSelectedUser(user)}
//                                   className="hover:bg-blue-50 dark:hover:bg-blue-900"
//                                 >
//                                   <MessageSquare className="h-4 w-4 text-blue-600 dark:text-blue-400" />
//                                 </Button>
//                               </DialogTrigger>
//                               <DialogContent className="border-2 border-gray-200 dark:border-gray-700">
//                                 <DialogHeader>
//                                   <DialogTitle>Chat with {user.name}</DialogTitle>
//                                   <DialogDescription>
//                                     Send a message to this user
//                                   </DialogDescription>
//                                 </DialogHeader>
//                                 <div className="space-y-4 py-4">
//                                   <div className="space-y-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
//                                     <p className="text-sm">
//                                       <span className="font-medium">Email:</span>{" "}
//                                       {user.email}
//                                     </p>
//                                     <p className="text-sm">
//                                       <span className="font-medium">Partner:</span>{" "}
//                                       {user.partnerName}
//                                     </p>
//                                     <p className="text-sm">
//                                       <span className="font-medium">Status:</span>{" "}
//                                       {user.isActivated ? "Active" : "Inactive"}
//                                     </p>
//                                   </div>
//                                   <Input 
//                                     placeholder="Type your message..." 
//                                     className="border-2 border-gray-300 dark:border-gray-600"
//                                   />
//                                   <Button className="w-full bg-blue-500 hover:bg-blue-600">
//                                     Send Message
//                                   </Button>
//                                 </div>
//                               </DialogContent>
//                             </Dialog>
//                           </div>
//                         </TableCell>
//                       </TableRow>
//                     ))
//                   )}
//                 </TableBody>
//               </Table>
//             </div>

//             {/* Pagination Controls */}
//             {filteredUsers.length > 0 && (
//               <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 border-t-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
//                 <div className="flex items-center gap-4">
//                   <div className="flex items-center gap-2">
//                     <span className="text-sm text-gray-700 dark:text-gray-300">
//                       Rows per page:
//                     </span>
//                     <Select
//                       value={rowsPerPage.toString()}
//                       onValueChange={(value) => {
//                         setRowsPerPage(Number(value));
//                         setCurrentPage(1);
//                       }}
//                     >
//                       <SelectTrigger className="w-20 border-2 border-gray-300 dark:border-gray-600">
//                         <SelectValue />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="10">10</SelectItem>
//                         <SelectItem value="20">20</SelectItem>
//                         <SelectItem value="50">50</SelectItem>
//                         <SelectItem value="100">100</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                   <span className="text-sm text-gray-700 dark:text-gray-300">
//                     Showing {startIndex + 1} to {Math.min(endIndex, filteredUsers.length)} of{" "}
//                     {filteredUsers.length} users
//                   </span>
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <Button
//                     variant="outline"
//                     size="icon"
//                     onClick={() => setCurrentPage(1)}
//                     disabled={currentPage === 1}
//                     className="border-2"
//                   >
//                     <ChevronsLeft className="h-4 w-4" />
//                   </Button>
//                   <Button
//                     variant="outline"
//                     size="icon"
//                     onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                     disabled={currentPage === 1}
//                     className="border-2"
//                   >
//                     <ChevronLeft className="h-4 w-4" />
//                   </Button>
                  
//                   <div className="flex items-center gap-1">
//                     {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                       let pageNum;
//                       if (totalPages <= 5) {
//                         pageNum = i + 1;
//                       } else if (currentPage <= 3) {
//                         pageNum = i + 1;
//                       } else if (currentPage >= totalPages - 2) {
//                         pageNum = totalPages - 4 + i;
//                       } else {
//                         pageNum = currentPage - 2 + i;
//                       }
                      
//                       return (
//                         <Button
//                           key={pageNum}
//                           variant={currentPage === pageNum ? "default" : "outline"}
//                           size="icon"
//                           onClick={() => setCurrentPage(pageNum)}
//                           className={`border-2 ${
//                             currentPage === pageNum
//                               ? "bg-blue-500 hover:bg-blue-600"
//                               : ""
//                           }`}
//                         >
//                           {pageNum}
//                         </Button>
//                       );
//                     })}
//                   </div>

//                   <Button
//                     variant="outline"
//                     size="icon"
//                     onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//                     disabled={currentPage === totalPages}
//                     className="border-2"
//                   >
//                     <ChevronRight className="h-4 w-4" />
//                   </Button>
//                   <Button
//                     variant="outline"
//                     size="icon"
//                     onClick={() => setCurrentPage(totalPages)}
//                     disabled={currentPage === totalPages}
//                     className="border-2"
//                   >
//                     <ChevronsRight className="h-4 w-4" />
//                   </Button>
//                 </div>
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }



 // 3RD VERSION
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  RefreshCw,
  Server,
  MessageSquare,
  Search,
  CheckCircle2,
  XCircle,
  Calendar,
  Activity,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

interface User {
  _id: string;
  name: string;
  partnerName: string;
  email: string;
  isActivated: boolean;
  createdAt: string;
}

interface ServerStats {
  uptime: {
    seconds: number;
    formatted: string;
  };
  memory: {
    usedMemoryPercentage: string;
  };
  cpu: {
    usage: string;
  };
}

export default function AdminPanel() {
  const [users, setUsers] = useState<User[]>([]);
  const [serverStats, setServerStats] = useState<ServerStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/admin/all-users`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) throw new Error("Failed to fetch users");

      const data = await response.json();
      setUsers(data.users);
      toast.success("Users data refreshed");
    } catch (error) {
      toast.error("Failed to fetch users");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchServerStats = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/admin/server-stats`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) throw new Error("Failed to fetch server stats");

      const data = await response.json();
      setServerStats(data.stats);
    } catch (error) {
      toast.error("Failed to fetch server stats");
      console.error(error);
    }
  };

  const toggleUserActivation = async (
    userId: string,
    currentStatus: boolean
  ) => {


    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/admin/users/${userId}/activation`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ isActivated: !currentStatus }),
        }
      );

      if (!response.ok) throw new Error("Failed to update user status");

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, isActivated: !currentStatus } : user
        )
      );

      toast.success(
        `User ${!currentStatus ? "activated" : "deactivated"} successfully`
      );
    } catch (error) {
      toast.error("Failed to update user status");
      console.error(error);
    }
  };

  const handleRefresh = () => {
    fetchUsers();
    fetchServerStats();
  };

  useEffect(() => {
    fetchUsers();
    fetchServerStats();

    const interval = setInterval(fetchServerStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.partnerName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages =
    filteredUsers.length === 0
      ? 1
      : Math.ceil(filteredUsers.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, rowsPerPage]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-24 mt-16">
        <div className="mb-10 flex flex-col gap-6 rounded-3xl border border-slate-200/70 bg-gradient-to-br from-white/90 via-white/70 to-blue-50/60 p-8 shadow-lg backdrop-blur-md dark:border-slate-800 dark:from-slate-900/80 dark:via-slate-900/70 dark:to-slate-950">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="flex items-center gap-3 text-4xl font-bold text-slate-900 dark:text-slate-100">
                <span className="rounded-2xl bg-blue-600/90 p-3 text-white">
                  <Users className="h-8 w-8" />
                </span>
                Admin Panel
              </h1>
              <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
                Manage users, monitor system health, and stay ahead of issues.
              </p>
            </div>
            <Button
              onClick={handleRefresh}
              disabled={isLoading}
              size="lg"
              className="rounded-full bg-blue-600 px-6 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              <RefreshCw
                className={`mr-2 h-5 w-5 ${isLoading ? "animate-spin" : ""}`}
              />
              Refresh Data
            </Button>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            <Card className="border border-transparent bg-white/80 shadow-md backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
                <CardTitle className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
                  Total Users
                </CardTitle>
                <span className="rounded-xl bg-blue-100 p-2 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300">
                  <Users className="h-4 w-4" />
                </span>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900 dark:text-white">
                  {users.length}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Registered accounts
                </p>
              </CardContent>
            </Card>

            <Card className="border border-transparent bg-white/80 shadow-md backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
                <CardTitle className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
                  Active Users
                </CardTitle>
                <span className="rounded-xl bg-green-100 p-2 text-green-600 dark:bg-green-900/50 dark:text-green-300">
                  <Activity className="h-4 w-4" />
                </span>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900 dark:text-white">
                  {users.filter((user) => user.isActivated == true).length || 0}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Currently inactive
                </p>
              </CardContent>
            </Card>

            <Card className="border border-transparent bg-white/80 shadow-md backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
                <CardTitle className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
                  Server Uptime
                </CardTitle>
                <span className="rounded-xl bg-purple-100 p-2 text-purple-600 dark:bg-purple-900/50 dark:text-purple-300">
                  <Server className="h-4 w-4" />
                </span>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold text-slate-900 dark:text-white">
                  {serverStats?.uptime?.formatted ?? "N/A"}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  System online duration
                </p>
              </CardContent>
            </Card>

            <Card className="border border-transparent bg-white/80 shadow-md backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
                <CardTitle className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
                  Memory Usage
                </CardTitle>
                <span className="rounded-xl bg-amber-100 p-2 text-amber-600 dark:bg-amber-900/50 dark:text-amber-300">
                  <Activity className="h-4 w-4" />
                </span>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900 dark:text-white">
                  {serverStats?.memory?.usedMemoryPercentage ?? "N/A"}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  RAM utilization
                </p>
              </CardContent>
            </Card>

            <Card className="border border-transparent bg-white/80 shadow-md backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
                <CardTitle className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
                  CPU Usage
                </CardTitle>
                <span className="rounded-xl bg-rose-100 p-2 text-rose-600 dark:bg-rose-900/50 dark:text-rose-300">
                  <Activity className="h-4 w-4" />
                </span>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900 dark:text-white">
                  {serverStats?.cpu?.usage ?? "N/A"}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Processor load
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className=" border rounded-3xl  shadow-xl backdrop-blur dark:border-slate-800 dark:bg-slate-900">
          <CardHeader className="border rounded-3xl border-slate-200/70  backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle className="text-xl font-semibold text-slate-900 dark:text-white">
                  Users Management
                </CardTitle>
                <CardDescription className="text-sm text-slate-600 dark:text-slate-300">
                  Search, filter, and manage user accounts seamlessly.
                </CardDescription>
              </div>
              <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="Search by name, email, or partner..."
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className="h-11 rounded-full border-2 border-slate-300 bg-white/90 pl-11 text-sm shadow-sm transition focus:border-blue-500 focus:bg-white focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:focus:border-blue-500"
                />
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table className="text-sm">
                <TableHeader className="bg-slate-100/80 text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-900/70 dark:text-slate-300">
                  <TableRow className="border-b border-slate-200/70 dark:border-slate-800">
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Partner</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedUsers.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="py-12 text-center text-slate-500 dark:text-slate-400"
                      >
                        {isLoading ? (
                          <span className="inline-flex items-center gap-3">
                            <RefreshCw className="h-4 w-4 animate-spin text-blue-500" />
                            Loading users...
                          </span>
                        ) : (
                          "No users found"
                        )}
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedUsers.map((user, index) => (
                      <TableRow
                        key={user._id}
                        className={`border-b border-slate-200/60 last:border-b-0 transition-colors hover:bg-slate-100/60 dark:border-slate-800 dark:hover:bg-slate-900/70 ${
                          index % 2 === 0
                            ? "bg-white/80 dark:bg-slate-950"
                            : "bg-slate-50/80 dark:bg-slate-900/60"
                        }`}
                      >
                        <TableCell className="font-medium text-slate-900 dark:text-slate-100">
                          {user.name}
                        </TableCell>
                        <TableCell className="text-slate-600 dark:text-slate-300">
                          {user.email}
                        </TableCell>
                        <TableCell className="text-slate-600 dark:text-slate-300">
                          {user.partnerName}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                            <Calendar className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                            {formatDate(user.createdAt)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={user.isActivated ? "default" : "secondary"}
                            className={`flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold ${
                              user.isActivated
                                ? "border-green-500/30 bg-green-100 text-green-700 dark:border-green-500/40 dark:bg-green-900/50 dark:text-green-100"
                                : "border-slate-400/30 bg-slate-200 text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
                            }`}
                          >
                            {user.isActivated ? (
                              <CheckCircle2 className="h-3 w-3" />
                            ) : (
                              <XCircle className="h-3 w-3" />
                            )}
                            {user.isActivated ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Switch
                              checked={user.isActivated}
                              onCheckedChange={() =>
                                toggleUserActivation(user._id, user.isActivated)
                              }
                            />
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => setSelectedUser(user)}
                                  className="rounded-full text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/40"
                                >
                                  <MessageSquare className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-md border border-slate-200/70 shadow-2xl dark:border-slate-700">
                                <DialogHeader>
                                  <DialogTitle className="text-lg font-semibold">
                                    Chat with {selectedUser?.name ?? user.name}
                                  </DialogTitle>
                                  <DialogDescription>
                                    Send a quick message to this user.
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                  <div className="space-y-2 rounded-2xl border border-slate-200/70 bg-slate-50/80 p-4 text-sm dark:border-slate-700 dark:bg-slate-900/60">
                                    <p>
                                      <span className="font-medium text-slate-600 dark:text-slate-300">
                                        Email:
                                      </span>{" "}
                                      {user.email}
                                    </p>
                                    <p>
                                      <span className="font-medium text-slate-600 dark:text-slate-300">
                                        Partner:
                                      </span>{" "}
                                      {user.partnerName}
                                    </p>
                                    <p>
                                      <span className="font-medium text-slate-600 dark:text-slate-300">
                                        Status:
                                      </span>{" "}
                                      {user.isActivated ? "Active" : "Inactive"}
                                    </p>
                                  </div>
                                  <Input
                                    placeholder="Type your message..."
                                    className="h-11 rounded-xl border-2 border-slate-300 dark:border-slate-700"
                                  />
                                  <Button className="w-full rounded-full bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                                    Send Message
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {filteredUsers.length > 0 && (
              <div className="flex flex-col gap-4 border-t border-slate-200/70 bg-slate-100/80 px-4 py-4 text-sm dark:border-slate-800 dark:bg-slate-900/70 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-300">
                      Rows per page
                    </span>
                    <Select
                      value={rowsPerPage.toString()}
                      onValueChange={(value) => setRowsPerPage(Number(value))}
                    >
                      <SelectTrigger className="h-9 w-24 rounded-full border-2 border-slate-300 bg-white/90 text-sm dark:border-slate-700 dark:bg-slate-950">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900">
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-300 md:text-sm">
                    Showing {startIndex + 1}–
                    {Math.min(endIndex, filteredUsers.length)} of{" "}
                    {filteredUsers.length} users
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                    className="h-9 w-9 rounded-full border border-slate-300 disabled:opacity-40 dark:border-slate-600"
                  >
                    <ChevronsLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="h-9 w-9 rounded-full border border-slate-300 disabled:opacity-40 dark:border-slate-600"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, idx) => {
                      const visiblePages = Math.min(5, totalPages);
                      const middleOffset = Math.floor(visiblePages / 2);
                      let pageNumber = currentPage - middleOffset + idx;

                      if (pageNumber < 1) {
                        pageNumber = idx + 1;
                      } else if (pageNumber > totalPages) {
                        pageNumber = totalPages - visiblePages + idx + 1;
                      }

                      pageNumber = Math.min(Math.max(pageNumber, 1), totalPages);

                      return (
                        <Button
                          key={`${pageNumber}-${idx}`}
                          variant={
                            currentPage === pageNumber ? "default" : "outline"
                          }
                          size="icon"
                          onClick={() => setCurrentPage(pageNumber)}
                          className={`h-9 w-9 rounded-full border ${
                            currentPage === pageNumber
                              ? "border-blue-600 bg-blue-600 text-white hover:bg-blue-500 dark:border-blue-500 dark:bg-blue-500"
                              : "border-slate-300 text-slate-600 hover:border-blue-500 hover:text-blue-600 dark:border-slate-600 dark:text-slate-200"
                          }`}
                        >
                          {pageNumber}
                        </Button>
                      );
                    })}
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="h-9 w-9 rounded-full border border-slate-300 disabled:opacity-40 dark:border-slate-600"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                    className="h-9 w-9 rounded-full border border-slate-300 disabled:opacity-40 dark:border-slate-600"
                  >
                    <ChevronsRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}