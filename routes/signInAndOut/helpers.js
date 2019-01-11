import bcrypt from 'bcrypt-nodejs';

import CONSTANTS from './constants';
import models from '../../db/models/';

const { User, UserSession } = models;
const {
    INVALID_SIGNIN,
    LOGOUT,
    NO_EMAIL_PASSWORD,
    SUCCESSFUL_SIGNIN,
    USER_NOT_FOUND,
} = CONSTANTS;

export default {
    // finds all users in the db
    allUsers: async (req, res) => {
        try {
            const data = await User.find();
            return res.json({ data, success: true });
        } catch (err) {
            return res.json({ err, success: false });
        }
    },

    logout: async (req, res) => {
        try{
            const { token } = req.query;

            await UserSession.findOneAndUpdate(
                {
                    _id: token,
                    isDeleted: false,
                },
                { $set: {
                    isDeleted:true,
                },
                }, null);

            return res.send({
                message: LOGOUT,
                success: true,
            });
        } catch(err) {
            res.send({ err, success: false });
        }
    },

    signInUser: async (req, res) => {
        let { email, password } = req.body;

        if (!email || !password) {
            return res.send({
                message: NO_EMAIL_PASSWORD,
                success: false,
            });
        }

        try {
            email = email.toLowerCase().trim();
            const user = await User.findOne({ email });

            if(!user){
                return res.send({
                    message: USER_NOT_FOUND,
                    success: false,
                });
            }

            const userSession = Object.assign(new UserSession(), { userId: user._id  });
            const doc = await userSession.save();

            await bcrypt.compare(password, user.password, (error, result) => {
                const { 
                    address,
                    city,
                    country,
                    createdAt,
                    email,
                    firstName,
                    _id,
                    lastName,
                    phoneNumber,
                    state,
                    updatedAt,
                    username, 
                } = user;
                const userInfo = Object.assign({}, {
                    _id,
                    address,
                    city,
                    country,
                    createdAt,
                    email,
                    firstName,
                    lastName,
                    phoneNumber,
                    state,
                    updatedAt,
                    username,
                }); // will redo this, because i only want to take out password from the user object
                    //how to do hint: const { password, userInfo } = user;
                const data = result ?
                    { 
                        message: SUCCESSFUL_SIGNIN, 
                        success: true, 
                        token: doc._id, 
                        user: { userInfo },
                    } : 
                    { 
                        error,
                        message: INVALID_SIGNIN,
                        success: false,
                    };

                return res.send(data);
            });
        } catch(error) {
            return res.send({ error, success: false });
        }
    },
};
