{
    let forms = document.querySelectorAll("form")
    let selects = document.querySelectorAll("select")
    selects.forEach(select => {
        select.addEventListener("change", function () {
            select.classList.add("select_selected")
        });
    });
    forms.forEach(form => {
        form.addEventListener("reset", () => {
            let selects= form.querySelectorAll("select")
            selects.forEach(select => {
                select.classList.remove("select_selected");
            })
            let dates= form.querySelectorAll("input[type=date], input[type=time]")
            dates.forEach(date => {
                switchBackToText(date, true);
            })
        });
    });
}   
