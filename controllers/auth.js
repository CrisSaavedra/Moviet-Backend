const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');


const createUser = async(req, res = response ) => {

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if ( user ) {
            return res.status(400).json({
                ok: false,
                msg: 'The mail exist'
            });
        }

        user = new User( req.body );
    
        
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );


        await user.save();

        // // Generate JWT
        // const token = await generarJWT( user.id, user.name );
    
        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Please talk with admin'
        });
    }
}




const loginUser = async(req, res = response ) => {

    const { email, password } = req.body;

    try {
        
        const user = await User.findOne({ email });

        if ( !user ) {
            return res.status(400).json({
                ok: false,
                msg: 'Not a registered email'
            });
        }

        // check passwords
        const validPassword = bcrypt.compareSync( password, user.password );

        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Error with password'
            });
        }

        // // Generate JWT
        // const token = await generarJWT( user.id, user.name );
    
        res.json({
            ok: true,
            username: user.username,
            uid: user.id,
            idMovies: user.idMovies
            // token
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please talk with admin'
        });
    }

}



const reLoadUser = async(req, res = response ) => {

    const { uid} = req.body;

    try {
        
        const user = await User.findOne({ uid });

        if ( !user ) {
            return res.status(400).json({
                ok: false,
                msg: 'User not found'
            });
        }
    
        res.json({
            ok: true,
            username: user.username,
            uid: user.id,
            idMovies: user.idMovies
            
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please talk with admin'
        });
    }

}


module.exports = {
    createUser,
    loginUser,
    reLoadUser
}