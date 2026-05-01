import { createContext, useContext, useState } from 'react'

// context oluşturduk
const ProductContext = createContext()

export function ProductProvider({ children }) {

  // başlangıç ürünleri
  const [products, setProducts] = useState([
    { id: 1, name: 'MacBook Air M2', price: 42999, category: 'Laptop', description: 'Apple M2 işlemci, 8GB RAM, 256GB SSD' },
    { id: 2, name: 'Lenovo IdeaPad 5', price: 18499, category: 'Laptop', description: 'Ryzen 5, 16GB RAM, 512GB SSD' },
    { id: 3, name: 'Asus ROG Zephyrus', price: 67999, category: 'Laptop', description: 'RTX 4070, gaming laptop' },
    { id: 4, name: 'iPad Pro 12.9', price: 34999, category: 'Tablet', description: 'M2 çip, 128GB, Wi-Fi' },
    { id: 5, name: 'Samsung Galaxy Tab S9', price: 22999, category: 'Tablet', description: '11 inç AMOLED, 128GB' },
    { id: 6, name: 'Xiaomi Pad 6', price: 9999, category: 'Tablet', description: '11 inç 144Hz, 128GB' },
    { id: 7, name: 'iMac 24 M3', price: 62999, category: 'Masaustu Bilgisayar', description: '4.5K Retina ekran, M3 çip' },
    { id: 8, name: 'HP EliteDesk 800', price: 24999, category: 'Masaustu Bilgisayar', description: 'Intel i7, 16GB RAM' },
    { id: 9, name: 'Dell OptiPlex 7000', price: 19999, category: 'Masaustu Bilgisayar', description: 'Intel i5, 8GB RAM' },
    { id: 10, name: 'Logitech MX Master 3', price: 1899, category: 'Bilgisayar Parçaları', description: 'Kablosuz mouse' },
    { id: 11, name: 'Keychron K2 Pro', price: 2499, category: 'Bilgisayar Parçaları', description: 'Mekanik klavye, RGB' },
    { id: 12, name: 'Dell U2722D Monitor', price: 8999, category: 'Bilgisayar Parçaları', description: '27 inç 4K monitör' },
    { id: 13, name: 'Samsung 65 QLED 4K', price: 28999, category: 'TV/Kamera/Ses', description: '65 inç, Smart TV' },
    { id: 14, name: 'LG OLED C3 55', price: 34999, category: 'TV/Kamera/Ses', description: '55 inç OLED, 4K' },
    { id: 15, name: 'Sony Bravia XR 55', price: 31999, category: 'TV/Kamera/Ses', description: '55 inç 4K, Google TV' },
    { id: 16, name: 'Arcelik Buzdolabi', price: 18999, category: 'Ev Aletleri', description: 'No-frost, A++, 560L' },
    { id: 17, name: 'Bosch Camasir Makinesi', price: 14999, category: 'Ev Aletleri', description: '9kg, 1400 devir, A+++' },
    { id: 18, name: 'LG Klima 12000 BTU', price: 22999, category: 'Ev Aletleri', description: 'Inverter, A+++, wifi' },
  ])

  // yeni ürün ekleme
  function addProduct(data) {
    const yeniUrun = { id: Date.now(), ...data }
    setProducts(onceki => [...onceki, yeniUrun])
  }

  // ürün silme
  function deleteProduct(id) {
    setProducts(onceki => onceki.filter(urun => urun.id !== id))
  }

  // ürün güncelleme - düzenleme için ekledim
  function updateProduct(id, guncellenmisData) {
    setProducts(onceki =>
      onceki.map(urun => urun.id === Number(id) ? { ...urun, ...guncellenmisData } : urun)
    )
  }

  // id ye göre ürün bulma
  function getProductById(id) {
    return products.find(urun => urun.id === Number(id))
  }

  return (
    <ProductContext.Provider value={{ products, addProduct, deleteProduct, updateProduct, getProductById }}>
      {children}
    </ProductContext.Provider>
  )
}

// custom hook
export function useProducts() {
  return useContext(ProductContext)
}