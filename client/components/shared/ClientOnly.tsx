import { useEffect, useState, ReactElement, createContext } from 'react';

export const MountedContext = createContext({
  mounted: false,
});

export default function ClientOnly({ children }: { children: ReactElement }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <MountedContext.Provider value={{ mounted }}>
      {children}
    </MountedContext.Provider>
  );
}
