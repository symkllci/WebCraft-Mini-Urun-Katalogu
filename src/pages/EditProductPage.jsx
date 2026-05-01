import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useProducts } from '../contexts/ProductContext'

function EditProductPage() {

  // url den id yi aldım
  const { id } = useParams()
  const { getProductById, updateProduct } = useProducts()
  const navigate = useNavigate()

  // form state i
  const [form, setForm] = useState({
    name: '',
    price: '',
    category: 'Laptop',
    description: ''
  })

  // hata mesajları
  const [hatalar, setHatalar] = useState({})

  const kategoriler = ['Laptop', 'Tablet', 'Masaustu Bilgisayar', 'Bilgisayar Parçaları', 'TV/Kamera/Ses', 'Ev Aletleri']

  // sayfa açılınca mevcut ürün bilgilerini forma doldurdum
  useEffect(() => {
    const urun = getProductById(id)
    if (urun) {
      setForm({
        name: urun.name,
        price: urun.price,
        category: urun.category,
        description: urun.description
      })
    }
  }, [id])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()

    // validasyon
    const yeniHatalar = {}

    if (!form.name.trim()) {
      yeniHatalar.name = 'Ürün adı boş olamaz'
    }

    if (!form.price || Number(form.price) <= 0) {
      yeniHatalar.price = 'Fiyat 0 dan büyük olmalı'
    }

    if (Object.keys(yeniHatalar).length > 0) {
      setHatalar(yeniHatalar)
      return
    }

    // ürünü güncelledim ve detay sayfasına döndüm
    updateProduct(id, { ...form, price: Number(form.price) })
    navigate(`/product/${id}`)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f4f6fb' }}>
      <div style={{ maxWidth: '520px', margin: '0 auto', padding: '32px 24px' }}>

        <h1 style={{ fontSize: '26px', fontWeight: 'bold', color: '#1a1a2e', marginBottom: '24px' }}>
          Ürünü Düzenle
        </h1>

        <div style={{
          background: '#fff',
          border: '1px solid #eee',
          borderRadius: '12px',
          padding: '28px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
        }}>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

            {/* ürün adı */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#555' }}>Ürün Adı *</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                style={{
                  padding: '10px 12px',
                  border: `1.5px solid ${hatalar.name ? '#e94560' : '#ddd'}`,
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              />
              {hatalar.name && (
                <span style={{ fontSize: '12px', color: '#e94560' }}>{hatalar.name}</span>
              )}
            </div>

            {/* fiyat */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#555' }}>Fiyat (₺) *</label>
              <input
                name="price"
                value={form.price}
                onChange={handleChange}
                type="number"
                style={{
                  padding: '10px 12px',
                  border: `1.5px solid ${hatalar.price ? '#e94560' : '#ddd'}`,
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              />
              {hatalar.price && (
                <span style={{ fontSize: '12px', color: '#e94560' }}>{hatalar.price}</span>
              )}
            </div>

            {/* kategori */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#555' }}>Kategori</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                style={{
                  padding: '10px 12px',
                  border: '1.5px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '14px',
                  background: '#fff',
                  cursor: 'pointer'
                }}
              >
                {kategoriler.map(k => (
                  <option key={k} value={k}>{k}</option>
                ))}
              </select>
            </div>

            {/* açıklama */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#555' }}>Açıklama</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                style={{
                  padding: '10px 12px',
                  border: '1.5px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '14px',
                  resize: 'vertical'
                }}
              />
            </div>

            {/* butonlar */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
              <button
                type="button"
                onClick={() => navigate(`/product/${id}`)}
                style={{
                  flex: 1,
                  padding: '11px',
                  border: '1.5px solid #ddd',
                  background: 'transparent',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  color: '#666'
                }}
              >
                İptal
              </button>
              <button
                type="submit"
                style={{
                  flex: 1,
                  padding: '11px',
                  border: 'none',
                  background: '#f0a500',
                  color: '#fff',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '700'
                }}
              >
                Güncelle
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default EditProductPage