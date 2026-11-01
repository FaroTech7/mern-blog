import { Link } from 'react-router-dom';
import './error.css';

const Error = () => {
    return (
        <section className="error">
            <div className="container error__container">

                <h1>404</h1>

                <h2>Page Not Found</h2>

                <p>
                    Sorry, the page you are looking for
                    does not exist.
                </p>

                <Link to="/" className="btn">
                    Back to Home
                </Link>

            </div>
        </section>
    );
};

export default Error;