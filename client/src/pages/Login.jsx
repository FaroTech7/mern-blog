
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './login.css'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setMessage('')

        try {
            const response = await fetch(
                'http://localhost:5000/api/users/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                }
            )

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Login failed')
            }

            login(data.token, data.user)
            navigate('/')

        } catch (error) {
            setMessage(error.message)
        }
    }

    return (
        <section className="login">
            <div className="login__container">

                {/* LEFT PANEL */}
                <div className="login__visual">
                    <span className="login__brand">THE JOURNAL</span>

                    <div className="login__visual-content">
                        <span className="login__eyebrow">
                            YOUR SPACE FOR IDEAS
                        </span>

                        <h1>
                            Every great story
                            <span> deserves a voice.</span>
                        </h1>

                        <p>
                            Sign in to share your thoughts,
                            publish your stories and join
                            a community of curious minds.
                        </p>
                    </div>

                    <span className="login__visual-footer">
                        READ. WRITE. INSPIRE.
                    </span>
                </div>

                {/* RIGHT PANEL */}
                <div className="login__form-panel">

                    <div className="login__form-content">

                        <span className="login__form-eyebrow">
                            WELCOME BACK
                        </span>

                        <h2>Good to have you back.</h2>

                        <p className="login__subtitle">
                            Enter your details to access your account.
                        </p>

                        <form onSubmit={handleSubmit}>

                            <div className="login__field">
                                <label htmlFor="login-email">
                                    Email Address
                                </label>

                                <input
                                    id="login-email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="login__field">
                                <label htmlFor="login-password">
                                    Password
                                </label>

                                <input
                                    id="login-password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="login__button"
                            >
                                Sign In <span>→</span>
                            </button>

                        </form>

                        {message && (
                            <p className="login__message" role="alert">
                                {message}
                            </p>
                        )}

                        <p className="login__register">
                            Don't have an account?
                            <Link to="/register"> Create one</Link>
                        </p>

                    </div>

                    <span className="login__copyright">
                        THE JOURNAL · STORIES & PERSPECTIVES
                    </span>

                </div>

            </div>
        </section>
    )
}

export default Login
