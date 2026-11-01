import { useState } from 'react'
import './createpost.css'

const CreatePost = () => {
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [content, setContent] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setMessage('')

        try {
            const token = localStorage.getItem('token')

            if (!token) {
                throw new Error('Please log in before creating a post.')
            }

            const response = await fetch('http://localhost:5000/api/posts', {
                method: 'POST',
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
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Failed to publish post')
            }

            setMessage('Post published successfully!')

            setTitle('')
            setCategory('')
            setDescription('')
            setImage('')
            setContent('')

        } catch (error) {
            setMessage(error.message)
            console.error('Error publishing post:', error)
        }
    }

    return (
        <section className="create-post">
            <div className="container create-post__container">

                <header className="create-post__header">
                    <span className="create-post__eyebrow">
                        THE JOURNAL — WRITING STUDIO
                    </span>

                    <h1>Create Something Meaningful.</h1>

                    <p>
                        Every great article starts with an idea.
                        Give yours a voice.
                    </p>
                </header>

                <div className="create-post__card">

                    <div className="create-post__card-header">
                        <div>
                            <span>NEW ARTICLE</span>
                            <h2>Article Details</h2>
                        </div>

                        <div className="create-post__card-icon">
                            ✎
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="create-post__field">
                            <label htmlFor="post-title">
                                Article Title
                            </label>

                            <input
                                id="post-title"
                                type="text"
                                placeholder="Give your article a compelling title"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                required
                            />
                        </div>

                        <div className="create-post__field">
                            <label htmlFor="post-category">
                                Category
                            </label>

                            <input
                                id="post-category"
                                type="text"
                                placeholder="e.g. Technology, Business, Lifestyle"
                                value={category}
                                onChange={e => setCategory(e.target.value)}
                                required
                            />
                        </div>

                        <div className="create-post__field">
                            <label htmlFor="post-description">
                                Short Description
                            </label>

                            <textarea
                                id="post-description"
                                placeholder="Write a brief introduction to your article..."
                                rows="3"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                required
                            />
                        </div>

                        <div className="create-post__field">
                            <label htmlFor="post-image">
                                Featured Image URL
                                <span>OPTIONAL</span>
                            </label>

                            <input
                                id="post-image"
                                type="url"
                                placeholder="https://example.com/image.jpg"
                                value={image}
                                onChange={e => setImage(e.target.value)}
                            />
                        </div>

                        <div className="create-post__divider"></div>

                        <div className="create-post__field">
                            <label htmlFor="post-content">
                                Your Article
                            </label>

                            <p className="create-post__field-note">
                                Take your time. Write something worth reading.
                            </p>

                            <textarea
                                id="post-content"
                                className="create-post__content"
                                placeholder="Start writing your story here..."
                                rows="14"
                                value={content}
                                onChange={e => setContent(e.target.value)}
                                required
                            />
                        </div>

                        <div className="create-post__footer">
                            <p>
                                YOUR WORDS. YOUR PERSPECTIVE. YOUR STORY.
                            </p>

                            <button type="submit">
                                Publish Article <span>→</span>
                            </button>
                        </div>

                    </form>

                    {message && (
                        <p className="create-post__message" role="status">
                            {message}
                        </p>
                    )}

                </div>

            </div>
        </section>
    )
}

export default CreatePost