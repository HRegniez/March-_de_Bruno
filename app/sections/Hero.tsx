import { useTransform, motion, type MotionValue } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import HeroLogo from "../components/HeroLogo";
import ServiceFeatures from "../components/ServiceFeatures";
import { ServiceFeaturesMobile } from "../components/ServiceFeaturesMobile";
export default function Hero({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
// const HeroSection = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -1])
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    "/hero-image-1.webp",
    "/hero-image-2.webp",
    "/hero-image-3.webp",
    "/hero-image-4.webp",
    "/hero-image-5.webp",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentImageIndex === images.length - 1) {
        setTimeout(() => {
          setCurrentImageIndex(0);
        }, 100);
      } else {
        setCurrentImageIndex((prevIndex) => prevIndex + 1);
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [currentImageIndex, images.length]);

  return (
    <div id="home" className="h-screen bg-emerald-100 sticky top-0 snap-start">
      {/* Updated logo positioning */}
      <HeroLogo scrollYProgress={scrollYProgress} />

      <motion.section style={{ scale, rotate }} transition={{ ease: "easeIn" }} className="relative md:h-[75vh] h-full w-full mdmt-16 overflow-hidden">
        <motion.div 
          className="flex h-full"
          animate={{
            x: `-${currentImageIndex * 100}%`
          }}
          transition={{
            duration: currentImageIndex === 0 ? 0 : 1,
            ease: "easeInOut"
          }}
        >
          {images.map((src, index) => (
            <Image
              key={src}
              src={src}
              alt="Fruits et légumes frais"
              className="h-full w-full flex-shrink-0 object-cover"
              width={1920}
              height={1080}
              priority={index === 0}
            />
          ))}
        </motion.div>
        <div className="absolute inset-0 bg-black/30 flex items-end justify-center">
          <div className="text-center pb-12">
            <h1 className="sr-only">
              Le petit marché de Bruno, Fruits et légumes frais de saison
            </h1>
          </div>
        </div>
        <ServiceFeaturesMobile  />
      </motion.section>
      <ServiceFeatures scrollYProgress={scrollYProgress} />
    </div>
  )
}