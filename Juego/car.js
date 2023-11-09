var canvas = document.getElementById("animacion");
var ctx = canvas.getContext('2d');   //pincel 

const background = new Image();
background.src = 'paisajeRam.png';
let position = 0;

var img = new Image();
img.src = "tesla2.png";

var img1 = new Image();
img1.src = "ford.png";

var img2 = new Image();
img2.src = "copa.png";

var x = canvas.width/2-800;
var y = canvas.height/2+70;

var nuevaX = x + dx;
var nuevaY = y + dy;

var minY = 280;  // Cambia esto al límite superior deseado
var maxY = canvas.height - 280;  // Cambia esto al límite inferior deseado

var x_enemigo=0;
var y_enemigo=0;
var dx =0;
var dy = 0; // Velocidad de movimiento vertical
var posY = 0; // Posición inicial en el eje Y
var indice = 0;
var fast=5;
var banderaEnemigos = 0;

var score = 0;
var nivel = 1;
var banderaColision=false;

let Z = 
    [
        [51,125,442,200,200,90]
    ]

let M = 
    [
        [29,79,295,148,200,90],
    ]

    let C = 
    [
        [canvas.width/2+800,Math.floor(Math.random()*((maxY-80)-minY) + minY)],
    ]  


    x_enemigo=C[indice][0];
    y_enemigo=C[indice][1];

img.onload = function (){ //carga la imagen y despues ejecuta la funcion 
	setInterval(draw,10);
}

background.onload = function(){
    moverFondo(); // Inicia la animación de fondo
}

document.addEventListener("keydown", detectarTecla);
document.addEventListener("keyup", detenerMovimiento);

function detectarTecla(e) {
    if (e.keyCode == 38) {
        dy = -5; // Mover arriba
    }
    if (e.keyCode == 40) {
        dy = 5; // Mover abajo
    }
    if (e.keyCode == 39) {
        dx = 5; // Mover a la derecha
    }
    if (e.keyCode == 37) {
        dx = -10; // Mover a la izquierda
    }
}



function detenerMovimiento(e) {
    if (e.keyCode == 38 || e.keyCode == 40) {
        dy = 0; // Detener el movimiento cuando se suelta la tecla
    }
    if (e.keyCode == 37 || e.keyCode == 39) {
        dx = 0; // Detener el movimiento cuando se suelta la tecla
    }

}


var juegoDetenido = false; // Variable para controlar si el juego está detenido

function draw() {
    if (!juegoDetenido) { // Verificar si el juego no está detenido
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpia el lienzo
        dibujaFondo();
        dibujaFondo2();
        dibujaCarro();
        enemigos();
        ctx.font = "36px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"; // Cambia la fuente
        ctx.fillStyle = "white"; // Cambia el color del texto
        ctx.textAlign = "right"; // Alinea el texto a la derecha
        ctx.textBaseline = "top"; // Alinea el texto en la parte superior
        ctx.fillText("Score: " + score, canvas.width - 20, 20); // Alinea el texto en la esquina superior derecha
        ctx.font = "36px 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"; // Cambia la fuente
        ctx.fillStyle = "white"; // Cambia el color del texto
        ctx.textAlign = "right"; // Alinea el texto a la derecha
        ctx.textBaseline = "top"; // Alinea el texto en la parte superior
        ctx.fillText("Nivel: " + nivel, canvas.width - 600, 20); // Alinea el texto en la esquina superior derecha
        var nuevaX = x + dx;
        var nuevaY = y + dy;

        // Verifica si el nuevo lugar estaría dentro de los límites del canvas
        if (nuevaX >= 0 && nuevaX + Z[indice][4] <= canvas.width) {
            x = nuevaX;
        }
        minY = 280;  // Cambia esto al límite superior deseado
        maxY = canvas.height - 280;  // Cambia esto al límite inferior deseado

        if (nuevaY >= minY && nuevaY + Z[indice][5] <= maxY) {
            y = nuevaY;
        }
        detectarColision(); // Colisión debe detectarse fuera del bloque if
        if (banderaColision) {
            juegoDetenido = true; // Detener el juego si hay una colisión
        }
    }
}

function dibujaCarro(){
    ctx.drawImage(img,Z[indice][0],Z[indice][1],Z[indice][2],Z[indice][3],x,y, Z[indice][4],Z[indice][5]);
    indice = (indice+1) % 1;
    
}

function enemigos(){
    ctx.drawImage(img1,M[indice][0],M[indice][1],M[indice][2],M[indice][3],C[indice][0],C[indice][1], M[indice][4],M[indice][5]);
    indice = (indice+1) % 1; 
    // Aumentar la velocidad de los carros si el score es mayor a 5
    if (score > 5) {
        nivel = 2;
        fast = 10;; // Ajusta la velocidad como desees
    }
  
    C[indice][0] = C[indice][0] - fast;
    x_enemigo = C[indice][0];
    y_enemigo = C[indice][1];
    if (C[indice][0]== -300) {
        score += 1;
        if (score == 20) {
            alert("¡Ganaste!");
        }
        C[indice][0]= canvas.width/2+800;
        C[indice][1]=Math.floor(Math.random()*((maxY-80)-minY) + minY)
        enemigos();
    
}

}

function dibujaFondo(){
    ctx.drawImage(background, position, 0, canvas.width, canvas.height); 
}

function dibujaFondo2(){
    const secondBackgroundX = position + canvas.width;
    ctx.drawImage(background, secondBackgroundX, 0, canvas.width, canvas.height);
}

function moverFondo() {
    position -= 8; //nueva posición del fondo
    if (position <= -canvas.width) 
        position = 0;  //reinicia para la prox imagen seguida 
        requestAnimationFrame(moverFondo);  // llama nuevamente a la función en el sig cuadro disponible
}
function detectarColision(){
   /* if(x+Z[indice][2]>=x_enemigo && x<=x_enemigo+M[indice][2] && y+Z[indice][3]>=y_enemigo && y<M[indice][3])
        banderaColision=true;
        
    }*/
        // Verificar si hay una colisión entre el carro y el enemigo (ajusta las coordenadas y tamaños según tu juego)
        if (
            x + Z[indice][2]-300 > x_enemigo &&
            x < x_enemigo + M[indice][2]-200 &&
            y + Z[indice][3]-100 > y_enemigo &&
            y < y_enemigo + M[indice][3]-100
        ) {
            banderaColision = true; // Se establece la bandera de colisión en true
        }
    
    
}
