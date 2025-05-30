import React, { createContext, useContext, useState } from 'react';

interface AppContextType {
  userType: 'teacher' | 'parent';
  setUserType: (type: 'teacher' | 'parent') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [userType, setUserType] = useState<'teacher' | 'parent'>('parent');

  return (
    <AppContext.Provider value={{ userType, setUserType }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
} 