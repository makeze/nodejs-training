const fs = require('fs');
const chalk = require('chalk');

const getNotes = function () {
    return "Your notes...";
};

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNotes = notes.filter((note) => note.title === title);

    if(duplicateNotes.length === 0){
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log(chalk.green.inverse("Note successfully added"));
    } else {
        console.log(chalk.red.inverse("Note already exists, use another title"));
    }
};

const removeNote = (title) => {
    const notes = loadNotes();
    const filteredNotes = notes.filter((note) => note.title !== title);
    saveNotes(filteredNotes);
    if (notes.length === filteredNotes.length) {
        console.log(chalk.red.inverse("Note was not found in the list"));
    } else {
        console.log(chalk.green.inverse("Note successfully removed"));
    }
};

const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find((note) => note.title === title);
    if (note) {
        console.log(chalk.yellow(note.title+": "+note.body));
    } else {
        console.log(chalk.red.inverse("Note was not found in the list"));
    }
};

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.green.bold("My Notes:"));
    notes.forEach((note) => {
        console.log(chalk.yellow(note.title+": "+note.body));
    });
};

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
};

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON)
    } catch (e) {
        return [];
    }
};

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};