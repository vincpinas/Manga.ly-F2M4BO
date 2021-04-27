import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { postData } from '../../Components/Helpers';
import { Link } from 'react-router-dom';

import './Manga.css';

interface MangaProps {
    history?: any;
    location: any;
}

function Manga({ location }: MangaProps) {
    // Initials manga state
    const [manga, setManga] = useState<any>({
        id: 1, name: "", author: "", genres: "", description: "", country: "South-Korea", chapters: 0, rating: 0
    });
    const chapterLinks = []; // Available Chapters List
    const { id }: any = queryString.parse(location.search); // Id from parsed query string (QueryString: the string you would get with the PHP GET method).
    const trimmedName = manga.name.toLowerCase().replace(/\s/g, ""); // Trimmed manga name for consistensy and finding the proper assets

    // UseEffect to fetch the details of the current selected manga.
    useEffect(() => {
        postData(`/mangaly/blob/MangaApi/api.php?table=manga&id=${id}`)
          .then(response => setManga(response))

        return () => {
            setManga({
                id: 1, name: "", author: "", genres: "", description: "", country: "South-Korea", chapters: 0, rating: 0
            });
        }
    }, [id])

    // Function to map over a string of genres from the backend.
    const genGenres = (genres: string) => {
        return genres.split(" ").map((genre, index) => {
            return (<a href={`https://www.google.com/search?q=${genre}+manga`} target='_blank' rel="noreferrer" key={`genre${index}`} className="genreLink">{genre}</a>)
        })
    }
    // For loop to push each link to the available chapters list.
    for (let i = 0; i <= manga.chapters; i++) {
        chapterLinks.push(<Link key={i} to={`/chapter?name=${trimmedName}&chapter=${i}`} className="chapterLink">Chapter {i}</Link>
        );
    }

    return (
        <div className="mangaPage">
            <div className="mangaInfoHeader">
                <img src={`./Assets/Covers/${trimmedName}.jpg`} className="mangaCover" alt=""/>
                <div className="mangaInfo">
                    <h3>{manga.name}</h3>
                    <span>Genres: {genGenres(manga.genres)}</span>
                </div>
            </div>
            <div className="chapterList">
                { chapterLinks.map((chapter, index) => {
                    return (
                        <span key={`chapterLink${index}`}>{chapter}</span>
                    )
                })}
            </div>
        </div>
    )
}

export default Manga;