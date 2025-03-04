"use server"

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

export async function login(email: string, password: string) {
    "use server"
    
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        })
        
        if (error) throw error
        return data
    } catch (error) {
        throw error
    }
}

export async function getProducts(): Promise<ProductCategory[]> {
    "use server"
    const { data, error } = await supabase
        .from("product_categories")
        .select(`
            id,
            name,
            image,
            products (
                id,
                name,
                price,
                origin,
                category_id
            )
        `)

    if (error) {
        throw new Error(error.message)
    }

    return data || []
}

export async function updateProducts(categories: ProductCategory[]) {
    // First, get all existing product IDs to identify which ones to delete
    const { data: existingProducts } = await supabase
        .from("products")
        .select("id")
    
    const newProductIds = new Set(
        categories.flatMap(category => 
            category.products.map(product => product.id)
        )
    )

    // Delete products that are no longer present
    if (existingProducts) {
        const productsToDelete = existingProducts
            .filter(product => !newProductIds.has(product.id))
            .map(product => product.id)

        if (productsToDelete.length > 0) {
            const { error: deleteError } = await supabase
                .from("products")
                .delete()
                .in("id", productsToDelete)

            if (deleteError) {
                throw new Error(deleteError.message)
            }
        }
    }

    // Update categories
    const { error: categoriesError } = await supabase
        .from("product_categories")
        .upsert(
            categories.map(category => ({
                id: category.id,
                name: category.name,
                image: category.image
            })),
            { onConflict: 'id' }
        )
    
    if (categoriesError) {
        throw new Error(categoriesError.message)
    }

    // Update products
    const allProducts = categories.flatMap(category => 
        category.products.map(product => ({
            ...product,
            category_id: category.id
        }))
    )

    const { error: productsError } = await supabase
        .from("products")
        .upsert(
            allProducts,
            { onConflict: 'id' }
        )
    
    if (productsError) {
        throw new Error(productsError.message)
    }
}

