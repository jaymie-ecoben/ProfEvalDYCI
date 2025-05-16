-- Create database if not exists
CREATE DATABASE IF NOT EXISTS `dyci_professor_evaluation`;
USE `dyci_professor_evaluation`;

-- Users table
CREATE TABLE IF NOT EXISTS `users` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `username` VARCHAR(50) UNIQUE NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `email` VARCHAR(100) UNIQUE NOT NULL,
    `first_name` VARCHAR(50) NOT NULL,
    `last_name` VARCHAR(50) NOT NULL,
    `role` ENUM('admin', 'student', 'professor') NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Professors table
CREATE TABLE IF NOT EXISTS `professors` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `department` VARCHAR(100) NOT NULL,
    `specialization` VARCHAR(100),
    `status` ENUM('active', 'inactive') DEFAULT 'active',
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

-- Courses table
CREATE TABLE IF NOT EXISTS `courses` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `course_code` VARCHAR(20) UNIQUE NOT NULL,
    `course_name` VARCHAR(100) NOT NULL,
    `description` TEXT,
    `units` INT NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Professor Courses table (for assigning professors to courses)
CREATE TABLE IF NOT EXISTS `professor_courses` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `professor_id` INT NOT NULL,
    `course_id` INT NOT NULL,
    `academic_year` VARCHAR(20) NOT NULL,
    `semester` ENUM('1st', '2nd', 'Summer') NOT NULL,
    FOREIGN KEY (`professor_id`) REFERENCES `professors`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON DELETE CASCADE
);

-- Evaluation Criteria table
CREATE TABLE IF NOT EXISTS `evaluation_criteria` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `category` VARCHAR(50) NOT NULL,
    `description` TEXT NOT NULL,
    `max_score` INT NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Evaluations table
CREATE TABLE IF NOT EXISTS `evaluations` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `student_id` INT NOT NULL,
    `professor_course_id` INT NOT NULL,
    `total_score` DECIMAL(5,2) NOT NULL,
    `comments` TEXT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`student_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`professor_course_id`) REFERENCES `professor_courses`(`id`) ON DELETE CASCADE
);

-- Evaluation Details table (for storing individual criteria scores)
CREATE TABLE IF NOT EXISTS `evaluation_details` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `evaluation_id` INT NOT NULL,
    `criteria_id` INT NOT NULL,
    `score` DECIMAL(5,2) NOT NULL,
    FOREIGN KEY (`evaluation_id`) REFERENCES `evaluations`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`criteria_id`) REFERENCES `evaluation_criteria`(`id`) ON DELETE CASCADE
);

-- Insert default admin user (password: admin123)
INSERT INTO `users` (`username`, `password`, `email`, `first_name`, `last_name`, `role`)
VALUES ('admin', '$2y$10$8K1p/a0dR1xqM8K3qQZz3OQZz3OQZz3OQZz3OQZz3OQZz3OQZz3O', 'admin@dyci.edu.ph', 'Admin', 'User', 'admin');

-- Insert sample professors
INSERT INTO `users` (`username`, `password`, `email`, `first_name`, `last_name`, `role`) VALUES
('jdelacruz', '$2y$10$8K1p/a0dR1xqM8K3qQZz3OQZz3OQZz3OQZz3OQZz3OQZz3OQZz3O', 'jdelacruz@dyci.edu.ph', 'Juan', 'Dela Cruz', 'professor'),
('msantos', '$2y$10$8K1p/a0dR1xqM8K3qQZz3OQZz3OQZz3OQZz3OQZz3OQZz3OQZz3O', 'msantos@dyci.edu.ph', 'Maria', 'Santos', 'professor'),
('rgarcia', '$2y$10$8K1p/a0dR1xqM8K3qQZz3OQZz3OQZz3OQZz3OQZz3OQZz3OQZz3O', 'rgarcia@dyci.edu.ph', 'Roberto', 'Garcia', 'professor');

-- Insert professor details
INSERT INTO `professors` (`user_id`, `department`, `specialization`) VALUES
(2, 'Computer Science', 'Web Development'),
(3, 'Information Technology', 'Database Management'),
(4, 'Computer Science', 'Software Engineering');

-- Insert sample students
INSERT INTO `users` (`username`, `password`, `email`, `first_name`, `last_name`, `role`) VALUES
('jreyes', '$2y$10$8K1p/a0dR1xqM8K3qQZz3OQZz3OQZz3OQZz3OQZz3OQZz3OQZz3O', 'jreyes@student.dyci.edu.ph', 'John', 'Reyes', 'student'),
('asantos', '$2y$10$8K1p/a0dR1xqM8K3qQZz3OQZz3OQZz3OQZz3OQZz3OQZz3OQZz3O', 'asantos@student.dyci.edu.ph', 'Ana', 'Santos', 'student'),
('mflores', '$2y$10$8K1p/a0dR1xqM8K3qQZz3OQZz3OQZz3OQZz3OQZz3OQZz3OQZz3O', 'mflores@student.dyci.edu.ph', 'Miguel', 'Flores', 'student');

-- Insert sample courses
INSERT INTO `courses` (`course_code`, `course_name`, `description`, `units`) VALUES
('CS101', 'Introduction to Programming', 'Basic programming concepts and problem-solving', 3),
('IT201', 'Database Management Systems', 'Database design and implementation', 3),
('CS301', 'Web Development', 'Modern web development technologies', 3);

-- Insert professor course assignments
INSERT INTO `professor_courses` (`professor_id`, `course_id`, `academic_year`, `semester`) VALUES
(1, 1, '2023-2024', '1st'),
(2, 2, '2023-2024', '1st'),
(3, 3, '2023-2024', '1st');

-- Insert sample evaluation criteria
INSERT INTO `evaluation_criteria` (`category`, `description`, `max_score`) VALUES
('Teaching Effectiveness', 'Ability to explain concepts clearly and effectively', 5),
('Subject Matter Knowledge', 'Demonstrates comprehensive knowledge of the subject', 5),
('Classroom Management', 'Maintains good classroom discipline and organization', 5),
('Student Engagement', 'Encourages student participation and interaction', 5),
('Assessment Methods', 'Uses fair and effective assessment methods', 5); 