import React, { useState, useEffect } from 'react';
import { postData } from '../Helpers';
import { Link } from 'react-router-dom';

function Searchbar() {
    const [filteredManga, setFilteredManga] = useState([]);
    const [manga, setManga] = useState<any | null>([]);
    const [error, setError] = useState(false);
    const [display, setDisplay] = useState(false);

    useEffect(() => {
        postData(`/mangaly/blob/MangaApi/api.php?numrows`, )
            .then((numManga) => {
                const promises = []

                for (let i = 1; i <= numManga; i++) {
                    const promise = postData(
                        `/mangaly/blob/MangaApi/api.php?table=manga&id=${i}`
                    )
                    promises.push(promise)
                }

                return Promise.all(promises)
            })
            .then(promises => setManga(promises))
            .catch(() => setError(true))
    }, [error]);

    const searchHandler = (e: any) => {
        
        const searchString = e.target.value;
        const filteredManga = manga.filter((manga: any) => {
            return manga.name.toLowerCase().includes(searchString.toLowerCase().trim())
        });
        if (searchString === '') setFilteredManga([]);
        else setFilteredManga(filteredManga);

        const maxLength = 7
        let position = filteredManga.length + maxLength - filteredManga.length
        if (filteredManga.length > maxLength) filteredManga.splice(position, 4)

        if(filteredManga.length > 0) setDisplay(true)
        else if(filteredManga.length <= 0) setDisplay(false)
    }
    return (
        <div className="searchWrapper">
            <input type="text" name="searchBar" id="searchBar" placeholder="search for a manga 🔎" onKeyUp={searchHandler} />
            {display ? <div className="searchDisplay">
                {filteredManga.map((item: any, index: number) => {
                    let trimmedName = item.name.toLowerCase().replace(/\s/g, "")
                    return (
                        <Link to={`/manga?id=${item.id}`} key={index} className="searchPreview" onClick={()=>setDisplay(false)}>
                            <img className="searchPreviewImg" alt="search preview" src={`./Assets/Covers/${trimmedName}.jpg`} />
                            <div className="searchPreviewInfo">
                                <h4 className="name">{item.name}</h4>
                                <span className="author">{item.author}</span>
                                <span className="chapters">{item.chapters} Chapters</span>
                            </div>
                        </Link>
                    )
                })}
            </div> : null}
        </div>
    )
}

export default Searchbar;