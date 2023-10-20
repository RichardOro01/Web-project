function verifyName(name){
    name.addEventListener("keypress", function(event){
        const charCode = event.charCode;
        if(!((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122))) {
            event.preventDefault();
        }    
    })
}

function verifyNumber(number){
    number.addEventListener("keypress", function(event){
        const charCode = event.charCode;
        if(!(charCode >= 48 && charCode <= 57)){
            event.preventDefault();
        }    
    })
}

function validateInput(element, minCharCode, maxCharCode, maxLength) {
    element.addEventListener("keypress", function(event) {
        const charCode = event.charCode;
        if (!(charCode >= minCharCode && charCode <= maxCharCode) || element.value.length >= maxLength) {
            event.preventDefault();
        }
    });
}

function verifyMonth(element) {
    element.addEventListener("keypress", (event)=>{
        if (isNaN(event.key)) event.preventDefault();
        const number = event.target.value + event.key;
        if (parseInt(number)>12) event.preventDefault();
    })
}

function validateCI(ci){
    const aa = parseInt(ID.slice(0,2), 10);
    const mm = parseInt(ID.slice(2, 4), 10);
    const dd = parseInt(ID.slice(4, 6), 10);
    if (!CIvalidate.test(ID)) {
        alert("El séptimo dígito del CI no puede ser 9");
        return false;
    }
    if (mm < 1 || mm > 12){
        alert("El mes del CI es incorrecto");
        return false;
    }
    const maxDay = [31, 28 + (aa % 4 === 0 && (aa % 100 !== 0 || aa % 400 === 0) ? 1 : 0), 
        31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (dd < 1 || dd > maxDay[mm-1]){
        alert("El día del CI es incorrecto");
        return false;
    }
    return true;
}