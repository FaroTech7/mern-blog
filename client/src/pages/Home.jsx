
import { useState, useEffect } from 'react'
import PostItem from '../components/PostItem'
import './home.css'

const Home = () => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/posts')
                const data = await response.json()

                setPosts(data)
            } catch (error) {
                console.error('Error fetching posts:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchPosts()
    }, [])

    if (loading) {
        return <h2 className="container">Loading posts...</h2>
    }

    return (
        <>
            {/* HERO SECTION */}
            <section className="hero">
                <div className="container hero__container">

                    <div className="hero__content">
                        <span className="hero__eyebrow">
                            THE JOURNAL — STORIES & PERSPECTIVES
                        </span>

                        <h1 className="hero__title">
                            Ideas worth reading.
                            <span> Stories worth sharing.</span>
                        </h1>

                        <p className="hero__description">
                            Discover thoughtful articles, fresh perspectives
                            and inspiring ideas from writers who have
                            something meaningful to share.
                        </p>

                        <div className="hero__actions">
                            <a href="#latest" className="hero__button">
                                Explore Articles <span>→</span>
                            </a>

                            <span className="hero__note">
                                Read. Discover. Think.
                            </span>
                        </div>
                    </div>

                    <div className="hero__decoration">
                        <span className="hero__decoration-line"></span>
                        <span className="hero__decoration-text">
                            EST. FOR THE CURIOUS
                        </span>
                    </div>

                </div>
            </section>

            {/* LATEST POSTS */}
            <section className="home section" id="latest">
                <div className="container home__container">

                    <div className="home__heading">
                        <div>
                            <span className="home__eyebrow">
                                FRESHLY PUBLISHED
                            </span>

                            <h2>Explore Our Latest Posts</h2>
                        </div>

                        <p className="home__subtitle">
                            Discover stories, ideas and knowledge
                            from different writers.
                        </p>
                    </div>

                    <div className="posts__container">
                        {posts.length > 0 ? (
                            posts.map(post => (
                                <PostItem
                                    key={post._id}
                                    post={{ ...post, id: post._id }}
                                />
                            ))
                        ) : (
                            <p>No posts available yet.</p>
                        )}
                    </div>

                </div>
            </section>
        </>
    )
}

export default Home
