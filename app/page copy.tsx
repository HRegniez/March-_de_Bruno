'use client'

import Image from "next/image";
import ServiceFeatures from "./components/ServiceFeatures";
import { useScroll, useTransform, motion, type MotionValue } from "framer-motion";
import { useRef } from "react";

export default function Home() {

  const container = useRef(null)
  const { scrollYProgress} = useScroll({
    target: container,
    offset: ["start start", "end end"]
  })

  
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section with sticky behavior */}
      <div ref={container} className="h-[200vh] relative">
        <HeroSection scrollYProgress={scrollYProgress} />
        <ProductsSection scrollYProgress={scrollYProgress} />
      </div>

      <section id="about" className="min-h-screen py-16 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-emerald-700">
            À propos de nous
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-96">
              <Image
                src="/about-image.jpg"
                alt="Notre histoire"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-emerald-600">Notre Histoire</h3>
              <p className="text-gray-600">
                Depuis plus de 20 ans, le Marché de Bruno s&apos;engage à vous proposer les meilleurs fruits et légumes de saison. Notre passion pour les produits frais et notre engagement envers la qualité nous ont permis de devenir votre primeur de confiance.
              </p>
              <p className="text-gray-600">
                Nous travaillons en étroite collaboration avec des producteurs locaux pour vous garantir des produits d&apos;une fraîcheur exceptionnelle tout en soutenant l&apos;agriculture locale.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="min-h-screen py-16 px-4 md:px-8 bg-emerald-50">
        <div className="max-w-7xl mx-auto">
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
                <p className="text-gray-600">Tél: 04 80 15 80 74</p>
                <p className="text-gray-600">Email: contact@marchedebruno.fr</p>
              </div>
            </div>
            <div className="relative h-96">
              <Image
                src="/map-image.jpg"
                alt="Notre localisation"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


const HeroSection = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -2.5])
  return (
    <div id="home" className="h-screen bg-emerald-100 sticky top-0">
      {/* Updated logo positioning */}
      <HeroLogo scrollYProgress={scrollYProgress} />

      <motion.section style={{ scale, rotate }} transition={{ ease: "easeIn" }} className="relative h-[75vh] w-full mt-16">
        <Image
          src="/hero-image.jpg" 
          alt="Fruits et légumes frais"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30 flex items-end justify-center">
          <div className="text-center pb-12">
            <h1 className="text-3xl md:text-4xl mb-10 text-white font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
              Le petit marché de Bruno <br /> Fruits et légumes frais de saison
            </h1>
          </div>
        </div>
      </motion.section>
      <ServiceFeatures scrollYProgress={scrollYProgress} />
    </div>
  )
}

const ProductsSection = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 0])
  return (
    <motion.section id="products" style={{ scale, rotate }} transition={{ ease: "circIn" }} className="h-screen relative px-4 pt-16 md:px-8 bg-emerald-50">
          <div className="max-w-7xl ">
            <h2 className="text-3xl font-bold text-center mb-12 text-emerald-700">
              Nos Produits
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {['Fruits', 'Légumes', 'Produits de saison'].map((category) => (
                <div key={category} className="group cursor-pointer">
                  <div className="relative h-64 overflow-hidden rounded-lg">
                    <Image
                      src={`/${category.toLowerCase()}.jpg`} // You'll need these images
                      alt={category}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                    <h3 className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">
                      {category}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>
  )
}

const HeroLogo = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.3])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0])
  return (
    <motion.div 
      style={{ scale, rotate, opacity }}
      transition={{ ease: "easeOut" }}
      className="fixed left-0 right-0 top-1/3 z-50 mx-auto w-fit"
    >
        <div className="relative w-64 h-64 mb-8 rounded-full overflow-hidden bg-white shadow-xl">
          <Image
            src="/logo.jpg"
            alt="Le petit marché de Bruno"
            fill
            className="object-contain"
            priority
          />
        </div>
      </motion.div>
  )}