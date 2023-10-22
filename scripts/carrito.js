let productosCarrito = JSON.parse(localStorage.getItem("productos-en-carrito"));

const contenedorCarritoProductos = document.querySelector(".cart__items");
const popup = document.querySelector("#popup");
const botonPopup = document.querySelector("#boton-popup");
const puntito = document.querySelector(".cart__lleno");

pintarCarrito();

function cargarProductosEnCarrito() {
  contenedorCarritoProductos.innerHTML = "";
  if (productosCarrito) {
    productosCarrito.forEach((producto, index) => {
      const li = document.createElement("li");
      li.classList.add("cart__item");
      li.innerHTML = `
          <article class="cart__article">
              <picture class="article__cover">
              <img
                  class="article__image"
                  src="${producto.imagenfront}"
                  alt="FunkoPop de ${producto.nombre} de la serie ${
        producto.categoria.nombre
      }"
              />
              </picture>
              <div class="article__details">
              <div class="article__detail">
                  <h4 class="article__name">${producto.nombre}</h4>
                  <p class="article__licence">${producto.categoria.nombre}</p>
              </div>
              <p class="article__price">$ ${producto.precio}</p>
              </div>
          </article>
          <div class="producto__contador" id="${index}">
              <button class="contador__btn" id="sustract${index}">
              <iconify-icon
                  class="icono-minus"
                  icon="typcn:minus"
              ></iconify-icon>
              </button>
              <input
              class="contador"
              type="text"
              value="${producto.cantidad}"
              name="quantity"
              id="quantity${index}"
              disabled
              />
              <button class="contador__btn" id="add${index}">
              <iconify-icon
                  class="icono-plus"
                  icon="typcn:plus"
              ></iconify-icon>
              </button>
          </div>
          <div class="article__total">
              <h5 id="subtotal${index}">${calcularSubtotal(producto)}</h5>
          </div>
          <button class="cart__btn-delete" id="delete${index}">
              <iconify-icon
              class="cart__icono"
              icon="typcn:delete-outline"
              ></iconify-icon>
          </button>`;
      contenedorCarritoProductos.append(li);
    });
    resumen();
    agregarEventosBotonesCarrito();
  }
}

cargarProductosEnCarrito();

function calcularSubtotal(producto) {
  let subtotal = producto.precio * producto.cantidad;
  return parseFloat(subtotal.toFixed(2));
}

function agregarEventosBotonesCarrito() {
  const botonPagar = document.querySelector("#boton-resumen");

  productosCarrito.forEach((producto, index) => {
    const add = document.querySelector("#add" + index);
    const sustract = document.querySelector("#sustract" + index);
    const quantity = document.querySelector("#quantity" + index);
    const botonEliminar = document.querySelector("#delete" + index);
    const subtotal = document.querySelector("#subtotal" + index);

    add.addEventListener("click", () => {
      quantity.value = Number(quantity.value) + 1;
      productosCarrito[index].cantidad += 1;

      subtotal.innerText = calcularSubtotal(productosCarrito[index]);

      localStorage.setItem(
        "productos-en-carrito",
        JSON.stringify(productosCarrito)
      );
      resumen();
    });

    sustract.addEventListener("click", () => {
      if (quantity.value > 1) {
        quantity.value = Number(quantity.value) - 1;
        productosCarrito[index].cantidad -= 1;
        subtotal.innerText = calcularSubtotal(productosCarrito[index]);
        localStorage.setItem(
          "productos-en-carrito",
          JSON.stringify(productosCarrito)
        );
      } else {
        quantity.value = 1;
      }
      resumen();
    });

    botonEliminar.addEventListener("click", () => {
      productosCarrito.splice(index, 1);
      localStorage.setItem(
        "productos-en-carrito",
        JSON.stringify(productosCarrito)
      );
      cargarProductosEnCarrito();
      resumen();
      pintarCarrito();
      if (productosCarrito.length == 0) {
        botonPagar.classList.add("color-disable");
      }
    });
  });

  console.log(productosCarrito);
  if (productosCarrito.length === 0) {
    botonPagar.classList.add("color-disable");
  } else {
    botonPagar.addEventListener("click", () => {
      productosCarrito = [];
      localStorage.setItem(
        "productos-en-carrito",
        JSON.stringify(productosCarrito)
      );
      cargarProductosEnCarrito();
      popup.classList.remove("disable");
      pintarCarrito();
    });
  }

  botonPopup.addEventListener("click", () => popup.classList.add("disable"));
}

function resumen() {
  const resumen = document.querySelector("#cart__summary");
  resumen.innerHTML = "";
  let cantidadTotal = 0;
  let total = 0;
  productosCarrito.forEach((producto) => {
    cantidadTotal += producto.cantidad;
    total += calcularSubtotal(producto);
  });

  resumen.innerHTML = `   <h2 class="summary__title"><span>Resumen</span></h2>
  <article class="summary__details">
    <div class="summary__detail">
      <p class="summary__description">Cantidad de elementos</p>
      <p class="summary__value">${cantidadTotal}</p>
    </div>
    <div class="summary__detail">
      <p class="summary__description">Subtotal</p>
      <p class="summary__value">$ ${total.toFixed(2)}</p>
    </div>
    <div class="summary__detail summary-envio">
      <p class="summary__description">Envio</p>
      <p class="summary__value">$ 0,00</p>
    </div>
    <div class="summary__detail">
      <p class="summary__description">Total</p>
      <p class="summary__total">$ ${total.toFixed(2)}</p>
    </div>
  </article>

  <button class="btn-carrito btn-summary" id="boton-resumen">Ir a Pagar</button>`;
}

function pintarCarrito() {
  productosCarrito.length !== 0
    ? puntito.classList.remove("disable")
    : puntito.classList.add("disable");
}
