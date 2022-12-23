const env = require("dotenv");
env.config();
const connection = require('../model/db');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    
        const salt = bcrypt.genSaltSync(12);

        const { name,email,age,password } = req.body;

        if(!name || !email || !age || !password ){
            return res.status(422).json({ error: "Details are incomplete"});
        }

        const password2 = bcrypt.hashSync(password,salt);
        try {

        const userExist = `SELECT email FROM user_details WHERE email = '${email}'`

        const find = await connection.query(userExist)

        if(find.rows.length){
            res.status(422).json({error: "Email already exists. "});
        }

        const query = `INSERT INTO users(name,email,age,password)  VALUES('${name}','${email}',${age},'${password2}')`

        const resp = await connection.query(query)

        res.status(202).json({message: "User registered successfully"});

       // connection.module.pool.end;

        } catch(err){
            console.log(err);
        }
    
};

const login = async (req, res) =>{
      try{
    const { email , password }=req.body;

    if( !email || !password ){
        return res.status(400).json({ error: "Invalid Details"});
    }
    var salt = bcrypt.genSaltSync(12);
     
    const hash = bcrypt.hashSync(password, salt);
       console.log(hash);

       const userLogin = `SELECT email, password, ID FROM user_details WHERE email = '${email}'`
             
       const getUser = await connection.query(userLogin);
       
      // res.json({message: "user Logged in successfully"});
       const user_id = getUser.rows[0].ID;

       if(!getUser.rows.length){
        res.status(400).json({error : "user not found"});
       }

       const ismatch = await bcrypt.compare(password,getUser.row[0].password);

       if(ismatch === false){
        return res.json({message: "Invalid credentials"});
       }

       else {
        console.log("user Logged in successfully");

        //we are generating token

        const token = jwt.sign({user_id},process.env.JWT_SECRET_KEY,{expiresIn: process.env.EXPIRE_TILL});
        res.status(200).send({token})
       }

      // connection.module.pool.end;
       



    } catch(err){
        console.log(err);
    }

}
exports.varifyToken= async (req,res,next) =>{
    try{
    const bearerHeader = req.headers['authorization'];
    if( typeof bearerHeader !== 'undefined'){
       const bearer = bearerHeader.split(" ");
       var token = bearer[1];
      
    }
    const decode = jwt.verify(token,process.env.JWT_SECRET_KEY)
    req.token = decode;
    next();

}
    catch(err){
        res.send({
            result: 'TOKEN IS NOT DEFINED'
        })
    }
            
}
const mydetail = async (req, res) => {
    const id = parseInt(req.params.id );
    pool.queries(queries.mydetail,[id],(error,results) =>{    //mydetail is query from queries.js file (const mydetail = "SELECT address_details.ID, address, city, state, pincode FROM user_details Right JOIN address_details ON address_details.ID = user_details.ID WHERE user_details.ID = $1;


        const Info = results.rows.length;

        if(!Info){
            throw ("NO address found.")
        }
        res.status(200).send({Address: Info.rows[0]})

    });

}



module.exports ={
    register,
    login,
    mydetail
}
