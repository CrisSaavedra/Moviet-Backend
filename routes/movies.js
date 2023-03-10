const { Router } = require('express');
const { validateField } = require('../middlewares/validateField');
const { check } = require('express-validator');
const { addMovieToUser,removeMovieToUser } = require('../controllers/movies');

const router = Router();


router.put('/add',
    [
        check('uid', 'Need id user').not().isEmpty(),
        check('idMovie', 'Need id movie').not().isEmpty(),
        validateField
    ],
    addMovieToUser
);


router.put('/remove',
    [
        check('uid', 'Need id user').not().isEmpty(),
        check('idMovie', 'Need id movie').not().isEmpty(),
        validateField
    ],
    removeMovieToUser
);




module.exports = router;