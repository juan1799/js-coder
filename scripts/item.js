const contenedorItem = document.querySelector(".contenedor-producto");

const add = document.querySelector("#add");
const sustract = document.querySelector("#sustract");
const quantity = document.querySelector("#quantity");

const productoSelect = JSON.parse(
  localStorage.getItem("producto-seleccionado")
);

console.log(productoSelect);

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
    <div class="producto__contador">
      <button class="contador__btn" id="sustract">
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
      <button class="contador__btn" id="add" >
        <iconify-icon
          class="icono-plus"
          icon="typcn:plus"
        ></iconify-icon>
      </button>

      <button class="btn-carrito" type="submit">Agregar al carrito</button>
    </div>
    <a href="#" class="producto__metodo-pago">
      <span class="metodo-pago__span">Ver metodos de pago</span> - 3
      CUOTAS SIN INTERES</a
    >
  </article>`;
  console.log(div);
  contenedorItem.append(div);
  agregarBotones();
}
cargarItem();

function agregarBotones() {
  const add = document.querySelector("#add");
  const sustract = document.querySelector("#sustract");
  const quantity = document.querySelector("#quantity");
  add.addEventListener(
    "click",
    () => (quantity.value = Number(quantity.value) + 1)
  );

  sustract.addEventListener("click", () => {
    quantity.value > 0 ? (quantity.value = Number(quantity.value) - 1) : 0;
  });
}
