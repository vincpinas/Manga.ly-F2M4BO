import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';

function Loadbar() {
    const [loading, setLoading] = useState(true);

    const ReloadCallBack = () => {
        let location = useLocation();
        useEffect(() => {
          setLoading(false);
          setLoading(true);
          setTimeout(()=> {
            setLoading(false);
          }, 500)
        }, [location]);
    }
    ReloadCallBack()

    const loadingStyle = {
        height: "2px",
        backgroundColor: "var(--loadbarcolor)",
        animationFillMode: "forwards",
        animationName: "global-loadbar-load",
        animationDuration: "0.5s"
    }

    return (
        <div style={ loading ? loadingStyle : {height: "2px"}}/>
    )
}

export default Loadbar;