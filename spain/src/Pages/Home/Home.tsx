import React from 'react';

import './Home.css';

import MangaList from '../../Components/MangaList/MangaList';

interface homeProps {
    isLoggedIn?: boolean;
}

function Home({ isLoggedIn }: homeProps) {
    return (
        <div className="homePage">
            <MangaList/>
        </div>
    )
}

export default Home;