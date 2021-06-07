<?php
header("Content-Type:application/json");
header('Access-Control-Allow-Origin: *');  
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization');

require __DIR__.'/../database.php';

function msg($success,$status,$message,$type,$extra = []){
    return array_merge([
        'success' => $success,
        'status' => $status,
        'message' => $message,
        'type' => $type
    ],$extra);
}

$db_connection = new Database();
$conn = $db_connection->__dbConnection();

$returnData = [];
$insert_stmt;

if($_SERVER["REQUEST_METHOD"] != "POST") {
    $returnData = msg(0,404,'Page Not Found!','Error');
} else {
    $action = trim($_POST['action']);
    $author = trim($_POST['author']);
    $message = trim($_POST['message']);
    $location = trim($_POST['location']);

    if($action === 'post') {
        $create_comment = "INSERT INTO `comments` ('id', 'location', 'author', 'message', 'time') 
                           VALUES (:id, :location, :author, :comment, :ctime)";
        $insert_stmt = $conn->prepare($create_comment);

        $insert_stmt->bindValue(':id', NULL, PDO::PARAM_STR);
        $insert_stmt->bindValue(':location', $author, PDO::PARAM_STR);
        $insert_stmt->bindValue(':author', $author, PDO::PARAM_STR);
        $insert_stmt->bindValue(':comment', $message, PDO::PARAM_STR);
        $insert_stmt->bindValue(':ctime', time(), PDO::PARAM_STR);
    }

    $insert_stmt->execute();

    $comments = [];
    $returnData = [
        'success' => 1,
        'message' => 'Successfully fetched all comments.',
        'location' => $location,
        'comments' => $comments,
        'type' => 'Success'
    ];
};

echo json_encode($returnData);