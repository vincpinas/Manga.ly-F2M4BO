import React from 'react';
import { Link } from 'react-router-dom';
import Searchbar from './Searchbar';
import Settingstab from './Settingstab';
import Loadbar from './Loadbar';

import './Navigation.css'

interface navigationProps {
    style?: object;
    isLoggedIn: any;
    setIsLoggedIn(state: object): any;
    theme: string;
    setTheme(state: string): any;
}

function Navigation({ style, isLoggedIn, setIsLoggedIn, theme, setTheme }: navigationProps) {

    return (
        <div className="headerWrapper">
            <header className="globalHeader" style={style}>
                <div className="headerLogo">
                    <Link className="" to="/">Home Page</Link>
                </div>
                <nav className="headerLinks">
                    <Searchbar/>
                    <Link className="headerLink marge10 noselect" to="/login">Login</Link>
                    <Link className="headerLink marge10 noselect" to="/register">Register</Link>
                    <Link className="headerLink marge10 noselect" to="/support">Support</Link>
                    {isLoggedIn.loggedIn?<Settingstab theme={theme} 
                                 setTheme={setTheme} 
                                 isLoggedIn={isLoggedIn} 
                                 setIsLoggedIn={setIsLoggedIn}
                    />:null}
                </nav>
            </header>
            <Loadbar/>
        </div>
    )
}

export default Navigation;