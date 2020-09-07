const doWork = (callback) => {
    setTimeout(() => {
       //callback('This is my error!', undefined);
       callback(undefined, ['umba', 'lumpa']);
    }, 2000);
}

doWork((error, result) => {
    if(error){
        return console.log(error);
    }
    console.log(result);
});