import React from 'react';
import './Founders.css';

function Founders() {
    return (
        <div className="foundersPage">
            <div className="foundersContent">
                <h1>A Team Of Friends</h1>
                <h2 style={{ color: 'gray' }}>Mr. A & Mr. B</h2>
                <div className="foundersCardContainer">
                    <div className="foundersCard">
                        <div>
                            <img src='./Assets/anonymous.jpg' alt='founder Mr. A'/>
                        </div>
                        <p>
                            I’m the designer and passionate reader behind Manga.ly. 
                            I want to change the way you look at reading sites.
                            If you have any feedback or need help getting setup, I’d love to hear from you.
                        </p>
                        <a href='mailto:30472@ma-web.nl'>mra@mangaly.com</a>
                    </div>
                    <div className="foundersCard">
                        <div>
                            <img src='./Assets/anonymous.jpg' alt='founder Mr. B'/>
                        </div>
                        <p>
                            As the developer of Manga.ly, I handle all of the technical details and making sure you have a smooth experience. 
                            If you run into any bugs or issues send me an email to get it fixed.
                        </p>
                        <a href='mailto:30472@ma-web.nl'>mrb@mangaly.com</a>
                    </div>
                </div>
            </div>
        
        </div>
    )
}

export default Founders;