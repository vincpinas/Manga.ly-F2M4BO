import React, { useState, useEffect } from 'react';
import { postData } from '../Helpers';
import MangaCard from './MangaCard';

import './MangaList.css'

function MangaList() {
  const [manga, setManga] = useState<any | null>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    postData(`/mangaly/blob/MangaApi/api.php?numrows`)
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

  const sortedManga: object[] = manga.sort((x: any, y: any) => {
    return x.id - y.id
  });

  return (
    <div className="mangaList">
      {sortedManga.map((manga: any, index: number) => {
        return (
          <MangaCard manga={manga} key={`manga${index}`} />
        )
      })}
    </div>
  )
}

export default MangaList;