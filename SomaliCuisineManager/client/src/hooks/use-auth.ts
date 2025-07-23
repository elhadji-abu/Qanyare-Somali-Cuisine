import { useState, useEffect } from 'react';
import { AuthUser } from '@/lib/types';
import { ClientStorage } from '@/lib/storage';
import { useToast } from '@/hooks/use-toast';

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const savedUser = ClientStorage.getUser();
    const savedAdmin = ClientStorage.getAdmin();
    
    if (savedUser) {
      setUser(savedUser);
    }
    if (savedAdmin) {
      setIsAdmin(true);
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      setUser(data.user);
      ClientStorage.setUser(data.user);
      
      if (data.user.isAdmin) {
        setIsAdmin(true);
        ClientStorage.setAdmin(data.user);
      }

      toast({
        title: "Login successful",
        description: `Welcome back, ${data.user.name}!`,
      });

      return data.user;
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid username or password.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    ClientStorage.clearUser();
    ClientStorage.clearAdmin();
    
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  return {
    user,
    isAdmin,
    login,
    logout,
    isAuthenticated: !!user,
  };
}
