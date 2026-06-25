/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

interface HelpContextType {
  helpEnabled: boolean;
  toggleHelp: () => void;
}

const HelpContext = createContext<HelpContextType | undefined>(undefined);

export function HelpProvider({ children }: { children: ReactNode }) {
  const [helpEnabled, setHelpEnabled] = useState(() => {
    return localStorage.getItem('app_help') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('app_help', String(helpEnabled));
    if (helpEnabled) {
      document.documentElement.classList.add('help-mode');
    } else {
      document.documentElement.classList.remove('help-mode');
    }
  }, [helpEnabled]);

  const toggleHelp = () => setHelpEnabled((v) => !v);

  return (
    <HelpContext.Provider value={{ helpEnabled, toggleHelp }}>
      {children}
    </HelpContext.Provider>
  );
}

export function useHelp() {
  const ctx = useContext(HelpContext);
  if (!ctx) throw new Error('useHelp must be used within HelpProvider');
  return ctx;
}
