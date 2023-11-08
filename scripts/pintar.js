let puntito = document.querySelector(".cart__lleno");
let toastBox = document.querySelector("#toast-box");
let productosCarritoLS = JSON.parse(
  localStorage.getItem("productos-en-carrito")
);

let productosEnCarrito;

productosCarritoLS
  ? (productosEnCarrito = productosCarritoLS)
  : (productosEnCarrito = []);

function pintarCarrito() {
  productosEnCarrito.length !== 0
    ? puntito.classList.remove("disable")
    : puntito.classList.add("disable");
}

pintarCarrito();
