const productosCarrito = JSON.parse(
  localStorage.getItem("productos-en-carrito")
);

const contenedorCarritoProductos = document.querySelector(".cart__items");

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
            <p class="article__price">${producto.precio}</p>
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
            <h5>$ ${calcularSubtotal(producto)}</h5>
        </div>
        <button class="cart__btn-delete">
            <iconify-icon
            class="cart__icono"
            icon="typcn:delete-outline"
            ></iconify-icon>
        </button>`;
    contenedorCarritoProductos.append(li);
  });
}

function calcularSubtotal(producto) {
  let subtotal = producto.precio * producto.cantidad;
  return subtotal;
}
