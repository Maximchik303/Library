let books = JSON.parse(localStorage.getItem('books')) || [];

document.addEventListener('DOMContentLoaded', function() {
    renderBooks();
    document.getElementById('book-form').addEventListener('submit', addBook);
});

function renderBooks() {
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = '';
    books.forEach((book, index) => {
        const li = document.createElement('li');
        li.textContent = `${book.title} by ${book.author}`;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteBook(index));
        li.appendChild(deleteButton);
        bookList.appendChild(li);
    });
}

function addBook(event) {
    event.preventDefault();
    const titleInput = document.getElementById('book-title');
    const authorInput = document.getElementById('book-author');
    const title = titleInput.value.trim();
    const author = authorInput.value.trim();
    if (title && author) {
        books.push({ title, author });
        saveBooks();
        renderBooks();
        titleInput.value = '';
        authorInput.value = '';
    } else {
        alert('Please enter both title and author');
    }
}

function deleteBook(index) {
    books.splice(index, 1);
    saveBooks();
    renderBooks();
}

function saveBooks() {
    localStorage.setItem('books', JSON.stringify(books));
}
