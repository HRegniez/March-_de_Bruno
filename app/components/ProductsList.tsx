import React from 'react'
import { motion } from 'framer-motion';

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

export default function ProductsList({ products, selectedCategory }: { products: ProductCategory[], selectedCategory: string | null }) {
  return (
    <>
      {selectedCategory && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mt-4 md:mt-12 bg-white rounded-lg shadow-md p-4 md:p-6"
        >
          <div className="divide-y divide-gray-200">
            {products
              .find(cat => cat.name === selectedCategory)
              ?.products
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
    </>
  )
}


