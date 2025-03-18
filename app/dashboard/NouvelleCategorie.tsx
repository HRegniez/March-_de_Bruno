import { Button } from "@/components/ui/button";
import { createCategory } from "@/utils/supabase/category";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function NouvelleCategorie({ onUpdate }: { onUpdate: () => void }) {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const name = formData.get('name')
        await createCategory(name as string)
        onUpdate()
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" className="border rounded p-2" name="name" placeholder="Nouvelle catégorie" />
            <Button type="submit" className="bg-green-500 mt-4">
                <PlusIcon className="w-5 h-5" />
            </Button>
        </form>
    )
}
