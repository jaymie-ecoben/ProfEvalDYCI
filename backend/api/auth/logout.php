<?php
session_start();
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// Destroy the session
session_destroy();

echo json_encode([
    'status' => 'success',
    'message' => 'Logged out successfully'
]);
?>