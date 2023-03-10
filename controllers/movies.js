const { response } = require('express');
const User = require('../models/User');


const addMovieToUser = async (req, res = response) => {

    const { uid, idMovie } = req.body;
    try {
        await User.findByIdAndUpdate({ _id: uid }, {
            $addToSet: {
                idMovies: idMovie,
            }
        });

        res.status(201).json({
            ok: true,
            idMovie

        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Please talk with admin'
        });
    }
}


const removeMovieToUser = async (req, res = response) => {

    const { uid, idMovie } = req.body;
    try {
        await User.findByIdAndUpdate({ _id: uid }, {
            $pull: {
                idMovies: idMovie,
            }
        });

        res.status(201).json({
            ok: true,
            msg: `movie remove: ${idMovie}`

        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Please talk with admin'
        });
    }
}


module.exports = {
    addMovieToUser,
    removeMovieToUser
}