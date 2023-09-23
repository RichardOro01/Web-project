{
    let month = document.getElementById("month");
    month.addEventListener("keypress", function(event){
        const charCode = event.charCode;
        if(!((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122))) {
            event.preventDefault();
        }else if (month.value.length > 35){
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
{
    let planed = document.getElementById("planed");
    planed.addEventListener("keypress", function(event){
        const charCode = event.charCode;
        if(!(charCode >= 48 && charCode <= 57)){
            event.preventDefault();
        }else if (planed.value.length > 8){
            event.preventDefault();
        }    
    })
}
{
    let tours = document.getElementById("tours");
    tours.addEventListener("keypress", function(event){
        const charCode = event.charCode;
        if(!(charCode >= 48 && charCode <= 57)){
            event.preventDefault();
        }else if (tours.value.length > 8){
            event.preventDefault();
        }    
    })
}
{
    let difference = document.getElementById("difference");
    difference.addEventListener("keypress", function(event){
        const charCode = event.charCode;
        if(!(charCode >= 48 && charCode <= 57)){
            event.preventDefault();
        }else if (difference.value.length > 8){
            event.preventDefault();
        }    
    })
}
{
    let planedFuel = document.getElementById("planedFuel");
    planedFuel.addEventListener("keypress", function(event){
        const charCode = event.charCode;
        if(!(charCode >= 48 && charCode <= 57)){
            event.preventDefault();
        }else if (planedFuel.value.length > 8){
            event.preventDefault();
        }    
    })
}
{
    let consumedFuel = document.getElementById("consumedFuel");
    consumedFuel.addEventListener("keypress", function(event){
        const charCode = event.charCode;
        if(!(charCode >= 48 && charCode <= 57)){
            event.preventDefault();
        }else if (consumedFuel.value.length > 8){
            event.preventDefault();
        }    
    })
}
{
    let spendingFuel = document.getElementById("spendingFuel");
    spendingFuel.addEventListener("keypress", function(event){
        const charCode = event.charCode;
        if(!(charCode >= 48 && charCode <= 57)){
            event.preventDefault();
        }else if (spendingFuel.value.length > 8){
            event.preventDefault();
        }    
    })
}