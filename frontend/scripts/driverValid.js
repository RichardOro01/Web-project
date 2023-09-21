{
    let forms = document.getElementsByClassName("form");
    for (let i = 0; i < forms.length; i++) {
        forms[i].addEventListener("submit", (event) => {
            const ID = document.getElementById("id").value;
            const regex = /^(\d{6})([0-8])(\d{2})([0-9]|[13579])(\d)$/;
            if (!regex.test(ID)) {
                alert("CI incorrecto");
                event.preventDefault();
            }
        });
    }
}    