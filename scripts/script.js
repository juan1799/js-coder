const productos = [
  {
    nombre: "STORMTROOPER LIGTHSABER",
    id: "funko01",
    stock: 10,
    precio: 1799.99,
    categoria: {
      id: "star-wars",
      nombre: "star wars",
    },
  },
  {
    nombre: "PIDGEOTTO",
    id: "funko02",
    stock: 10,
    precio: 1799.99,
    categoria: {
      id: "pokemon",
      nombre: "pokemon",
    },
  },
  {
    nombre: "LUNA LOVE LIONMASK",
    id: "funko03",
    stock: 10,
    precio: 1799.99,
    categoria: {
      id: "harry-potter",
      nombre: "harry potter",
    },
  },
  {
    nombre: "HERMIONE GRANGER",
    id: "funko04",
    stock: 10,
    precio: 1799.99,
    categoria: {
      id: "harry-potter",
      nombre: "harry potter",
    },
  },
  {
    nombre: "HARRY POTTER",
    id: "funko05",
    stock: 10,
    precio: 1799.99,
    categoria: {
      id: "harry-potter",
      nombre: "harry potter",
    },
  },
  {
    nombre: "PATRONUS SEVERUS SNAPE",
    id: "funko06",
    stock: 10,
    precio: 1799.99,
    categoria: {
      id: "harry-potter",
      nombre: "harry potter",
    },
  },
  {
    nombre: "CHARMANDER",
    id: "funko07",
    stock: 10,
    precio: 1799.99,
    categoria: {
      id: "pokemon",
      nombre: "pokemon",
    },
  },
  {
    nombre: "DRAGONITE",
    id: "funko08",
    stock: 10,
    precio: 1799.99,
    categoria: {
      id: "pokemon",
      nombre: "pokemon",
    },
  },
  {
    nombre: "PIKACHU",
    id: "funko09",
    stock: 10,
    precio: 1799.99,
    categoria: {
      id: "pokemon",
      nombre: "pokemon",
    },
  },
  {
    nombre: "VULPIX",
    id: "funko10",
    stock: 10,
    precio: 1799.99,
    categoria: {
      id: "pokemon",
      nombre: "pokemon",
    },
  },
  {
    nombre: "BABY YODA",
    id: "funko11",
    stock: 10,
    precio: 1799.99,
    categoria: {
      id: "star-wars",
      nombre: "star wars",
    },
  },
  {
    nombre: "BOBA FETH",
    id: "funko12",
    stock: 10,
    precio: 1799.99,
    categoria: {
      id: "star-wars",
      nombre: "star wars",
    },
  },
  {
    nombre: "LUKE SKYWALKER",
    id: "funko13",
    stock: 10,
    precio: 1799.99,
    categoria: {
      id: "star-wars",
      nombre: "star wars",
    },
  },
];

/* ------------------------------- */
let bandera = true;
let respuesta, compra;
let productosEnCarrito = [];

main();

function validarOpcionSiNO(op) {
  if (op.toUpperCase().trim() == "SI") {
    return true;
  } else {
    return false;
  }
}

function main() {
  respuesta = prompt("Desea simular la compra de funkos? (SI/NO)");

  validarOpcionSiNO(respuesta)
    ? menuProductos()
    : alert("saliendo de la simulacion");
}

function menuProductos() {
  let nombresProductos = "";
  productos.forEach(function concatenar(producto, i) {
    let contador = i + 1;
    nombresProductos =
      nombresProductos + contador + "- " + producto.nombre + "\n";
  });
  opcion = parseInt(
    prompt(
      "TIENDA FUNKOS (Para salir presione 0)\nSeleccione un producto:\n" +
        nombresProductos
    )
  );
  validarOpcion(opcion);
}

function validarOpcion(opcion) {
  let banderaOpcion = true;
  let op2;
  while (banderaOpcion) {
    if (opcion > 0 && opcion < 14) {
      mostrarProducto(opcion);
      banderaOpcion = false;
    } else if (opcion === 0) {
      if (productosEnCarrito.length === 0) {
        alert("El carrito está vacio, terminando la simulación ");
      } else {
        alert(
          "Carrito de compra: \n" +
            concatenarCarrito() +
            "\nEl total a pagar es: $" +
            calcularTotal().toFixed(2)
        );
      }
      banderaOpcion = false;
    } else {
      alert("Ingrese una opcion correcta: (respuesta esperada: 1,2,...,13)");
      menuProductos();
    }
  }
}
function mostrarProducto(opcion) {
  op2 = prompt(
    "Desea comprar el funko: " +
      productos[opcion - 1].nombre +
      "\nPrecio: $" +
      productos[opcion - 1].precio +
      "\nStock: " +
      productos[opcion - 1].stock +
      "\n\nRESPUESTA ESPERADA: SI / NO"
  );
  if (op2.toLocaleLowerCase().trim() == "si") {
    agregarAlCarrito(productos[opcion - 1], opcion - 1);
  } else {
    alert("volviendo al menu de productos");
    menuProductos();
  }
}

function agregarAlCarrito(producto, i) {
  let cantidad, op;
  const productoAgregado = productos.find((p) => p.id === producto.id);
  cantidad = parseFloat(
    prompt(
      "Ingrese la cantidad funkos de " +
        producto.nombre +
        " desea comprar, stock maximo de " +
        producto.stock
    )
  );
  if (cantidad > 0 && cantidad <= productoAgregado.stock) {
    productos[i].stock -= cantidad;
    if (productosEnCarrito.some((p) => p.id === producto.id)) {
      const index = productosEnCarrito.findIndex((p) => p.id === producto.id);
      productosEnCarrito[index].cantidad += cantidad;
    } else {
      productoAgregado.cantidad = cantidad;
      productosEnCarrito.push(productoAgregado);
    }

    console.log(productoAgregado);
    op = prompt(
      "El producto fue agregado al carrito, desea seguir comprando? (SI/NO)"
    );
    if (validarOpcionSiNO(op)) {
      menuProductos();
    } else {
      alert(
        "Carrito de compra: \n" +
          concatenarCarrito() +
          "\nEl total a pagar es: $" +
          calcularTotal().toFixed(2)
      );
    }
  } else {
    alert("la cantidad ingresada supera el stock maximo de " + producto.stock);
    menuProductos();
  }
}

function calcularTotal() {
  let total = 0;
  productosEnCarrito.forEach(function sumar(producto) {
    total += producto.cantidad * producto.precio;
  });
  return total;
}

function concatenarCarrito() {
  let concatenacion = "";
  productosEnCarrito.forEach(function concat(producto) {
    concatenacion =
      "Producto: " +
      producto.nombre +
      " - cantidad: " +
      producto.cantidad +
      " - subtotal: $" +
      producto.cantidad * producto.precio +
      "\n" +
      concatenacion;
  });
  return concatenacion;
}
