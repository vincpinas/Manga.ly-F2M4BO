import React, { useState } from 'react';

interface settingsProps {
    theme: string;
    setTheme(state: string): any;
    isLoggedIn: object;
    setIsLoggedIn(state: object): any;
}

function Settingstab({ theme, setTheme, isLoggedIn, setIsLoggedIn }:settingsProps) {
    const [tabActive, setTabActive] = useState(false);
    const tabSetter = () => setTabActive(!tabActive)
    const themeSetter = () => theme === 'light' ? setTheme('dark') : setTheme('light')
    const logOut = () => setIsLoggedIn({loggedIn: false})

    return (
        <div className="settingsWrapper">
            <img src='./Assets/anonymous.jpg' className="headerIcon roundImg marge10" 
                 onClick={tabSetter} style={tabActive ? {color:"var(--focuscolor)"} : {}}
                 alt="Current Logged In User Profile Pic"
            />
            <div className="settingsDisplay" style={tabActive ? {} : {display:"none"}}>
                <div className="settingPreview themeSwitcher noselect" onClick={themeSetter}>
                    Theme Switcher
                </div>
                <div className="settingPreview logInSwitcher noselect" onClick={logOut}>
                    LogOut
                </div>
            </div>
        </div>
    )
}

export default Settingstab;