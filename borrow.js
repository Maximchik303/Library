let availableBooks = JSON.parse(localStorage.getItem('books')) || [];
let borrowedBooks = JSON.parse(localStorage.getItem('borrowedBooks')) || {};
let people = JSON.parse(localStorage.getItem('people')) || [];

document.addEventListener('DOMContentLoaded', function() {
    renderAvailableBooks();
    renderBorrowedBooks();
    document.getElementById('borrow-form').addEventListener('submit', borrowBook);
});

function renderAvailableBooks() {
    const bookSelect = document.getElementById('borrow-book');
    bookSelect.innerHTML = '<option value="">Select a Book to Borrow</option>';
    availableBooks.forEach(book => {
        const option = document.createElement('option');
        option.value = book.title;
        option.textContent = `${book.title} by ${book.author}`;
        bookSelect.appendChild(option);
    });
}

function renderBorrowedBooks() {
    const borrowedList = document.getElementById('borrowed-list');
    borrowedList.innerHTML = '';
    for (const bookTitle in borrowedBooks) {
        const li = document.createElement('li');
        li.textContent = `${bookTitle} (${borrowedBooks[bookTitle]})`;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Return';
        deleteButton.addEventListener('click', () => returnBook(bookTitle));
        li.appendChild(deleteButton);
        borrowedList.appendChild(li);
    }
}

function borrowBook(event) {
    event.preventDefault();
    const personName = document.getElementById('person-name').value.trim();
    const bookTitle = document.getElementById('borrow-book').value.trim();
    if (personName && bookTitle) {
        borrowedBooks[bookTitle] = personName;
        saveBorrowedBooks();
        addPerson(personName);
        renderBorrowedBooks();
        document.getElementById('person-name').value = '';
    } else {
        alert('Please enter your name and select a book to borrow');
    }
}

function returnBook(bookTitle) {
    const borrowerName = borrowedBooks[bookTitle];
    delete borrowedBooks[bookTitle];
    removePerson(borrowerName);
    saveBorrowedBooks();
    renderBorrowedBooks();
}

function addPerson(personName) {
    if (!people.some(person => person.name === personName)) {
        people.push({ name: personName });
        savePeople();
    }
}

function removePerson(personName) {
    const borrowedByPerson = Object.values(borrowedBooks).includes(personName);
    if (!borrowedByPerson) {
        people = people.filter(person => person.name !== personName);
        savePeople();
    }
}

function saveBorrowedBooks() {
    localStorage.setItem('borrowedBooks', JSON.stringify(borrowedBooks));
}

function savePeople() {
    localStorage.setItem('people', JSON.stringify(people));
}
