<?php
session_start();
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Check if it's a POST request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

require_once '../../config/database.php';

try {
    // Get POST data
    $data = json_decode(file_get_contents('php://input'), true);

    // Debug: Log received data
    error_log("Received login attempt - Username: " . ($data['username'] ?? 'not set'));

    // Validate required fields
    if (!isset($data['username']) || !isset($data['password'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Authentication failed. Username and password are required.']);
        exit();
    }

    $username = $data['username'];
    $password = $data['password'];

    // Create database connection
    $database = new Database();
    $conn = $database->getConnection();

    // Query the database
    $stmt = $conn->prepare("SELECT id, username, password, role, first_name, last_name, email FROM users WHERE username = ? OR email = ?");
    $stmt->execute([$username, $username]);
    $user = $stmt->fetch();

    if (!$user) {
        error_log("User not found: " . $username);
        http_response_code(401);
        echo json_encode(['error' => 'Authentication failed. The provided username or email is not registered.']);
        exit();
    }

    // Debug: Log password verification attempt
    error_log("Attempting password verification for user: " . $username);

    if (!password_verify($password, $user['password'])) {
        error_log("Password verification failed for user: " . $username);
        http_response_code(401);
        echo json_encode(['error' => 'Authentication failed. The provided password is incorrect.']);
        exit();
    }

    error_log("Login successful for user: " . $username);

    // Generate a simple token (you might want to use JWT in production)
    $token = bin2hex(random_bytes(32));

    // Set session variables
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['username'] = $user['username'];
    $_SESSION['role'] = $user['role'];
    $_SESSION['first_name'] = $user['first_name'];
    $_SESSION['last_name'] = $user['last_name'];
    $_SESSION['email'] = $user['email'];
    $_SESSION['token'] = $token;

    // Return success response
    echo json_encode([
        'status' => 'success',
        'message' => 'Authentication successful. Welcome back!',
        'token' => $token,
        'user' => [
            'id' => $user['id'],
            'username' => $user['username'],
            'role' => $user['role'],
            'first_name' => $user['first_name'],
            'last_name' => $user['last_name'],
            'email' => $user['email']
        ]
    ]);
} catch (PDOException $e) {
    error_log("Database Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'System error: Unable to process your request. Please try again later.']);
} catch (Exception $e) {
    error_log("General Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'System error: An unexpected error occurred. Please try again later.']);
}
?>