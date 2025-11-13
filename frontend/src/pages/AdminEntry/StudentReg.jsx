import React, {useEffect, useState} from 'react'
import SidebarHome from '../../elements/SidebarHome'
import styles from './css/StudentReg.module.css'
import axios from 'axios'
// import RemoveStudent from './RemoveStudent';

export default function StudentReg() {

  const [students, setStudents] = useState({
    fname: "",
    lname: "",
    email: "",
    rollNo: "",
    div: "",
    pass: ""
  });

  
  const handleChange = (e) => {
    setStudents((prev) => ({...prev, [e.target.name]: e.target.value}));
  }

  const handleSubmit = async (e) => {

    e.preventDefault();
    try{

      function randomPassword(length) {
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
        let password = "";

        for(let i = 0; i < 10; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          password = password + characters.charAt(randomIndex);
        }

        return password;
      }

      const randomPass = randomPassword(10);

      const studentDataToSend = { ...students, pass: randomPass };

      
      
      
      await axios.post("http://localhost:8080/api/students", studentDataToSend);
      setStudents({
        fname: "",
        lname: "",
        email: "",
        rollNo: "",
        div: "",
        pass: ""
      })
    }catch(err){
      console.log(err)
    }
  }


  return (
        <div className={styles.contain}>
          <SidebarHome />
          <div className={styles.content} style={{backgroundColor: 'whitesmoke' }}>
            
            <form className={styles.form} onSubmit={handleSubmit}>

            <div className={styles.title}>
              Student Registration
            </div>
            
            <div className={styles.formArea}>
                <label htmlFor="fname">First Name:</label>
                <input type="text" id="fname" name="fname" value={students.fname} onChange={handleChange} required />
            </div>


            <div className={styles.formArea}>
                <label htmlFor="lname">Last Name:</label>
                <input type="text" id="lname" name="lname" value={students.lname} onChange={handleChange} required />
            </div>


              <div className={styles.formArea}>
                <label htmlFor="email">Email: </label>
                <input type="email" id='email' name='email' value={students.email} onChange={handleChange} required />
              </div>
        
              <div className={styles.formArea}>
                <label htmlFor="div">Division: </label>
                <select id='div' name='div' value={students.div} required onChange={handleChange}>
                  <option value="" disabled>Select Division</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </select>
              </div>

              <div className={styles.formArea}>
                <label htmlFor="rollNo">Roll No:</label>
                <input type="text" id='rollNo' name='rollNo' value={students.rollNo} onChange={handleChange} required />
              </div>

              <button type='submit'>Submit</button>

            </form>

          </div>
        </div>
  )
}
