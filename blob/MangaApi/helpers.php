<?php
    // Fetching General Manga Data
    function responseManga
    ($id, $name, $author, $genres, $description, $country, $languages,
     $language_abr, $chapters, $rating, $created, $updated) {

        $response['id'] = $id;
        $response['name'] = $name;
        $response['author'] = $author;
        $response['genres'] = $genres;
        $response['description'] = $description;
        $response['country'] = $country;
        $response['languages'] = ['language' => $languages, 'abbreviation' => $language_abr];
        $response['chapters'] = $chapters;
        $response['rating'] = $rating;
        $response['doc'] = ['created' => $created, 'updated' => $updated];

        // turning the data to json and printing it to the api
        $json_response = json_encode($response, JSON_THROW_ON_ERROR);
        echo $json_response;
    }

    function fetchMangaData($result, $id) {
        $row = mysqli_fetch_array($result);

        $name = $row['name'];
        $author = $row['author'];
        $genres = $row['genres'];
        $description = $row['description'];
        $country = $row['country'];
        $languages = $row['languages'];
        $language_abr = $row['language_abr'];
        $chapters = $row['chapters'];
        $rating = $row['rating'];
        $created = $row['created'];
        $updated = $row['updated'];


        responseManga(
            $id, $name, $author, $genres, $description, $country, $languages, $language_abr, $chapters, $rating, $created, $updated
        );
    }



    // Fetching chapter data
    function responseChapters($name, $pages, $chapter) {

        $response['name'] = $name;
        $response['pages'] = $pages;
        $response['chapter'] = $chapter;

        $json_response = json_encode($response, JSON_THROW_ON_ERROR);
        echo $json_response;
    }

    function fetchChapterData($result) {
        $row = mysqli_fetch_array($result);

        $name = $row['name'];
        $pages = $row['pages'];
        $chapter = $row['chapter'];

        responseChapters(
            $name, $pages, $chapter
        );
    }