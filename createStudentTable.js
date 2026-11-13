const pool = require("./config/database");
const createStudentsTable = async () => { try { const query = `CREATE TABLE IF NOT EXISTS students ( id INT AUTO_INCREMENT PRIMARY KEY, student_id VARCHAR(50) NOT NULL UNIQUE, first_name VARCHAR(100) NOT NULL, last_name VARCHAR(100) NOT NULL, email VARCHAR(150) NOT NULL UNIQUE, phone VARCHAR(20), gender VARCHAR(20), date_of_birth DATE, department VARCHAR(100), course VARCHAR(100), level VARCHAR(50), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP )`;
    await pool.execute(query);

    console.log("Students table created successfully!");

} catch (error) {
    console.error("Error creating students table:", error.message);

} finally {
    await pool.end();
}
};
createStudentsTable();