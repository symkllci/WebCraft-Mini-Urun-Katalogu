import ProductCard from './ProductCard'

// products listesini alıp map ile ProductCard oluşturuyorum
function ProductList({ products, onDelete }) {

  // hiç ürün yoksa mesaj göster
  if (products.length === 0) {
    return (
      <p style={{ textAlign: 'center', color: '#888', marginTop: '40px', fontSize: '15px' }}>
        Hiç ürün bulunamadı 😕
      </p>
    )
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
      gap: '16px'
    }}>
      {/* her ürün için ProductCard oluşturuyorum */}
      {products.map(urun => (
        <ProductCard
          key={urun.id}
          product={urun}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

export default ProductList