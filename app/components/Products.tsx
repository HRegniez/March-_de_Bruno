"use client"

import { motion } from 'framer-motion';
import { useState } from 'react';
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
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  return (
    <div className=" flex flex-col gap-4">
             <div className="flex overflow-x-auto gap-2 pb-4">
            <motion.button
              role="tab"
              aria-selected={selectedCategory === "all"}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full whitespace-nowrap
                ${selectedCategory === "all" 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-white text-emerald-600'}`}
              onClick={() => setSelectedCategory("all")}
            >
              Tout produits
            </motion.button>
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
                onClick={() => setSelectedCategory(category.name)}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
          {selectedCategory && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mt-4 md:mt-12 bg-white rounded-lg shadow-md p-4 md:p-6"
        >
          <div className="divide-y divide-gray-200">
            {(selectedCategory === "all" 
              ? products.flatMap(cat => cat.products)
              : products.find(cat => cat.name === selectedCategory)?.products || []
            )
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="py-3 flex justify-between items-center"
              >
                <div>
                  <h4 className="font-medium text-gray-800">{item.name}</h4>
                  <p className="text-sm text-gray-600">Origine: {item.origin}</p>
                </div>
                <span className="font-semibold text-emerald-600">{item.price}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
          </div>
  )
}


