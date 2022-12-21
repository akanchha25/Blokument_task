const fs = require("fs");
const { nextTick } = require("process");


//to covert json file that we have inside to array of javascript object 
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res ,next ,val) =>{
    console.log(`Tour id is: ${val}`);
    const id = req.params.id * 1;

if(id>tours.length){
    return res.status(404).json({
        status: 'fail',
        message: 'Invalid Id'
    });

}
next();
};
//here we will create a checkbody middleware for Post method
// check if body contains the name and price property
// If not send back 404 status code(bad request)
//add it to post handler stack

exports.checkBody = (req, res, next ) =>{
    if(! req.body.name || !req.body.price){
        return res.status(404).json({
            status: 'fail',
            message: 'missing name or price'
        });
    };
    next();
};


exports.getAllTour = (req, res) =>{
    console.log(req.requestTime);
    res.status(200).json({
        status: 'success',
        requested_At: req.requestTime, //to know when the data is requested by the user
        results:tours.length,
        data: {
            tours
        }
    });

};

exports.getTour = (req, res) =>{
    console.log(req.params);
    const id = req.params.id*1;
    const tour = tours.find(el => el.id === id);
    res.status(200).json({
        status: 'success',
        results:tours.length,
        data: {
           tour
        }
    });

};

exports.createTour = (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
      const newTour = Object.assign({ id: newId }, req.body);
    
      tours.push(newTour);
    
      fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(tours),
        err => {
          res.status(201).json({
            status: 'success',
            data: {
              tour: newTour
            }
          });
        }
      );
    
    };

exports.updateTour = (req, res) => {
    
    res.status(200).json({
        status: 'success',
        data:{
            tour: '<updated tour>'
        }

    });

}; 

exports.deleteTour = (req, res) => {
    const id = req.params.id * 1;
    if(id > tours.length){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid Id'
        });
    }
    res.status(204).json({
        status: 'success',
        data: null

    });

};


       

