const noteUtils = require('./notes-app/notes');
const yargs = require('yargs');

console.log(noteUtils.getNotes());

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
    handler (argv) {
        noteUtils.addNote(argv.title, argv.body);
    }
});

yargs.command({
    command: 'remove',
    describe: 'Removing a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler (argv) {
        noteUtils.removeNote(argv.title);
    }
});

yargs.command({
    command: 'list',
    describe: 'Listing a note',
    handler () {
        noteUtils.listNotes();
    }
});

yargs.command({
    command: 'read',
    describe: 'Reading a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler (argv) {
        noteUtils.readNote(argv.title);
    }
});

yargs.parse();