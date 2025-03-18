import Produits from "./Produits"
import LogOut from "./LogOut"

export default function Dashboard() {


    return (
        <div className="flex flex-col items-center p-32 max-w-7xl mx-auto">
            <div className="flex items-center justify-between w-full">
                <h1 className="text-2xl font-bold mb-4">Tableau de bord</h1>
                <LogOut />
            </div>
            <Produits />
        </div>
    )
}

