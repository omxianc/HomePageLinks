function toggleVisibility() {
    var contents = document.querySelectorAll(".content");
    contents.forEach(function(content) {
        if (content.style.display === "none") {
            content.style.display = "unset";
        } else {
            content.style.display = "none";
        }
    });
}

// Function to add a note
function addNote() {
    var noteInput = document.getElementById('note-input');
    var noteText = noteInput.value.trim();
    if (noteText !== '') {
        var notesContainer = document.getElementById('notes-container');
        var noteId = 'note-' + Date.now(); // Unique identifier for the note
        var noteElement = document.createElement('div');
        noteElement.classList.add('note');
        noteElement.innerHTML = `
            <input type="checkbox" class="content note-checkbox" data-note-id="${noteId}" style="display: unset;">
            <span>${noteText}</span>
        `;

        notesContainer.appendChild(noteElement);
        saveNotesToLocalStorage(); // Save notes to local storage
        noteInput.value = ''; // Clear the input field after adding the note
    }
}

// Function to delete selected notes
function deleteSelectedNotes() {
    var checkboxes = document.querySelectorAll('.note-checkbox:checked');
    checkboxes.forEach(function(checkbox) {
        var noteId = checkbox.getAttribute('data-note-id');
        var noteElement = document.querySelector(`.note .note-checkbox[data-note-id="${noteId}"]`).parentElement;
        noteElement.remove();
    });
    saveNotesToLocalStorage(); // Update data in local storage after deleting notes
}

// Function to save notes to local storage
function saveNotesToLocalStorage() {
    var notes = [];
    var noteElements = document.querySelectorAll('.note');
    noteElements.forEach(function(noteElement) {
        var noteText = noteElement.querySelector('span').innerText;
        var noteId = noteElement.querySelector('.note-checkbox').getAttribute('data-note-id');
        notes.push({ id: noteId, text: noteText });
    });
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Function to load notes from local storage
function loadNotesFromLocalStorage() {
    var notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.forEach(function(note) {
        var notesContainer = document.getElementById('notes-container');
        var noteElement = document.createElement('div');
        noteElement.classList.add('note');
        noteElement.innerHTML = `
            <input type="checkbox" class="content note-checkbox" data-note-id="${note.id}">
            <span>${note.text}</span>
        `;
        notesContainer.appendChild(noteElement);
    });
}

// Load notes from local storage when the page loads
document.addEventListener('DOMContentLoaded', function() {
    loadNotesFromLocalStorage();
});

// Add a note when Enter key is pressed
function handleKeyPress(event) {
    if (event.key === "Enter") {
        // Call your function when Enter is pressed
        addNote();
    }
}
