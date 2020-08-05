const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
});

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        trim: true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password cannot contain password')
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    age: {
        type: Number,
        validate(value) {
           if (value < 0) {
               throw new Error('Age should not be negative');
           }
        }
    }
});

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


const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
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
