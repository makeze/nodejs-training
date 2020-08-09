const express = require('express');
const router = new express.Router();

app.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.status(201).send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});


app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (e) {
        res.status(500).send(e);
    }
});

app.get('/users/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const user = await User.findById(_id);
        res.send(user);
        if(!user){
            res.status(404).send();
        }
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;