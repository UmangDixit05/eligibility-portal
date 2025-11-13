import React, { useEffect, useState, useRef } from 'react'
import styles from "./css/DisplayStatus.module.css"
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import UserMenu from '../../elements/userMenu';

export default function DisplayStatus() {


  const token = sessionStorage.getItem("authToken");
  const user = jwtDecode(token);

  const [studentData, setStudentData] = useState({});

  const navigate = useNavigate();
  const [semester, setSemester] = useState("");

  const [statusData, setStatusData] = useState([]);
  const { studentId } = useParams();

  const subjectsBySemester = {
    1: ['M1', 'CHEM', 'SME', 'BXE', 'PPS'],
    2: ['M2', 'Graphics', 'EM', 'BEE', 'PHY'],
    3: ['DM', 'FDS', 'CG', 'OOP', 'DELD'],
    4: ['M3', 'MP', 'DSA', 'SE', 'PPL'],
    5: ['SPOS', 'CN', 'TOC', 'DBMS', 'HCI']
  };

  const handleLogout = (e) => {
    e.preventDefault();
    sessionStorage.removeItem("authToken");
    navigate("/Login")
  }

  useEffect(() => {
    const getStudentData = async () => {
      try{
        const response = await axios.get('http://localhost:8080/api/displayStudentData', {
        params: { studentId }
        });
        setStudentData(response.data);
      } catch (err) {
        console.log(err);
      };
  
    };
  
    if (studentId) {
      getStudentData();
    };
  }, [studentId]);

  const navbar = ( user, studentData ) => {
    let content; 
    


    if (user.userRole === 'admin') {
      const profileData = (
        <pre>Id: {user.id}</pre>
      )
      content = (
        <div className={styles.adminNav}>
          <div className={styles.returnElements}>
            <Link to='/'>Home</Link>
            <Link to='/StudentStatus'>Student Status</Link>
          </div>
          <div className={styles.userMenu}>
            <UserMenu userName="admin" userData={profileData} onLogout={handleLogout} />
          </div>
        </div>
      )
    }else if (user.userRole === 'student') {
      const profileData = (
        <>
          <pre>Id: {studentId}</pre>
          <pre>Name: {studentData.f_name} {studentData.lname}</pre>
          <pre>Roll No: {studentData.roll_no}</pre>
        </>
      )
      content = (
        <div className={styles.header}>
          <div>
            <Link to="">Feedback</Link>
          </div>
          <div className={styles.userMenu}>
            <UserMenu userName="student" userData={profileData} onLogout={handleLogout} />
          </div>
        </div>
      )
    };

    return content;
  };

  

  
  const handleChange = async (e) => {
    const selectedSem = e.target.value;
    setSemester(selectedSem);

    if(selectedSem) {
      try{
        const res = await axios.get("http://localhost:8080/api/displayStatus", {
          params: {
            semester: selectedSem,
            student_id: studentId
          }
        });
        setStatusData(res.data);
      } catch(err) {
        console.log("Error fetching data", err);
      }
    }
  };

  const getStatusIcon = (value) => (Number(value) ? '✅' : '❌');

  const getSubjectData = (subject) => {
    return statusData.find((item) => item.subject_name === subject) || {};
  }

  return (
    <>

    {navbar(user, studentData)}
    
    
    
    <form className={styles.formDisplay}>
      
      <label className={styles.labelDisplay} htmlFor="semester">Semester:</label>
        <select className={styles.selectDisplay} name="semester" onChange={handleChange}>
          <option value="">Select Semester</option>
            {Object.keys(subjectsBySemester).map((sem) => (
              <option key={sem} value={sem}>
                {sem}
              </option>
            ))}                    
        </select>
    </form>

    {semester && (
      <div className="mt-3">

        <table className={styles.studentDisplayTable}>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Assignment</th>
              <th>Prelim</th>
              <th>Attendance</th>
            </tr>
          </thead>
          <tbody>
            {subjectsBySemester[semester].map((sub) => {
              const data = getSubjectData(sub);

              if(!data.subject_name) {
                return (
                  <tr key={sub}>
                    <td>{(sub)}</td>
                    <td>❌</td>
                    <td>❌</td>
                    <td>❌</td>
                  </tr>
                )
              }

              return(
                <tr key={sub}>
                  <td>{sub}</td>
                  <td>{getStatusIcon(data.assignment)}</td>
                  <td>{getStatusIcon(data.prelim)}</td>
                  <td>{getStatusIcon(data.attendance)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>

      </div>
    )
    }

    
    </>

  )
}
