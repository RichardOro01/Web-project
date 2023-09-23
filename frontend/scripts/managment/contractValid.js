{
    let applicant = document.getElementById("applicant");
    applicant.addEventListener("keypress", function(event){
        const charCode = event.charCode;
        if(!((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122))) {
            event.preventDefault();
        }else if (applicant.value.length > 35){
            event.preventDefault();
        }    
    })
}
{
    let start = document.getElementById("start");
    start.addEventListener("keypress", function(event){
        const charCode = event.charCode;
        if(!(charCode >= 48 && charCode <= 57)){
            event.preventDefault();
        }else if (start.value.length > 8){
            event.preventDefault();
        }    
    })
}
{
    let end = document.getElementById("end");
    end.addEventListener("keypress", function(event){
        const charCode = event.charCode;
        if(!(charCode >= 48 && charCode <= 57)){
            event.preventDefault();
        }else if (end.value.length > 8){
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
    let phone = document.getElementById("amount");
    amount.addEventListener("keypress", function(event){
        const charCode = event.charCode;
        if(!(charCode >= 48 && charCode <= 57)){
            event.preventDefault();
        }else if (amount.value.length > 8){
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
    let fleet = document.getElementById("fleet");
    fleet.addEventListener("keypress", function(event){
        const charCode = event.charCode;
        if(!(charCode >= 48 && charCode <= 57)){
            event.preventDefault();
        }else if (fleet.value.length > 8){
            event.preventDefault();
        }    
    })
}
