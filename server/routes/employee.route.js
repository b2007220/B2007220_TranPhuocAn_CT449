const router = require('express').Router();

const employeeController = require('../controllers/employee.controller');

router.route('/').post(employeeController.create).get(employeeController.findAll);

router.route('/is-employee').get(employeeController.isEmployee);

router.route('/:id').get(employeeController.findOne).put(employeeController.update).delete(employeeController.delete);



module.exports = router;