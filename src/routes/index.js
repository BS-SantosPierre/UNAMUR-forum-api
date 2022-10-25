const authRouter = require('./auth.route');
const categoryRouter = require('./category.route');

const router = require('express').Router();

router.use('/auth', authRouter);
router.use('/category', categoryRouter);

module.exports = router;
