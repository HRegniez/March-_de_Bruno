'use client'

import { useScroll} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import ProductsSection from "./sections/ProductsSection";
import APropos from "./sections/APropos";
import Hero from "./sections/Hero";

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

      <section id="contact" className="py-16 z-20 px-4 md:px-8 bg-white snap-start">
        <div className="max-w-7xl bg-emerald-50 rounded-lg p-8 shadow-md mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-emerald-700">
            Contactez-nous
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-emerald-600 mb-2">Adresse</h3>
                <p className="text-gray-600">99 Cr Berriat, 38000 Grenoble</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-emerald-600 mb-2">Horaires</h3>
                <p className="text-gray-600">Lundi - Samedi: 8h - 19h30</p>
                <p className="text-gray-600">Dimanche: 8h - 13h</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-emerald-600 mb-2">Contact</h3>
                <p className="text-gray-600">Tél: +33 9 84 18 14 77</p>
                <p className="text-gray-600">Email: contact@marchedebruno.fr</p>
              </div>
            </div>
            <div className="w-full h-[400px]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d702.9846857617433!2d5.711196028613393!3d45.188336243366365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478af4826c59d6c9%3A0xb2947d423b9e4c07!2s99%20Cr%20Berriat%2C%2038000%20Grenoble!5e0!3m2!1sfr!2sfr!4v1739462240897!5m2!1sfr!2sfr" 
                className="w-full h-full rounded-lg"
                style={{border: 0}} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}






