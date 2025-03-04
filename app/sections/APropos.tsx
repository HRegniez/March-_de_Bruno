import Image from 'next/image';
import { HeartIcon , TruckIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

export default function APropos() {
  const engagements = [
    {
      icon: HeartIcon,
      text: '20 % Bio – Nos produits sont issus de l\'agriculture biologique, sans pesticides ni engrais chimiques.'
    },
    {
      icon: TruckIcon,
      text: 'Circuit court & producteurs locaux – Nous collaborons avec des agriculteurs de la région pour garantir fraîcheur et qualité.'
    },
    {
      icon: GlobeAltIcon,
      text: 'Éco-responsable – Nous privilégions des emballages durables et limitons notre impact environnemental.'
    }
  ];

  return (
    <section 
      id="about" 
      className="py-16 px-4 md:px-8 z-20 snap-start bg-gradient-to-b from-emerald-50 via-white via-40% to-white"
    >
        <div className="max-w-7xl mx-auto p-4 rounded-lg">
            <h2 className="text-3xl font-bold text-center mb-12  text-emerald-700">
            À propos de nous
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="relative w-full h-full">
                    <Image
                        src="/about-image.webp"
                        alt="Notre histoire"
                        fill
                        className="object-cover rounded-lg shadow-lg"
                        priority
                    />
                </div>
                <div className="space-y-6 bg-white p-8 rounded-lg shadow-xl">
                    <p className="text-gray-700 leading-relaxed">
                        Bienvenue chez Le <strong className="text-emerald-600">Petit Marché de Bruno</strong>, votre nouveau marché de fruits et légumes frais et locaux !
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                        Nous avons à cœur de vous proposer des <strong className="text-emerald-600/90">produits frais, sains et savoureux</strong>, cultivés dans le respect de la nature et des saisons.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                        Bien que notre entreprise soit récente, nous reprenons le <strong className="text-emerald-600/90">flambeau d&apos;une activité locale bien ancrée</strong>, en y apportant notre passion pour une <em >alimentation plus responsable et accessible à tous</em>.
                    </p>
                    <h4 className="text-xl font-semibold text-emerald-600 border-b-2 border-emerald-200 pb-2 mt-8">
                        Notre engagement
                    </h4>
                    <ul className="list-none space-y-4 text-gray-700">
                        {engagements.map((item, index) => (
                            <li key={index} className="flex items-center gap-3 bg-emerald-50 p-3 pl-10 shadow-sm rounded-lg relative">
                                <div className="absolute -left-4 w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-md">
                                    <item.icon className="w-10 h-10 text-emerald-600" />
                                </div>
                                <span>{item.text}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="text-gray-700 leading-relaxed">
                        Que vous soyez à la recherche de saveurs authentiques, de conseils sur vos choix alimentaires ou simplement d&apos;un commerce de proximité à taille humaine, nous sommes là pour vous.
                    </p>
                    <p className="text-gray-700 leading-relaxed italic">
                        Rejoignez-nous dans cette aventure gourmande et engagée !
                    </p>
                </div>
            </div>
        </div>
    </section>
  );
}
