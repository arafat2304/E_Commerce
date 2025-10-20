// src/components/FeaturedProducts.jsx
import React from 'react'
import ProductCard from './ProductCard'

const sample = [
  { img: '/assets/images/p1.jpg', title: 'Casual T-Shirt', price: 499, mrp: 799, discount: '38% off', rating: '4.3' },
  { img: '/assets/images/p2.jpg', title: 'Sneakers', price: 1499, mrp: 1999, discount: '25% off', rating: '4.5' },
  { img: '/assets/images/p3.jpg', title: 'Backpack', price: 899, mrp: 1299, discount: '30% off', rating: '4.2' },
  { img: '/assets/images/p4.jpg', title: 'Sunglasses', price: 349, mrp: 699, discount: '50% off', rating: '4.1' },
]

export default function FeaturedProducts({products = sample}) {
  return (
    <section className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">Popular Products</h3>
        <button className="text-sm text-green-600">View all</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((p, i) => <ProductCard key={i} product={p} />)}
      </div>
    </section>
  )
}
