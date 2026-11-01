import './authors.css';

const Authors = () => {
    return (
        <>
            <section className="authors__hero">
                <div className="container">
                    <span className="authors__eyebrow">
                        THE PEOPLE BEHIND THE STORIES
                    </span>

                    <h1>
                        Meet Our <span>Authors.</span>
                    </h1>

                    <p>
                        Every great story begins with someone
                        who has something meaningful to share.
                        Get to know the writers behind our publication.
                    </p>
                </div>
            </section>

            <section className="authors section">
                <div className="container">
                    <div className="authors__heading">
                        <span>OUR COMMUNITY</span>
                        <h2>The Voices Behind Our Blog</h2>
                        <p>
                            Different perspectives. Fresh ideas.
                            Stories worth reading.
                        </p>
                    </div>

                    <div className="authors__empty">
                        <div className="authors__empty-icon">✍</div>

                        <h3>Our Writers Are Just Getting Started</h3>

                        <p>
                            We're building a community of thoughtful
                            writers and storytellers. Check back as
                            new voices join our publication.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Authors;