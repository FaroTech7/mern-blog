
import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './postdetails.css'

const PostDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { token, user } = useAuth()

    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

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

                setPost(data)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }

        fetchPost()
    }, [id])

    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            'Are you sure you want to delete this post?'
        )

        if (!confirmDelete) return

        try {
            const response = await fetch(
                `http://localhost:5000/api/posts/${id}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Failed to delete post')
            }

            navigate('/')
        } catch (error) {
            setError(error.message)
        }
    }

    if (loading) {
        return (
            <div className="article-message">
                <h2>Loading article...</h2>
            </div>
        )
    }

    if (error) {
        return (
            <div className="article-message">
                <h2>{error}</h2>
                <Link to="/">Return Home</Link>
            </div>
        )
    }

    if (!post) {
        return (
            <div className="article-message">
                <h2>Article not found.</h2>
                <Link to="/">Return Home</Link>
            </div>
        )
    }

    const isOwner = user && post.user?.toString() === user.id?.toString()

    return (
        <main className="article-page">

            <div className="container article-container">

                {/* BACK LINK */}
                <Link to="/" className="article-back">
                    <span>←</span> Back to Journal
                </Link>

                {/* ARTICLE HEADER */}
                <header className="article-header">

                    <span className="article-category">
                        {post.category}
                    </span>

                    <h1>{post.title}</h1>

                    <p className="article-description">
                        {post.description}
                    </p>

                    <div className="article-meta">
                        <span>
                            By <strong>{post.author}</strong>
                        </span>

                        <span className="article-meta-divider"></span>

                        <time>
                            {new Date(post.createdAt).toLocaleDateString(
                                'en-US',
                                {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                }
                            )}
                        </time>
                    </div>

                </header>

                {/* FEATURED IMAGE */}
                {post.image && (
                    <div className="article-image">
                        <img
                            src={post.image}
                            alt={post.title}
                        />
                    </div>
                )}

                {/* ARTICLE BODY */}
                <div className="article-body">

                    <div className="article-content">
                        {post.content}
                    </div>

                    <div className="article-end">
                        <span></span>
                        <span>END OF ARTICLE</span>
                        <span></span>
                    </div>

                    {/* AUTHOR INFORMATION */}
                    <div className="article-author">
                        <div className="author-avatar">
                            {post.author?.charAt(0).toUpperCase()}
                        </div>

                        <div>
                            <span className="author-label">
                                WRITTEN BY
                            </span>

                            <h3>{post.author}</h3>
                        </div>
                    </div>

                    {/* OWNER CONTROLS */}
                    {isOwner && (
                        <div className="article-controls">

                            <span>MANAGE YOUR ARTICLE</span>

                            <div className="article-buttons">
                                <Link
                                    to={`/edit/${post._id}`}
                                    className="article-edit"
                                >
                                    Edit Article
                                </Link>

                                <button
                                    onClick={handleDelete}
                                    className="article-delete"
                                >
                                    Delete Article
                                </button>
                            </div>

                        </div>
                    )}

                </div>

            </div>

        </main>
    )
}

export default PostDetails
