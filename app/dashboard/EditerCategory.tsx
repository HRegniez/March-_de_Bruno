"use client"

import { Button } from "@/components/ui/button";
import { CheckIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";
import { deleteCategory, editCategory } from "@/utils/supabase/category";
import { useState } from "react";
type Product = {
    id: string;
    name: string;
    price: string;
    origin: string;
    type: string;
}

type Category = {
    id: string;
    name: string;
    image: string;
    products: Product[];
}

export default function EditerCategory({ category, onUpdate }: { category: Category, onUpdate: () => void }) {
    const [name, setName] = useState(category.name || "")

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!name.trim()) {
            alert("Le nom de la catégorie ne peut pas être vide")
            return
        }
        try {
            await editCategory(category.id, name)
            alert("Catégorie mise à jour avec succès")
            onUpdate()
        } catch (error) {
            console.error("Update failed:", error)
            alert("Erreur: " + (error instanceof Error ? error.message : "Erreur inconnue"))
        } 
    }

    const handleDelete = async () => {
        if (category.products.length > 0) {
            alert("Cette catégorie contient des produits. Veuillez d'abord supprimer ou déplacer tous les produits avant de supprimer la catégorie.")
            return
        }

        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
            try {
                await deleteCategory(category.id)
                alert("Catégorie supprimée avec succès")
                onUpdate()
            } catch (error) {
                console.error("Delete failed:", error)
                alert("Erreur: " + (error instanceof Error ? error.message : "Erreur inconnue"))
            }
        }
    }

    return (
        <form onSubmit={handleUpdate} className="flex gap-4 items-center">
            <input 
                type="text" 
                value={name}
                onChange={(e) => {
                    setName(e.target.value);
                }}
                placeholder="Nom de la catégorie"
                className="text-lg border rounded p-2 font-bold mb-4"
            />
            <Button type="button" onClick={handleDelete} className="bg-red-500 mb-4">
                <TrashIcon className="w-5 h-5" />
            </Button>
            <Button 
                type="submit"
                className="bg-green-500 mb-4" 
            >
                <CheckIcon className="w-5 h-5" />
            </Button>
        </form>
    )
}
