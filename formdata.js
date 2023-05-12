// const { fileURLToPath } = require("url");

// const express = require("stream/consumers");

// const { json } = require("stream/consumers");

window.onload = getAll();
let btn = document.getElementById('btn');
let form = document.getElementById('my-form');


btn.addEventListener("click", () => {
    if (btn.textContent == 'Submit') {
        submitButton()
    }
    else if (btn.textContent == 'Update') {
        updateUser();
    }

    form.reset();
});

// Insert Data Into The DataBase

function submitButton() {
    console.log('button is clickedd')
    fetch('http://localhost:5000/insert', {
        method: "POST",
        body: JSON.stringify({
            firstname: document.getElementById("firstName").value,
            lastname: document.getElementById("lastName").value,
            email: document.getElementById("email").value,
            contact: document.getElementById("contact").value,
            message: document.getElementById("message").value,



        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            // res.json()
            getAll();
        })
}

// Get All Data's To The Screen From Database

function getAll() {
    console.log('getedddd');
    fetch('http://localhost:5000/users')

        .then(res => res.json())
        .then(json => {
            console.log(json, "get")
            html = ""
            json.forEach(e => {
                html += `<tr>
            <td>${e.id}</td>
            <td>${e.firstname}</td>
            <td>${e.lastname}</td>
            <td>${e.email}</td>
            <td>${e.contact}</td>
            <td>${e.message}</td>
            <td style="display: flex;justify-content: space-between;">
            <a type= "button" id="btn" onClick="getUserintoform(${e.id})"><i class="bi bi-pencil"></i></a>
            <a type= "button" onClick="DeleteUser(${e.id}) "><i class="bi bi-trash3"></i></a>
            
            </td>
                </tr>`

            });

            console.log(html)
            document.getElementsByTagName("tbody")[0].innerHTML = html

        })
}


// Get All Datas Show in From From Database

function getUserintoform(id) {
    console.log('inside edit')
    document.getElementById('btn').style.display = "Update";
    console.log('get datas into the form')
    fetch(`http://localhost:5000/getbyid/${id}`)
        .then(res => res.json())
        .then(users => {
            console.log('user', users[0])
            document.getElementById('firstName').value = users[0].firstname;
            document.getElementById('lastName').value = users[0].lastname;
            document.getElementById('email').value = users[0].email;
            document.getElementById('contact').value = users[0].contact;
            document.getElementById('message').value = users[0].message;
            document.getElementById('uniqueId').value = users[0].id;
            document.getElementById("btn").textContent = "Update";
            // updateUser();

        })

}


// edit-icon.addEventListener('click', () =>{
//     getUserintoform(id);
//   });


// update

function updateUser() {
    console.log('updateUser');
    let newFirstname = document.getElementById("firstName").value;
    let newLastname = document.getElementById("lastName").value;
    let newEmail = document.getElementById("email").value;
    let newContact = document.getElementById("contact").value;
    let newMessage = document.getElementById("message").value;
    let id = document.getElementById('uniqueId').value;

    const payload = { firstname: newFirstname, lastname: newLastname, email: newEmail, contact: newContact, message: newMessage };
    fetch(`http://localhost:5000/update/` +id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(payload)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
           // getAll();
            // location.reload
            // form.reset();
        })
        .catch((error) => {
            console.error(error)
        });

}


// Delete user

function DeleteUser(id) {
    const payload = { id: id };
    fetch(`http://localhost:5000/delete/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);

            getAll();
            // alert("Deleted Successfully !");
        })
        .catch(error => console.error(error));
}
