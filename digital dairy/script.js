// Load saved entries from local storage when page loads
window.onload = function () {
    loadEntries();
};

// Add a new diary entry
function addEntry() {
    const date = document.getElementById('entry-date').value;
    const content = document.getElementById('entry-content').value;

    if (date === "" || content === "") {
        alert("Please enter both date and content!");
        return;
    }

    const entry = {
        date: date,
        content: content
    };

    let entries = JSON.parse(localStorage.getItem('diaryEntries')) || [];
    entries.push(entry);

    localStorage.setItem('diaryEntries', JSON.stringify(entries));

    // Clear the form after adding
    document.getElementById('entry-date').value = "";
    document.getElementById('entry-content').value = "";

    // Reload entries to display the new one
    loadEntries();
}

// Load and display all diary entries
function loadEntries() {
    const entriesContainer = document.getElementById('entries');
    entriesContainer.innerHTML = "";

    const entries = JSON.parse(localStorage.getItem('diaryEntries')) || [];

    if (entries.length === 0) {
        entriesContainer.innerHTML = "<p>No entries yet. Start writing!</p>";
        return;
    }

    entries.forEach((entry, index) => {
        const entryElement = document.createElement('div');
        entryElement.classList.add('entry');
        entryElement.innerHTML = `
            <h3>${entry.date}</h3>
            <p>${entry.content}</p>
            <button class="delete-btn" onclick="deleteEntry(${index})">❌ Delete</button>
        `;
        entriesContainer.appendChild(entryElement);
    });
}

// Delete an entry
function deleteEntry(index) {
    let entries = JSON.parse(localStorage.getItem('diaryEntries'));
    entries.splice(index, 1);
    localStorage.setItem('diaryEntries', JSON.stringify(entries));
    loadEntries();
}
