"use client"

import { useState, useEffect } from 'react'
import { getProducts } from "@/app/lib/supabase/products"
import NouveauProduit from "./NouveauProduit"
import EditerProduit from './EditerProduit'
import EditerCategory from './EditerCategory'
import NouvelleCategorie from './NouvelleCategorie'

type Product = {
    id: string;
    name: string;
    price: string;
    origin: string;
    type: string;
    in_stock: boolean;
}

type Category = {
    id: string;
    name: string;
    image: string;
    products: Product[];
}

export default function Produits() {
    const [products, setProducts] = useState<Category[]>([])
    const [refreshTrigger, setRefreshTrigger] = useState(0)

    const refreshData = () => {
        setRefreshTrigger(prev => prev + 1)
    }

    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const productsData = await getProducts();
            setProducts(productsData);
          } catch (error) {
            console.error('Error fetching products:', error);
          }
        };
        fetchProducts()
    }, [refreshTrigger])

    return (
        <div className="w-full mt-10">
                <h1 className="text-xl font-bold mb-4">Produits</h1>
                {products.map((category: Category) => (
                    <div key={category.id} className="mb-8">
                        <EditerCategory category={category} onUpdate={refreshData} />
                        <div className="grid gap-4">
                            <EditerProduit category={category} allCategories={products} onUpdate={refreshData} />
                            <NouveauProduit category={category} allCategories={products} onUpdate={refreshData} />
                        </div>
                    </div>
                ))}
                <NouvelleCategorie onUpdate={refreshData} />
            </div>
    )}
