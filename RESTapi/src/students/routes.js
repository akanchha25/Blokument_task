const { Router } = require('express');
const controller = require('./controllers');

const router = Router();

router.get('/', controller.getStudents);
router.post('/', controller.addStudent);

router.get('/:id', controller.getStudentById);

router.delete('/:id', controller.deleteStudentById);

router.put('/:id',controller.updateStudents);



module.exports = router; 