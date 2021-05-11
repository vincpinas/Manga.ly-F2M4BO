<?php
header("Content-Type:application/json");
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');

require '/../database.php';

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