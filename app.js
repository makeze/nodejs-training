const getNotes = require('./notes-app/notes');
console.log(getNotes());

if(process.argv[2]){
    console.log("User input: "+process.argv[2]);
}