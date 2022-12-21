const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
const app = require('./app');



//to check the default enviroment of express
//console.log(app.get('env'));

// bunch of enviroment variables that node js holds
//console.log(process.env);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}... `);
});