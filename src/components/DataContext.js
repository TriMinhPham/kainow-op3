import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the context
const DataContext = createContext();

// Create a provider component
export const DataProvider = ({ children }) => {
  const [webContent, setWebContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/web_content.txt');
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`);
        }
        const text = await response.text();
        const data = JSON.parse(text);
        setWebContent(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ webContent, loading, error }}>
      {children}
    </DataContext.Provider>
  );
};

// Create a custom hook to use the data context
export const useWebContent = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useWebContent must be used within a DataProvider');
  }
  return context;
};