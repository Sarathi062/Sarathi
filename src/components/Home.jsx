import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            
            <h1>Welcome to Mentor Connect!</h1>
            <p>Find your perfect mentor or become a mentor yourself.</p>
            <Link to="/mentors">Browse Mentors</Link>
            <Link to="/become-mentor">Become a Mentor</Link>
        </div>
    );
};

export default Home;