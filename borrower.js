let borrowedBooks = JSON.parse(localStorage.getItem('borrowedBooks')) || {};

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('borrower-form').addEventListener('submit', checkBooks);
});

function checkBooks(event) {
    event.preventDefault();
    const borrowerName = document.getElementById('borrower-name').value.trim();
    const borrowedBooksList = document.getElementById('borrowed-books');
    borrowedBooksList.innerHTML = '';
    const borrowedBooksByBorrower = Object.entries(borrowedBooks).filter(([bookTitle, name]) => name === borrowerName);
    if (borrowedBooksByBorrower.length === 0) {
        borrowedBooksList.textContent = 'No books borrowed by this person.';
    } else {
        borrowedBooksByBorrower.forEach(([bookTitle, name]) => {
            const p = document.createElement('p');
            p.textContent = `${borrowerName} has borrowed: ${bookTitle}`;
            borrowedBooksList.appendChild(p);
        });
    }
}
