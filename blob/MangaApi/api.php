<?php 
    if (strpos($_SERVER['HTTP_HOST'], "ma-cloud.nl")) {
        include('db.live.php');
    } else {
        include('db.local.php');
    }
    include('helpers.php');
?>

<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: access");
    header("Access-Control-Allow-Methods: POST");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    if(isset($_GET['numrows'])) {
        $sql = "SELECT * FROM manga";

        $result = mysqli_query(
            $con, $sql 
        );

        $num_rows = mysqli_num_rows($result);

        echo json_encode($num_rows);
        mysqli_close($con);
    }

    if (isset($_GET['table']) && $_GET['table'] != "") {
        $table = $_GET['table'];
        $id = $_GET['id'];
        $name = isset($_GET['name']) ? $_GET['name'] : NULL;

        if ($table == 'manga') $sql = "SELECT * FROM `manga` WHERE `id` = $id";
        if ($table == 'chapters') $sql = "SELECT * FROM `chapters` WHERE `name` = '$name' AND `chapter` = $id";

        $result = mysqli_query(
            $con, $sql
        );

        if(mysqli_num_rows($result) > 0) {
            if($table == 'manga') {
                try {
                    fetchMangaData($result, $id);
                } catch (\Exception $err) {
                    echo $err->getMessage();
                }
            } else {
                fetchChapterData($result);
            }
        } else { 
            if($table == 'manga') {
                responseManga($id, NULL, NULL, NULL, "No Record Found", NULL, NULL, NULL, NULL, NULL, NULL, NULL);
            } else {
                responseChapters(NULL, NULL, NULL); 
            }
        }
    }