import db from "../config/db.js";

export const getStudent = (req, res) => {
    const div = req.query.div;
    const roll_no = parseInt(req.query.roll_no);

    let q;
    let params;

    if (div && roll_no) {
        q = "SELECT * FROM students WHERE `div` = ? AND `roll_no` = ?";
        params = [div, roll_no];
    } else {
        return res.json({message: "First Select both division and roll No"});
    } 


    db.query(q, params, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
};

export const updateStudent = (req, res) => {
    const div = req.query.div;
    const roll_no = Number(req.query.roll_no);

    const params = [div, roll_no];

    const q = "UPDATE students SET `f_name` = ?, `l_name` = ?, `email` = ?, `roll_no` = ?, `div` = ? WHERE `div` = ? AND `roll_no` = ?";

    const values = [
        req.body.fname,
        req.body.lname,
        req.body.email,
        req.body.rollNo,
        req.body.division
    ];

    db.query(q, [...values, ...params], (err, data) => {
        if (err) return res.json(err);
        if (data.affectedRows === 0) return res.json({ message: "No student found to update" });
        return res.json("Student updated successfully");
    });
}