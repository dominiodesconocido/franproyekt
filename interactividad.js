


// PAGINA SOBRE

document.addEventListener('DOMContentLoaded', function() {
    const paragraphs = document.querySelectorAll('.full-page-container p');

    paragraphs.forEach(paragraph => {
        let words = paragraph.innerHTML.split(' ');
        let formattedWords = words.map(word => `<span class="word">${word}</span>`);
        paragraph.innerHTML = formattedWords.join(' ');
    });

    const wordElements = document.querySelectorAll('.word');
    wordElements.forEach(wordElement => {
        //  resaltar palabras
        wordElement.addEventListener('mouseover', function() {
            highlightRandomWords();
        });

        // restaurar color original
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

