let productos = [];

const getProductos = async (ruta) => {
  const productosApi = await fetch(ruta);
  const productos = await productosApi.json();
  cargarEventosSlider(productos);
};
