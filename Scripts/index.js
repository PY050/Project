//Disappearing Treats Game

class TreatsGame {
  constructor(words) {
    this.words = words;
    this.chosenWord = '';
    this.attemptsLeft = 6;
    this.guessedLetters = [];
    this.correctLetters = [];
    this.hint = '';
    this.images = [
      document.getElementById('image1'),
      document.getElementById('image2'),
      document.getElementById('image3'),
      document.getElementById('image4'),
      document.getElementById('image5'),
      document.getElementById('image6')
    ]; // Array of image elements
  }
                
// Initialize and start a new game
  startGame() {
    const randomIndex = Math.floor(Math.random() * this.words.length);
    this.chosenWord = this.words[randomIndex].word.toLowerCase();
    this.hint = this.words[randomIndex].hint;
    this.attemptsLeft = 6;
    this.guessedLetters = [];
    this.correctLetters = [];
    this.displayWord();
    document.getElementById('attempts').innerHTML = 'Attempts left: ' + this.attemptsLeft;
    document.getElementById('hint').innerHTML = 'Hint: ' + this.hint;
    document.getElementById('message').innerHTML = '';
    document.getElementById('guess-button').disabled = false;
    document.getElementById('letter-input').disabled = false;
  
  // Clear the guessed letters display
    document.getElementById('guessed-letters').innerHTML = '';
                
  // Show all images initially
    this.images.forEach(image => image.style.display = 'block');
  }
                
// Display the word with guessed letters
  displayWord() {
    const wordDisplay = document.getElementById('word-display');
    let displayedWord = '';
                
      for (let i = 0; i < this.chosenWord.length; i++) {
         if (this.correctLetters.includes(this.chosenWord[i])) {
              displayedWord += this.chosenWord[i] + ' ';
         } else {
              displayedWord += '_ ';
         }
      }
                
    wordDisplay.innerHTML = displayedWord.trim();
  }
                
// Handle the user's letter guess
  handleGuess() {
    const input = document.getElementById('letter-input').value;
    const guess = input.toLowerCase();
    document.getElementById('letter-input').value = ''; // Clear input field
                
    if (guess === '' || this.guessedLetters.includes(guess) || guess.length !== 1) {
        return;
    }
                
    this.guessedLetters.push(guess);
    document.getElementById('guessed-letters').innerHTML = this.guessedLetters.join(', ');
                
    let letterFound = false;
    for (let i = 0; i < this.chosenWord.length; i++) {
        if (this.chosenWord[i] === guess) {
          this.correctLetters.push(guess);
          letterFound = true;
        }
    }
                
    if (letterFound) {
      this.displayWord();
      if (this.chosenWord.length === this.correctLetters.length) {
      this.endGame(true);
      }
    } else {
      this.attemptsLeft--;
      document.getElementById('attempts').innerHTML = 'Attempts left: ' + this.attemptsLeft;
                
 // Hide one image per incorrect guess
      if (this.attemptsLeft < this.images.length) {
        this.images[5 - this.attemptsLeft].style.display = 'none';
      }
                
  // If attempts reach 0, call endGame
      if (this.attemptsLeft === 0) {
        this.endGame(false);
      }
    }
  }
                
// End the game with a message
  endGame(won) {
    document.getElementById('guess-button').disabled = true;
    document.getElementById('letter-input').disabled = true;
    const message = document.getElementById('message');
                
  // If the game is won
    if (won) {
      message.innerHTML = 'You won! The word was ' + this.chosenWord + '.';
    } 
  // If the game is lost
    else {
      message.innerHTML = 'Game over! The word was ' + this.chosenWord + '.';
                    
                
 // Hide all images when the game is lost
      this.images.forEach(image => image.style.display = 'none');
    }

  // Enable the Play button to start a new game
    document.getElementById('play-button').disabled = false;
  }
}
                
// Fetch words from a JSON file
  console.log("Fetching words..."); //Test
                
  fetch('../JSON/words.json')
    .then(response => response.json())
    .then(data => {
      console.log(data); // Check if data is loaded correctly
      const game = new TreatsGame(data);
                
      // Set up the guess button event listener
        document.getElementById('guess-button').addEventListener('click', () => {
          game.handleGuess();
        });
                
      // Set up the Play button event listener to start a new game
        document.getElementById('play-button').addEventListener('click', () => {
          game.startGame();
          document.getElementById('play-button').disabled = true; // Disable Play button after starting the game
        });
                
      // Start the first game automatically
        game.startGame();
      })
      .catch(error => {
        console.error('Error loading word data:', error);
      });

//Fade in title              
                  
const title = document.getElementById('title');
let titleTimeout;

function showTitle () {
  titleTimeout = setTimeout(function() {
    title.classList.add('show');
  }, 1500);
}

showTitle();
      
             



            
            
          




              
        
      
    