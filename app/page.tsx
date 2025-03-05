'use client'

import { useScroll} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import ProductsSection from "./sections/ProductsSection";
import APropos from "./sections/APropos";
import Hero from "./sections/Hero";
import Contact from "./sections/Contact";
export default function Home() {

  const container = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const { scrollYProgress } = useScroll({
    target: container,
    offset: isMobile ? ["start start", "end 100%"] : ["start start", "end 150%"]
  })

  
  
  return (
    <div className="min-h-screen flex flex-col snap-y snap-mandatory">
      {/* Hero Section with sticky behavior */}
      <div ref={container} className="relative snap-start">
        <Hero scrollYProgress={scrollYProgress} />
        <ProductsSection scrollYProgress={scrollYProgress} />
      </div>
      <APropos />
      <Contact />
    </div>
  );
}






