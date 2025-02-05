function checkAuth() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/login';
        return false;
    }
    return true;
}

function updateAuthButtons() {
    const authButtons = document.getElementById('authButtons');
    if (!authButtons) return;
    
    if (localStorage.getItem('token')) {
        authButtons.innerHTML = `
            <button onclick="handleLogout()" class="btn btn-outline-danger mx-2">Logout</button>
        `;
    }
}

function handleLogout() {
    localStorage.removeItem('token');
    window.location.reload();
}

async function fetchNotes() {
    try {
        const response = await fetch('/api/notes/getnotes', {
            method: 'GET',
            headers: {
                'auth-token': localStorage.getItem('token')
            }
        });

        const notes = await response.json();
        const notesContainer = document.querySelector('.mynotes');
        if (!notesContainer) return;

        notesContainer.innerHTML = '';

        notes.forEach(note => {
            const noteHtml = `
                <div class="card mx-2 my-2" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${note.title}</h5>
                        <p class="card-text">${note.description}</p>
                        <button onclick="deleteNote('${note._id}')" class="btn btn-danger">Delete</button>
                    </div>
                </div>`;
            notesContainer.innerHTML += noteHtml;
        });
    } catch (error) {
        console.error('Error fetching notes:', error);
    }
}

async function deleteNote(id) {
    try {
        const response = await fetch(`/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'auth-token': localStorage.getItem('token')
            }
        });

        const json = await response.json();
        if (json.success) {
            fetchNotes();
        }
    } catch (error) {
        console.error('Error deleting note:', error);
    }
}

// Initialize when document is loaded
document.addEventListener('DOMContentLoaded', () => {
    updateAuthButtons();
    if (localStorage.getItem('token')) {
        fetchNotes();
    } else {
        window.location.href = '/login';
    }

    // Set up note submission
    const submit = document.getElementById("submit");
    if (submit) {
        submit.addEventListener("click", async () => {
            if (!checkAuth()) return;

            const title = document.getElementById("title").value;
            const description = document.getElementById("desc").value;

            try {
                const response = await fetch('/api/notes/addnote', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': localStorage.getItem('token')
                    },
                    body: JSON.stringify({ title, description })
                });
                
                const json = await response.json();
                if (json._id) {
                    // Clear form
                    document.getElementById("title").value = '';
                    document.getElementById("desc").value = '';
                    // Refresh notes
                    fetchNotes();
                } else {
                    alert('Error adding note');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error adding note');
            }
        });
    }
});