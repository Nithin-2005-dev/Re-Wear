import React, { useState } from 'react';

const FeaturedProducts = () => {
  const [featured, setFeatured] = useState([
    "https://images.pexels.com/photos/2205839/pexels-photo-2205839.jpeg",
    "https://images.pexels.com/photos/1337477/pexels-photo-1337477.jpeg","https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg","https://images.pexels.com/photos/1261422/pexels-photo-1261422.jpeg"
  ]);

  return (
    <>
    <h2 className='text-2xl p-1 font-bold'></h2>
    <div className="carousel carousel-center rounded-box w-full max-w-5xl mx-auto p-4 space-x-4">
      {featured.map((pro, index) => (
        <div key={index} className="carousel-item w-full md:w-1/2 lg:w-1/3">
          <img
            src={pro}
            alt={`Featured ${index}`}
            className="w-full h-64 object-cover rounded-lg shadow-md"
          />
        </div>
      ))}
    </div>
    </>
  );
};

export default FeaturedProducts;
