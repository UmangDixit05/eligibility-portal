import React, {  useState, useEffect } from 'react'
import SidebarHome from '../../elements/SidebarHome'
import styles from './css/StudentStatus.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function StudentStatus() {

  const [students, setStudents] = useState([]);
  const [division, setDivision] = useState("");

  useEffect(() => {
    fetchStudent("A").then(() => handleDivision("A"));
  }, []);
  

  const handleDelete = async (studentId) => {

    try{
      const confirmed = window.confirm('Are you sure you want to delete this student profile? ');
  
      if ( confirmed ) {
        const res = await axios.delete(`http://localhost:8080/api/students/${studentId}`);
        setStudents((prev) => prev.filter((student) => student.id !== studentId));
        alert(res.data.message);
      };
    } catch (err) {
      console.log(err);
    }

  }

  
    const fetchStudent = async (studentClass) => {
      try{
        const res = await axios.get("http://localhost:8080/api/students", {params: {div: studentClass}});
        setStudents(res.data);
      }catch(err){
        console.log(err);
      }
    };

    const handleDivision = (division) => { 
      setDivision(`Division: ${division}`);
    }
  

  const sortedStudents = [...students].sort((a, b) => a.roll_no - b.roll_no);

  return (
    <>
        <div className={styles.contain}>
          <SidebarHome />
          <div className={styles.content}>
            <div className={styles.navbar}>
              <div className={styles.navbarElements}>
                <button onClick={() => {
                  fetchStudent("A").then(() => handleDivision("A"))
                }}>Div-A</button>

                <button onClick={() => {
                  fetchStudent("B").then(() => handleDivision("B"))
                }}>Div-B</button>
                <button onClick={() => {
                  fetchStudent("C").then(() => handleDivision("C"))
                }}>Div-C</button>
                <button onClick={() => {
                  fetchStudent("D").then(() => handleDivision("D"))
                }}>Div-D</button>
              </div>
            </div>
            <h2>{division}</h2>

            <div className={styles.students}>
              <table className={styles.studentTable}>
                <thead>
                  <tr>
                    <th>Roll No.</th>
                    <th>Student Name</th>
                    <th>Status</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedStudents.map((student) => (
                    <tr key={student.id}>
                      <td className={styles.rollNo}>{student.roll_no}</td>
                      <td className={styles.studentName}>
                        {student.f_name} {student.l_name}
                      </td>
                      <td>
                        <Link to={`/DisplayStatus/${student.id}`}>
                          <button type="button" id={styles.button1}>Check Status</button>
                        </Link>
                      </td>
                      <td>
                        <button type="button" id={styles.button2} onClick={() => handleDelete(student.id)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 640 640"
                            className={styles.deleteIcon}
                            fill="whitesmoke"
                            width="24"
                            height="24"
                          >
                            <path d="M232.7 69.9C237.1 56.8 249.3 48 263.1 48L377 48C390.8 48 403 56.8 407.4 69.9L416 96L512 96C529.7 96 544 110.3 544 128C544 145.7 529.7 160 512 160L128 160C110.3 160 96 145.7 96 128C96 110.3 110.3 96 128 96L224 96L232.7 69.9zM128 208L512 208L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 208zM216 272C202.7 272 192 282.7 192 296L192 488C192 501.3 202.7 512 216 512C229.3 512 240 501.3 240 488L240 296C240 282.7 229.3 272 216 272zM320 272C306.7 272 296 282.7 296 296L296 488C296 501.3 306.7 512 320 512C333.3 512 344 501.3 344 488L344 296C344 282.7 333.3 272 320 272zM424 272C410.7 272 400 282.7 400 296L400 488C400 501.3 410.7 512 424 512C437.3 512 448 501.3 448 488L448 296C448 282.7 437.3 272 424 272z"  /> 
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>






            
          </div>
        </div>
        
    </>
  )
}
