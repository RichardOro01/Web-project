function verifyDate(date){
    date.addEventListener("keypress", function(event){
        const charCode = event.charCode;
        if(!(charCode >= 48 && charCode <= 57)){
            event.preventDefault();
        }else if (date.value.length > 8){
            event.preventDefault();
        }    
    })
}

function verifyName(name){
    name.addEventListener("keypress", function(event){
        const charCode = event.charCode;
        if(!((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122))) {
            event.preventDefault();
        }else if (name.value.length > 35){
            event.preventDefault();
        }    
    })
}

function verifyNumber(number){
    number.addEventListener("keypress", function(event){
        const charCode = event.charCode;
        if(!(charCode >= 48 && charCode <= 57)){
            event.preventDefault();
        }else if (number.value.length > 8){
            event.preventDefault();
        }    
    })
}

function verifyDirection(dir){
    dir.addEventListener("keypress", function(event){
        const charCode = event.charCode;
        if (dir.value.length > 35){
            event.preventDefault();
        }    
    })
}

export {verifyDate,verifyName,verifyNumber,verifyDirection}