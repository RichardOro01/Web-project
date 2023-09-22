let tables = document.querySelectorAll("table")
tables.forEach((table)=>{
    const thCount = table.children[0].children[0].childElementCount
    for (let i = 0; i<10; i++) {
        let newRow = document.createElement("tr");
        table.children[1].appendChild(newRow)
        for (let j = 0; j<thCount; j++) {
            let newTd = document.createElement("td");
            newTd.textContent = "test";
            table.children[1].children[i].appendChild(newTd); 
        }
    }
})