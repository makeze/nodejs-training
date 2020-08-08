require('../src/db/mongoose');
const Task = require('../src/models/task');
const User = require('../src/models/user');

/*Task.findByIdAndDelete('5f2da0900fa5d56194fb5554').then((task) => {
    console.log(task);
    return Task.countDocuments({ completed: false })
}).then((result) => {
    console.log(result);
}).catch((e) => {
    console.log(e);
});*/

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age });
    const count = await User.countDocuments({ age });
    return count;
};

updateAgeAndCount('5f2b3de6698ff142a3c925ac', 26).then((count) => {
    console.log(count);
}).catch((e) => {
    console.log("Error", e);
});

