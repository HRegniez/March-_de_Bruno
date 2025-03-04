import { TruckIcon, ShoppingBagIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { motion, useTransform, MotionValue } from 'framer-motion';

export default function ServiceFeatures({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05])
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
    <section className="h-[25vh] hidden md:block relative bg-gradient-to-r from-white from-50% to-emerald-500/50 to-50% bg-[length:40px_100%]">
      <div className="max-w-7xl mx-auto px-4 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">


          {features.map((feature, index) => (
            <motion.div
              style={{ scale }}
              transition={{ ease: "circOut" }}
              key={index} 
              className="flex flex-col bg-white p-4 pt-12 rounded-b-lg items-center relative text-center group hover:transform hover:scale-105 transition-all duration-300 shadow-2xl"
            >
              <div className="w-16 h-16 mb-6 rounded-full absolute -top-8 left-1/2 -translate-x-1/2 bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-200 transition-colors shadow-md">
                <feature.icon className="h-11 w-11 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-xl mb-3 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 