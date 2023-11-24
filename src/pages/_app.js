import DashboardLeftSide from "@/components/dashboard/dashboardLeftSide/DashboardLeftSide";
import Footer from "@/components/footer/Footer";
import HeaderMenu from "@/components/header/headerMenu/HeaderMenu";
import HeaderTop from "@/components/header/headerTop/HeaderTop";
import LoadingSpinner from "@/components/loadingSpinner/LoadingSpinner";
import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import Router from 'next/router';
import { useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      easing: 'ease', // Easing for the animation
      once: true, // Whether the animation should only happen once
    });
  }, []);

  // Add a listener to listen for route changes
  Router.events.on('routeChangeStart', () => {
    setLoading(true); // Show the custom loading spinner when a route change starts
  });

  Router.events.on('routeChangeComplete', () => {
    setLoading(false); // Hide the loading spinner when a route change is complete
  });

  Router.events.on('routeChangeError', () => {
    setLoading(false); // Hide the loading spinner when a route change has an error
  });

  const router = Router.useRouter();
  const currentPathname = router.pathname;

  // If pathname is not dashboard then show footer
  const shouldShowHeaderFooter = !currentPathname.startsWith('/dashboard')

  return (
    <>
    {/* Top Header */}
      <div className="topApp">
        {shouldShowHeaderFooter && <HeaderTop />} 
      </div>

      {/* Menu */}
      {shouldShowHeaderFooter && <HeaderMenu />}

      {!shouldShowHeaderFooter && <DashboardLeftSide />}
      
      {/* Components */}
      {
        loading ? (
          <LoadingSpinner />
        ) : (
          <Component {...pageProps} />
        )
      }
      

      {/* Footer */}
      {shouldShowHeaderFooter && <Footer />}
      <ToastContainer />
    </>
  );
}
