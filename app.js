// Select UI elements
const name = document.getElementById('name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const form = document.querySelector('#contact-form');
const contactList = document.querySelector('#contact-list');
// load event listeners
loadEventListeners();
function loadEventListeners(){
    document.addEventListener('DOMContentLoaded', getContacts)
    form.addEventListener('submit', addContact);
    contactList.addEventListener('click', removeContact);

}
// get contacts
function getContacts(){
    let contacts;
    if(localStorage.getItem('contacts') === null){
        contacts = [];
    }else{
        contacts = JSON.parse(localStorage.getItem('contacts'))
    }
    contacts.forEach(data =>{
    // create tag 
    let names = data.name.split(' ');
    const tag = names[0].substring(0, 1).toUpperCase() + names[names.length -1].substring(0, 1).toUpperCase();

    // create tr elements
    let color = ['red', 'green', 'blue', 'purple', 'grey', 'brown', 'deepPink', 'gold', 'navy', 'tan', 'orange'];
    let random = color[Math.floor(color.length * Math.random())];
    const row = document.createElement('tr');
    row.innerHTML = `
    <td bgcolor="${random}">${tag}</td>
    <td>${data.name}</td>
    <td>${data.email}</td>
    <td>${data.phone}<td>
    <td><a href="#" class="delete">X<a></td>
    `;
    // append row to list
    contactList.appendChild(row);
    });
}
// add contact
function addContact(e){
    e.preventDefault();
    if(name.value === '' || email.value === '' || phone.value === ''){
        alert('Add a contact');
    }else{
        // create tag
            let names = name.value.split(' ');
            const tag = names[0].substring(0, 1).toUpperCase() + names[names.length -1].substring(0, 1).toUpperCase();

        // create tr elements
        let color = ['red', 'green', 'blue', 'purple', 'grey', 'brown', 'deepPink', 'gold', 'navy', 'tan'];
        let random = color[Math.floor(color.length * Math.random())];
        const row = document.createElement('tr');
        row.innerHTML = `
        <td bgcolor="${random}">${tag}</td>
        <td>${name.value}</td>
        <td>${email.value}</td>
        <td>${phone.value}<td>
        <td><a href="#" class="delete">X<a></td>
        `;
        // append row to list
        contactList.appendChild(row);
        // saveToLS()
        storeContacts(name.value, email.value, phone.value);
        // storeContact(name.value, email.value, phone.value);
        // clear input
        name.value = '';
        email.value = '';
        phone.value = '';
    }
    
}
function storeContacts(name, email, phone){
    let contacts;
    if(localStorage.getItem('contacts') === null){
        contacts = [];
    }else{
        contacts = JSON.parse(localStorage.getItem('contacts'));
    }
    contacts.push({
        'name': name,
        'email': email,
        'phone': phone
    });
    localStorage.setItem('contacts', JSON.stringify(contacts));
}
function removeContact(e){
    if(e.target.className === 'delete'){
        if(confirm('Are you sure')){
            e.target.parentElement.parentElement.remove();
            removeFromLS(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        }
    }
}
function removeFromLS(phone){
    // console.log(phone);
    let contacts;
    if(localStorage.getItem('contacts') === null){
        contacts = [];
    }else{
        contacts = JSON.parse(localStorage.getItem('contacts'));
    }
    contacts.forEach((data, index) => {
        if(data.phone === phone){
            contacts.splice(index, 1);
        }
    });
    localStorage.setItem('contacts', JSON.stringify(contacts));
}