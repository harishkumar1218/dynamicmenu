import { useState,useLayoutEffect } from 'react';

function useCachedFetch(url, options = {}, cacheTime = 300000) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useLayoutEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setLoading(true);

      try {
        let cachedData = getCachedData(url);
        const cacheValid = isCacheValid(url);

        if (!cachedData || !cacheValid) {
          const response = await fetch(url, options);
          const newData = await response.json();
          cachedData = newData;
          setCachedData(url, newData);
          setCacheExpiry(url);
        }

        if (isMounted) {
          setData(cachedData);
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          setError(error);
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url, options]);

  return { data, loading, error };
}
  
// Object to store cached data and its expiry time
const cache = {};

function getCachedData(url) {
  return cache[url] ? cache[url].data : null;
}

function setCachedData(url, data) {
  cache[url] = { data };
}

function isCacheValid(url) {
  const cachedItem = cache[url];
  return cachedItem && Date.now() < cachedItem.expiresAt;
}

function setCacheExpiry(url, cacheTime = 300000) {
  cache[url].expiresAt = Date.now() + cacheTime;
}

export default useCachedFetch;
