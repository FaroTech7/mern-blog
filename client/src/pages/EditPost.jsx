import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../pages/createpost.css'

const EditPost = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { token } = useAuth()

    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [content, setContent] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5000/api/posts/${id}`
                )

                const data = await response.json()

                if (!response.ok) {
                    throw new Error(data.message || 'Failed to fetch post')
                }

                setTitle(data.title)
                setCategory(data.category)
                setDescription(data.description)
                setImage(data.image || '')
                setContent(data.content)

            } catch (error) {
                setMessage(error.message)
            } finally {
                setLoading(false)
            }
        }

        fetchPost()
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setMessage('')

        try {
            if (!token) {
                throw new Error('Please log in to edit this article.')
            }

            const response = await fetch(
                `http://localhost:5000/api/posts/${id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        title,
                        category,
                        description,
                        image,
                        content
                    })
                }
            )

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Failed to update post')
            }

            navigate(`/posts/${id}`)

        } catch (error) {
            setMessage(error.message)
        }
    }

    if (loading) {
        return (
            <div className="create-post">
                <div className="container">
                    <h2>Loading article...</h2>
                </div>
            </div>
        )
    }

    return (
        <section className="create-post">
            <div className="container create-post__container">

                <header className="create-post__header">
                    <span className="create-post__eyebrow">
                        THE JOURNAL — WRITING STUDIO
                    </span>

                    <h1>Refine Your Story.</h1>

                    <p>
                        Every great article deserves your best work.
                        Make your changes below.
                    </p>
                </header>

                <div className="create-post__card">

                    <div className="create-post__card-header">
                        <div>
                            <span>EDITING ARTICLE</span>
                            <h2>Article Details</h2>
                        </div>

                        <div className="create-post__card-icon">
                            ✎
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="create-post__field">
                            <label htmlFor="edit-title">
                                Article Title
                            </label>

                            <input
                                id="edit-title"
                                type="text"
                                placeholder="Article title"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                required
                            />
                        </div>

                        <div className="create-post__field">
                            <label htmlFor="edit-category">
                                Category
                            </label>

                            <input
                                id="edit-category"
                                type="text"
                                placeholder="Article category"
                                value={category}
                                onChange={e => setCategory(e.target.value)}
                                required
                            />
                        </div>

                        <div className="create-post__field">
                            <label htmlFor="edit-description">
                                Short Description
                            </label>

                            <textarea
                                id="edit-description"
                                placeholder="Article description"
                                rows="3"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                required
                            />
                        </div>

                        <div className="create-post__field">
                            <label htmlFor="edit-image">
                                Featured Image URL
                                <span>OPTIONAL</span>
                            </label>

                            <input
                                id="edit-image"
                                type="url"
                                placeholder="https://example.com/image.jpg"
                                value={image}
                                onChange={e => setImage(e.target.value)}
                            />
                        </div>

                        <div className="create-post__divider"></div>

                        <div className="create-post__field">
                            <label htmlFor="edit-content">
                                Your Article
                            </label>

                            <p className="create-post__field-note">
                                Make your changes and improve your story.
                            </p>

                            <textarea
                                id="edit-content"
                                className="create-post__content"
                                placeholder="Write your article..."
                                rows="14"
                                value={content}
                                onChange={e => setContent(e.target.value)}
                                required
                            />
                        </div>

                        <div className="create-post__footer">
                            <p>
                                EVERY DETAIL MATTERS.
                            </p>

                            <button type="submit">
                                Save Changes <span>→</span>
                            </button>
                        </div>

                    </form>

                    {message && (
                        <p className="create-post__message" role="alert">
                            {message}
                        </p>
                    )}

                    <div style={{ marginTop: '1.5rem' }}>
                        <Link
                            to={`/posts/${id}`}
                            style={{
                                color: 'var(--color-gold-dark)',
                                fontFamily: 'Arial, sans-serif',
                                fontSize: '0.85rem',
                                fontWeight: '600'
                            }}
                        >
                            ← Back to Article
                        </Link>
                    </div>

                </div>

            </div>
        </section>
    )
}

export default EditPost