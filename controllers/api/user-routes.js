const router = require('express').Router();
const {User} = require('./models');

router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        req.session.save(() => {
            req.session.id = userData.id;
            req.session.loggedIn = true;
            res.status(200).json(userData);
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                userName: req.body.userName
            }
        })
        if (!userData){
            res.status(400).json({
                message: "Username does not exist."
            })
        }else {
            const checkPassword = await userData.checkPassword(req.body.password);
            if (checkPassword === true){
                req.session.id = userData.id;
                req.session.loggedIn = true;
                res.json({
                    message: "You are now logged in",
                    userData: userData
                })
            }else {
                res.status(400).json({message: "Incorrect password. Try again."})
            }
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post('/logout', async (req, res) => {
    try {
        req.session.destroy(() => {
            res.status(204).end();
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router; 