import { useParams, useNavigate } from 'react-router-dom'
import { useProducts } from '../contexts/ProductContext'

// ProductCard daki renk ve emoji lerle aynı olsun diye buraya da ekledim
const renkler = {
  'Laptop': '#4361ee',
  'Tablet': '#7209b7',
  'Masaustu Bilgisayar': '#f72585',
  'Bilgisayar Parçaları': '#4cc9f0',
  'TV/Kamera/Ses': '#f77f00',
  'Beyaz Esya': '#2dc653',
}

const emojiler = {
  'Laptop': '💻',
  'Tablet': '📱',
  'Masaustu Bilgisayar': '🖥️',
  'Bilgisayar Parçaları': '🖱️',
  'TV/Kamera/Ses': '📺',
  'Beyaz Esya': '🏠',
}

function ProductDetailPage() {

  // url den id yi aldım
  const { id } = useParams()
  const { getProductById, deleteProduct } = useProducts()
  const navigate = useNavigate()

  // context ten ürünü buldum
  const urun = getProductById(id)

  // ürün bulunamazsa mesaj göster
  if (!urun) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#f4f6fb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '64px' }}>😕</p>
          <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a1a2e' }}>
            Ürün bulunamadı
          </p>
          <p style={{ color: '#888', marginBottom: '20px' }}>
            Bu ürün silinmiş olabilir.
          </p>
          <button
            onClick={() => navigate('/')}
            style={{
              padding: '10px 24px',
              border: 'none',
              background: '#e94560',
              color: '#fff',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            Ürünlere Dön
          </button>
        </div>
      </div>
    )
  }

  const renk = renkler[urun.category] || '#888'
  const emoji = emojiler[urun.category] || '📦'

  function handleSil() {
    const onay = window.confirm(urun.name + ' silinecek, emin misin?')
    if (onay) {
      deleteProduct(urun.id)
      navigate('/')
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f4f6fb' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '32px 24px' }}>

        {/* geri butonu */}
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'none',
            border: 'none',
            color: '#888',
            cursor: 'pointer',
            fontSize: '14px',
            marginBottom: '20px'
          }}
        >
          ← Ürünlere Dön
        </button>

        <div style={{
          background: '#fff',
          border: '1px solid #eee',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
        }}>

          {/* üst emoji alanı */}
          <div style={{
            background: renk + '15',
            height: '160px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '80px'
          }}>
            {emoji}
          </div>

          <div style={{ padding: '28px' }}>

            {/* kategori badge */}
            <span style={{
              background: renk + '20',
              color: renk,
              fontSize: '12px',
              fontWeight: '600',
              padding: '4px 12px',
              borderRadius: '20px'
            }}>
              {urun.category}
            </span>

            {/* ürün adı */}
            <h1 style={{
              fontSize: '26px',
              fontWeight: 'bold',
              color: '#1a1a2e',
              margin: '14px 0 8px'
            }}>
              {urun.name}
            </h1>

            {/* fiyat */}
            <p style={{
              fontSize: '28px',
              fontWeight: '800',
              color: '#e94560',
              marginBottom: '20px'
            }}>
              {urun.price.toLocaleString('tr-TR')} ₺
            </p>

            {/* açıklama */}
            <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '20px', marginBottom: '24px' }}>
              <p style={{ fontSize: '12px', fontWeight: '600', color: '#aaa', marginBottom: '8px' }}>
                AÇIKLAMA
              </p>
              <p style={{ fontSize: '15px', color: '#444', lineHeight: '1.7' }}>
                {urun.description}
              </p>
            </div>

            {/* butonlar */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => navigate(`/edit/${urun.id}`)}
                style={{
                  flex: 1,
                  padding: '12px',
                  border: 'none',
                  background: '#f0a500',
                  color: '#fff',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600'
                }}
              >
                 Düzenle
              </button>
              <button
                onClick={handleSil}
                style={{
                  flex: 1,
                  padding: '12px',
                  border: 'none',
                  background: '#fff0f0',
                  color: '#e94560',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600'
                }}
              >
                🗑️ Ürünü Sil
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage