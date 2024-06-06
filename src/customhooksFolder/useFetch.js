import { useState,useLayoutEffect } from 'react';
import axios from 'axios';

function useCachedFetch(url, sendObj = {}, cacheTime = 300000) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useLayoutEffect(() => {
   
    const fetchData = async () => {
      setLoading(true);
      try {
        // let cachedData = getCachedData(sendObj.action);
        // const cacheValid = isCacheValid(sendObj.action);
      
        // if (!cachedData || !cacheValid) {
          const response = await axios.post('http://localhost:5000/home', sendObj, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
     
          const newData =response.data;
     
          // cachedData = newData;
          // setCachedData(sendObj.action, newData);
          // setCacheExpiry(sendObj.action);
          setData(newData);
          setLoading(false);
        
      } catch (error) {
          setError(error);
          setLoading(false);
      }
    };

    fetchData();

    return () => {
      
    };
  }, []);

  return { data, loading, error };
}
  
// Object to store cached data and its expiry time
const cache = {};

function getCachedData(ind) {
  return cache[ind] ? cache[ind].data : null;
}

function setCachedData(ind, data) {
  cache[ind] = { data };
}

function isCacheValid(ind) {
  const cachedItem = cache[ind];
  return cachedItem && Date.now() < cachedItem.expiresAt;
}

function setCacheExpiry(ind, cacheTime = 300000) {
  cache[ind].expiresAt = Date.now() + cacheTime;
}

export default useCachedFetch;
