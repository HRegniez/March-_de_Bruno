'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { getProducts } from '../actions'
import EditProductsForm from '../components/EditProductsForm'
import { supabase } from '@/lib/supabase'

interface Product {
    id: string
    name: string
    price: string
    origin: string
    category_id: string
}

interface ProductCategory {
    id: string
    name: string
    image: string
    products: Product[]
}

export default function Dashboard() {
    const router = useRouter()
    const [products, setProducts] = useState<ProductCategory[]>([])
    const [showEditForm, setShowEditForm] = useState(false)

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await getProducts()
                setProducts(data)
            } catch (error) {
                console.error('Error loading products:', error)
                router.push('/login')
            }
        }
        
        loadProducts()
    }, [router])

    const handleSignOut = async () => {
        try {
            await supabase.auth.signOut()
            router.push('/login')
        } catch (error) {
            console.error('Error signing out:', error)
        }
    }

    return (
        <div className="pt-24 bg-emerald-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-emerald-700">Dashboard</h1>
                    <button 
                        onClick={handleSignOut}
                        className="bg-emerald-700 text-white px-4 py-2 rounded-md hover:bg-emerald-800"
                    >
                        Sign Out
                    </button>
                </div>
                {/* Add your dashboard content here */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div 
                    className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg"
                    onClick={() => setShowEditForm(!showEditForm)}
                    >
                        <h2 className="text-xl font-bold text-emerald-700">Produits</h2>
                    </div>
                </div>
                {showEditForm && <EditProductsForm products={products} />}
            </div>
        </div>
    )
}