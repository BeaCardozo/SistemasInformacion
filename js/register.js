const username = document.getElementById('name');
const button = document.getElementById('button');

const validateInfo = () =>{
    if (!username.value){
        swal("Por favor, ingresa tu nombre!");
    } else {
        const info = {
            username: username.value
        }
        window.location.href = "./index.html"
    }
}


button.addEventListener('click', (e) => {
    e.preventDefault()
    validateInfo()
});
