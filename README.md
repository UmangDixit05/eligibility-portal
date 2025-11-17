Overview:- 

This project is a full-stack web application designed to help institutions track student eligibility for final examinations. The system evaluates eligibility based on key academic criteria such as assignment completion, prelim exam performance, and attendance records.

It features a dedicated admin dashboard that allows administrators to view, update, and manage each student’s subject wise eligibility status with ease. To ensure secure access, the application uses role-based authentication powered by JWT, providing separate permissions for admins and students.

On the backend, the application includes structured REST APIs and a well-designed MySQL database schema to process and store eligibility data in real time. The frontend delivers a clean and responsive interface built using modern UI components.

Installation:-

Clone the Repository:
git clone https://github.com/UmangDixit05/eligibility-portal.git

Navigate to backend:
cd backend

Install Dependency:
npm install

Configure Environment Variables: Create a .env file
PORT=your_port_no
DB_HOST=your_mysql_host
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name
JWT_SECRET=your_secret_key
MAIL_PASS=your_mail_password(not the email password generate a password on mail for that)
MAIL_USER=your_email


Create all Mysql tables:-


CREATE TABLE `admins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `admin_name` varchar(50) DEFAULT NULL,
  `pass` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
)

CREATE TABLE `student_subject_status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_id` int DEFAULT NULL,
  `subject_name` varchar(20) DEFAULT NULL,
  `attendance` tinyint(1) DEFAULT '0',
  `prelim` tinyint(1) DEFAULT '0',
  `assignment` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_student_subject` (`student_id`,`subject_name`),
  KEY `subject_name` (`subject_name`),
  CONSTRAINT `student_subject_status_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`),
  CONSTRAINT `student_subject_status_ibfk_2` FOREIGN KEY (`subject_name`) REFERENCES `subjects` (`subject_name`)
)

CREATE TABLE `subjects` (
  `subject_name` varchar(15) NOT NULL,
  `semester_id` int DEFAULT NULL,
  PRIMARY KEY (`subject_name`),
  KEY `semester_id` (`semester_id`),
  CONSTRAINT `subjects_ibfk_1` FOREIGN KEY (`semester_id`) REFERENCES `semesters` (`semester_id`)
)

CREATE TABLE `semesters` (
  `semester_id` int NOT NULL,
  `semester_name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`semester_id`)
)

CREATE TABLE `students` (
  `id` int NOT NULL AUTO_INCREMENT,
  `f_name` varchar(45) NOT NULL,
  `l_name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `roll_no` int NOT NULL,
  `div` varchar(45) NOT NULL,
  `pass` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
)

Start Backend Server :-
npm start


Navigate to frontend folder:-
cd ..
cd frontend

Install Dependencies
npm install

Start Frontend Application:-
npm run dev



Technologies Used:-

Frontend: React, JavaScript, Bootstrap
Backend: Node.js, Express
Database: MySQL
Authentication: JWT (role-based)

