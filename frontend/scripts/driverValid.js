{    
    let forms = document.getElementsByClassName("form");
    for (let i = 0; i < forms.length; i++) {
        forms[i].addEventListener("submit", (event) => {
            const ID = document.getElementById("id").value;
            if (!CIvalidate.test(ID)) {
                alert("CI incorrecto");
                event.preventDefault();
            }
        });
    }
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
        }else if (id.value.length > 11){
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
