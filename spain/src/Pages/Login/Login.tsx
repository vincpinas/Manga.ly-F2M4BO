import React, { useRef } from 'react';

import './Login.css';

interface loginProps {
    history: any;
    setIsLoggedIn(state: boolean): any;
    isLoggedIn: {loggedIn: boolean};
};

function Login({ setIsLoggedIn, isLoggedIn }: loginProps) {
    const form: any = useRef();

    const handleFormSubmit = (e: any) => {
        e.preventDefault();
        if(!isLoggedIn?.loggedIn) {
            let prefix;
            if (window.location.href.includes('ma-cloud')) prefix = 'http://30472.hosts1.ma-cloud.nl';
            else prefix = 'http://localhost';
    
            const data = new FormData(form.current);
            fetch(`${prefix}/mangaly/blob/LoginApi/login.php`, {
                method: 'POST',
                body: data,
            }).then(res => res.json())
            .then(json => (json.success === 1 ? setIsLoggedIn({loggedIn: true,...json}) : setIsLoggedIn({loggedIn: false,...json})));
        };
    };
    return (
        <div className="loginPage">
            <div className="loginFormWrapper">
                <form ref={form}>
                    <input type="email" placeholder="Email.." name="email" required defaultValue="ikbengerrit92@gmail.com"/>
                    <input type="password" placeholder="Password.." name="password" required defaultValue="lolaapje123" />
                    <input type="submit" value="Login" onClick={e => handleFormSubmit(e)} />
                </form>
            </div>
        </div>
    );
};

export default Login;