document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    // Obtener los valores ingresados en el formulario
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
  
    // Obtener los datos almacenados en el Local Storage
    var storedEmail = localStorage.getItem("email");
    var storedPassword = localStorage.getItem("password");
  
    // Obtener el elemento de error del HTML
    var errorElement = document.getElementById("error");
  
    // Comprobar si los datos ingresados coinciden con los almacenados
    (email === storedEmail && password === storedPassword) ? window.location.href = "../dashboard/dashboard.html" : errorElement.textContent = "El email o la contraseña son incorrectos.";
  
    // Limpiar el formulario
    document.getElementById("loginForm").reset();
  });