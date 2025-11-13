import React, { useState } from 'react';
import styles from './css/Login.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {

  const [user, setUser] = useState({
    role: "admin",
    username: "",
    password: ""
  });

  const formChange = (e) => {
    setUser((prev) => ({...prev, [e.target.name]: e.target.value}))
  }

  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();  

    try {
      const response = await axios.post('http://localhost:8080/api/login', user);
      const token = response.data.token;
      sessionStorage.setItem("authToken",token);

      if(user.role === 'student'){
        navigate(`/DisplayStatus/${user.username}`);
      }
      else if(user.role === 'admin'){
        navigate('/');
      }
      
    } catch (error) {
      console.log(error);
      alert(`${error.response.data.message}`);
    }
    

  }


    return (
        <div className={styles.loginWrapper}>
            <h2 className={styles.heading}>Login</h2>

            <div className={`${styles.roleToggle} role-toggle`}>
                <input 
                type="radio" 
                name="role" 
                id="admin" 
                onClick={() => setUser((prev) => ({...prev, role: "admin"}))}
                defaultChecked />
                <label htmlFor="admin" className="role-label">Admin</label>

                <input
                type="radio" 
                name="role" 
                onClick={() => setUser((prev) => ({...prev, role: "student"}))}
                id="student" />
                <label htmlFor="student" className="role-label">Student</label>

                <div className="slider"></div>
            </div>

            <div className="form-container">
                <form onSubmit={handleSubmit} className={styles.loginForm}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="username">Username</label>
                        <input onChange={formChange} type="text" id="username" name="username" required />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="password">Password</label>
                        <input onChange={formChange} type="password" id="password" name="password" required />
                    </div>
                    <button type="submit" className={styles.submitButton}>Login</button>
                </form>

                <div className="role-message admin-msg">
                    Welcome, Admin! Please log in.
                </div>
                <div className="role-message student-msg">
                    Welcome, Student! Please log in.
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
