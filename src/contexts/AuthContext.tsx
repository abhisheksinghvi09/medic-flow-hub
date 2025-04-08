
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { Profile } from '@/types/database.types';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any | null }>;
  signUp: (email: string, password: string, userData: Record<string, any>) => Promise<{ error: any | null }>;
  signOut: () => Promise<void>;
  hasPermission: (action: string, resource: string) => boolean;
  isAdmin: () => boolean;
  isDoctor: () => boolean;
  isPatient: () => boolean;
  updateProfile: (data: Partial<Profile>) => Promise<{ error: any | null }>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set up the auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (currentSession?.user) {
          // Fetch user profile with setTimeout to avoid deadlocks
          setTimeout(() => {
            fetchUserProfile(currentSession.user.id);
          }, 0);
        } else {
          setProfile(null);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        fetchUserProfile(currentSession.user.id);
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      // Using the typed query for Supabase
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('Error fetching user profile:', error);
        return;
      }
      
      setProfile(data as Profile);
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      return { error };
    } catch (error) {
      console.error('Error signing in:', error);
      return { error };
    }
  };

  const signUp = async (email: string, password: string, userData: Record<string, any>) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
        }
      });
      return { error };
    } catch (error) {
      console.error('Error signing up:', error);
      return { error };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const updateProfile = async (data: Partial<Profile>) => {
    if (!user?.id) {
      return { error: new Error('User not authenticated') };
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ ...data, updated_at: new Date().toISOString() })
        .eq('id', user.id);

      if (!error) {
        // Update local profile state
        setProfile(prev => prev ? { ...prev, ...data } : null);
      }

      return { error };
    } catch (error) {
      console.error('Error updating profile:', error);
      return { error };
    }
  };

  // Role-based access control helpers
  const isAdmin = () => profile?.role === 'admin';
  const isDoctor = () => profile?.role === 'doctor';
  const isPatient = () => profile?.role === 'patient';

  // Permission system based on role and resource
  const hasPermission = (action: string, resource: string): boolean => {
    if (!profile) return false;
    
    // Define permissions based on role
    const permissions: Record<string, Record<string, string[]>> = {
      admin: {
        read: ['users', 'appointments', 'medical_records', 'prescriptions', 'health_metrics', 'departments'],
        write: ['users', 'appointments', 'medical_records', 'prescriptions', 'health_metrics', 'departments'],
        delete: ['users', 'appointments', 'medical_records', 'prescriptions', 'health_metrics'],
      },
      doctor: {
        read: ['appointments', 'patients', 'medical_records', 'prescriptions', 'health_metrics', 'departments'],
        write: ['appointments', 'medical_records', 'prescriptions', 'health_metrics'],
        delete: ['appointments'],
      },
      patient: {
        read: ['appointments', 'medical_records', 'prescriptions', 'health_metrics'],
        write: ['appointments', 'health_metrics'],
        delete: ['appointments'],
      }
    };

    return permissions[profile.role]?.[action]?.includes(resource) || false;
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        profile,
        isLoading,
        signIn,
        signUp,
        signOut,
        hasPermission,
        isAdmin,
        isDoctor,
        isPatient,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
