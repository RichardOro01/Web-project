{
    let form = document.querySelector(".form");
    form.addEventListener("submit", (event) => {
        const ID = document.getElementById("id").value;
        if (!validateCI(ID)) event.preventDefault();
    });
}

let nameField = document.getElementById("name");
validateInput(nameField, 65, 122, 35);

let idField = document.getElementById("id");
validateInput(idField, 48, 57, 10);

let phoneField = document.getElementById("phone");
validateInput(phoneField, 48, 57, 8);

let addressField = document.getElementById("address");
validateInput(addressField, 0, 65535, 35);

