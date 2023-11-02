<?php


$token = '82ZSVoes1AxM84SgQMcjccRDev6l62EfLwvbYlzmXFODIO';

$key = $_GET['key'];
$action = $_GET['action'];
$username = $_GET['username'];
$amount = $_GET['amount'];
$details = $_GET['details'];
$affiliate_commission = $_GET['affiliate_commission'];


header('Content-Type: application/json');

if (isset($key, $action, $username, $amount, $details, $affiliate_commission)) {
    
if (isset($_GET['key']) && $_GET['key'] == $token) {

    $response = array("status" => "success");
    echo json_encode($response);
    exit;
}else{
    
    $response = array('status' => 'fail', 'error' => 'invalid_token');
    echo json_encode($response);
    exit;
}
}else{
    
    $response = array('status' => 'fail', 'error' => 'bad_action');
    echo json_encode($response);
    exit;
}
?>
