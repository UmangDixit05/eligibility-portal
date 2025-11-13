import React, { useState } from 'react'
import SidebarHome from '../../elements/SidebarHome'
import styles from './css/UpdateStudent.module.css'
import axios from 'axios'

export default function UpdateStudent() {

  const [students, setStudents] = useState([])
  const [values, setValues] = useState({
    div: "",
    roll_no: ""
  })
  const [formValues, setFormValues] = useState({
    fname: "",
    lname: "",
    email: "",
    division: "",
    rollNo: ""
  })
  const [showForm, setShowForm] = useState(false)

  const sortedStudents = [...students].sort((a, b) => a.roll_no - b.roll_no)

  const fetchRollNo = async (studentClass) => {
    try {
      const res = await axios.get("http://localhost:8080/api/students", { params: { div: studentClass } })
      setStudents(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const getStudentDetails = async (values) => {
    if (!values.div || !values.roll_no) {
      alert("Please select both Division and Roll No")
      return
    }

    try {
      const res = await axios.get("http://localhost:8080/api/studentsUpdate", {
        params: {
          div: values.div,
          roll_no: values.roll_no
        }
      })

      if (res.data.message) {
        alert(res.data.message)
        setShowForm(false)
        setFormValues({
          fname: "",
          lname: "",
          email: "",
          division: "",
          rollNo: ""
        })
      } else {
        const student = res.data[0]
        setFormValues({
          fname: student.f_name,
          lname: student.l_name,
          email: student.email,
          division: student.div,
          rollNo: student.roll_no
        })
        setShowForm(true)
      }

    } catch (err) {
      console.log("Error:", err)
    }
  }

  const updateStudent = async (values) => {
    if (!formValues.division || !formValues.rollNo || !formValues.email || !formValues.fname || !formValues.lname) {
      alert("Please enter all fields")
      return
    }

    try {
      const res = await axios.put("http://localhost:8080/api/studentsUpdate", formValues, {
        params: {
          div: values.div,
          roll_no: values.roll_no
        }
      })

      alert(res.data)

      setFormValues({
        fname: "",
        lname: "",
        email: "",
        division: "",
        rollNo: ""
      })
      setValues({ div: "", roll_no: "" })
      setStudents([])
      setShowForm(false)

    } catch (err) {
      console.log(err)
    }
  }

  const handleChange = (e) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div className={styles.contain}>
      <SidebarHome />
      <div className={styles.content}>

        <form className={styles.form1}>
          <label htmlFor="division">Enter Division</label>
          <select
            id='division'
            name='div'
            value={values.div}
            required
            onChange={async (e) => {
              const selectedDiv = e.target.value
              setValues({ div: selectedDiv, roll_no: "" })
              await fetchRollNo(selectedDiv)
              setFormValues({
                fname: "",
                lname: "",
                email: "",
                division: "",
                rollNo: ""
              })
              setShowForm(false)
            }}
          >
            <option value="" disabled>Select division</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>

          <label htmlFor="roll_no">Enter Roll No.</label>
          <select
            id='roll_no'
            name='roll_no'
            value={values.roll_no}
            required
            onChange={(e) => setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
          >
            <option value="" disabled>Select Roll No</option>
            {sortedStudents.map((student) => (
              <option key={student.id} value={student.roll_no}>
                {student.roll_no}
              </option>
            ))}
          </select>

          <div className={styles.fetchWrapper}>
            <button type="button" className={styles.fetch} onClick={() => getStudentDetails(values)}>Fetch</button>
          </div>
          
        </form>

        <hr />

        {showForm && (
          <form className={styles.form2}>
            <div className={styles.formArea}>
              <label htmlFor="fname">First name:</label>
              <input
                type="text"
                id="fname"
                name="fname"
                value={formValues.fname}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formArea}>
              <label htmlFor="lname">Last name:</label>
              <input
                type="text"
                id="lname"
                name="lname"
                value={formValues.lname}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formArea}>
              <label htmlFor="email">Email: </label>
              <input
                type="email"
                id='email'
                name='email'
                value={formValues.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formArea}>
              <label htmlFor="div">Division: </label>
              <select
                id='div'
                name='division'
                value={formValues.division}
                required
                onChange={handleChange}
              >
                <option value="" disabled>Select Division</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>

            <div className={styles.formArea}>
              <label htmlFor="rollNo">Roll No:</label>
              <input
                type="text"
                id='rollNo'
                name='rollNo'
                value={formValues.rollNo}
                onChange={handleChange}
                required
              />
            </div>

            <button type='button' onClick={() => updateStudent(values)}>Update</button>
          </form>
        )}

      </div>
    </div>
  )
}
