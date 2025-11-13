import db from '../config/db.js';

export const displayStatus = (req, res) => {
    const {semester, student_id} = req.query;

    const subjectsBySemester = {
        1: ['M1', 'CHEM', 'SME', 'BXE', 'PPS'],
        2: ['M2', 'Graphics', 'EM', 'BEE', 'PHY'],
        3: ['DM', 'FDS', 'CG', 'OOP', 'DELD'],
        4: ['M3', 'MP', 'DSA', 'SE', 'PPL'],
        5: ['SPOS', 'CN', 'TOC', 'DBMS', 'HCI'],
      };

    const subjects = subjectsBySemester[Number(semester)];

    if (!subjects) {
        return res.status(400).json({ error: "Invalid or missing semester" });
    }

    const placeholders = subjects.map(() => '?').join(', ');

    const q =   `SELECT subject_name, assignment, prelim, attendance 
                FROM student_subject_status
                WHERE student_id = ? AND subject_name IN (${placeholders})`;

    db.query(q, [student_id, ...subjects], (err, data) => {
        if (err){
            console.error('Database error:', err);
            return res.status(500).json({ error: "Database query failed" });
        }
        res.json(data);
    });
};


export const getStudentData = (req, res) => {
    const id = req.query.studentId;

    const q = 'SELECT `div`, `roll_no`, `f_name`, `l_name` FROM students WHERE id = ?';

    db.query(q, [id], (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Internal Server Error" });
        } 
        return res.json(data[0]);
    });
};