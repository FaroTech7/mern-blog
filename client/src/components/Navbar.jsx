import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './navbar.css'

const Navbar = () => {

    const { token, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <nav className="navbar">
            <div className="container navbar__container">

                <Link to="/" className="navbar__logo">
                    MERN BLOG
                </Link>

                <ul className="navbar__menu">

                    <li><Link to="/">Home</Link></li>

                    <li><Link to="/authors">Authors</Link></li>

                    {token ? (
                        <>
                            <li><Link to="/create">Create Post</Link></li>

                            <li>
                                <button onClick={handleLogout}>
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/register">Register</Link></li>
                        </>
                    )}

                </ul>
            </div>
        </nav>
    )
}

export default Navbar