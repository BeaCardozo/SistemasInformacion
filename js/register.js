const username = document.getElementById('name');
const button = document.getElementById('button');
const maxLength = 25;
const pattern = new RegExp('^[A-Z]+$', 'i');

const validateInfo = () =>{
    if (!username.value){
        swal("Por favor, ingresa tu nombre!");
    } else {
        if (username.value.length > maxLength){
            swal("Solo se permiten 25 carácteres");
        } else {
            if(!pattern.test(username.value)){
                swal("Por favor, ingresa solo letras...");
            } else {
                const info = {
                    username: username.value
                }
                sessionStorage.setItem("username", info.username);
                window.location.href = "./index.html"
            }
        }
    }
}


button.addEventListener('click', (e) => {
    e.preventDefault()
    validateInfo()
    //localStorage.clear();
});
