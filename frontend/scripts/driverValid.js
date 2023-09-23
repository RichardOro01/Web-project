{
    let form = document.querySelector(".form");
    form.addEventListener("submit", (event) => {
        const ID = document.getElementById("id").value;
        if (!CIvalidate.test(ID)) {
            alert("El septimo dígito del CI no puede ser 9");
            event.preventDefault();
        }
        const aa = parseInt(ID.slice(0,2), 10);
        const mm = parseInt(ID.slice(2, 4), 10);
        const dd = parseInt(ID.slice(4, 6), 10);
        if (mm < 1 || mm > 12){
            alert("El mes del CI es incorrecto");
            event.preventDefault();
        }
        const maxDay = [31, 28 + (aa % 4 === 0 && (aa % 100 !== 0 || aa % 400 === 0) ? 1 : 0), 
            31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (dd < 1 || dd > maxDay[mm-1]){
            alert("El día del CI es incorrecto");
            event.preventDefault();
        }
        
    });
}
function validateInput(element, minCharCode, maxCharCode, maxLength) {
    element.addEventListener("keypress", function(event) {
        const charCode = event.charCode;
        if (!(charCode >= minCharCode && charCode <= maxCharCode) || element.value.length >= maxLength) {
            event.preventDefault();
        }
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

