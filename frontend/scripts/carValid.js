function validarNumeros(){

    let plate = document.querySelector("#plate").value;
    let n = document.querySelector("#fleet_number").value;

    if(plate === "2"){
        alert("error");
        event.preventDefault();
    }

    if (isNaN(n)) {
        alert("Fleet Number must be a number");
        event.preventDefault();
    } 
}

