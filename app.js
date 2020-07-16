const getNotes = require('./notes-app/notes');
console.log(getNotes());

const command = process.argv[2];
let output = "User command: ";

switch (command) {
    case 'add':
        output += command;
        break;
    case 'remove':
        output += command;
        break;
    default:
        output += "not supported";
}

console.log(output);