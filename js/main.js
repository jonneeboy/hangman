
/*----- constants -----*/
// source of secret words
var words = [
    'PAR', 
    'BIRDIE',
    'BOGIE',
    'EAGLE',
    'DRIVER',
    'ALCATRAZ',
    'CADDIE',
    'PUTT'
];


/*----- app's state (variables) -----*/
var lives 
var used
var wrongCount
var secretWord
var guess
var letterBoard
var winner
var reset
var hint
var resetbtn = document.querySelector('#reset');
var start = document.querySelector('start');
/*----- cached element references -----*/
var $guess = $('#guess');
var $img = $('#hang-img');
var $player = $('#player');
var $countLives = document.getElementById("lives");
var $message = $('#message');
/*----- event listeners -----*/

$('table').on('click', 'td', handleLetterClick);

$('#reset').on('click', resetGame);
$('#wrong').on('click', wrongCount);
/*----- functions -----*/

resetGame();

function resetGame() {
    wrongCount = 6;
    // winner = 0;
    secretWord = words[getRandomInt(words.length - 1)];
    guess = '_'. repeat(secretWord.length);
    used = [];
    $('td').removeClass('disable-td');
    render();
}

function handleLetterClick(evt) {
    if (wrongCount === 0) return;

    console.log(secretWord);
    var letter = evt.target.textContent;
    if (used.includes(letter)) {
        return;
    } else {
        used.push(letter);
    }
    if (secretWord.includes(letter)) {
        // var pos = secretWord.indexOf(letter);
        while (pos >= 0){
            guess = guess.split('');
            guess[pos] = letter;
            guess = guess.join('');
            pos = secretWord.indexOf(letter, pos + 1);
        }
    } else if (wrongCount > 0) {
        wrongCount--;
    }
    render(); 
}   
    

  
 function getRandomInt(max) {
    return Math.floor(Math.random() * (max + 1));
}

function render() {
    $img.attr('src', 'images/img' + wrongCount + '.png');

    $guess.html(guess);
    $('#wrong').html(wrongCount);
    used.forEach(function(letter) {
        $('#'+letter).addClass('disable-td');
    });
    if (guess === secretWord) {
        $message.html("HOLE IN ONE!!"); 
    } else if (wrongCount === 0) {
        $message.html("Mulligan??");
    } else {
        $message.html("");
    }
}






    







