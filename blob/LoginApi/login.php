<?php
header("Content-Type:application/json");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');

// Classes
require __DIR__.'/classes/Database.php';
require __DIR__.'/classes/JwtHandler.php';

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

if($_SERVER["REQUEST_METHOD"] != "POST") {
    $returnData = msg(0,404,'Page Not Found!','Error');
} else {
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);

    if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $returnData = msg(0,422,'Invalid Email Address!','Error');
    }
    elseif(strlen($password) < 8) {
        $returnData = msg(0,422,'Your password must be at least 8 characters long!','Warning');
    }
    // If no errors caused by the user occur
    else {
        try{
            $fetch_user_by_email = "SELECT * FROM `users` WHERE `email`=:email";
            $query_stmt = $conn->prepare($fetch_user_by_email);
            $query_stmt->bindValue(':email', $email,PDO::PARAM_STR);
            $query_stmt->execute();

            if($query_stmt->rowCount()) {
                $row = $query_stmt->fetch(PDO::FETCH_ASSOC);
                $check_password = password_verify($password, $row['password']);

                // IF PASSWORD IS CORRECT THEN SEND THE LOGIN TOKEN
                if($check_password) {
                    $jwt = new JwtHandler();
                    $token = $jwt->__jwt_encode_data(
                        'http://localhost/mangaly/blob/LoginApi',
                        ["user_id" => $row['id']]
                    );
                    
                    $returnData = [
                        'success' => 1,
                        'message' => 'You have successfully logged in.',
                        'token' => $token,
                        'type' => 'Success'
                    ];
                } else {
                    $returnData = msg(0,422,'Invalid Password!','Warning');
                }
            } else { 
                $returnData = msg(0,422,'Invalid Email Address!','Warning');
            }
        }
        catch(PDOException $e){
            $returnData = msg(0,500,$e->getMessage(), 'Error');
        }
    }
};

echo json_encode($returnData);