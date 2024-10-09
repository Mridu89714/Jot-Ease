// script.js
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Form submitted!');
});

document.getElementById('togglePassword').addEventListener('click', function () {
    const passwordField = document.getElementById('password');
    const passwordFieldType = passwordField.getAttribute('type');

    if (passwordFieldType === 'password') {
        passwordField.setAttribute('type', 'text');
        this.src = 'eye.png'; // Use an eye-off icon when password is visible
    } else {
        passwordField.setAttribute('type', 'password');
        this.src = 'visible.png'; // Use an eye icon when password is hidden
    }
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting

    // Get the email and password values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Simple validation (you can replace this with more complex logic)
    if (email === 'user@example.com' && password === 'password123') {
        // Redirect to another page if login is successful
        window.location.href = 'dashboard.html'; // Change 'dashboard.html' to the target page
    } else {
        alert('Incorrect email or password. Please try again.');
    }
});


document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting
    alert('Account created successfully!');
    // Redirect to login page after account creation
    window.location.href = 'login.html';
});


// To-Do List
function addTodo() {
    const todoInput = document.getElementById('todo-input').value;
    if (todoInput.trim()) {
        const ul = document.getElementById('todo-list');
        const li = document.createElement('li');
        li.textContent = todoInput;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => ul.removeChild(li);
        li.appendChild(removeButton);
        ul.appendChild(li);
        document.getElementById('todo-input').value = ''; // Clear input
    }
}

// Notes Section
// Initialize the app and load notes from local storage
document.addEventListener('DOMContentLoaded', () => {
    loadNotes();
});

// Save Note function
function saveNote() {
    const notesInput = document.getElementById('notes-input').value;
    if (notesInput.trim()) {
        const notes = getNotesFromLocalStorage();
        notes.push(notesInput);
        localStorage.setItem('notes', JSON.stringify(notes)); // Save to local storage
        displayNotes();
        document.getElementById('notes-input').value = ''; // Clear input
    }
}

// Load and display notes from local storage
function loadNotes() {
    displayNotes();
}

// Display notes on the page
function displayNotes() {
    const notesList = document.getElementById('notes-list');
    notesList.innerHTML = ''; // Clear existing notes

    const notes = getNotesFromLocalStorage();

    notes.forEach((note, index) => {
        const noteDiv = document.createElement('div');
        noteDiv.classList.add('note');
        noteDiv.textContent = note;

        // Add delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Remove';
        deleteButton.classList.add('delete-button');
        deleteButton.onclick = () => {
            deleteNote(index);
        };
        noteDiv.appendChild(deleteButton);

        notesList.appendChild(noteDiv);
    });
}

// Delete a specific note
function deleteNote(index) {
    let notes = getNotesFromLocalStorage();
    notes.splice(index, 1); // Remove note by index
    localStorage.setItem('notes', JSON.stringify(notes)); // Save updated list to local storage
    displayNotes(); // Re-display updated notes
}

// Get notes from local storage
function getNotesFromLocalStorage() {
    const notes = localStorage.getItem('notes');
    return notes ? JSON.parse(notes) : [];
}

// Initialize speech recognition object
const recognition = new window.webkitSpeechRecognition();

// Set recognition parameters
recognition.continuous = false;
recognition.interimResults = true;
recognition.lang = 'en-US'; // Language for speech recognition

// Add event listener for speech recognition result
recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    document.getElementById('voiceText').textContent = transcript;
};

// Function to start recording
function startRecording() {
    recognition.start();
    document.getElementById('voiceText').textContent = 'Recording...';
}

// Function to stop recording
function stopRecording() {
    recognition.stop();
    document.getElementById('voiceText').textContent = 'Recording stopped.';
}

// Example to bind to buttons
document.getElementById('start-recording').addEventListener('click', startRecording);
document.getElementById('stop-recording').addEventListener('click', stopRecording);
