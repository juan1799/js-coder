getProductos("../scripts/productos.json");

let items = document.querySelectorAll(".card-item");
const contenedorItem = document.querySelector(".contenedor-producto");
const add = document.querySelector("#add");
const sustract = document.querySelector("#sustract");
const quantity = document.querySelector("#quantity");
toastBox = document.querySelector("#toast-box");

const productoSelect = JSON.parse(
  localStorage.getItem("producto-seleccionado")
);

pintarCarrito();

function cargarItem() {
  const div = document.createElement("div");
  div.classList.add("producto");
  div.innerHTML = `<picture class="producto__cover">
    <img
      class="producto__img--front"
      src="${productoSelect.imagenfront}"
      alt="FunkoPop de ${productoSelect.nombre} de la serie ${productoSelect.categoria.nombre}"
    />
    <img
      class="producto__img--back"
      src="${productoSelect.imagenback}"
      alt="FunkoPop de ${productoSelect.nombre} de la serie ${productoSelect.categoria.nombre}"
    />
  </picture>
  <article class="producto__content">
    <p class="producto__collection">${productoSelect.categoria.nombre}</p>
    <h3 class="producto__title">${productoSelect.nombre}</h3>
    <p class="producto__description">
      ${productoSelect.descripcion}
    </p>
    <p class="producto__price">$ ${productoSelect.precio}</p>

    <form class="producto__contador" id="contador">
      <button class="contador__btn color-disable" type="button" id="sustract">
        <iconify-icon
          class="icono-minus"
          icon="typcn:minus"
        ></iconify-icon>
      </button>
      <input
        class="contador"
        type="text"
        value="0"
        name="quantity"
        id="quantity"
        disabled
      />
      <button class="contador__btn" type="button"  id="add" >
        <iconify-icon
          class="icono-plus"
          icon="typcn:plus"
        ></iconify-icon>
      </button>

      <button class="btn-carrito color-disable" type="submit" id="btn-carrito">Agregar al carrito</button>
    </form>
    <a href="#" class="producto__metodo-pago">
      <span class="metodo-pago__span">Ver metodos de pago</span> - 3
      CUOTAS SIN INTERES</a
    >
  </article>`;

  contenedorItem.append(div);
  agregarEventos();
}
cargarItem();

function agregarEventos() {
  const add = document.querySelector("#add");
  const sustract = document.querySelector("#sustract");
  const quantity = document.querySelector("#quantity");
  const contador = document.getElementById("contador");

  let valor;

  contador.addEventListener("submit", (e) => {
    e.preventDefault();

    valor = parseInt(contador.children[1].value);
    if (valor > 0) {
      agregarAlCarrito(valor);
      pintarCarrito();
      mostrarToast();
      quantity.value = 0;
      contador.children[3].classList.add("color-disable");
      contador.children[0].classList.add("color-disable");
    }
  });

  add.addEventListener("click", () => {
    quantity.value = Number(quantity.value) + 1;
    contador.children[3].classList.remove("color-disable");
    contador.children[0].classList.remove("color-disable");
  });

  sustract.addEventListener("click", () => {
    if (quantity.value > 1) {
      quantity.value = Number(quantity.value) - 1;
    } else {
      quantity.value = 0;
      contador.children[3].classList.add("color-disable");
      contador.children[0].classList.add("color-disable");
    }
  });
}

function agregarAlCarrito(valor) {
  let productoAgregado = productoSelect;
  if (
    productosEnCarrito.some((producto) => producto.id === productoAgregado.id)
  ) {
    const index = productosEnCarrito.findIndex(
      (producto) => producto.id === productoAgregado.id
    );
    productosEnCarrito[index].cantidad += valor;
  } else {
    productoAgregado.cantidad = valor;
    productosEnCarrito.push(productoAgregado);
  }
  localStorage.setItem(
    "productos-en-carrito",
    JSON.stringify(productosEnCarrito)
  );
}

function mostrarToast() {
  let toast = document.createElement("div");
  toast.classList.add("toast");
  toast.innerHTML =
    '<a href="./carrito.html" class="toast__link"> <iconify-icon class="toast__icon" icon="icon-park-solid:success"></iconify-icon> Agregado al carrito correctamente </a>';
  toastBox.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 5500);
}

function cargarEventosSlider(productos) {
  items = document.querySelectorAll(".card-item");
  items.forEach((item) => {
    item.addEventListener("click", (e) => {
      const idProducto = e.currentTarget.id;
      const productoSeleccionado = productos.find(
        (producto) => producto.id === idProducto
      );
      localStorage.setItem(
        "producto-seleccionado",
        JSON.stringify(productoSeleccionado)
      );
      location.reload();
    });
  });
}
