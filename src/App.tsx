import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

interface Product {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  category: string
}

function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
      if (error) {
        console.error('Error fetching products:', error)
      } else {
        setProducts(data || [])
      }
      setLoading(false)
    }
    fetchProducts()
  }, [])

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Cargando...</div>
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-3xl font-bold text-center">Tienda de Aceros y Hierros Arquitectónicos</h1>
        <p className="text-center mt-2">Calidad y durabilidad para sus proyectos</p>
      </header>
      <main className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={product.image_url} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-2">{product.description}</p>
                <p className="text-blue-600 font-bold text-lg">${product.price}</p>
                <p className="text-sm text-gray-500 mt-1">Categoría: {product.category}</p>
                <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                  Agregar al Carrito
                </button>
              </div>
            </div>
          ))}
        </div>
        {products.length === 0 && (
          <div className="text-center py-8">
            <p>No hay productos disponibles en este momento.</p>
          </div>
        )}
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; 2024 Tienda de Aceros y Hierros. Todos los derechos reservados.</p>
      </footer>
    </div>
  )
}

export default App