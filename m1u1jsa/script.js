function cambiartexto(){
    const titulo = document.getElementById ("titulo")
    titulo.textContent ="Hola cabeza de huevo!!";
}

function agregarelemento() {
  const lista = document.getElementById("lista");
  const nuevoitem = document.createElement("li");
  nuevoitem.textContent = "nuevo elemento";
  lista.appendChild(nuevoitem);
}

const cuadrados = document.querySelectorAll (".cuadrado");


cuadrados.forEach ((cuadrado)=>{
    cuadrado.addEventListener ("click",()=>{
        const color = cuadrado.getAttribute("data-color");
        document.body.style.backgroundColor = color;

    })
})

function cambiarcolorbotones(){
    const botones = document.querySelectorAll("button");
    botones.forEach ((boton)=>{
        const color = getrandomcolor();
        boton.style.backgroundColor = color; 
    });
}
function getrandomcolor(){
    const r = Math.floor(Math.random() * 256 );
    const g = Math.floor(Math.random() * 256 );
    const b = Math.floor(Math.random() * 256 );
    return `rgb(${r}, ${g}, ${b})`;
}

const textarea = document.getElementById ("mitextarea");
const contador = document.getElementById("contador");
textarea.addEventListener("input", ()=>{
    contador.textContent = textarea.value.length;
});
