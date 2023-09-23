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
{
    let name = document.getElementById("name");
    name.addEventListener("keypress", function(event){
        const charCode = event.charCode;
        if(!((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122))) {
            event.preventDefault();
        }else if (name.value.length > 35){
            event.preventDefault();
        }    
    })
}
{
    let id = document.getElementById("id");
    id.addEventListener("keypress", function(event){
        const charCode = event.charCode;
        if(!(charCode >= 48 && charCode <= 57)){
            event.preventDefault();
        }else if (id.value.length > 10){
            event.preventDefault();
        }    
    })
}
{
    let phone = document.getElementById("phone");
    phone.addEventListener("keypress", function(event){
        const charCode = event.charCode;
        if(!(charCode >= 48 && charCode <= 57)){
            event.preventDefault();
        }else if (phone.value.length > 8){
            event.preventDefault();
        }    
    })
}
{
    let address = document.getElementById("address");
    address.addEventListener("keypress", function(event){
        const charCode = event.charCode;
        if (address.value.length > 35){
            event.preventDefault();
        }    
    })
}

