import express from 'express';

import helpers from './helpers';

const router = express.Router();
const { allUsers, logout, signInUser } = helpers;

router.get('/findusers', allUsers);
router.get('/logout', logout);
router.post('/signin', signInUser);

export default router;
