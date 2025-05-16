<?php
require_once __DIR__ . '/../vendor/autoload.php';
use \Firebase\JWT\JWT;

// JWT Secret Key - Change this to a secure random string in production
define('JWT_SECRET_KEY', 'your-secret-key-here');

function generateJWT($payload)
{
    return JWT::encode($payload, JWT_SECRET_KEY, 'HS256');
}

function verifyJWT($token)
{
    try {
        $decoded = JWT::decode($token, JWT_SECRET_KEY, array('HS256'));
        return (array) $decoded;
    } catch (Exception $e) {
        throw new Exception('Invalid token');
    }
}

function getBearerToken()
{
    $headers = getallheaders();
    if (isset($headers['Authorization'])) {
        if (preg_match('/Bearer\s(\S+)/', $headers['Authorization'], $matches)) {
            return $matches[1];
        }
    }
    return null;
}
?>