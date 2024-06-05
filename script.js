const movesContainer = document.querySelector('.moves-container');
const sequenceContainer = document.getElementById('sequence');
const messageBox = document.getElementById('message');

const correctSequence = ['F', 'H', 'S', 'H', 'C', 'T', 'W'];

// Drag and Drop functionality
movesContainer.addEventListener('dragstart', (e) => {
    if (e.target.classList.contains('move')) {
        e.dataTransfer.setData('text/plain', e.target.dataset.move);
    }
});

sequenceContainer.addEventListener('dragover', (e) => {
    e.preventDefault();
});

sequenceContainer.addEventListener('drop', (e) => {
    e.preventDefault();
    const move = e.dataTransfer.getData('text/plain');
    const moveElement = document.querySelector(`.move[data-move="${move}"]`).cloneNode(true);
    sequenceContainer.appendChild(moveElement);
    validateSequence();
});

// Validate the sequence of moves
function validateSequence() {
    const moves = Array.from(sequenceContainer.children).map(el => el.dataset.move);
    if (moves.length === correctSequence.length) {
        if (JSON.stringify(moves) === JSON.stringify(correctSequence)) {
            messageBox.textContent = 'PERFECT';
            messageBox.className = 'message correct';
            sequenceContainer.className = 'sequence-container correct';
        } else {
            messageBox.textContent = 'The sequence is not valid. Try again!';
            messageBox.className = 'message incorrect';
            sequenceContainer.className = 'sequence-container incorrect';
        }
    } else {
        messageBox.textContent = '';
        sequenceContainer.className = 'sequence-container';
    }
}

