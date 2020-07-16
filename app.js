const getNotes = require('./notes-app/notes');
const yargs = require('yargs');

console.log(getNotes());

const command = process.argv[2];
let output = "User command: ";

yargs.version('1.0.1');

yargs.command({
    command: 'add',
    describe: 'Adding a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv) {
        console.log('Title: ' + argv.title);
        console.log('Body: ' + argv.body);
    }
});

yargs.command({
    command: 'remove',
    describe: 'Removing a note',
    handler: function() {
        console.log('Removing a note');
    }
});

yargs.command({
    command: 'read',
    describe: 'Reading a note',
    handler: function() {
        console.log('Reading a note');
    }
});

yargs.command({
    command: 'list',
    describe: 'Listing a note',
    handler: function() {
        console.log('Listing all notes');
    }
});

yargs.parse();