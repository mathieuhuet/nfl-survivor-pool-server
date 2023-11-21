const router = require('express').Router();

const authMiddleware = require('../../middlewares/auth');

const logout = require('./logout');
const login = require('./login');
const register = require('./register');
const verify = require('./verify');
const getUserInfo = require('./getUserInfo');
const deleteAccount = require('./deleteAccount');
const changeIcon = require('./changeIcon');
const changeEmail = require('./changeEmail');
const getOtherUserInfo = require('./getOtherUserInfo');
const changeName = require('./changeName');



router.post('/login', login);
router.post('/register', register);
router.delete('/deleteAccount', authMiddleware, deleteAccount)
router.post('/verify', verify);
router.get('/getUserInfo', authMiddleware, getUserInfo);
router.post('/logout', authMiddleware, logout);
router.put('/changeIcon', authMiddleware, changeIcon);
router.post('/getOtherUserInfo', authMiddleware, getOtherUserInfo);
router.put('/changeEmail', authMiddleware, changeEmail);
router.put('/changeName', authMiddleware, changeName);


module.exports = router;
