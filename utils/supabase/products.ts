"use server"

import { createClient } from "./server"

export async function editProduct(id: string, name: string, price: string, origin: string, type: string, in_stock: boolean) {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('bruno_produits')
        .update({ name: name, price: price, origin: origin, type: type, in_stock: in_stock })
        .eq('id', id)
        .select()

    if (error) {
        throw error
    }
    return data
}

export async function deleteProduct(id: string) {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('bruno_produits')
        .delete()
        .eq('id', id)

    if (error) {
        throw error
    }
    return data
}

export const createProduct = async (name: string, price: string, origin: string, type: string, in_stock: boolean) => {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('bruno_produits')
        .insert([{ 
            name: name, 
            price: price, 
            origin: origin, 
            type: type,
            in_stock: in_stock
        }])
        .select()

    if (error) {
        throw error
    }
    return data
}

