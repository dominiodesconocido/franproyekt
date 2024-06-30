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
    elements.forEach((el) => {
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
        soundRate = map(event.clientX, 0, window.innerWidth, 1, 4); // Mapea la posición del mouse a la velocidad de reproducción (pitch)
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
            let rangeX = window.innerWidth / 2 - 150; // Ajusta el rango según tus preferencias
            let rangeY = window.innerHeight / 2 - 150; // Ajusta el rango según tus preferencias
            word.xOffset = constrain(word.xOffset, window.innerWidth / 2 - rangeX, window.innerWidth / 2 + rangeX);
            word.yOffset = constrain(word.yOffset, window.innerHeight / 2 - rangeY, window.innerHeight / 2 + rangeY);

            word.element.style.transform = `translate(${word.xOffset}px, ${word.yOffset}px)`; // Aplica el movimiento
        });
    } else {
        words.forEach(word => {
            word.yOffset = 0; // Resetea la posición cuando no se presiona el mouse
            word.xOffset = 0; // Resetea la posición cuando no se presiona el mouse
            word.element.style.transform = `translate(${word.xOffset}px, ${word.yOffset}px)`;
        });
    }
}

// Funciones de la página SOBRE
document.addEventListener('DOMContentLoaded', function() {
    const paragraphs = document.querySelectorAll('.full-page-container p');

    paragraphs.forEach(paragraph => {
        let words = paragraph.innerHTML.split(' ');
        let formattedWords = words.map(word => `<span class="word">${word}</span>`);
        paragraph.innerHTML = formattedWords.join(' ');
    });

    const wordElements = document.querySelectorAll('.word');
    wordElements.forEach(wordElement => {
        // Evento mouseover para resaltar palabras
        wordElement.addEventListener('mouseover', function() {
            highlightRandomWords();
        });

        // Evento click para restaurar color original
        wordElement.addEventListener('click', function() {
            resetText();
        });
    });

    function highlightRandomWords() {
        const numberOfWordsToHighlight = Math.floor(wordElements.length / 5);
        let highlightedIndices = new Set();
        while (highlightedIndices.size < numberOfWordsToHighlight) {
            highlightedIndices.add(getRandomInt(wordElements.length));
        }
        highlightedIndices.forEach(index => {
            wordElements[index].classList.add('highlight');
        });
    }

    function resetText() {
        wordElements.forEach(wordElement => {
            wordElement.classList.remove('highlight');
        });
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
});
