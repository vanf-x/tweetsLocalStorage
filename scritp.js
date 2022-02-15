const formulario = document.querySelector("#formulario");
const boton = document.querySelector("#boton");
const tweets = document.querySelector("#tweets");
const textArea = document.querySelector("#t-area");
const boton2 = document.querySelector("#boton2");
let arTweets = [];
let arrayEnviado, arrayTraido;

//cuando se carga el documento, si hay algo en el local storage lo trae
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.length) {
    //si no se pone ésto arTweets es null y tira error
    arTweets = JSON.parse(localStorage.getItem("Array"));
    //con esto te carga de una todos los tweets que ya haya en el ls
    crearTweet();
  }
});


//evento cuando da click en el input submit del formulario
formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  //cartel de error si el tweet está vacío
  if (textArea.value === "") {
    //previene que el cartel se lance muchas veces si ya tiene clase error
    if (formulario.lastElementChild.classList.contains("error")) {
      return;
    }
    mensajeError("No podés enviar un mensaje vacío");
    return;
  } else {
    //si todo bien, el contenido de textArea va para el arreglo artweets
    arTweets.push(textArea.value);
    // envía el contenido del arreglo a localStorage y lo crea en el HTML
    arrayEnviado = JSON.stringify(arTweets);
    localStorage.setItem("Array", arrayEnviado);
    textArea.value = "";
    crearTweet();
  }
});
// el botón 2 borra los tweets que haya en el html y en el local storage
boton2.addEventListener("click", () => {
  localStorage.clear();
  arTweets = [];
  limpiarHTML();
});

//se crea el mensaje de error para cuando manden el tweet vacío
function mensajeError(error) {
  const p = document.createElement("p");
  p.textContent = error;
  formulario.appendChild(p);
  p.classList.add("error");
  setTimeout(() => {
    p.remove();
  }, 1500);
}

// por cada elemento en artweets, se crea un <li> para agregar cada uno
function crearTweet() {
  limpiarHTML();
  arTweets.forEach((tweet) => {
    const li = document.createElement("li");
    li.textContent = tweet;
    tweets.appendChild(li);
  });
}

//función para borrar lo que haya en el HTML, así cuando se sube un tweet no se acumulan y se suben más de una vez
function limpiarHTML() {
  //siempre que el div tweets tenga contenido, borrarlo
  while (tweets.firstChild) {
    tweets.removeChild(tweets.firstChild);
  }
}
