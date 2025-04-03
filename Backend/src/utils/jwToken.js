import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
// import userController from '../controllers/user.controllers.js';

export const createTokenJwt = (user_id) => {
    let playload = {
        id: user_id,
    };
    let key={
        key: process.env.SECRET_KEY
    }
    let options= {
        expiresIn: 7 * 24 * 60 * 60,
    }
    let token = jwt.sign(playload, key, options);
    console.log(token);
}


