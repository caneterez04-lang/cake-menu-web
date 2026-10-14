import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
const inputClass =
  'w-full px-4 py-3 rounded-xl border border-rose/40 focus:outline-none focus:border-deep'
export default function Auth() {
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ username: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()
  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const submit = async (e) => {
    e.preventDefault()
    setError('')
    if (mode === 'signup') {
      if (form.password !== form.confirm) {
        setError('Passwords do not match.')
        return
      }
      // demo: signup only saves locally
      localStorage.setItem('signup_' + form.username, form.password)
      setMode('login')
      return
    }
    try {
      const { data } = await api.post('/login', {
        username: form.username,
        password: form.password,
      })
      if (data.success) {
        login({ ...data.user, name: data.user.name || data.user.username || form.username })
        navigate('/')
      } else {
        setError('Invalid username or password.')
      }
    } catch {
      setError('Invalid username or password.')
    }
  }
  const tab = (active) =>
    `flex-1 py-3 font-semibold ${active ? 'bg-rose text-white' : 'bg-white text-deep'}`
  return (
    <div className="bg-cream min-h-screen">
      <Navbar />
      <div className="max-w-md mx-auto mt-16 bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="bg-blush flex flex-col items-center pt-8 pb-6">
          <div className="w-24 h-24 rounded-full bg-white border-4 border-white flex items-center justify-center text-5xl">
            🎂
          </div>
          <p className="font-script text-3xl text-deep mt-3">Delisio</p>
        </div>
        <div className="flex">
          <button onClick={() => setMode('login')} className={tab(mode === 'login')}>
            Login
          </button>
          <button onClick={() => setMode('signup')} className={tab(mode === 'signup')}>
            Sign Up
          </button>
        </div>
        <form onSubmit={submit} className="p-8 space-y-4">
          <input
            name="username"
            value={form.username}
            onChange={handle}
            placeholder="Username"
            className={inputClass}
            required
          />
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handle}
            placeholder="Password"
            className={inputClass}
            required
          />
          {mode === 'signup' && (
            <input
              name="confirm"
              type="password"
              value={form.confirm}
              onChange={handle}
              placeholder="Confirm Password"
              className={inputClass}
              required
            />
          )}
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-deep text-white font-semibold hover:opacity-90"
          >
            {mode === 'login' ? 'Login' : 'Create Account'}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  )
}