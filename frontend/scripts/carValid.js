{
    let fleet_number = document.getElementById("fleet_number");

    fleet_number.addEventListener("keypress", function(event){
        const charCode = event.charCode;
        if(!(charCode >= 48 && charCode <= 57)){
            event.preventDefault();
        }
    })
}
