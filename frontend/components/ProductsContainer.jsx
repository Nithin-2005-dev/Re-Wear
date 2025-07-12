import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import axios from 'axios';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';

const ProductContainer = () => {
  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const token = Cookies.get('token');
        if (!token) return;

        const decoded = jwtDecode(token);
        const loggedInUserId = decoded.userId; 
        setUserId(loggedInUserId);
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/item/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success) {
          const filtered = res.data.items.filter(
            (item) => item.uploader?._id !== loggedInUserId
          );
          setProducts(filtered);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="min-h-screen bg-black px-4 py-10">
      <h2 className="text-2xl md:text-4xl font-bold text-white text-center mb-8">All Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductContainer;
