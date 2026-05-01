import { NavLink } from 'react-router-dom'
import { useProducts } from '../contexts/ProductContext'

function Navbar() {

  // kaç ürün olduğunu navbar da göstermek için çektim
  const { products } = useProducts()

  return (
    <nav style={{
      background: '#1a1a2e',
      padding: '0 32px',
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>

      {/* sol taraf logo */}
      <span style={{ color: '#e94560', fontSize: '22px', fontWeight: 'bold' }}>
        🛒 Sheyma Shopping
      </span>

      {/* sağ taraf linkler */}
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>

        <NavLink to="/" style={{ textDecoration: 'none', color: '#ccc', fontSize: '14px' }}>
          Ürünler
          {/* toplam ürün sayısı */}
          <span style={{
            background: '#e94560',
            color: '#fff',
            fontSize: '11px',
            fontWeight: 'bold',
            padding: '2px 7px',
            borderRadius: '20px',
            marginLeft: '6px'
          }}>
            {products.length}
          </span>
        </NavLink>

        <NavLink to="/add" style={{
          textDecoration: 'none',
          background: '#e94560',
          color: '#fff',
          padding: '8px 16px',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '600'
        }}>
          + Ürün Ekle
        </NavLink>

      </div>
    </nav>
  )
}

export default Navbar