// contact constructor
class Contact{
    constructor(name, email, phone){
        this.name = name;
        this.email = email;
        this.phone =phone;
    }
}
// UI constructor
class UI{
    // Add contacts to list
    addContactToList(contact){
        const list = document.getElementById('contact-list');
        // create a table row element
        const row = document.createElement('tr');
        let names = contact.name.split(' ');
        let tag = names[0].substring(0, 1).toUpperCase() + names[names.length -1].substring(0, 1).toUpperCase();
        // insert columns
        let color = ['red', 'green', 'blue', 'purple', 'grey', 'brown', 'deepPink', 'gold', 'navy', 'tan'];
        let random = color[Math.floor(color.length * Math.random())];
        row.innerHTML =`
        <td bgcolor="${random}">${tag}</td>
        <td>${contact.name}</td>
        <td>${contact.email}</td>
        <td>${contact.phone}</td>
        <td><a href="#" class="delete">X<a></td>
        `;
        // append row to list
        list.appendChild(row);
        
    }
    showAlert(message, className){
        // create div
        const div = document.createElement('div');
        // Add classes
        div.className = `alert ${className}`;
        // add Text
        div.appendChild(document.createTextNode(message));
        // get parent
        const container = document.querySelector('.container');
        // get form
        const form = document.querySelector('#contact-form');
        // insert before
        container.insertBefore(div, form);
        // timeout after 3 seconds
        setTimeout(function(){
            document.querySelector('.alert').remove()
        }, 3000);
    }
    deleteContact(target){
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove();
        }
    }
    clearFields(){
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('phone').value = '';
    }
}
// Local Storage class
class Store{
    static getContacts(){
        let contacts;
        if(localStorage.getItem('contacts') === null){
            contacts = [];
        }else{
            contacts = JSON.parse(localStorage.getItem('contacts'));
        }
        return contacts;
    }
    static displayContacts(){
        const contacts = Store.getContacts();
        contacts.forEach(function(contact){
            const ui = new UI();
            // add contact to UI
            ui.addContactToList(contact);
        });
    }
    static addContact(contact){
        const contacts = Store.getContacts();
        contacts.push(contact);
        localStorage.setItem('contacts', JSON.stringify(contacts));
    }
    static removeContact(phone){
        const contacts = Store.getContacts();
        contacts.forEach(function(contact, index){
            if(contact.phone === phone){
                contacts.splice(index, 1);
            }
        });
        localStorage.setItem('contacts', JSON.stringify(contacts));
    }
}
// DOM load Event
document.addEventListener('DOMContentLoaded', Store.displayContacts);
// Event Listener for add book
document.getElementById('contact-form').addEventListener('submit',
    function(e){
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        // instantiate contact
        const contact = new Contact(name, email, phone);
        // instantiate UI
        const ui = new UI();
        // validate
        if(name === '' || email === '' || phone === ''){
            // Error alert
            ui.showAlert('Please fill in all fields', 'error');
        }else{
            // add contact to list
            ui.addContactToList(contact);
            // add to ls
            Store.addContact(contact)
            // show success
            ui.showAlert('Book Added!', 'success');
            // prevent default
            ui.clearFields();
        }
    e.preventDefault();
});
// Event listener for delete
document.getElementById('contact-list').addEventListener('click', 
    function(e){
        // instantiate UI
        const ui = new UI();
        // delete  contact
        ui.deleteContact(e.target);
        // show message
        ui.showAlert('Book Removed', 'success');
        // prevent default
        e.preventDefault();
});