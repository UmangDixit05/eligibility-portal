import React, { useState, useEffect } from 'react'
import SidebarHome from '../../elements/SidebarHome'
import styles from './css/UpdateSubmissions.module.css'
import axios from 'axios';

export default function UpdateSubmissions() {

    const [students, setStudents] = useState([]);

    const [checkboxState, setCheckboxState] = useState({});

    const [values, setValues] = useState({
        division: "",
        semester: "",
        subject: ""
    });



    useEffect(() => {
        if (values.division && values.semester && values.subject) {
            fetchStudent(values.division);
        }
    }, [values.division, values.semester, values.subject]);

    
    const fetchStudent = async (studentClass) => {

        if(!values.division || !values.semester || !values.subject){
            alert("Enter all fields first");
        } else {
            try{
                const res = await axios.get("http://localhost:8080/api/students", {params: {div: studentClass}});
                const studentsData = res.data;
                setStudents(res.data);

                const statusRes = await axios.get("http://localhost:8080/api/updateSubmissions", {
                    params: {
                    subject_name: values.subject,
                    student_ids: studentsData.map(s => s.id).join(",") 
                    }
                });

                const initialCheckboxState = {};
                studentsData.forEach(student => {
                    const key = `${student.id}-${values.subject}`;
                    const status = statusRes.data.find(s => s.student_id === student.id);
                    initialCheckboxState[key] = {
                        assignment: status ? Boolean(status.assignment) : false,
                        prelim: status ? Boolean(status.prelim) : false,
                        attendance: status ? Boolean(status.attendance) : false,
                    };
                });

                setCheckboxState(initialCheckboxState);

              }catch(err){
                console.log(err);
              }
        }
    };



    const sortedStudents = [...students].sort((a,b) => a.roll_no - b.roll_no);
    

    const subjectsBySemester = {
        1: ['M1', 'CHEM', 'SME', 'BXE', 'PPS'],
        2: ['M2', 'Graphics', 'EM', 'BEE', 'PHY'],
        3: ['DM', 'FDS', 'CG', 'OOP', 'DELD'],
        4: ['M3', 'MP', 'DSA', 'SE', 'PPL'],
        5: ['SPOS', 'CN', 'TOC', 'DBMS', 'HCI']
    };

    const handleChange = (e) => {
        setValues((prev) => ({...prev, [e.target.name]: e.target.value}));
    }

    const handleCheckboxChange = (studentId, field) => async (e) => {
        if (!values.subject) return; 
      
        const key = `${studentId}-${values.subject}`;
      
        const updatedStatus = {
          ...checkboxState[key],
          [field]: e.target.checked
        };
      
        setCheckboxState(prev => ({
          ...prev,
          [key]: updatedStatus
        }));
      
        const updatedRecord = {
          student_id: studentId,
          subject_name: values.subject,
          ...updatedStatus
        };
      
        try {
          await axios.post("http://localhost:8080/api/updateSubmissions", updatedRecord);
        } catch (err) {
          console.error("Failed to update checkbox:", err);
          alert("Error updating checkbox for student ID " + studentId);
        }
      };

  return (
    <>
        <div className={styles.contain}>
            <SidebarHome />
            <div className={styles.content}>
                <form className={styles.form1}>
                <div className={styles.divisionArea}>
                    <label htmlFor="division">Select Division:</label>
                    <select name="division" onChange={handleChange}>
                        <option value="">Select Division</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                    </select>
                </div>

                <div className={styles.SemAndSub}>

                    <label htmlFor="semester">Semester:</label>
                    <select name="semester" onChange={handleChange}>
                        <option value="">Select Semester</option>
                        {Object.keys(subjectsBySemester).map((sem) => (
                            <option key={sem} value={sem}>
                                {sem}
                            </option>
                        ))}                    
                    </select>


                    <div className={styles.subjectArea}>
                        <label htmlFor="subject">Subject:</label>
                        <div className={`${styles.disabledWrapper} ${!values.semester || !values.division ?styles.disabledWrapperActive : ''}`}>
                        <select 
                            name="subject" 
                            onChange={handleChange} 
                            disabled={!values.semester}
                            className={!values.semester || !values.division ? styles.disabledSelect : ""}
                        >
                            <option value="">Select Subject</option>
                            {(subjectsBySemester[values.semester] || []).map((sub) => (
                                <option key={sub} value={sub}>
                                    {sub}
                                </option>
                            ))}
                        </select>
                        </div>
                    </div>


                    
                </div>
                </form>

                <hr />

            <form className={styles.form2}>
                <table>
                    <thead>
                        <tr>
                            <th>Roll No</th>
                            <th>Student Name</th>
                            <th>Assignment</th>
                            <th>Prelim</th>
                            <th>Attendance</th>
                        </tr>
                    </thead>
                    {values.semester && values.subject && values.division && (
                        <tbody>
                            {sortedStudents.map((student) => (
                                <tr key={student.id}>
                                    <td>{student.roll_no}</td>
                                    <td>{student.f_name} {student.l_name}</td>
                                    <td>{
                                            <input 
                                            className={styles.checkbox} 
                                            type="checkbox"
                                            checked={checkboxState[`${student.id}-${values.subject}`]?.assignment || false}
                                            onChange={handleCheckboxChange(student.id, "assignment")}
                                            name='assignment' />
                                        }
                                    </td>
                                    <td>{
                                            <input
                                            className={styles.checkbox} 
                                            type="checkbox" 
                                            checked={checkboxState[`${student.id}-${values.subject}`]?.prelim || false}
                                            onChange={handleCheckboxChange(student.id, "prelim")}
                                            name='prelim'
                                            />
                                        }
                                    </td>
                                    <td>
                                        {
                                            <input 
                                            className={styles.checkbox} 
                                            type="checkbox"
                                            checked={checkboxState[`${student.id}-${values.subject}`]?.attendance || false}
                                            onChange={handleCheckboxChange(student.id, "attendance")}
                                            name='attendance'
                                            />
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>

            </form>
            </div>
        </div>
        
    </>
  )
}
