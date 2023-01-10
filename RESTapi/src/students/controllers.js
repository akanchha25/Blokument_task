//store the business related to each routes
const pool = require('../../db');
const queries = require('./queries');

const getStudents = (req, res) =>{
    pool.query(queries.getStudents, (error,results) =>{

        
        if (error) throw error;
        res.status(200).json(results.rows);



    });
};

const getStudentById = (req,res) =>{
    const id = parseInt(req.params.id )
    pool.query(queries.getStudentById, [id], (error,results) =>{
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};

const addStudent = (req, res) =>{
    const {name, email, age, dob }= req.body;        //req.body is an object and its key values are name,email.....
    
    //check if email already exits in databse or not
    pool.query(queries.checkEmailExists, [email], (error, results) =>{
        if(results.rows.length){
            res.send("Email already exists.");
        }

        //add student to db
        pool.query(queries.addStudent,[name, email, age, dob],(error, results) =>{
            if(error) throw error;
            res.status(201).send("Student added to the database successfully");
            
        })
    });


};

const deleteStudentById =(req, res) =>{
    const id = parseInt(req.params.id );
    pool.query(queries.getStudentById, [id], (error,results) =>{
        const noStudentFound = !results.rows.length;
        if (noStudentFound) {
            res.send("Student does not exits in the database");
        }

        pool.query(queries.deleteStudentById, [id], (error, results) =>{
            if(error) throw error;
            res.status(200).send("Student removed successfully");
        })
    });



}

const updateStudents = (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;
    pool.query(queries.getStudentById, [id], (error, results) => {
      const noStudentFound = !results.rows.length;
      if (noStudentFound) {
        res.send("Student does't exist in the database");
      }
      pool.query(queries.updateStudents, [name, email, id], (error, results) => {
        if (error) throw error;
        res.status(200).send("Student updated Successfully!");
      });
    });
  };
  
  
  
  
  
  
  




module.exports = {
    getStudents, 
    getStudentById,
    addStudent,
    deleteStudentById,
    updateStudents
    
};