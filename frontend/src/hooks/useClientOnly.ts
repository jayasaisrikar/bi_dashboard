import { useState, useEffect } from 'react';

export function useClientOnly() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}

export function useCurrentDate() {
  const [currentDate, setCurrentDate] = useState<string>('');
  const mounted = useClientOnly();

  useEffect(() => {
    if (mounted) {
      const updateDate = () => {
        setCurrentDate(new Date().toLocaleDateString());
      };
      updateDate();
      
      // Update every minute
      const interval = setInterval(updateDate, 60000);
      return () => clearInterval(interval);
    }
  }, [mounted]);

  return mounted ? currentDate : '';
}
