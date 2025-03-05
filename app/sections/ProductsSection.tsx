import { motion, useTransform, MotionValue } from 'framer-motion';

import { useState } from 'react';
import ProductsDesktop from '../components/ProductsDesktop';
import ProductsMobile from '../components/ProductsMobile';

const mockProducts = [
  {
    id: '1',
    name: 'Fruits',
    image: '/fruits.webp',
    products: [
      { id: 'f1', name: 'Pommes Bio', price: '2.99€/kg', origin: 'France' },
      { id: 'f2', name: 'Bananes', price: '1.99€/kg', origin: 'République Dominicaine' },
      { id: 'f3', name: 'Oranges', price: '2.49€/kg', origin: 'Espagne' },
      { id: 'f4', name: 'Fraises', price: '3.99€/barquette', origin: 'France' },
      { id: 'f5', name: 'Fraises', price: '3.99€/barquette', origin: 'France' },
      { id: 'f6', name: 'Fraises', price: '3.99€/barquette', origin: 'France' },
    ]
  },
  {
    id: '2',
    name: 'Légumes',
    image: '/légumes.webp',
    products: [
      { id: 'v1', name: 'Carottes Bio', price: '1.99€/kg', origin: 'France' },
      { id: 'v2', name: 'Pommes de terre', price: '1.49€/kg', origin: 'France' },
      { id: 'v3', name: 'Tomates', price: '2.99€/kg', origin: 'France' },
      { id: 'v4', name: 'Courgettes', price: '2.49€/kg', origin: 'Espagne' },
      { id: 'v5', name: 'Aubergines', price: '2.49€/kg', origin: 'Espagne' },
      { id: 'v6', name: 'Poivrons', price: '2.49€/kg', origin: 'Espagne' },
      { id: 'v7', name: 'Aubergines', price: '2.49€/kg', origin: 'Espagne' },
      { id: 'v8', name: 'Poivrons', price: '2.49€/kg', origin: 'Espagne' },
    ]
  },
  {
    id: '3',
    name: 'Épicerie',
    image: '/épiceries.webp',
    products: [
      { id: 'e1', name: 'Huile d\'Olive Extra Vierge', price: '8.99€/75cl', origin: 'Italie' },
      { id: 'e2', name: 'Miel de Fleurs', price: '6.49€/500g', origin: 'France' },
      { id: 'e3', name: 'Pâtes Artisanales', price: '2.99€/500g', origin: 'Italie' },
      { id: 'e4', name: 'Confiture Bio', price: '4.49€/pot', origin: 'France' }
    ]
  }
];

export default function ProductsSection({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    const scale = useTransform(scrollYProgress, [0, 0.5], [0.75, 1])
    const rotate = useTransform(scrollYProgress, [0, 0.5], [-3.5, 0])
    const [products] = useState(mockProducts);

    return (
      <motion.section  
        style={{ scale, rotate }} 
        transition={{ ease: "circIn" }} 
        className="relative px-4 md:px-16 bg-emerald-50 min-h-screen py-40 flex flex-col"
      >
        <motion.div 
          id="products"
          className="w-full max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center py-20 md:py-16 text-emerald-700">
            Nos Produits
          </h2>
          {/* Desktop */}
          <ProductsDesktop products={products} />   
          {/* Mobile */}
          <ProductsMobile products={products} />
        </motion.div>
      </motion.section>
    )
}