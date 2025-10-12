// import { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { Moon, Sun, Menu, X } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { useTheme } from 'next-themes';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaHeart } from "react-icons/fa";



// export const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const { theme, setTheme } = useTheme();
//   const location = useLocation();

//   const links = [
//     { name: 'Home', path: '/' },
//     { name: 'Gallery', path: '/gallery' },
//     { name: 'Arnab', path: '/arnab' },
//     { name: 'Deblina', path: '/deblina' },
//     { name: 'Together', path: '/together' },
//   ];

//   const isActive = (path: string) => location.pathname === path;

//   return (
//     <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-background/80 backdrop-blur-md border rounded-full w-[95%] max-w-7xl">

//       <div className=" px-6 py-4">
//         <div className="flex items-center justify-between">
//           <Link to="/" className="text-2xl font-bold flex items-center gap-2">
//             <FaHeart className="w-10 h-10 text-red-500" />
//             Dear
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center gap-8">
//             {links.map((link) => (
//               <Link
//                 key={link.path}
//                 to={link.path}
//                 className={`text-sm font-medium transition-colors relative ${
//                   isActive(link.path)
//                     ? 'text-foreground'
//                     : 'text-muted-foreground hover:text-foreground'
//                 }`}
//               >
//                 {link.name}
//                 {isActive(link.path) && (
//                   <motion.div
//                     layoutId="navbar-indicator"
//                     className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-accent"
//                     transition={{ type: 'spring', stiffness: 380, damping: 30 }}
//                   />
//                 )}
//               </Link>
//             ))}

//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
//               className="rounded-full"
//             >
//               {theme === 'dark' ? (
//                 <Sun className="w-5 h-5" />
//               ) : (
//                 <Moon className="w-5 h-5" />
//               )}
//             </Button>
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="flex md:hidden items-center gap-2">
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
//               className="rounded-full"
//             >
//               {theme === 'dark' ? (
//                 <Sun className="w-5 h-5" />
//               ) : (
//                 <Moon className="w-5 h-5" />
//               )}
//             </Button>
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => setIsOpen(!isOpen)}
//               className="rounded-full"
//             >
//               {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
//             </Button>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         <AnimatePresence>
//           {isOpen && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: 'auto' }}
//               exit={{ opacity: 0, height: 0 }}
//               className="md:hidden overflow-hidden"
//             >
//               <div className="py-4 space-y-4">
//                 {links.map((link) => (
//                   <Link
//                     key={link.path}
//                     to={link.path}
//                     onClick={() => setIsOpen(false)}
//                     className={`block text-sm font-medium transition-colors ${
//                       isActive(link.path)
//                         ? 'text-foreground'
//                         : 'text-muted-foreground hover:text-foreground'
//                     }`}
//                   >
//                     {link.name}
//                   </Link>
//                 ))}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </nav>
//   );
// };


import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart } from "react-icons/fa";



export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Arnab', path: '/arnab' },
    { name: 'Deblina', path: '/deblina' },
    { name: 'Together', path: '/together' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-background/80 backdrop-blur-md border rounded-full w-[95%] max-w-7xl">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-3xl font-bold flex items-center gap-2">
              <FaHeart className="w-10 h-10 text-red-500" />
              Dear
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors relative ${
                    isActive(link.path)
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-accent"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              ))}

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="rounded-full"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="rounded-full"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className="rounded-full"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
            />
            
            {/* Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-64 bg-background border-l z-50 md:hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <Link to="/" className="text-2xl font-bold flex items-center gap-2" onClick={() => setIsOpen(false)}>
                    <FaHeart className="w-8 h-8 text-red-500" />
                    Dear
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {links.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`block text-lg font-medium transition-colors py-2 ${
                        isActive(link.path)
                          ? 'text-foreground'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};