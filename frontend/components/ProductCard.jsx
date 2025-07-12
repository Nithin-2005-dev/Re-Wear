import React from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
  return (
    <div to={`/products/${product._id}`} className="bg-zinc-900 text-white rounded-2xl overflow-hidden shadow-xl transition-transform hover:scale-105 duration-300">
      <img
        src={product.images[0]}
        alt={product.title}
        className="h-56 w-full object-cover"
      />
      <div className="p-4 space-y-2">
        <h2 className="text-lg font-semibold truncate">{product.title}</h2>
        <p className="text-sm text-zinc-400 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center text-sm text-zinc-300">
          <span>{product.category} | {product.size}</span>
          <span className="bg-emerald-600 text-white px-2 py-1 rounded-full text-xs">
            {product.redeemCost} pts
          </span>
        </div>
      </div>
      <Link className='btn btn-success w-full' to={`/products/${product._id}`}>View Details</Link>
    </div>
  )
}

export default ProductCard
