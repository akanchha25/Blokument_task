//this ia where we gonna store all of oue quesries that
//we are going to use against our database

const getStudents = "SELECT * FROM students";

const getStudentById = "SELECT * FROM students WHERE id = $1";

const checkEmailExists = "SELECT s FROM students s WHERE s.email = $1";

const addStudent = "INSERT INTO students (name, email, age, dob) VALUES ($1, $2, $3, $4)";

const deleteStudentById = "DELETE FROM students WHERE id = $1";

const updateStudents = "UPDATE students SET name = $1, email=$2 WHERE id = $3";


module.exports = {
    getStudents,
    getStudentById,
    checkEmailExists,
    addStudent,
    deleteStudentById,
    updateStudents
}