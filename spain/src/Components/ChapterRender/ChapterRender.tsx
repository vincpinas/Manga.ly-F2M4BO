import React, { useEffect, useState } from 'react';
import { postData } from '../Helpers';
import queryString from 'query-string';
import { Link } from 'react-router-dom';

import './ChapterRender.css';

interface chapterRenderProps {
    location: any;
    history: object;
}

function ChapterRender({ location }: chapterRenderProps) {
    // States
    const [mangaChapter, setMangaChapter] = useState<any | null>(null),
    [loading, setLoading] = useState(false),
    [chapterId, setChapterId] = useState<any | string[] | string | null>(),
    pages: object[] = []

    // Query string items
    const items: any = queryString.parse(location.search),
    name = items.name,
    chapter = parseInt(items.chapter, 10)

    useEffect(() => {
        setLoading(true);
        setChapterId(chapter)
        postData(`/mangaly/blob/MangaApi/api.php?table=chapters&name=${name}&id=${chapter}`, {})
            .then(response => (setMangaChapter(response)))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [chapter, name])

    

    if (!loading && mangaChapter) {
        let prefix, i;
        for (i = 1; i <= mangaChapter.pages; i++) {
            i < 10 ? prefix = '00' : prefix = '0'

            pages.push(<img
                key={i}
                className="chapterPage"
                alt={`${mangaChapter.name} chapter ${mangaChapter.chapter} page ${i}`}
                src={`./Assets/Manga/${mangaChapter.name}/chapter-${mangaChapter.chapter}/${prefix}${i}${'.jpg' || '.jpeg'}`} />
            );
        }
    }

    const verifyPages = () => {
        if (pages.length <= 0) { return (
                <div className="chapterCanvas">
                    <Link to={`/`}>
                        <h4>
                            Oops looks like this chapter doesn't exist yet, please check back in at a later date.
                        </h4>
                        <h5 style={{ padding: '10px', textDecoration: 'underline', color: 'orange', fontWeight: 'bold' }}>
                            Click on this message to return back to the home page.
                        </h5>
                    </Link>
                </div> 
            )}
        else { return (
                <div className="chapterCanvas">
                    {pages}
                    <div className="buttonContainer">
                        {chapterId !== 0 ? <Link className="chapterButton" to={`/chapter?name=${name}&chapter=${chapterId-1}`}>
                            Previous Chapter
                        </Link> : null}
                        <Link className="chapterButton" to={`/chapter?name=${name}&chapter=${chapterId+1}`}>
                            Next Chapter
                        </Link>
                    </div>
                </div>
            )}
    }
    
    return (
        <div className="chapterContainer">
            {verifyPages()}
        </div>
    )
}

export default ChapterRender;