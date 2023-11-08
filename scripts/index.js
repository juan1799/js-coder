const getProductos = async () => {
  const productosApi = await fetch("../scripts/productos.json");
  productos = await productosApi.json();
  cargarEventosSlider(productos);
};

getProductos();

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
      window.location.href = "../pages/item.html";
    });
  });
}
