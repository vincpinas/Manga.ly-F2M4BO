<?php
header("Content-Type:application/json");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');

// Classes
require __DIR__.'/../database.php';

function msg($success,$status,$message,$type,$extra = []){
    return array_merge([
        'success' => $success,
        'status' => $status,
        'message' => $message,
        'type' => $type
    ], $extra);
}

$db_connection = new Database();
$conn = $db_connection->__dbConnection();

$returnData = [];

if($_SERVER["REQUEST_METHOD"] != "POST") {
    $returnData = msg(0,404,'Page Not Found!', 'Error');
} else {
    $username = trim($_POST['username']);
    $firstname = trim($_POST['firstname']);
    $lastname = trim($_POST['lastname']);
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);
    $created_at = date("Y/m/d");

    if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $returnData = msg(0,422,'Invalid Email Address!', 'Warning');
    } else if(strlen($password) < 8) {
        $returnData = msg(0,423,'Your password must be at least 8 characters long!', 'Warning');
    } else if(strlen($username) < 3) {
        $returnData = msg(0,424,'Your username must be at least 3 characters long!', 'Warning');
    }

    else {
        try{
            $check_email = "SELECT `email` FROM `users` WHERE `email`=:email";
            $check_email_stmt = $conn->prepare($check_email);
            $check_email_stmt->bindValue(':email', $email,PDO::PARAM_STR);
            $check_email_stmt->execute();

            if($check_email_stmt->rowCount()) {
                $returnData = msg(0,425, 'This E-mail is already in use!', 'Error');
            } else {
                $insert_query = "INSERT INTO `users`(`username`,`firstname`,`lastname`,`email`,`password`,`created_at`) 
                                 VALUES(:username,:firstname,:lastname,:email,:password,:created_at)";

                $insert_stmt = $conn->prepare($insert_query);

                $insert_stmt->bindValue(':username', htmlspecialchars(strip_tags($username)),PDO::PARAM_STR);
                $insert_stmt->bindValue(':firstname', $firstname,PDO::PARAM_STR);
                $insert_stmt->bindValue(':lastname', $lastname,PDO::PARAM_STR);
                $insert_stmt->bindValue(':email', $email,PDO::PARAM_STR);
                $insert_stmt->bindValue(':password', password_hash($password, PASSWORD_DEFAULT),PDO::PARAM_STR);
                $insert_stmt->bindValue(':created_at', $created_at,PDO::PARAM_STR);

                $insert_stmt->execute();

                $returnData = msg(1,201,'You have successfully registered.', 'Success');
            }
        }
        catch(PDOException $e){
            $returnData = msg(0,500,$e->getMessage(), 'Error');
        }
    }
}

echo json_encode($returnData);