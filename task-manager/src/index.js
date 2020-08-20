const express = require('express');
const multer = require('multer');
require('./db/mongoose');
const UserRouter = require('./routers/user')
const TaskRouter = require('./routers/task')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(UserRouter);
app.use(TaskRouter);

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});

const Task = require('./models/task');
const User = require('./models/user');

const upload = multer({
    dest: 'images',
    limits: {
        filesyze: 1000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(doc|docx)$/)) {
            return cb(new Error('Gimme the right file'));
        }

        cb(undefined, true);
    }
});

app.post('/upload', upload.single('upload'), async (req, res) => {
    req.user.avatar = req.file.buffer;
    await req.user.save();
    res.send();
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message });
});