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
    const logOut = () => setIsLoggedIn({loggedIn: false})

    if (isLoggedIn.loggedIn) {
        return (
            <div className="headerWrapper">
                <header className="globalHeader" style={style}>
                    <div className="headerLogo">
                        <Link className="noselect" to="/">Home Page</Link>
                    </div>
                    <nav className="headerLinks">
                        <Searchbar/>
                        <Link className="headerLink marge10 noselect" to="/dashboard">Dashboard</Link>
                        <Link className="headerLink marge10 noselect" to="/support">Support</Link>
                        <button className="headerButton marge10 noselect" onClick={logOut}>Log Out</button>
                        <Settingstab theme={theme} setTheme={setTheme}/>
                    </nav>
                </header>
                <Loadbar/>
            </div>
        )
    } else {
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
                        <Settingstab theme={theme} setTheme={setTheme}/>
                    </nav>
                </header>
                <Loadbar/>
            </div>
        )
    }
}

export default Navigation;