const pool = require("../config/database");
const createStudent = async (req, res) => { try { const { student_id, first_name, last_name, email, phone, gender, date_of_birth, department, course, level } = req.body;
    if (!student_id || !first_name || !last_name || !email) {
        return res.status(400).json({
            message: "Student ID, first name, last name and email are required."
        });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({
            message: "Please provide a valid email address."
        });
    }

    const query = `
        INSERT INTO students (
            student_id, first_name, last_name, email,
            phone, gender, date_of_birth, department, course, level
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        student_id,
        first_name,
        last_name,
        email,
        phone || null,
        gender || null,
        date_of_birth || null,
        department || null,
        course || null,
        level || null
    ];

    const [result] = await pool.execute(query, values);

    res.status(201).json({
        message: "Student created successfully.",
        student_id: result.insertId
    });

} catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
        return res.status(409).json({
            message: "A student with this student ID or email already exists."
        });
    }

    console.error("Create student error:", error.message);

    res.status(500).json({
        message: "Internal server error."
    });
}
};
const getStudents = async (req, res) => { try { const [students] = await pool.execute( "SELECT * FROM students ORDER BY created_at DESC" );
    res.status(200).json({
        count: students.length,
        students
    });

} catch (error) {
    console.error("Get students error:", error.message);

    res.status(500).json({
        message: "Internal server error."
    });
}
};
const getStudentById = async (req, res) => { try { const { id } = req.params;
    if (!Number.isInteger(Number(id)) || Number(id) < 1) {
        return res.status(400).json({
            message: "Please provide a valid student ID."
        });
    }

    const [students] = await pool.execute(
        "SELECT * FROM students WHERE id = ?",
        [id]
    );

    if (students.length === 0) {
        return res.status(404).json({
            message: "Student not found."
        });
    }

    res.status(200).json({
        student: students[0]
    });

} catch (error) {
    console.error("Get student error:", error.message);

    res.status(500).json({
        message: "Internal server error."
    });
}
};
const updateStudent = async (req, res) => { try { const { id } = req.params;
    if (!Number.isInteger(Number(id)) || Number(id) < 1) {
        return res.status(400).json({
            message: "Please provide a valid student ID."
        });
    }

    const allowedFields = [
        "student_id",
        "first_name",
        "last_name",
        "email",
        "phone",
        "gender",
        "date_of_birth",
        "department",
        "course",
        "level"
    ];

    const updates = Object.keys(req.body).filter(
        field => allowedFields.includes(field)
    );

    if (updates.length === 0) {
        return res.status(400).json({
            message: "Please provide at least one valid field to update."
        });
    }

    if (
        req.body.email !== undefined &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email)
    ) {
        return res.status(400).json({
            message: "Please provide a valid email address."
        });
    }

    const setClause = updates
        .map(field => `${field} = ?`)
        .join(", ");

    const values = updates.map(field => req.body[field]);

    const query = `
        UPDATE students
        SET ${setClause}
        WHERE id = ?
    `;

    values.push(id);

    const [result] = await pool.execute(query, values);

    if (result.affectedRows === 0) {
        return res.status(404).json({
            message: "Student not found."
        });
    }

    res.status(200).json({
        message: "Student updated successfully."
    });

} catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
        return res.status(409).json({
            message: "A student with this student ID or email already exists."
        });
    }

    console.error("Update student error:", error.message);

    res.status(500).json({
        message: "Internal server error."
    });
}
};
const deleteStudent = async (req, res) => { try { const { id } = req.params;
    if (!Number.isInteger(Number(id)) || Number(id) < 1) {
        return res.status(400).json({
            message: "Please provide a valid student ID."
        });
    }

    const [result] = await pool.execute(
        "DELETE FROM students WHERE id = ?",
        [id]
    );

    if (result.affectedRows === 0) {
        return res.status(404).json({
            message: "Student not found."
        });
    }

    res.status(200).json({
        message: "Student deleted successfully."
    });

} catch (error) {
    console.error("Delete student error:", error.message);

    res.status(500).json({
        message: "Internal server error."
    });
}
};
module.exports = { createStudent,getStudents, getStudentById, updateStudent, deleteStudent};