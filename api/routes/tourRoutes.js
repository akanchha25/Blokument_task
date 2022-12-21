const express = require('express');

const tourController = require('./../controllers/tourController');

const router = express.Router();
//this middleware works for when id is present in URL
router.param('id',tourController.checkID);

//here we will create a checkbody middleware for Post method
// check if body contains the name and price property
// If not send back 404 status code(bad request)
//add it to post handler stack

router
.route('/')
.get(tourController.getAllTour)
.post(tourController.checkBody,tourController.createTour);

router
.route('/:id')
.get(tourController.getTour)
.patch(tourController.updateTour)
.delete(tourController.deleteTour);

module.exports = router;