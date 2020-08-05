const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
});

const User = mongoose.model('User', {
   name: {
       type: String,
       required: true
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
    name: "Maksudik",
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
        type: String
    },
    completed: {
        type: Boolean
    }
});

// const task = new Task({
//     description: 'stuff',
//     completed: false
// });
//
// task.save()
//     .then((task) => {
//         console.log(task);
//     })
//     .catch((error) => {
//         console.log(error);
//     });