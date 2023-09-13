// sistema de gestión de alumnos y notas

let nombreProf, apellidoProf, contrasenia;
let nota1 = 0,
  nota2 = 0,
  nota3 = 0;
let bandera = true;

const validarContrasenia = (contrasenia) => {
  if (contrasenia.length < 4) {
    return true;
  } else {
    return false;
  }
};

const creacionDeUsuario = () => {
  nombreProf = prompt("Ingrese su nombre");
  apellidoProf = prompt("Ingrese su apellido");
  contrasenia = prompt("Ingrese una contraseña de al menos 4 caracteres");
  while (validarContrasenia(contrasenia)) {
    contrasenia = prompt(
      "La contraseña no cumple con la cantidad de caracteres requeridos. Ingrese una contraseña con al menos 4 caracteres"
    );
  }
  alert("Usuario creado correctamente");
};

const calcularPromedio = (parcial1, parcial2, parcial3) => {
  let promedio = (parcial1 + parcial2 + parcial3) / 3;
  return promedio.toFixed(1);
};

const cargarAlumno = () => {
  let nombreAlu, apellidoAlu;
  let respuesta;
  respuesta = prompt("Desea cargar un alumno? (SI/NO)");
  while (respuesta.trim().toUpperCase() == "SI") {
    nombreAlu = prompt("Ingrese el nombre del alumno: ");
    apellidoAlu = prompt("Ingrese el apellido del alumno: ");
    nota1 = parseInt(prompt("Ingrese la nota del primer examen: "));
    nota2 = parseInt(prompt("Ingrese la nota del segundo examen: "));
    nota3 = parseInt(prompt("Ingrese la nota del tercer examen: "));

    alert(
      "El alumno: " +
        apellidoAlu +
        ", " +
        nombreAlu +
        " -- NOTAS: TP1: " +
        nota1 +
        " - TP2: " +
        nota2 +
        " - TP3: " +
        nota3 +
        ", con promedio de: " +
        calcularPromedio(nota1, nota2, nota3) +
        " fue cargado correctamente."
    );
    respuesta = prompt("Desea cargar otro alumno? (SI/NO)");
  }
};

const login = () => {
  let contra, apellido;
  alert("login");
  while (bandera) {
    apellido = prompt("Ingrese su apellido: ");
    contra = prompt("ingrese su contraseña:");
    if (
      apellido.trim().toUpperCase() == apellidoProf.trim().toUpperCase() &&
      contra.trim() == contrasenia.trim()
    ) {
      alert("Bienvenido profesor " + nombreProf);
      cargarAlumno();
      bandera = false;
    } else {
      alert("Apellido o contraseña incorrecta, vuelva a intentarlo");
    }
  }
};

const main = () => {
  let respuesta;
  respuesta = prompt("Desea simular la gestión de alumnos? (si/no)");
  if (respuesta.trim().toUpperCase() == "SI") {
    creacionDeUsuario();
    login();
  }
};

main();
