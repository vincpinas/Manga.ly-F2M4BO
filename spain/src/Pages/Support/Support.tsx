import React, { useState } from 'react';

import './Support.css';

import WelcomeBoxes from '../../Components/3DObjects/WelcomeBoxes';
import { pageTextHandler } from '../../Components/Helpers'

function Support({history}:any) {
    const [pageText, setPageText] = useState('');
    const textProps = pageTextHandler(pageText)

    return (
        <div className="welcomePage">
            <div className="welcomeContent">
                <WelcomeBoxes history={history} setPageText={setPageText}/>
                <div className={pageText !== '' ? "welcomeTextContainer active" : "welcomeTextContainer"}>
                    <h4>{textProps?.header}</h4>
                    <h2>{textProps?.title}</h2>
                    <p>{textProps?.description}</p>
                </div>
            </div>
        </div>
    )
}

export default Support;