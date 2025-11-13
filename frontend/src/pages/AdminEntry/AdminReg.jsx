import React, { useState } from 'react';
import SidebarHome from '../../elements/SidebarHome'
import styles from './css/AdminReg.module.css';
import axios from 'axios';

const AdminReg = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:8080/api/AdminReg', formData);
    alert(`Admin Registered\nUsername: ${formData.username}`);
  };



    return (
        <>
            <div className={styles.contain}>
                <SidebarHome />
                <div className={styles.content}>
                    <div className={styles.container}>
                    <h2 className={styles.title}>Admin Registration</h2>
                    <form onSubmit={handleSubmit} className={styles.adminRegForm}>
                        <label className={styles.label}>Username</label>
                        <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className={styles.input}
                        required
                        />
                
                        <label className={styles.label}>Password</label>
                        <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={styles.input}
                        required
                        />
                
                        <button type="submit" className={styles.button}>Register</button>
                    </form>
                    </div>
                </div>
            </div>
        </>
);
};

export default AdminReg;
