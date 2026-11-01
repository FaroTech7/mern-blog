import { Link } from 'react-router-dom';
import './postitem.css';

const PostItem = ({ post }) => {
    const formattedDate = post.createdAt
        ? new Date(post.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
        : post.date || '';

    return (
        <article className="post">

            <div className={`post__image ${post.imageClass || ''}`}>
                {post.image && (
                    <img
                        src={post.image}
                        alt={post.title}
                    />
                )}

                <span>{post.category}</span>
            </div>

            <div className="post__content">

                <Link to={`/posts/${post.id}`}>
                    <h3>{post.title}</h3>
                </Link>

                <p>{post.description}</p>

                <div className="post__footer">
                    <span>By {post.author}</span>
                    <small>{formattedDate}</small>
                </div>

            </div>

        </article>
    );
};

export default PostItem;