const express = require ('express');
const {registerUser,loginUser,registerAdminUser,getAllUsers} = require("../controllers/usercontroller")
const router = express.Router();

router.post('/register', registerUser);
router.post('/register/admin', registerAdminUser);
router.post('/login', loginUser);
router.get('/users', getAllUsers);

module.exports = router
