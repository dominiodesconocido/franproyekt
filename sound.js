let wordsArray = [];
let song;
let soundRate = 1;

function preload() {
  song = loadSound(
    'audios/fran1.mp3',
    () => {
      console.log('Audio cargado correctamente');
    },
    (err) => {
      console.error('Error al cargar el audio', err);
    }
  );
}

// evento de clic del mouse para iniciar o detener el movimiento y reproducir la canción
function mouseClicked() {
  if (!song._playing) {
    song.loop(); // reproduce la canción cuando se hace clic
  } else {
    song.stop(); // detiene la canción cuando se hace clic nuevamente
  }
}

function setup() {
  noCanvas();
  // selecciona los elementos de las palabras
  let elements = document.querySelectorAll('.titulo-index span');
  elements.forEach((el, index) => {
    let pos = el.getBoundingClientRect();
    wordsArray.push({
      element: el,
      originalX: pos.left,
      originalY: pos.top,
      xOffset: pos.left + el.offsetWidth / 0,
      yOffset: pos.top + el.offsetHeight / 1,
      speed: random(0, 8),
    });
  });
}

function draw() {
  soundRate = map(mouseX, 0, window.innerWidth, 1, 4); // mapea la posición del mouse a la velocidad de reproducción (pitch)
  song.rate(soundRate); // actualiza la velocidad de reproducción de la canción

  if (song._playing) {
    // Limpia el lienzo en cada frame
    wordsArray.forEach((word) => {
      // aplica movimiento aleatorio centrado en el punto medio de la pantalla
      word.yOffset += random(-2, 1) * word.speed;
      word.xOffset += random(-8, 4) * word.speed;
      // limita el movimiento dentro de un rango centrado en el punto medio de la pantalla
      let maxXOffset = window.innerWidth - word.element.offsetWidth;
      let maxYOffset = window.innerHeight - word.element.offsetHeight;
      word.xOffset = constrain(word.xOffset, 7, maxXOffset);
      word.yOffset = constrain(word.yOffset, 2, maxYOffset);
      word.element.style.transform = `translate(${word.xOffset}px, ${word.yOffset}px)`; // Aplica el movimiento
    });
  } else {
    // limpia el lienzo en cada frame
    wordsArray.forEach((word) => {
      word.yOffset = 0; // resetea la posición cuando no se presiona el mouse
      word.xOffset = 0; // resetea la posición cuando no se presiona el mouse
      word.element.style.transform = `translate(${word.xOffset}px, ${word.yOffset}px)`;
    });
  }
}
