
import * as React from 'react';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Moon, Sun, Menu, X, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';
import { useUser } from '@/context/UserContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';


import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import toast from 'react-hot-toast';


const ListItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link> & { title: string; active?: boolean }
>(({ className, title, children, active, to, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild active={active}>
        <Link
          ref={ref}
          to={to}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors',
            'hover:bg-accent/10 dark:hover:bg-accent/20 hover:text-accent-foreground',
            'focus:bg-accent focus:text-accent-foreground',
            { 'bg-accent/50 text-accent-foreground': active },
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';




export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const { name, partnerName, user, logout, isAuthenticated } = useUser();

 
  const links = [
    { name: 'Home', path: '/' },
    { name: name, path: `/${name}` },
    { name: partnerName, path: `/${partnerName}` },
    { name: 'together', path: '/together' },
    { name: 'Puzzle', path: '/puzzle' },
    { name: 'Upload', path: '/upload' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      toast.error('Logout failed');
      console.error('Logout failed:', error);
    }
  };

  const getInitials = (name: string | undefined) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (isAuthenticated) 

  return (
    <>
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-background/80 backdrop-blur-md border rounded-full w-[95%] max-w-7xl">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/home" className="text-3xl font-bold flex items-center gap-2">
              <FaHeart className="w-10 h-10 text-red-500" />
              Dear
            </Link>

            {/* --- ENHANCED Desktop Navigation --- */}
            <div className="hidden md:flex items-center gap-4">
              <NavigationMenu>
                <NavigationMenuList>
                  {/* 1. Home Link */}
                  <NavigationMenuItem>
                    <Link to="/home">
                      <NavigationMenuLink
                        active={isActive('/')}
                        className={navigationMenuTriggerStyle()}
                      >
                        Home
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>

                  {/* 2. Our Space Dropdown */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger
                      className={cn({
                        'bg-accent/50 text-accent-foreground': // Highlight trigger if a child is active
                          isActive(`/${name}`) ||
                          isActive(`/${partnerName}`) ||
                          isActive('/together'),
                      })}
                    >
                      Our Space
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-4 w-[400px] md:w-[500px]">
                        <ListItem
                          to={`/${name}`}
                          title={name || 'Your Page'}
                          active={isActive(`/${name}`)}
                        >
                          Your personal memories and moments.
                        </ListItem>
                        <ListItem
                          to={`/${partnerName}`}
                          title={partnerName || "Partner's Page"}
                          active={isActive(`/${partnerName}`)}
                        >
                          Your partner's personal memories and moments.
                        </ListItem>
                        <ListItem
                          to="/together"
                          title="Together"
                          active={isActive('/together')}
                        >
                          A shared space for both of you.
                        </ListItem>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* 3. Activities Dropdown */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger
                      className={cn({
                        'bg-accent/50 text-accent-foreground': // Highlight trigger if a child is active
                          isActive('/puzzle') || isActive('/upload'),
                      })}
                    >
                      Activities
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-4 w-[300px] md:w-[400px]">
                        <ListItem
                          to="/puzzle"
                          title="Puzzle"
                          active={isActive('/puzzle')}
                        >
                          Solve a fun picture puzzle together.
                        </ListItem>
                        <ListItem
                          to="/upload"
                          title="Upload"
                          active={isActive('/upload')}
                        >
                          Add new photos to your collection.
                        </ListItem>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              {/* Theme Toggle (remains the same) */}
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

              {/* Profile Dropdown (remains the same) */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        {getInitials(user?.name)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {user && (
                    <>
                      <DropdownMenuLabel>
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {name} & {partnerName}
                          </p>
                          <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {/* ---------------------------------- */}

            {/* Mobile Menu Button (remains the same) */}
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

      {/* Mobile Navigation Sidebar (remains the same) */}
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
                  <Link
                    to="/"
                    className="text-2xl font-bold flex items-center gap-2"
                    onClick={() => setIsOpen(false)}
                  >
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
                  {/* This loop is perfect for mobile */}
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
                  <div className="border-t pt-4 space-y-2">
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => {
                        navigate('/profile');
                        setIsOpen(false);
                      }}
                    >
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};