import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import NavbarComp from './src/frontend/components/NavbarComp';
import LoadingPage from './src/frontend/pages/LoadingPage';
import FooterComp from './src/frontend/components/FooterComp';
const LayoutFE = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div>
          <NavbarComp />
          {/* <SocialShareComp /> */}
          <main> 
            <Outlet />
          </main>
          {/* <FooterComp /> */}
        </div>
      )}
      <FooterComp />
    </div>
  );
};

export default LayoutFE;
