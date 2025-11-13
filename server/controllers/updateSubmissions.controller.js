import db from "../config/db.js";



export const fetchSubmissions = (req, res) => {
    const { subject_name, student_ids } = req.query;

    if (!subject_name || !student_ids) {
        return res.status(400).json({ error: 'subject_name and student_ids are required' });
    }

    const idsArray = student_ids.split(',').map(id => parseInt(id)).filter(Boolean);

    if (idsArray.length === 0) {
        return res.json([]);
    }

    const placeholders = idsArray.map(() => '?').join(',');

    const q = `
        SELECT student_id, subject_name, assignment, prelim, attendance
        FROM student_subject_status
        WHERE subject_name = ?
        AND student_id IN (${placeholders})
    `;

    db.query(q, [subject_name, ...idsArray], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(data);
    });
};




export const updateSubmissions = (req, res) => {
    let { student_id, subject_name, assignment, prelim, attendance } = req.body;

    assignment = assignment ? 1 : 0;
    prelim = prelim ? 1 : 0;
    attendance = attendance ? 1 : 0;

    const sql = `
        INSERT INTO student_subject_status (student_id, subject_name, assignment, prelim, attendance)
        VALUES (?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          assignment = VALUES(assignment),
          prelim = VALUES(prelim),
          attendance = VALUES(attendance)
    `;

    db.query(sql, [student_id, subject_name, assignment, prelim, attendance], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Database update failed" });
        }
        res.json({ success: true });
    });
};