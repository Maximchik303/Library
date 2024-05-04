let people = JSON.parse(localStorage.getItem('people')) || [];

document.addEventListener('DOMContentLoaded', function() {
    renderPeople();
    document.getElementById('people-form').addEventListener('submit', addPerson);
});

function renderPeople() {
    const peopleList = document.getElementById('people-list');
    peopleList.innerHTML = '';
    people.forEach(person => {
        const li = document.createElement('li');
        li.textContent = person.name;
        peopleList.appendChild(li);
    });
}

function addPerson(event) {
    event.preventDefault();
    const nameInput = document.getElementById('person-name');
    const name = nameInput.value.trim();
    if (name) {
        people.push({ name });
        savePeople();
        renderPeople();
        nameInput.value = '';
    } else {
        alert('Please enter a name');
    }
}

function savePeople() {
    localStorage.setItem('people', JSON.stringify(people));
}
