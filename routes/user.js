const express = require('express');
const router = express.Router();
const Sampleuser = require('../models/Sampleuser');

router.post('/', async (req, res) => {
    try {
        let name = 'Jane'
        if(req.body && req.body.name){
            name=req.body.name/////
        }
        const jane = await Sampleuser.create({ firstName: name });
        return res.json({"new_user":"xxperhaps","user":jane})
    } catch (error) {
        console.error(error)
    }
})

router.get('/:userId', async (req, res) => {
    const userId = req.params.userId
    try {
        const user = await Sampleuser.findAll({
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