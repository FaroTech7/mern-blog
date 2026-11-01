import { Link } from 'react-router-dom';
import './footer.css';

const Footer = () => {
    return (
        <footer className="footer">

            <div className="container footer__container">

                <div className="footer__logo">
                    <Link to="/">MERN BLOG</Link>

                    <p>
                        Share your thoughts, stories and ideas
                        with the world.
                    </p>
                </div>

                <div className="footer__links">
                    <h4>Quick Links</h4>

                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/authors">Authors</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </ul>
                </div>

            </div>

            <div className="footer__copyright">
                <small>
                    &copy; 2026 MERN BLOG. All Rights Reserved.
                </small>
            </div>

        </footer>
    );
};

export default Footer;