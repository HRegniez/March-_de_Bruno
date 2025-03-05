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
    <section className="h-[25vh] hidden md:block relative bg-gradient-to-r from-white from-50% to-emerald-600 to-50% bg-[length:40px_100%]">
      <div className="max-w-7xl mx-auto px-4 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">


          {features.map((feature, index) => (
            <motion.div
              style={{ 
                transform: `scale(${scale})`
              }}
              whileHover={{ 
                y: 1,
                scale: 1.02,
                transition: {
                  duration: 0.2,
                  ease: "easeIn"
                }
              }}
              initial={{ opacity: 0.9 }}
              animate={{ opacity: 1 }}
              transition={{ ease: "circOut" }}
              key={index} 
              className="flex flex-col bg-white p-4 pt-12 rounded-b-lg items-center relative text-center group shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="w-16 h-16 mb-6 rounded-full absolute -top-8 left-1/2 -translate-x-1/2 bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-200 transition-all duration-300 group-hover:scale-110">
                <feature.icon className="h-11 w-11 text-emerald-600 group-hover:text-emerald-700 transition-colors duration-300" />
              </div>
              <h3 className="font-semibold text-lg mb-3 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 