import { useNavigate } from 'react-router-dom'

// kategorilere göre renk belirledim
const renkler = {
  'Laptop': '#4361ee',
  'Tablet': '#7209b7',
  'Masaustu Bilgisayar': '#f72585',
  'Bilgisayar Parçaları': '#4cc9f0',
  'TV/Kamera/Ses': '#f77f00',
  'Ev Aletleri': '#2dc653',
}

// kategorilere göre emoji belirledim
const emojiler = {
  'Laptop': '💻',
  'Tablet': '📱',
  'Masaustu Bilgisayar': '🖥️',
  'Bilgisayar Parçaları': '🖱️',
  'TV/Kamera/Ses': '📺',
  'Ev Aletleri': '🏠',
}

// product ve onDelete props olarak geliyor
function ProductCard({ product, onDelete }) {

  const navigate = useNavigate()

  const renk = renkler[product.category] || '#888'
  const emoji = emojiler[product.category] || '📦'

  // silmeden önce onay istedim
  function handleSil() {
    const onay = window.confirm(product.name + ' silinecek, emin misin?')
    if (onay) {
      onDelete(product.id)
    }
  }

  return (
    <div style={{
      background: '#fff',
      border: '1px solid #eee',
      borderRadius: '12px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
    }}>

      {/* üst kısım emoji görseli */}
      <div style={{
        background: renk + '15',
        height: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '48px'
      }}>
        {emoji}
      </div>

      {/* orta kısım bilgiler */}
      <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>

        {/* kategori badge */}
        <span style={{
          background: renk + '20',
          color: renk,
          fontSize: '11px',
          fontWeight: '600',
          padding: '3px 10px',
          borderRadius: '20px',
          alignSelf: 'flex-start'
        }}>
          {product.category}
        </span>

        {/* ürün adı */}
        <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: '#1a1a2e', margin: 0 }}>
          {product.name}
        </h3>

        {/* fiyat */}
        <p style={{ fontSize: '18px', fontWeight: '700', color: '#e94560', margin: 0 }}>
          {product.price.toLocaleString('tr-TR')} ₺
        </p>

      </div>

      {/* alt kısım butonlar */}
      <div style={{
        display: 'flex',
        gap: '6px',
        padding: '12px 14px',
        borderTop: '1px solid #f0f0f0'
      }}>

        {/* detay butonu */}
        <button
          onClick={() => navigate(`/product/${product.id}`)}
          style={{
            flex: 1,
            padding: '8px',
            border: 'none',
            background: '#1a1a2e',
            color: '#fff',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: '600'
          }}
        >
          Detay
        </button>

        {/* düzenle butonu - yeni ekledim */}
        <button
          onClick={() => navigate(`/edit/${product.id}`)}
          style={{
            flex: 1,
            padding: '8px',
            border: 'none',
            background: '#f0a500',
            color: '#fff',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: '600'
          }}
        >
           Düzenle
        </button>

        {/* sil butonu */}
        <button
          onClick={handleSil}
          style={{
            width: '36px',
            height: '36px',
            border: 'none',
            background: '#fff0f0',
            color: '#e94560',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          🗑️
        </button>

      </div>
    </div>
  )
}

export default ProductCard