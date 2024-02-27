  // JavaScript comienza aquí...
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const words = ['COMPUTADORA', 'SIGNO', 'JAVA', 'CSS', 'TIPOS', 'CODIGO', 'ESTRUCTURA'];
  const palabra = words[Math.floor(Math.random() * words.length)];
  const wordDisplay = document.getElementById('wordDisplay');
  const guessesDisplay = document.getElementById('guessesDisplay');
  let acertado = [];
  let equivocado = 0;

  // Función para dibujar el ahorcado
  function drawAhorcado() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 5;
      const parts = [
          { x1: 100, y1: 50, x2: 100, y2: 350 },  // PARAL
          { x1: 100, y1: 50, x2: 215, y2: 50 },   // BASE DONDE VA LA CUERDA 
          { x1: 215, y1: 50, x2: 215, y2: 90 },   // CUERDA
          { x: 215, y: 115, radius: 25 },         // CABEZA
          { x1: 215, y1: 140, x2: 215, y2: 225 }, // TORSO
          { x1: 215, y1: 150, x2: 150, y2: 145 }, // BRAZO IZQUIERDO
          { x1: 215, y1: 150, x2: 275, y2: 145 }, // BRAZO DERECHO  
          { x1: 160, y1: 275, x2: 215, y2: 225 }, // PIERNA IZQUIERDA
          { x1: 270, y1: 275, x2: 215, y2: 225 }  // PIERNA DERECHA  
      ];

      for (let i = 0; i <= equivocado && i < parts.length; i++) {
          const part = parts[i];
          ctx.beginPath();
          if (part.radius) {
              ctx.arc(part.x, part.y, part.radius, 0, Math.PI * 2);
          } else {
              ctx.moveTo(part.x1, part.y1);
              ctx.lineTo(part.x2, part.y2);
          }
          ctx.stroke();
      }

      // CARA
      if (equivocado >= 8) {
          ctx.strokeStyle = "#000";
          ctx.lineWidth = 2;
          // Ojos
          ctx.beginPath();
          ctx.moveTo(210, 105);
          ctx.lineTo(205, 110);
          ctx.moveTo(205, 105);
          ctx.lineTo(210, 110);
          ctx.moveTo(220, 105);
          ctx.lineTo(215, 110);
          ctx.moveTo(215, 105);
          ctx.lineTo(220, 110);
          ctx.stroke();
      }
  }

  function updateWordDisplay() {
      let display = ' ';
      for (const letter of palabra) {
          if (acertado.includes(letter)) {
              display += letter;
          } else {
              display += ' _ ';
          }
      }
      wordDisplay.textContent = display;
  }

  function updateGuessesDisplay() {
      guessesDisplay.textContent = `Letras Seleccionadas: ${acertado.join(', ')}`; // Recuadro dondé estan las letras seleccionadas
  }

  function guessLetter(letter) {
      if (!acertado.includes(letter)) {
          acertado.push(letter);

          if (!palabra.includes(letter)) {
              equivocado++;
              drawAhorcado();
          }

          updateWordDisplay();
          updateGuessesDisplay();

          if (equivocado === 9) {
              alert('PERDISTE! La palabra era: ' + palabra);
              window.location.reload();
          } else if (!wordDisplay.textContent.includes('_')) {
              alert('GANASTE! La palabra era: ' + palabra);
              window.location.reload();
      }
  }
}


  function displayResult(message) {
      const resultDiv = document.createElement('div');
      resultDiv.textContent = message;
      resultDiv.style.fontSize = '24px';
      resultDiv.style.color = '#333';
      resultDiv.style.marginTop = '20px';
      document.getElementById('container').appendChild(resultDiv);
  }

  drawAhorcado();
  updateWordDisplay();
  updateGuessesDisplay();

  document.addEventListener('keydown', (event) => {
      const letter = event.key.toLowerCase();

      if (letter.match(/[a-z]/) && acertado.indexOf(letter) === -1) {
          guessLetter(letter);
      }
  });

  function createLetterButtons() {
      const alphabet = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
      const letterButtonsDiv = document.getElementById('letterButtonsContainer');
      for (const letter of alphabet) {
          const button = document.createElement('button');
          button.textContent = letter;
          button.addEventListener('click', () => guessLetter(letter));
          letterButtonsDiv.appendChild(button);
      }
  }
  createLetterButtons();