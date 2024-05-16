import  { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
const ScrollToTopOnPageChange = () => {
  const { pathname } = useLocation();

  useEffect(() => {
  }, [pathname]); 
  return null; 
};
export {ScrollToTopOnPageChange};
