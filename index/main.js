
class Usuario {
    constructor(nombre, apellido, contraseña, email) {
        this.nombre = nombre
        this.apellido = apellido
        this.contraseña = contraseña
        this.email = email
    }
}

document.getElementById("boton").addEventListener("click", function () {
    document.getElementById("popup").style.display = "flex";
});

document.getElementById("cerrarPopup").addEventListener("click", function () {
    document.getElementById("popup").style.display = "none";
});

document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();

    // Obtener los valores ingresados en el formulario
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    // Guardar los datos en el Local Storage
    localStorage.setItem("nombre", nombre);
    localStorage.setItem("apellido", apellido);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);

    // Cerrar el popup
    document.getElementById("popup").style.display = "none";

    // Limpiar el formulario
    document.querySelector("form").reset();

    // Mostrar un mensaje de éxito
    document.getElementById("registroExitoso").style.display = "flex";
});

document.getElementById("cerrarRegistroExitoso").addEventListener("click", function () {
    document.getElementById("registroExitoso").style.display = "none";
});

// creacion de nuevo usuario

let nombre = localStorage.getItem("nombre")
let apellido = localStorage.getItem("apellido")
let contraseña = localStorage.getItem("password")
let email = localStorage.getItem('email')
const usuario = new Usuario(nombre, apellido, contraseña, email)