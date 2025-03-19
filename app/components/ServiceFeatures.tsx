import { TruckIcon, ShoppingBagIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { motion, useTransform, MotionValue } from 'framer-motion';

export default function ServiceFeatures({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.005])
  const features = [
    {
      icon: SparklesIcon,
      title: "Produits frais, locaux & régionaux",
      description: "Fruits et légumes frais directement de nos producteurs locaux"
    },
    {
      icon: TruckIcon,
      title: "Livraison fraîcheur",
      description: "À venir très prochainement..."
    },
    {
      icon: ShoppingBagIcon,
      title: "Retrait en magasin",
      description: "Récupérez vos produits frais directement en boutique"
    }
  ];

  return (
    <section className="h-[25vh] md:h-[35vh] lg:h-[35vh] hidden md:block relative bg-gradient-to-r from-white from-50% to-emerald-600 to-50% bg-[length:40px_100%]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              style={{ 
                transform: `scale(${scale})`
              }}
              whileHover={{ 
                y: 1,
                scale: 1.01,
                transition: {
                  duration: 0.2,
                  ease: "easeIn"
                }
              }}
              initial={{ opacity: 0.9 }}
              animate={{ opacity: 1 }}
              transition={{ ease: "circOut" }}
              key={index} 
              className="flex flex-col bg-white p-3 md:p-4 pt-16 md:pt-14 lg:pt-12 rounded-b-lg items-center relative text-center group shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="w-14 h-14 md:w-16 md:h-16 mb-4 md:mb-6 rounded-full absolute -top-7 md:-top-8 left-1/2 -translate-x-1/2 bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-200 transition-all duration-300 group-hover:scale-105">
                <feature.icon className="h-8 w-8 md:h-9 md:w-9 lg:h-11 lg:w-11 text-emerald-600 group-hover:text-emerald-700 transition-colors duration-300" />
              </div>
              <h3 className="font-semibold text-base md:text-base lg:text-lg mb-2 md:mb-3 lg:mb-3 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-xs md:text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 