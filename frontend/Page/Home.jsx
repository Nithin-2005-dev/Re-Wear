import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';
import RedirectToRequests from '../components/RedirectToRequests';
import Footer from '../components/Footer';
import AddItem from '../components/AddItem';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="flex flex-col justify-center items-center">
      <NavBar />
      <Hero />
      <FeaturedProducts />
      <AddItem />
      <RedirectToRequests />
      <Footer />
    </div>
  );
};

export default Home;
