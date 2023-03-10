const { Router } = require('express');
const { check } = require('express-validator');
const { validateField } = require('../middlewares/validateField');
const { createUser, loginUser, reLoadUser } = require('../controllers/auth');


const router = Router();




router.post('/',
    [
        check('email', 'The email is required').isEmail(),
        check('password','The password is required').isLength({min: 6}),
        validateField
    ],
    loginUser
);

router.post('/new',
    [
        check('username', 'The username is required').not().isEmpty(),
        check('email', 'The email is required').isEmail(),
        check('password','The password is required').isLength({min: 6}),
        validateField
    ],
    createUser
);


router.post('/reload',
    [
        check('_id', 'The uid is required').not().isEmpty(),
        validateField
    ],
    reLoadUser
);



module.exports = router;