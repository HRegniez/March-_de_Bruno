'use client'

import { motion, useTransform, MotionValue } from 'framer-motion';

import { useState, useEffect } from 'react';
import Products from '../components/Products';
import { getProducts } from '../lib/supabase/products';
import type { ProductCategory } from '../lib/supabase/products';



export default function ProductsSection({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    const [isMobile, setIsMobile] = useState(false);
    const [products, setProducts] = useState<ProductCategory[]>([]);


    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768)
      }
      checkMobile();
      window.addEventListener('resize', checkMobile);

      return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const productsData = await getProducts();
          setProducts(productsData);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };

      fetchProducts();
    }, []);

    const scale = useTransform(scrollYProgress, isMobile ? [0 , 0.5] :[0, 1], [0.5, 1])
    const rotate = useTransform(scrollYProgress, isMobile ? [0 , 0.5] :[0, 1], [-7, 0])

    return (
      <motion.section  
        style={{ scale, rotate }} 
        transition={{ ease: "circIn" }} 
        className="relative px-4 md:px-16 bg-emerald-50 min-h-screen py-48 flex flex-col"
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
          {/* <ProductsDesktop products={products}/>    */}
          {/* Mobile */}
          <Products products={products}/>
        </motion.div>
      </motion.section>
    )
}