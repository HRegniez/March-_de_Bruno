"use client"

import { motion } from 'framer-motion';
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

export default function ProductsMobile({ products }: { products: ProductCategory[] }) {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);  

  return (
    <div className="md:hidden flex flex-col gap-4">
             <div className="flex overflow-x-auto gap-2 pb-4">
            {products.map((category) => (
              <motion.button
                key={category.id}
                role="tab"
                aria-selected={selectedCategory === category.name}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full whitespace-nowrap
                  ${selectedCategory === category.name 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-white text-emerald-600'}`}
                onClick={() => setSelectedCategory(selectedCategory === category.name ? null : category.name)}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
          <ProductsList products={products} selectedCategory={selectedCategory} />
          </div>
  )
}


