const welcomeMessage = document.getElementById('welcomeMessage');
let dineroDisponible = document.getElementById("dineroDisponible");

//elementos del deposito
let btn = document.getElementById('btn');
let mensajeDeposito = document.getElementById("mensajeDeposito");
let historialDepositos = document.getElementById("historialDepositos");

//elementos de retiro de dinero
const btnRetirar = document.getElementById('btnRetirar');
const mensajeExtracciones = document.getElementById('mensajeExtracciones');
const historialExtracciones = document.getElementById('historialExtracciones');


//elementos de transferencias
const mensajeTransferencia = document.getElementById('mensajeTransferencia');
const historialTransferencias = document.getElementById('historialTransferencias');
const btnTransferir = document.getElementById('btnTransferir');


// Obtener el historial del Local Storage
let extracciones = JSON.parse(localStorage.getItem("extracciones")) || [];
let depositos = JSON.parse(localStorage.getItem("depositos")) || [];
let transferencias = JSON.parse(localStorage.getItem("transferencias")) || [];
let saldo = parseFloat(localStorage.getItem("saldo")) || 0;




const otrosUsuarios = document.getElementById('otrosUsuarios');

//Traigo los datos con fetch
let usuariosData = [];


fetch('../users.json')
  .then(response => response.json())
  .then(data => {
    for (let i = 0; i < data.length; i++) {

      usuariosData.unshift(data[i])
    }

    // Iterar sobre los usuarios y construir el contenido HTML
    let usuariosHTML = 'Usuarios agendados';
    data.forEach(usuario => {
      usuariosHTML += `
      <div class="conetedorUsuario">
      <p><strong>Nombre</strong>: ${usuario.nombre}</p>
      <p><strong>Apellido</strong>: ${usuario.apellido}</p>
      <p><strong>Email</strong>: ${usuario.email}</p>
      <p><strong>Numero de cuenta</strong>: ${usuario.numeroDeCuenta}</p>
      </div>`
    });

    // Agregar el contenido HTML al elemento otrosUsuarios
    otrosUsuarios.innerHTML = usuariosHTML;
  })
  .catch(error => {
    console.error('Error:', error);
  });


// funcion que actualiza los movimientos

function mostrarCambios() {
  historialTransferencias.innerHTML = "";
  historialDepositos.innerHTML = "";
  historialExtracciones.innerHTML = "";

  for (let i = 0; i < transferencias.length; i++) {
    let transferencia = transferencias[i];
    let transferenciaElement = document.createElement("p");
    transferenciaElement.textContent = `Transferencia N° ${i + 1}: $${transferencia}`;
    historialTransferencias.appendChild(transferenciaElement);
  }
  for (let i = 0; i < extracciones.length; i++) {
    let extraccion = extracciones[i];
    let extraccionElement = document.createElement("p");
    extraccionElement.textContent = `Extraccion N° ${i + 1}: $${extraccion}`;
    historialExtracciones.appendChild(extraccionElement);
  }
  for (let i = 0; i < depositos.length; i++) {
    let deposito = depositos[i];
    let depositoElement = document.createElement("p");
    depositoElement.textContent = `Deposito N° ${i + 1}: $${deposito}`;
    historialDepositos.appendChild(depositoElement);
  }

}

mostrarCambios()

// Logica de depositar dinero

btn.addEventListener('click', () => {
  let dinero = document.getElementById('dineroDepositado').value;

  if (dinero !== '') {
    mensajeDeposito.textContent = "Se depositaron $" + dinero;
    document.getElementById("dineroDepositado").value = "";

    // Agregar el depósito al historial
    depositos.push(parseFloat(dinero));

    // Actualizar el historial en el Local Storage
    localStorage.setItem("depositos", JSON.stringify(depositos));

    mostrarCambios()
  }

  setTimeout(function () {
    mensajeDeposito.textContent = "";
  }, 2000);
});


// Logica de retirar dinero

btnRetirar.addEventListener('click', () => {
  const dineroRetirar = document.getElementById('dineroRetirado').value;

  if (dineroRetirar !== '') {
    mensajeExtracciones.textContent = "Se extrageron $" + dineroRetirar;
    document.getElementById("dineroRetirado").value = "";

    extracciones.push(parseFloat(dineroRetirar));

    localStorage.setItem("extracciones", JSON.stringify(extracciones));

    mostrarCambios()

  }
  setTimeout(function () {
    mensajeExtracciones.textContent = "";
  }, 2000);

})

//logica de las transferencias
btnTransferir.addEventListener('click', () => {
  const dineroTransferido = document.getElementById('dineroTransferido').value;
  const numeroCuenta = document.getElementById('numeroCuenta').value;

  if (dineroTransferido !== '' && numeroCuenta !== '') {

    const cuentaExiste = verificarNumeroCuenta(numeroCuenta);
    if (cuentaExiste) {

      mensajeTransferencia.textContent = "Se transfirieron $" + dineroTransferido;
      document.getElementById("dineroTransferido").value = "";
      document.getElementById("numeroCuenta").value = "";

      transferencias.push(parseFloat(dineroTransferido));

      localStorage.setItem("transferencias", JSON.stringify(transferencias));

      mostrarCambios()
    }

  }
  setTimeout(function () {
    mensajeTransferencia.textContent = "";
  }, 2000);

})

function verificarNumeroCuenta(numeroCuenta) {
  const cuentasValidas = ['12345', '456', '1357', '368'];
  return cuentasValidas.includes(numeroCuenta);
}

document.addEventListener("DOMContentLoaded", function () {
  nombreUsuario = localStorage.getItem("nombre")
  apellido = localStorage.getItem("apellido")

  welcomeMessage.textContent = `Hola ${(nombreUsuario + ' ' + apellido).toLocaleUpperCase()}`

  function actualizarSaldo() {

    const todosLosDepositos = depositos.reduce((a, b) => a + b, 0);
    const todosLasExtracciones = extracciones.reduce((a, b) => a + b, 0);
    const todasLasTransferencias = transferencias.reduce((a, b) => a + b, 0);
    const saldoFinal = todosLosDepositos - todosLasExtracciones - todasLasTransferencias;
    localStorage.setItem("saldo", JSON.stringify(saldoFinal));

    dineroDisponible.textContent = "Dinero disponible: $" + saldoFinal;

  }

  setInterval(actualizarSaldo, 2000);

})

let transferenciaGrafic = JSON.parse(localStorage.getItem("transferencias"))
let depositosGrafic = JSON.parse(localStorage.getItem("depositos"));
let extraccionesGrafic = JSON.parse(localStorage.getItem("extracciones"));

let sumaTransferencias = transferenciaGrafic ? transferenciaGrafic.reduce((total, valor) => total + valor, 0) : 0;
let sumaDepositos = depositosGrafic ? depositosGrafic.reduce((total, valor) => total + valor, 0) : 0;
let sumaExtracciones = extraccionesGrafic ? extraccionesGrafic.reduce((total, valor) => total + valor, 0) : 0;


//Utilizo la libreria chart para hacer graficos

const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {

  type: 'bar', // Tipo de gráfico: barras
  data: {
    labels: ['Depositos', 'Extracciones', 'Transferencias'], // Etiquetas para el eje X
    datasets: [{
      label: 'Actividad', // Etiqueta para la serie de datos
      data: [sumaDepositos, sumaExtracciones, sumaTransferencias], // Valores para la serie de datos
      backgroundColor: 'rgba(75, 192, 192, 0.2)', // Color de fondo de las barras
      borderColor: 'rgba(75, 192, 192, 1)', // Color del borde de las barras
      borderWidth: 1 // Ancho del borde de las barras
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true // El eje Y comienza en cero
      }
    }
  }
});

function actualizarGrafico() {

  let transferenciaGrafic = JSON.parse(localStorage.getItem("transferencias"))
  let depositosGrafic = JSON.parse(localStorage.getItem("depositos"));
  let extraccionesGrafic = JSON.parse(localStorage.getItem("extracciones"));
  
  let sumaTransferencias = transferenciaGrafic ? transferenciaGrafic.reduce((total, valor) => total + valor, 0) : 0;
  let sumaDepositos = depositosGrafic ? depositosGrafic.reduce((total, valor) => total + valor, 0) : 0;
  let sumaExtracciones = extraccionesGrafic ? extraccionesGrafic.reduce((total, valor) => total + valor, 0) : 0;

  // Actualizar los datos del gráfico
  myChart.data.datasets[0].data = [sumaDepositos, sumaExtracciones, sumaTransferencias];

  // Actualizar el gráfico
  myChart.update();
}

// Llamar a la función para actualizar el gráfico cada 5 segundos (5000 milisegundos)
setInterval(actualizarGrafico, 5000);