

let words = [];
let isMoving = false;
let song;
let soundRate = 1;

function preload() {
    song = loadSound('audios/franfranfranfran.wav'); // Reemplaza 'ruta/de/tu/cancion.mp4' con la ubicación de tu archivo de música
}

function setup() {
    noCanvas(); 

    // Selecciona los elementos de las palabras
    let elements = document.querySelectorAll('.titulo-index span');
    elements.forEach((el, index) => {
        let pos = el.getBoundingClientRect();
        words.push({ 
            element: el, 
            originalX: pos.left, 
            originalY: pos.top, 
            xOffset: pos.left + el.offsetWidth / 2,
            yOffset: pos.top + el.offsetHeight / 2,
            speed: random(1, 10) 
        });
    });

    // Evento de clic del mouse para iniciar o detener el movimiento y reproducir la canción
    window.addEventListener('click', () => {
        isMoving = !isMoving;
        if (isMoving) {
            song.loop(); // Reproduce la canción cuando se hace clic
        } else {
            song.stop(); // Detiene la canción cuando se hace clic nuevamente
        }
    });

    // Evento de arrastre del mouse para cambiar la velocidad de reproducción de la canción
    window.addEventListener('mousemove', (event) => {
        soundRate = map(event.clientX, 0, window.innerWidth, 1, 4 ); // Mapea la posición del mouse a la velocidad de reproducción (pitch)
        song.rate(soundRate); // Actualiza la velocidad de reproducción de la canción
    });
}

function draw() {
    if (isMoving) {
     

        words.forEach(word => {
            // Aplica movimiento aleatorio centrado en el punto medio de la pantalla
            word.yOffset += random(-1, 1) * word.speed;
            word.xOffset += random(-1, 1) * word.speed;

            // Limita el movimiento dentro de un rango centrado en el punto medio de la pantalla
            let rangeX = window.innerWidth / 0 - 150; // Ajusta el rango según tus preferencias
            let rangeY = window.innerHeight / 0 - 150; // Ajusta el rango según tus preferencias
            word.xOffset = constrain(word.xOffset, window.innerWidth / 2 - rangeX, window.innerWidth / 1 + rangeX);
            word.yOffset = constrain(word.yOffset, window.innerHeight / 2  - rangeY, window.innerHeight / 1 + rangeY);

            word.element.style.transform = `translate(${word.xOffset}px, ${word.yOffset}px)`; // Aplica el movimiento
        });
    } else {
        background(0); // Limpia el lienzo en cada frame

        words.forEach(word => {
            word.yOffset = 0; // Resetea la posición cuando no se presiona el mouse
            word.xOffset = 0; // Resetea la posición cuando no se presiona el mouse
            word.element.style.transform = `translate(${word.xOffset}px, ${word.yOffset}px)`;
        });
    }
}

// Definición básica de las funciones increment, save y reset
function increment() {
    console.log("Increment function called");
    // Lógica de incremento
}

function save() {
    console.log("Save function called");
    // Lógica de guardado
}

function reset() {
    console.log("Reset function called");
    // Lógica de reinicio
}
  

window.increment = increment
window.save = save
window.reset = reset

console.log(setup)
new p5();


