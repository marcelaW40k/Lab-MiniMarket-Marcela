const btnAgregar = document.querySelectorAll(".btnAgregar");
const lista = document.querySelector("#lista-carrito");
const total = document.querySelector("#total");
const btnVaciar = document.querySelector("#btn-vaciar");
const carritoVacio = document.querySelector("#carritoVacio");
const badge = document.querySelector("#badge");

let cantidadItems = 0;
let totalAcumulado = 0;
btnAgregar.forEach((boton) => {
  boton.addEventListener("click", function () {
    const nombre = boton.dataset.nombre;
    const precio = Number(boton.dataset.precio);
    agregarAlCarrito(nombre, precio);
  });
});

function agregarAlCarrito(nombre, precio) {
  carritoVacio.style.display = "none";
  const li = document.createElement("li");
  const spanTexto = document.createElement("span");
  spanTexto.textContent = `${nombre} - ${precio}`;

  const btnEliminar = document.createElement("button");
  btnEliminar.textContent = "X";
  li.classList.add("itemProducto");

  li.appendChild(spanTexto);
  li.appendChild(btnEliminar);

  lista.appendChild(li);
  cantidadItems++;
  totalAcumulado += precio;

  updateBadge();
  updateTotal();

  btnEliminar.addEventListener("click", function () {
    eliminarItem(li, precio);
  });
}

function updateBadge() {
  badge.textContent = cantidadItems;
}

function updateTotal() {
  total.textContent =
    "$" + totalAcumulado.toLocaleString("es-CO", { minimumFractionDigits: 2 });
}

function eliminarItem(li, precio) {
  li.remove();

  cantidadItems--;
  totalAcumulado -= precio;

  updateBadge();
  updateTotal();

  if (cantidadItems === 0) {
    carritoVacio.style.display = "block";
  }
}

btnVaciar.addEventListener("click", function () {
  const confirmar = confirm("¿Esta seguro que desea vaciar el carrito?");
  if (confirmar) {
    lista.querySelectorAll("li:not(#carritoVacio)").forEach((item) => {
      item.remove();
    });
    badge.textContent = 0;
    total.textContent = 0;

    carritoVacio.style.display = "block";
  }
});
