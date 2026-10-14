import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
export default function Navbar() {
  const { user, logout } = useAuth()
  return (
    <nav className="flex items-center justify-between px-10 py-4 bg-blush">
      <Link to="/" className="flex items-center gap-2">
        <span className="text-2xl">🎂</span>
        <span className="font-script text-3xl text-deep">Delisio</span>
      </Link>
      <ul className="hidden md:flex gap-8 text-sm font-semibold text-deep">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/">About Us</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/">New</Link></li>
      </ul>
      <div className="flex items-center gap-3">
        {user ? (
          <>
            <div className="w-9 h-9 rounded-full bg-rose text-white flex items-center justify-center font-semibold">
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <button onClick={logout} className="text-sm text-deep font-semibold">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="text-sm text-deep font-semibold">
            Login
          </Link>
        )}
      </div>
    </nav>
  )
}