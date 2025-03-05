"use client";
import { TruckIcon, ShoppingBagIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { AnimatedList } from "./AnimatedList";

interface Item {
  title: string;
  description: string;
  icon: React.ComponentType<React.ComponentProps<'svg'>>;
}

let features = [
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

features = Array.from({ length: 10 }, () => features).flat();

const Feature = ({ title, description, icon: Icon }: Item) => {
  return (
    <figure className="relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4 bg-white shadow-lg transition-all duration-200 ease-in-out hover:scale-[103%]">
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-10 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: "white",
          }}
        >
          <Icon className="h-6 w-6 text-emerald-600" />
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium text-gray-800">
            <span className="text-sm sm:text-lg">{title}</span>
          </figcaption>
          <p className="text-sm font-normal text-gray-600">
            {description}
          </p>
        </div>
      </div>
    </figure>
  );
};

export function ServiceFeaturesMobile({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={`absolute bottom-0 flex h-[40%] w-full flex-col md:hidden overflow-hidden p-2 ${className || ''}`}>
      <AnimatedList>
        {features.map((item, idx) => (
          <Feature {...item} key={idx} />
        ))}
      </AnimatedList>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
    </div>
  );
}
