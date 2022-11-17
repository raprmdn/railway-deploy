const express = require('express');
const router = express();
const handler = require('../handlers');
const { User } = require('../models');

router.get('/', async (req, res, next) => {
    try {
        const users = await User.findAll();
        if (!users) {
            return res.status(404).json({
                code: 404,
                status: 'NOT_FOUND',
                message: 'No users found'
            });
        }

        return res.status(200).json({
            code: 200,
            status: 'OK',
            message: 'Users found',
            data: users
        });
    } catch (e) {
        next(e);
    }
});

router.get('/auth/register', handler.auth.signUp);
router.post('/auth/register', handler.auth.register);

router.get('/auth/login', handler.auth.signIn);
router.post('/auth/login', handler.auth.login);

router.get('/auth/forgot-password', handler.auth.forgotPasswordView);
router.post('/auth/forgot-password', handler.auth.forgotPassword);

router.get('/auth/reset-password', handler.auth.resetPasswordView);
router.post('/auth/reset-password', handler.auth.resetPassword);


module.exports = router;