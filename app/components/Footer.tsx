export default function Footer() {
  return (
    <footer className="bg-emerald-800 relative z-10 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Horaires d&apos;ouverture</h3>
            <p>Lundi - Samedi: 8h - 19h30</p>
            <p>Dimanche: 8h - 13h</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>

            <p>99 Cr Berriat</p>
            <p>38000 Grenoble</p>
            <p>Tél: +33 9 84 18 14 77</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Suivez-nous</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-emerald-300 transition">Facebook</a>
              <a href="#" className="hover:text-emerald-300 transition">Instagram</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 