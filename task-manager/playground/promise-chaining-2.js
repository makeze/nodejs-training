require('../src/db/mongoose');
const Task = require('../src/models/task');

Task.findByIdAndDelete('5f2da0900fa5d56194fb5554').then((task) => {
    console.log(task);
    return Task.countDocuments({ completed: false })
}).then((result) => {
    console.log(result);
}).catch((e) => {
    console.log(e);
});