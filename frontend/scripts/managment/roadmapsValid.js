{
    let date = document.getElementById("date");
    date.addEventListener("keypress", function(event){
        const charCode = event.charCode;
        if(!((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122))) {
            event.preventDefault();
        }else if (date.value.length > 35){
            event.preventDefault();
        }    
    })
}
{
    let fleet = document.getElementById("fleet");
    fleet.addEventListener("keypress", function(event){
        const charCode = event.charCode;
        if(!(charCode >= 48 && charCode <= 57)){
            event.preventDefault();
        }else if (fleet.value.length > 10){
            event.preventDefault();
        }    
    })
}
{
    let kms = document.getElementById("kms");
    kms.addEventListener("keypress", function(event){
        const charCode = event.charCode;
        if(!(charCode >= 48 && charCode <= 57)){
            event.preventDefault();
        }else if (kms.value.length > 8){
            event.preventDefault();
        }    
    })
}
{
    let departure = document.getElementById("departure");
    departure.addEventListener("keypress", function(event){
        const charCode = event.charCode;
        if (departure.value.length > 35){
            event.preventDefault();
        }    
    })
}