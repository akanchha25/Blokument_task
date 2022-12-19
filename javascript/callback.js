const students = [
  { name: "robin", subject: "JavaScript" },
  { name: "Rohan", subject: "Machine Learning" },
];

function enrollStudent(student, callback) {
  setTimeout(function () {
    students.push(student);
    console.log("Student has been enrolled");
    callback();
  }, 1000);
}

function getStudents() {
  setTimeout(function () {
    console.log("We get the student");
  });
}

let newStudent = {
  // an object
  name: "John", // by key "name" store value "John"
  subject: "Python",
};

enrollStudent(newStudent, getStudents);
