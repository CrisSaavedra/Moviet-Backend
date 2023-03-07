const { Router } = require('express');
const { check } = require('express-validator');
const { validateField } = require('../middlewares/validateField');
const { createUser, loginUser } = require('../controllers/auth');


const router = Router();


router.post('/new',
    [
        check('username', 'The username is required').not().isEmpty(),
        check('email', 'The email is required').isEmail(),
        check('password','The password is required').isLength({min: 6}),
        validateField
    ],
    createUser
);

router.post('/',
    [
        check('email', 'The email is required').isEmail(),
        check('password','The password is required').isLength({min: 6}),
        validateField
    ],
    loginUser
);



module.exports = router;