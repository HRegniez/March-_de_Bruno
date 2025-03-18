import { Button } from "@/components/ui/button"
import { deleteProduct, editProduct } from "@/utils/supabase/products";
import { CheckIcon, TrashIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

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

export default function EditerProduit({ category, allCategories, onUpdate }: { category: Category, allCategories: Category[], onUpdate: () => void }) {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log("Updating product...")
        const formData = new FormData(e.target as HTMLFormElement)
        const productId = formData.get('productId')
        const name = formData.get('name')
        const price = formData.get('price')
        const origin = formData.get('origin')
        const type = formData.get('type')
        const in_stock = formData.get('in_stock') === 'on'
        await editProduct(productId as string, name as string, price as string, origin as string, type as string, in_stock)
        onUpdate()
        resetForm(e)
    }
    const resetForm = (e: React.FormEvent<HTMLFormElement>) => {
        (e.target as HTMLFormElement).reset()
    }
    const handleDelete = async (id: string) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
            await deleteProduct(id) 
            onUpdate()
        }
    }

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <div className="w-full">
            {/* Header - hide on mobile */}
            <div className="hidden md:grid grid-cols-7 gap-4 font-bold mb-4">
                <div>Nom</div>
                <div>Prix</div>
                <div>Origine</div>
                <div>Catégorie</div>
                <div>En stock</div>
                <div>Sauvegarder</div>
                <div>Supprimer</div>
            </div>
            <div className="space-y-4">
                {category.products.map((product) => (
                    <div key={product.id} >
                        {/* Desktop view */}
                        <form onSubmit={handleUpdate} className="hidden md:grid grid-cols-7 gap-4 items-center">
                            <input 
                                type="hidden"
                                name="productId"
                                value={product.id}
                            />
                            <div>
                                <input 
                                    type="text" 
                                    name="name"
                                    defaultValue={product.name}
                                    placeholder="Nom du produit"
                                    className="border rounded p-2"
                                />
                            </div>
                            <div>
                                <input 
                                    type="text" 
                                    name="price"
                                    defaultValue={product.price}
                                    placeholder="Prix"
                                    className="border rounded p-2"
                                />
                            </div>
                            <div>
                                <input 
                                    type="text" 
                                    name="origin"
                                    defaultValue={product.origin}
                                    placeholder="Origine"
                                    className="border rounded p-2"
                                />
                            </div>
                            <div>
                                <select 
                                    name="type"
                                    defaultValue={product.type}
                                    className="border rounded p-2 w-full"
                                >
                                    {allCategories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex items-center">
                                <input 
                                    type="checkbox" 
                                    name="in_stock"
                                    defaultChecked={product.in_stock}
                                    className="h-4 w-4"
                                />
                            </div>
                            <div>
                                <Button type="submit" className="bg-green-500">
                                    <CheckIcon className="w-5 h-5" />
                                </Button>
                            </div>
                            <div>
                                <Button 
                                    type="button"
                                    onClick={() => handleDelete(product.id)} 
                                    className="bg-red-500"
                                >
                                    <TrashIcon className="w-5 h-5" />
                                </Button>
                            </div>
                        </form>

                        {/* Mobile view */}
                        <form onSubmit={handleUpdate} className="md:hidden border rounded-lg shadow-sm">
                            <input 
                                type="hidden"
                                name="productId"
                                value={product.id}
                            />
                            {/* Card Header */}
                            <div 
                                className="p-4 flex items-center justify-between cursor-pointer"
                                onClick={() => toggleExpand(product.id)}
                            >
                                <div className="font-semibold">{product.name}</div>
                                <ChevronDownIcon 
                                    className={`w-5 h-5 transition-transform duration-200 ${
                                        expandedId === product.id ? 'transform rotate-180' : ''
                                    }`}
                                />
                            </div>

                            {/* Expandable Content */}
                            <div className={`
                                overflow-hidden transition-all duration-200 ease-in-out
                                ${expandedId === product.id ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
                            `}>
                                <div className="space-y-4 p-4 pt-0 border-t">
                                    <div className="space-y-2">
                                        <label className="font-bold">Nom</label>
                                        <input 
                                            type="text" 
                                            name="name"
                                            defaultValue={product.name}
                                            placeholder="Nom du produit"
                                            className="border rounded p-2 w-full"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="font-bold">Prix</label>
                                        <input 
                                            type="text" 
                                            name="price"
                                            defaultValue={product.price}
                                            placeholder="Prix"
                                            className="border rounded p-2 w-full"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="font-bold">Origine</label>
                                        <input 
                                            type="text" 
                                            name="origin"
                                            defaultValue={product.origin}
                                            placeholder="Origine"
                                            className="border rounded p-2 w-full"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="font-bold">Catégorie</label>
                                        <select 
                                            name="type"
                                            defaultValue={product.type}
                                            className="border rounded p-2 w-full"
                                        >
                                            {allCategories.map((cat) => (
                                                <option key={cat.id} value={cat.id}>
                                                    {cat.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <input 
                                            type="checkbox" 
                                            name="in_stock"
                                            defaultChecked={product.in_stock}
                                            className="h-4 w-4"
                                        />
                                    </div>
                                    <div className="flex justify-end space-x-2 pt-2">
                                        <Button type="submit" className="bg-green-500">
                                            <CheckIcon className="w-5 h-5" />
                                        </Button>
                                        <Button 
                                            type="button" 
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleDelete(product.id);
                                            }} 
                                            className="bg-red-500"
                                        >
                                            <TrashIcon className="w-5 h-5" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                ))}
            </div>
        </div>
    )
}
