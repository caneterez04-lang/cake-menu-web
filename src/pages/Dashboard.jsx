import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import api from '../api'
import { useAuth } from '../context/AuthContext'
export default function Dashboard() {
  const [products, setProducts] = useState([])
  const { user } = useAuth()
  useEffect(() => {
    api
      .get('/products')
      .then((res) => setProducts(res.data))
      .catch(() => setProducts([]))
  }, [])
  const totalValue = products.reduce((s, p) => s + Number(p.price), 0)
  const name = user?.username || user?.name || 'Guest'
  const link = ({ isActive }) =>
    `block px-4 py-3 rounded-xl ${isActive ? 'bg-rose/30' : 'hover:bg-rose/20'}`
  const metrics = [
    { label: 'Total Products', value: products.length },
    { label: 'Categories', value: new Set(products.map((p) => p.category)).size },
    { label: 'Inventory Value', value: '₱' + totalValue.toLocaleString() },
  ]
  return (
    <div className="min-h-screen bg-cream flex">
      {/* Side navigation bar */}
      <aside className="w-64 bg-deep text-blush p-6">
        <div className="flex flex-col items-center">
          {true ? (
            <img
              src={user?.avatar || "/profile.jpg"}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border-4 border-rose"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-blush border-4 border-rose flex items-center justify-center text-4xl">
              🎂
            </div>
          )}
          <p className="mt-3 font-semibold text-lg">{name}</p>
        </div>
        <nav className="mt-10 space-y-2 text-sm">
          <NavLink to="/dashboard" className={link}>Dashboard</NavLink>
          <NavLink to="/products" className={link}>Products</NavLink>
          <NavLink to="/" className={link}>Home</NavLink>
        </nav>
      </aside>
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-deep">System Overview</h1>
        <p className="text-gray-500 mt-1">Welcome back, {name}</p>
        {/* System overview metrics */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {metrics.map((m) => (
            <div key={m.label} className="bg-white rounded-3xl p-6 shadow-sm">
              <p className="text-sm text-gray-500">{m.label}</p>
              <p className="text-3xl font-bold text-deep mt-2">{m.value}</p>
            </div>
          ))}
        </div>
        <h2 className="text-xl font-semibold text-deep mt-10">Recent Cakes</h2>
        <div className="bg-white rounded-3xl mt-4 divide-y">
          {products.slice(0, 5).map((p) => (
            <div key={p.id} className="flex justify-between px-6 py-4">
              <span>{p.name}</span>
              <span className="text-deep font-semibold">
                ₱{Number(p.price).toLocaleString()}
              </span>
            </div>
          ))}
          {products.length === 0 && (
            <p className="px-6 py-4 text-gray-400">No products yet.</p>
          )}
        </div>
      </main>
    </div>
  )
}