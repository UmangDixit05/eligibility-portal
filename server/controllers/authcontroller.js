import db from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config/config.js'

export const AdminReg = async (req, res) => {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const values = [username, hashedPassword];


    const q = "INSERT INTO admins(`admin_name`, `pass`) VALUES (?)";

    db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json({ message:"Internal Server Error" });
        return res.status(201).json({ message:"Admin has been added successfully" });
    });
};


export const loginUser = (req, res) => {
    const { username, password, role } = req.body;
    
    const userID = Number(username);
    if (isNaN(userID)) {
        return res.status(401).json({ message: "Invalid user ID" });
    }
 
  
    let q = "";
    if (role === "student") {
      q = "SELECT * FROM students WHERE id = ?";
    } else if (role === "admin") {
      q = "SELECT * FROM admins WHERE id = ?";
    } else {
      return res.status(401).json({ message: "Invalid role" });
    }

    

  
    db.query(q, [userID], (err, rows) => {
      if (err) {
        return res.status(500).json({ message: "Internal Server Error" });
      }    
  
      if (rows.length === 0) {
        return res.status(404).json({ message: "Username or Password in Invalid" });
      }
  
      const user = rows[0];

  
      bcrypt.compare(password, user.pass, (err, isMatch) => {
        if (err) {
          return res.status(500).json({ message: "Internal Server Error" });
        }
  
        if (!isMatch) {
          return res.status(401).json({ message: "Username or password is invalid" });
        }

  
        const token = jwt.sign(
          { id: user.id, userRole: role },
          config.jwtSecret,
          { expiresIn: "1h" }
        );
  
        res.status(200).json({ token });
      });
    });
}