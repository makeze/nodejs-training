require('../src/db/mongoose');
const Task = require('../src/models/task');
const User = require('../src/models/user');

//
// const updateAgeAndCount = async (id, age) => {
//     const user = await User.findByIdAndUpdate(id, { age });
//     const count = await User.countDocuments({ age });
//     return count;
// };
//
// updateAgeAndCount('5f2b3de6698ff142a3c925ac', 26).then((count) => {
//     console.log(count);
// }).catch((e) => {
//     console.log("Error", e);
// });

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id);
    return await Task.countDocuments({completed: false});
};

deleteTaskAndCount('5f2da0ce0159db61e017fc52').then((count) => {
    console.log(count);
}).catch((e) => {
    console.log("Error", e);
});