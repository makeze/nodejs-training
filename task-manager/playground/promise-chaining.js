require('../src/db/mongoose');
const User = require('../src/models/user');

// 5f2b3de6698ff142a3c925ac

User.findByIdAndUpdate('5f2b3de6698ff142a3c925ac', {age: 27}).then((user) => {
    console.log(user);
    return User.countDocuments({ age: 27 })
}).then((result) => {
   console.log(result);
}).catch((e) => {
    console.log(e);
});