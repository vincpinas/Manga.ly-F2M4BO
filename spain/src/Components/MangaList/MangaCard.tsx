import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as AiIcons from 'react-icons/ai';

interface mangaCardProps {
    manga: {name: string; id: number; rating: number; chapters: number;};
}

function MangaCard({ manga }: mangaCardProps) {
    // States & Variables.
    const trimmedName: string = manga.name.toLowerCase().replace(/\s/g, "");
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [favorite, setFavorite] = useState<boolean>(false);
    const backgroundImg: object = {
        backgroundImage: `url(./Assets/Covers/${trimmedName}.jpg)`,
        animationDelay: `${manga.id / 15}s`
    }
    const rating: any[] = [];

    // Calculate Amount of stars based on the rating
    ((num: number) => {
        for(let i = 1; i <= Math.round(num); i++) rating.push(<AiIcons.AiFillStar key={`starFill${i}`}/>)
        if(rating.length < 5) {
            for(let i = rating.length; i < 5; i++) rating.push(<AiIcons.AiOutlineStar  key={`starOutline${i}`}/>)
        }
    })(manga.rating)

    return (
        <div className="mangaCard" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} style={backgroundImg}>
            <div className={isHovered ? "mangaCardOverlay active" : "mangaCardOverlay"}>
                <Link to={`/manga?id=${manga.id}`} className="mangaLink"/>
                <div className="mangaGeneral">
                    <h4 className="noselect">{manga.name}</h4>
                    <h5 className="mangaState">
                        { favorite ? <AiIcons.AiFillHeart onClick={() => setFavorite(false)}/> : 
                        <AiIcons.AiOutlineHeart onClick={() => setFavorite(true)}/> 
                        }
                    </h5>
                    <h6>{manga.chapters} Chapters</h6>
                </div>
                <div className="mangaRating">
                    {rating}
                </div>
            </div>
        </div>
    )
}

export default MangaCard;