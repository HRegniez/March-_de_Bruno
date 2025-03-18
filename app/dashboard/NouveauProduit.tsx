import { Button } from "@/components/ui/button"
import { CheckIcon } from '@heroicons/react/24/outline'
import { createProduct } from "@/utils/supabase/products"

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

export default function NouveauProduit( {category, allCategories, onUpdate}: {category: Category, allCategories: Category[], onUpdate: () => void} ) {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const name = formData.get('name')
        const price = formData.get('price')
        const origin = formData.get('origin')
        const type = formData.get('type')
        const in_stock = formData.get('in_stock') === 'on'
        await createProduct(name as string, price as string, origin as string, type as string, in_stock)
        onUpdate()
        handleUpdate(e)
    }
    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        (e.target as HTMLFormElement).reset()
    }
    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-7 gap-4 p-4 border rounded">
            <input 
                type="text" 
                name="name"
                defaultValue=""
                placeholder="Nom du produit"
                className="border col-span-2 rounded p-2"
            />
            <input 
                type="text" 
                name="price"
                defaultValue=""
                placeholder="Prix"
                className="border col-span-2 rounded p-2"
            />
            <input 
                type="text" 
                name="origin"
                defaultValue=""
                placeholder="Origine"
                className="border col-span-2 rounded p-2"
            />
            <select 
                name="type"
                hidden
                defaultValue={category.id}
                className="border rounded p-2 w-full"
            >
                {allCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                        {cat.name}
                    </option>
                ))}
            </select>
            <div className="col-span-2 flex items-center gap-2">
                <input 
                    type="checkbox" 
                    name="in_stock"
                    defaultChecked={true}
                    className="h-4 w-4"
                />
                <label>En stock</label>
            </div>
            <Button type="submit" className="bg-green-500 col-span-1">
                <CheckIcon className="w-5 h-5" />
            </Button>
        </form>
    )
}
