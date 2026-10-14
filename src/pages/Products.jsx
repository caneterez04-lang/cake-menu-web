import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import api from '../api'
import { useAuth } from '../context/AuthContext'
const empty = { name: '', description: '', price: '', category: 'Cake', image: '' }
export default function Products() {
  const [products, setProducts] = useState([])
  const [form, setForm] = useState(empty)
  const [editingId, setEditingId] = useState(null)
  const { user } = useAuth()
  const name = user?.username || user?.name || 'Guest'
  const load = () =>
    api
      .get('/products')
      .then((r) => setProducts(r.data))
      .catch(() => setProducts([]))
  useEffect(() => {
    load()
  }, [])
  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  // CREATE / UPDATE
  const submit = async (e) => {
    e.preventDefault()
    if (editingId) {
      await api.put(`/products/${editingId}`, form)
      setEditingId(null)
    } else {
      await api.post('/products', form)
    }
    setForm(empty)
    load()
  }
  // READ into form
  const edit = (p) => {
    setEditingId(p.id)
    setForm({
      name: p.name,
      description: p.description || '',
      price: p.price,
      category: p.category || 'Cake',
      image: p.image || '',
    })
  }
  // DELETE
  const remove = async (id) => {
    await api.delete(`/products/${id}`)
    if (editingId === id) {
      setEditingId(null)
      setForm(empty)
    }
    load()
  }
  const link = ({ isActive }) =>
    `block px-4 py-3 rounded-xl ${isActive ? 'bg-rose/30' : 'hover:bg-rose/20'}`
  const field = 'px-4 py-3 rounded-xl border border-rose/40'
  return (
    <div className="min-h-screen bg-cream flex">
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
          <p className="mt-3 font-semibold">{name}</p>
        </div>
        <nav className="mt-10 space-y-2 text-sm">
          <NavLink to="/dashboard" className={link}>Dashboard</NavLink>
          <NavLink to="/products" className={link}>Products</NavLink>
          <NavLink to="/" className={link}>Home</NavLink>
        </nav>
      </aside>
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-deep">Products Management</h1>
        {/* Form */}
        <form
          onSubmit={submit}
          className="bg-white rounded-3xl p-6 mt-6 grid md:grid-cols-2 gap-4"
        >
          <input
            name="name"
            value={form.name}
            onChange={handle}
            placeholder="Cake name"
            className={field}
            required
          />
          <input
            name="price"
            value={form.price}
            onChange={handle}
            placeholder="Price"
            className={field}
            required
          />
          <input
            name="category"
            value={form.category}
            onChange={handle}
            placeholder="Category"
            className={field}
          />
          <input
            name="image"
            value={form.image}
            onChange={handle}
            placeholder="Image URL"
            className={field}
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handle}
            placeholder="Description"
            className={`md:col-span-2 ${field}`}
          />
          <div className="md:col-span-2 flex gap-3">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-rose text-white font-semibold"
            >
              {editingId ? 'Update Cake' : 'Add Cake'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null)
                  setForm(empty)
                }}
                className="px-6 py-3 rounded-xl border border-deep text-deep font-semibold"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
        {/* Table */}
        <div className="bg-white rounded-3xl mt-8 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-blush text-deep text-sm">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {products.map((p) => (
                <tr key={p.id}>
                  <td className="px-6 py-4">{p.name}</td>
                  <td className="px-6 py-4">{p.category}</td>
                  <td className="px-6 py-4">₱{Number(p.price).toLocaleString()}</td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button
                      onClick={() => edit(p)}
                      className="text-rose font-semibold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => remove(p.id)}
                      className="text-red-500 font-semibold"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-6 text-center text-gray-400">
                    No products yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}