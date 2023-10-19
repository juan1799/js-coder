import productos from "./productos.json" assert { type: "json" };

const contenedorProductos = document.querySelector("#contenedor-productos");
const botones = document.querySelectorAll(".categoria__boton");
const titulo = document.querySelector("#titulo-principal");
let items = document.querySelectorAll(".card-item");

function cargarProductos(categoria) {
  contenedorProductos.innerHTML = "";

  categoria.forEach((producto) => {
    const li = document.createElement("li");
    li.classList.add("slider__item");
    li.innerHTML = `
    <article class="card-item" id="${producto.id}">

      <picture class="card-item__cover">
        <span class="card-item__tag">Nuevo</span>
        <img
          class="card-item__img--front"
          src="${producto.imagenfront}"
          alt="FunkoPop de ${producto.nombre} de la serie ${producto.categoria.nombre}"
        />
        <img
          class="card-item__img--back"
          src="${producto.imagenback}"
          alt="FunkoPop de ${producto.nombre} de la serie ${producto.categoria.nombre} en caja"
        />
      </picture>
      <div class="card-item__content">
        <p class="card-item__licence">${producto.categoria.nombre}</p>
        <h4 class="card-item__name">${producto.nombre}</h4>
        <p class="card-item__price">$ ${producto.precio}</p>
        <p class="card-item__promo">3 CUOTAS SIN INTERÉS</p>
      </div>
    
  </article>
    `;
    console.log(li);
    contenedorProductos.append(li);
  });
  cargarEventosItems();
  console.log(items);
}
cargarProductos(productos);

botones.forEach((boton) => {
  boton.addEventListener("click", (evento) => {
    botones.forEach((b) => b.classList.remove("active"));
    evento.currentTarget.classList.add("active");
    console.log(evento.currentTarget.id);
    if (evento.currentTarget.id !== "todos") {
      const categoria = productos.filter(
        (producto) => producto.categoria.id === evento.currentTarget.id
      );
      const tituloCategoria = productos.find(
        (producto) => producto.categoria.id === evento.currentTarget.id
      );
      titulo.innerText = tituloCategoria.categoria.nombre;
      cargarProductos(categoria);
    } else {
      titulo.innerText = "todos los productos";
      cargarProductos(productos);
    }
  });
});

function cargarEventosItems() {
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
      window.location.href = "../pages/item.html";
    });
  });
}
