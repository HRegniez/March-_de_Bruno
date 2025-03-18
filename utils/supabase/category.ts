"use server"

import { createClient } from "./server"



export async function editCategory(id: string, name: string) {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('bruno_produit_types')
        .update({ name: name })
        .eq('id', id)
        .select()

    if (error) {
        throw error
    }
    return data
}

export async function createCategory(name: string) {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('bruno_produit_types')
        .insert([{ name: name }])
        .select()

    if (error) {
        throw error
    }
    return data
}

export async function deleteCategory(id: string) {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('bruno_produit_types')
        .delete()
        .eq('id', id)
        .select()

    if (error) {
        throw error
    }
    return data
}