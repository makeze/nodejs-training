const mongoose = require('mongoose');
const validator = require('validator');
const User = require('../models/user');
const Task = require('../models/task');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

/*
const me = new User({
    name: "Maksudik    ",
    email: "umpalupma@upmpa.com    ",
    password: "passwrdd",
    age: 26
});

me.save()
    .then((me) => {
        console.log(me);
    })
    .catch((error) => {
        console.log(error);
    });

const task = new Task({
    description: '      stuff     '
});

task.save()
    .then((task) => {
        console.log(task);
    })
    .catch((error) => {
        console.log(error);
    });
*/
