const express = require('express');

const studentRoutes = require('./src/students/routes');
const app = express();
const port = 3000;
app.use(express.json()); //this allows us to post json from our end points

app.get('/',(req,res) =>{
    res
    .status(200)
    .send(`Hello welcome to the port ${port}`);
});

app.use('/api/v1/students' , studentRoutes)

app.listen(port,() => {
console.log(`app listening on port ${port}`)
});