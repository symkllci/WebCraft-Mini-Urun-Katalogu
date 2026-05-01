import { Routes, Route } from 'react-router-dom'
import { ProductProvider } from './contexts/ProductContext'
import Navbar from './components/Navbar'
import ProductsPage from './pages/ProductsPage'
import AddProductPage from './pages/AddProductPage'
import ProductDetailPage from './pages/ProductDetailPage'
import EditProductPage from './pages/EditProductPage'

// tüm sayfaları ve context i buraya bağladım
function App() {
  return (
    <ProductProvider>
      <Navbar />
      <Routes>
        {/* ana sayfa */}
        <Route path="/" element={<ProductsPage />} />
        {/* ürün ekleme sayfası */}
        <Route path="/add" element={<AddProductPage />} />
        {/* ürün detay sayfası */}
        <Route path="/product/:id" element={<ProductDetailPage />} />
        {/* ürün düzenleme sayfası - yeni ekledim */}
        <Route path="/edit/:id" element={<EditProductPage />} />
      </Routes>
    </ProductProvider>
  )
}

export default App