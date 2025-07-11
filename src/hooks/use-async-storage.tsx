import { useState, useEffect } from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';

export function useAsyncStorage<T>(key: string, defaultValue: T) {
  const [storedValue, setStoredValue] = useState<T>(defaultValue);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadStoredValue();
  }, [key]);

  const loadStoredValue = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const item = await EncryptedStorage.getItem(key);
      if (item) {
        const parsedValue = JSON.parse(item);
        setStoredValue(parsedValue);
      } else {
        setStoredValue(defaultValue);
      }
    } catch (err) {
      console.error(`Error loading stored value for key "${key}":`, err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      setStoredValue(defaultValue);
    } finally {
      setIsLoading(false);
    }
  };

  const setValue = async (value: T) => {
    try {
      setError(null);
      
      // Update state immediately
      setStoredValue(value);
      
      // Store in encrypted storage
      await EncryptedStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error(`Error storing value for key "${key}":`, err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      
      // Revert state on error
      await loadStoredValue();
    }
  };

  const removeValue = async () => {
    try {
      setError(null);
      
      // Update state immediately
      setStoredValue(defaultValue);
      
      // Remove from encrypted storage
      await EncryptedStorage.removeItem(key);
    } catch (err) {
      console.error(`Error removing value for key "${key}":`, err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      
      // Revert state on error
      await loadStoredValue();
    }
  };

  return {
    value: storedValue,
    setValue,
    removeValue,
    isLoading,
    error,
    reload: loadStoredValue,
  };
}