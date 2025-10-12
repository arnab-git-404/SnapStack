import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const CORRECT_PASSWORD = 'gublu__2001';
const STORAGE_KEY = 'gallery_access';

interface PasswordGateProps {
  children: React.ReactNode;
}

export const PasswordGate = ({ children }: PasswordGateProps) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const hasAccess = sessionStorage.getItem(STORAGE_KEY);
    if (hasAccess === 'true') {
      setIsAuthenticated(true);
    }
    setIsChecking(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase() === CORRECT_PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, 'true');
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  if (isChecking) {
    return null;
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary mb-6"
          >
            <Lock className="w-8 h-8 text-foreground" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Arnab & Deblina's Photo Album</h1>
          <p className="text-muted-foreground text-lg">
            Enter password to access our collection
          </p>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <div>
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              className="h-12 text-center text-lg tracking-wider bg-card border-border focus:border-accent"
              autoFocus
            />
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-destructive text-sm mt-2 text-center"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-lg bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Enter Gallery
          </Button>
        </motion.form>

        {/* <p className="text-center text-sm text-muted-foreground mt-8">
          Hint: The password is "artlover"
        </p> */}
      </motion.div>
    </div>
  );
};
