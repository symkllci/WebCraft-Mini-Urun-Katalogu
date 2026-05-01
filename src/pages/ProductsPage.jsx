import { useState } from 'react'
import { useProducts } from '../contexts/ProductContext'
import ProductList from '../components/ProductList'

function ProductsPage() {

  // context ten ürünleri ve silme fonksiyonunu çektim
  const { products, deleteProduct } = useProducts()

  // arama filtre sıralama için state ler
  const [arama, setArama] = useState('')
  const [kategori, setKategori] = useState('Tumu')
  const [siralama, setSiralama] = useState('varsayilan')

  const kategoriler = ['Tumu', 'Laptop', 'Tablet', 'Masaustu Bilgisayar', 'Bilgisayar Parçaları', 'TV/Kamera/Ses', 'Ev Aletleri']

  // önce arama sonra kategori sonra sıralama
  const filtrelenmis = products
    .filter(urun => urun.name.toLowerCase().includes(arama.toLowerCase()))
    .filter(urun => kategori === 'Tumu' || urun.category === kategori)
    .sort((a, b) => {
      if (siralama === 'fiyat-artan') return a.price - b.price
      if (siralama === 'fiyat-azalan') return b.price - a.price
      if (siralama === 'isim-az') return a.name.localeCompare(b.name)
      if (siralama === 'isim-za') return b.name.localeCompare(a.name)
      return 0
    })

  return (
    <div style={{ minHeight: '100vh', background: '#f4f6fb' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>

        {/* başlık */}
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1a1a2e', margin: 0 }}>
            Ürünler
          </h1>
          <p style={{ color: '#888', fontSize: '14px', marginTop: '4px' }}>
            {products.length} ürün kayıtlı
          </p>
        </div>

        {/* arama filtre sıralama */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '28px', flexWrap: 'wrap' }}>

          {/* arama kutusu */}
          <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
            <span style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '16px'
            }}>
              🔍
            </span>
            <input
              type="text"
              placeholder="Ürün ara..."
              value={arama}
              onChange={e => setArama(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px 10px 38px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '14px',
                background: '#fff',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* kategori filtresi */}
          <select
            value={kategori}
            onChange={e => setKategori(e.target.value)}
            style={{
              padding: '10px 16px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              fontSize: '14px',
              background: '#fff',
              cursor: 'pointer'
            }}
          >
            {kategoriler.map(k => (
              <option key={k} value={k}>
                {k === 'Tumu' ? 'Tüm Kategoriler' : k}
              </option>
            ))}
          </select>

          {/* sıralama */}
          <select
            value={siralama}
            onChange={e => setSiralama(e.target.value)}
            style={{
              padding: '10px 16px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              fontSize: '14px',
              background: '#fff',
              cursor: 'pointer'
            }}
          >
            <option value="varsayilan">Sıralama</option>
            <option value="fiyat-artan">Fiyat: Düşükten Yükseğe</option>
            <option value="fiyat-azalan">Fiyat: Yüksekten Düşüğe</option>
            <option value="isim-az">İsim: A dan Z ye</option>
            <option value="isim-za">İsim: Z den A ya</option>
          </select>

        </div>

        {/* ürün listesi */}
        <ProductList products={filtrelenmis} onDelete={deleteProduct} />

      </div>
    </div>
  )
}

export default ProductsPage