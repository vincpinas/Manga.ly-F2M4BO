import React, { useState, useRef } from 'react';
import './Register.css';

function Register() {
    const [status, setStatus] = useState<any>({});
    const [notifications, setNotifications] = useState<any>([]);
    const form: any = useRef();

    const handleFormSubmit = (e: any) => {
        let prefix;
        if (window.location.href.includes('ma-cloud')) prefix = 'http://30472.hosts1.ma-cloud.nl' 
        else prefix = 'http://localhost'

        e.preventDefault();
        const data = new FormData(form.current)
        fetch(`${prefix}/mangaly/blob/LoginApi/register.php`, {
            method: 'POST',
            body: data,
        }).then(res => res.json())
        .then(json => setStatus(json))
        .then(() => setNotifications([...notifications, status]))
        .catch(err => console.error(err))

        console.log(notifications)
    }

    return (
        <div className="registerPage">
            <div className="notifactionContainer">
                {notifications.map((item: any, index: number) => {
                    return (<span key={`notification${index}`} className="notification" style={item.message ? {} : {display:"none"}}>
                                {item.message}
                            </span>)
                })}
            </div>
            <div className="registerFormWrapper">
                <form ref={form}>
                    <input type="text" placeholder="Username.." name="username" required />
                    <input type="text" placeholder="First name.." name="firstname" required />
                    <input type="text" placeholder="Last name.." name="lastname" required />
                    <input type="email" placeholder="Email.." name="email" required />
                    <input type="password" placeholder="Password.." name="password" required />
                    <input type="password" placeholder=" Repeat Password.." name="pass_repeat" required />
                    <input type="submit" onClick={e => handleFormSubmit(e)} value="Register" />
                </form>
            </div>
        </div>
    )
}

export default Register;