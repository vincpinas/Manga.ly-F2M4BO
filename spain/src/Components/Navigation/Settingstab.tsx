import React, { useState, useEffect } from 'react';
import * as IoIcons from 'react-icons/io';

interface settingsProps {
    theme: string;
    setTheme(state: string): any;
}

function Settingstab({ theme, setTheme }:settingsProps) {
    const [tabActive, setTabActive] = useState(false);
    const tabSetter = () => setTabActive(!tabActive)
    const themeSetter = () => theme === 'light' ? setTheme('dark') : setTheme('light')

    useEffect(() => {
        const localTheme = localStorage.getItem('localTheme')
        if(localTheme) {setTheme(localTheme)}
    }, [setTheme])

    useEffect(() => {
        let root = document.documentElement;
        if(theme === 'light') {
            root.style.setProperty('color', '#161616')
            root.style.setProperty('--textcolor', '#161616')
            root.style.setProperty('--background', '#f1f1f1')
            root.style.setProperty('--lighterbackground', '#e6e6e6')
            root.style.setProperty('--loadbarcolor', '#000000');
            root.style.setProperty('--focuscolor', '#111111')
        } else if(theme === 'dark') {
            root.style.setProperty('color', '#eaeaea')
            root.style.setProperty('--textcolor', '#eaeaea')
            root.style.setProperty('--background', '#111111')
            root.style.setProperty('--lighterbackground', '#1a1a1a')
            root.style.setProperty('--loadbarcolor', '#3399ff');
            root.style.setProperty('--focuscolor', '#eaeaea')
        }
        localStorage.setItem('localTheme', theme);
    }, [theme]);

    return (
        <div className="settingsWrapper">
            <IoIcons.IoMdSettings className="headerIcon marge10" onClick={tabSetter} style={tabActive ? {color:"var(--focuscolor)"} : {}}/>
            <div className="settingsDisplay" style={tabActive ? {} : {display:"none"}}>
                <div className="settingPreview themeSwitcher noselect" onClick={themeSetter}>
                    Theme Switcher
                </div>
            </div>
        </div>
    )
}

export default Settingstab;