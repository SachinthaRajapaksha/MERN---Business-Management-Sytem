const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.put('/:userId', userController.editUser);
router.delete('/:userId', userController.deleteUser);
router.get('/deleted-users', userController.getDeletedUsers); 
router.get('/total-registered-users', userController.getTotalRegisteredUsers);
router.get('/', userController.getRegisteredUsers);
router.get('/filter-registered-users', userController.filterRegisteredUsers);
router.delete('/admin-delete-user/:userId', userController.AdmindeleteUser);



module.exports = router;
