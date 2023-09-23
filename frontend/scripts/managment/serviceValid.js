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
    let group = document.getElementById("group");
    group.addEventListener("keypress", function(event){
        const charCode = event.charCode;
        if(!((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122))) {
            event.preventDefault();
        }else if (group.value.length > 35){
            event.preventDefault();
        }  
    })
}
{
    let country = document.getElementById("country");
    country.addEventListener("keypress", function(event){
        const charCode = event.charCode;
        if(!((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122))) {
            event.preventDefault();
        }else if (country.value.length > 35){
            event.preventDefault();
        }    
    })
}
{
    let address = document.getElementById("place");
    address.addEventListener("keypress", function(event){
        const charCode = event.charCode;
        if (address.value.length > 35){
            event.preventDefault();
        }    
    })
}
{
    let time = document.getElementById("time");
    time.addEventListener("keypress", function(event){
        const charCode = event.charCode;
        if(!(charCode >= 48 && charCode <= 57)){
            event.preventDefault();
        }else if (time.value.length > 8){
            event.preventDefault();
        }    
    })
}
{
    let pax = document.getElementById("pax");
    pax.addEventListener("keypress", function(event){
        const charCode = event.charCode;
        if(!(charCode >= 48 && charCode <= 57)){
            event.preventDefault();
        }else if (pax.value.length > 8){
            event.preventDefault();
        }    
    })
}
{
    let service = document.getElementById("service");
    service.addEventListener("keypress", function(event){
        const charCode = event.charCode;
        if(!((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122))) {
            event.preventDefault();
        }else if (service.value.length > 35){
            event.preventDefault();
        }    
    })
}
{
    let amount = document.getElementById("amount");
    amount.addEventListener("keypress", function(event){
        const charCode = event.charCode;
        if(!(charCode >= 48 && charCode <= 57)){
            event.preventDefault();
        }else if (amount.value.length > 8){
            event.preventDefault();
        }    
    })
}