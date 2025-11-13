import db from '../config/db.js';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import { config } from '../config/config.js';

export const getStudentsByDivision = (req, res) => {
    const div = req.query.div;

    const q = "SELECT * FROM students WHERE `div` = ?";

    db.query(q, div, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
};

export const createStudent = async (req, res) => {
    const { fname, lname, email, rollNo, div, pass } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(pass, 10);

      const values = [
          fname,
          lname,
          email,
          rollNo,
          div,
          hashedPassword
      ]

      const q = "INSERT INTO students (`f_name`, `l_name`, `email`, `roll_no`, `div`, `pass`) VALUES (?)";

      db.query(q, [values], (err, data) => {
          if (err){
            console.log(err);
            return res.status(500).json({ error: "Database insertion failed" });
          } 

          const studentId = data.insertId;

          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: config.mailAuth.mail,
              pass: config.mailAuth.pass
            }
          });

          const mailOptions = {
            from: config.mailAuth.mail,
            to: email,
            subject: 'Student Registration Details',
              text: `Hello ${fname},

Your registration was successful!

UserName: ${studentId}
Temporary Password: ${pass}

Please log in and change your password as soon as possible.

Best regards,
Student Management Team`
};
        
          transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
              console.error("Email sending error:", err);
              return res.status(201).json({
                message: "Student added but failed to send email",
                studentId,
                emailError: err.message
              });
            } else {
              console.log('Email sent: ' + info.response);
              return res.status(201).json({ message: "Student added and email sent", studentId });
            } 
          });
        });  
    } catch (error) {
      console.log("Internal Server Error", error);
      return res.status(500).json({ error: "Internal Server Error "});
    }

};


export const deleteStudent = (req, res) => {
    const id = parseInt(req.params.studentId);
  
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid student ID" });
    }
  
    const deleteStatusQuery = "DELETE FROM student_subject_status WHERE student_id = ?";
    const deleteStudentQuery = "DELETE FROM students WHERE id = ?";
  
    db.query(deleteStatusQuery, [id], (err, result) => {
      if (err) {
        console.error("Error deleting student status records:", err);
        return res.status(500).json({ message: "Internal server error" });
      }
  
      db.query(deleteStudentQuery, [id], (err, result) => {
        if (err) {
          console.error("Error deleting student:", err);
          return res.status(500).json({ message: "Internal server error" });
        }
  
        if (result.affectedRows === 0) {
          return res.status(404).json({ message: "Student not found" });
        }
  
        return res.json({ message: "Student was removed" });
      });
    });
  };
  
  