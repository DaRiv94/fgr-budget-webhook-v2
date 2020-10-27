const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
    try {
        let name = 'Jane'
        if(req.body && req.body.name){
            name=req.body.name/////
        }
        const jane = await User.create({ firstName: name });
        return res.json({"new_user":"perhaps","user":jane})
    } catch (error) {
        console.error(error)
    }
})

router.get('/:userId', async (req, res) => {
    const userId = req.params.userId
    try {
        const user = await User.findAll({
            where: {
                id: userId
            }
        }
        )
        return res.json({ user })
    } catch (error) {
        console.error(error)
    }
})

module.exports = router;