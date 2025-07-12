import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div
  className="hero min-h-screen"
  style={{
    backgroundImage:
      "url(https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg)",
  }}
>
  <div className="hero-overlay"></div>
  <div className="hero-content text-neutral-content text-center">
    <div className="">
      <h1 className="mb-5 text-4xl font-bold">ReWear – Breathe New Life into Fashion</h1>
      <p className="mb-5">
        ReWear empowers you to exchange your unused clothes through easy swaps or point-based redemptions. Join a growing community committed to sustainable fashion—where every garment gets a second chance and your wardrobe stays fresh without harming the planet.
      </p>
      <Link to={"/products"}  className="btn btn-ghost font-black text-orange-400 border-1 border-white text-2xl">Explore</Link>
    </div>
  </div>
</div>
  )
}

export default Hero
