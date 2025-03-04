"use client"

import Image from 'next/image';
import { useState } from 'react';
import ProductsList from './ProductsList';

interface ProductCategory {
  id: string;
  name: string;
  image: string;
  products: Array<{
    id: string;
    name: string;
    price: string;
    origin: string;
  }>;
}


export default function ProductsDesktop({ products }: { products: ProductCategory[] }) {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    return (
      <div className="hidden md:flex flex-col gap-4">
        <div className="grid md:grid-cols-3 gap-8">
            {products.map((category) => (
              <div 
                key={category.id} 
                className={`bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-all duration-300
                  ${selectedCategory === category.name ? 'ring-2 ring-emerald-500' : 'brightness-75 hover:brightness-100 hover:scale-105'}`}
                onClick={() => setSelectedCategory(selectedCategory === category.name ? null : category.name)}
              >
                <div className="relative w-full h-48 mb-4">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className={`object-cover rounded-lg transition-all duration-300
                      ${selectedCategory === category.name ? 'brightness-100' : 'brightness-75 hover:brightness-100'}`}
                  />
                </div>
                <h3 className="text-2xl font-bold text-emerald-700 mb-2">{category.name || ''  }</h3>
              </div>
            ))}
          </div>
          <ProductsList products={products} selectedCategory={selectedCategory} />
        </div>
    )
}   