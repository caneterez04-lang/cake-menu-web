import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)
export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem('user') || 'null')
    )

    const login = (u) => {
        setUser(u)
        localStorage.setItem('user', JSON.stringify(u))
    }

    const logout =() => {
        setUser(null)
        localStorage.removeItem('user')
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}