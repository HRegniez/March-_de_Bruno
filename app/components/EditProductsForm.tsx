'use client'
import React, { useState } from 'react'
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger 
} from '@/components/ui/accordion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { updateProducts } from '@/app/actions'

interface Product {
    id: string
    name: string
    price: string
    origin: string
}

interface ProductCategory {
    id: string
    name: string
    image: string
    products: Product[]
}

export default function EditProductsForm({ products }: { products: ProductCategory[] }) {
  const [categories, setCategories] = useState<ProductCategory[]>(products)
  const [isLoading, setIsLoading] = useState(false)

  const handleCategoryChange = (categoryId: string, field: keyof ProductCategory, value: string) => {
    setCategories(prev => prev.map(category => 
      category.id === categoryId ? { ...category, [field]: value } : category
    ))
  }

  const handleProductChange = (categoryId: string, productId: string, field: keyof Product, value: string | number) => {
    setCategories(prev => prev.map(category => {
      if (category.id === categoryId) {
        const updatedProducts = category.products.map(product =>
          product.id === productId ? { ...product, [field]: value } : product
        )
        return { ...category, products: updatedProducts }
      }
      return category
    }))
  }

  const handleDeleteProduct = (categoryId: string, productId: string) => {
    setCategories(prev => prev.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          products: category.products.filter(product => product.id !== productId)
        }
      }
      return category
    }))
  }

  const handleAddProduct = (categoryId: string) => {
    const newProduct: Product = {
      id: crypto.randomUUID(), // Generate a unique ID
      name: '',
      price: '',
      origin: ''
    }

    setCategories(prev => prev.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          products: [...category.products, newProduct]
        }
      }
      return category
    }))
  }
  const handleSave = async () => {
    try {
      setIsLoading(true)
      await updateProducts(categories)
      alert('Changes saved successfully!')
    } catch (error) {
      console.error('Failed to save changes:', error)
      alert('Failed to save changes: ' + (error instanceof Error ? error.message : 'Unknown error'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6 p-4">
      {categories.map(category => (
        <Card key={category.id} className="p-4">
          <Accordion type="single" collapsible>
            <AccordionItem value={category.id}>
              <AccordionTrigger>
                <div className="flex gap-4 w-full">
                  <Input
                    value={category.name}
                    onChange={(e) => handleCategoryChange(category.id, 'name', e.target.value)}
                    placeholder="Category Name"
                    className="max-w-[500px]"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </AccordionTrigger>
              
              <AccordionContent>
                <div className="space-y-4 mt-4">
                  {category.products
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map(product => (
                    <div key={product.id} className="flex gap-4 items-center justify-between">
                      <Input
                        value={product.name}
                        onChange={(e) => handleProductChange(category.id, product.id, 'name', e.target.value)}
                        placeholder="Product Name"
                      />
                      <Input
                        value={product.price}
                        onChange={(e) => handleProductChange(category.id, product.id, 'price', e.target.value)}
                        placeholder="Price"
                        type="text"
                      />
                      <Input
                        value={product.origin}
                        onChange={(e) => handleProductChange(category.id, product.id, 'origin', e.target.value)}
                        placeholder="Origin"
                      />
                      <Button 
                        variant="destructive"
                        onClick={() => handleDeleteProduct(category.id, product.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  className='mt-4'
                  onClick={() => handleAddProduct(category.id)}
                >
                  Add Product
                </Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>
      ))}
      
      <div className="flex justify-end gap-4">
        <Button variant="destructive">Cancel</Button>
        <Button 
          variant="outline" 
          onClick={handleSave}
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  )
}


