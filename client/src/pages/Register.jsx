import { useState } from 'react'
import { Link } from 'react-router-dom'
import './register.css'

const Register = () => {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setMessage('')

        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
            return
        }

        try {
            const response = await fetch(
                'http://localhost:5000/api/users/register',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        fullName,
                        email,
                        password
                    })
                }
            )

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed')
            }

            setMessage('Registration successful!')

            setFullName('')
            setEmail('')
            setPassword('')
            setConfirmPassword('')

        } catch (error) {
            setMessage(error.message)
        }
    }

    return (
        <section className="register">
            <div className="register__container">

                <div className="register__visual">
                    <span className="register__brand">THE JOURNAL</span>

                    <div className="register__visual-content">
                        <span className="register__eyebrow">
                            YOUR STORY STARTS HERE
                        </span>

                        <h1>
                            Great ideas
                            <span> begin with a voice.</span>
                        </h1>

                        <p>
                            Create your account and become part
                            of a community where ideas are shared,
                            stories are told and perspectives matter.
                        </p>
                    </div>

                    <span className="register__visual-footer">
                        READ. WRITE. INSPIRE.
                    </span>
                </div>

                <div className="register__form-panel">
                    <div className="register__form-content">

                        <span className="register__form-eyebrow">
                            JOIN THE COMMUNITY
                        </span>

                        <h2>Create your account.</h2>

                        <p className="register__subtitle">
                            Fill in your details to get started.
                        </p>

                        <form onSubmit={handleSubmit}>

                            <div className="register__field">
                                <label htmlFor="register-name">
                                    Full Name
                                </label>
                                <input
                                    id="register-name"
                                    type="text"
                                    placeholder="Enter your full name"
                                    value={fullName}
                                    onChange={e => setFullName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="register__field">
                                <label htmlFor="register-email">
                                    Email Address
                                </label>
                                <input
                                    id="register-email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="register__field">
                                <label htmlFor="register-password">
                                    Password
                                </label>
                                <input
                                    id="register-password"
                                    type="password"
                                    placeholder="Create a password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="register__field">
                                <label htmlFor="register-confirm">
                                    Confirm Password
                                </label>
                                <input
                                    id="register-confirm"
                                    type="password"
                                    placeholder="Confirm your password"
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="register__button"
                            >
                                Create Account <span>→</span>
                            </button>

                        </form>

                        {message && (
                            <p className="register__message" role="alert">
                                {message}
                            </p>
                        )}

                        <p className="register__login">
                            Already have an account?
                            <Link to="/login"> Sign in</Link>
                        </p>

                    </div>

                    <span className="register__copyright">
                        THE JOURNAL · STORIES & PERSPECTIVES
                    </span>
                </div>

            </div>
        </section>
    )
}

export default Register