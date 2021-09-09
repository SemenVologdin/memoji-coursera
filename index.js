const $card = document.querySelectorAll('.card');
const $selectedCards = document.querySelectorAll('.front');
const $rows = document.querySelector('.row');
const $button = document.getElementById('btn-modal');
const $seconds = document.getElementById('seconds');
const $minutes = document.getElementById('minutes');
const $modal = document.querySelector('.modal');

const emogies = ['🐭', '🐹', '🦄', '🐸', '🐵', '🐷', '🐭', '🐹', '🦄', '🐸', '🐵', '🐷'];

let firstPic,
  secondPic,
  count,
  sortArr,
  flipped = false,
  wrong = false;

//Shuffle array for random pictures
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

//Add picture in card

function insertPics() {
  $card.forEach((button) => (button.childNodes[3].innerHTML = ''));
  sortArr = shuffle(emogies);
  $card.forEach((button, index) => {
    button.childNodes[3].innerHTML == '' ? (button.childNodes[3].innerHTML = sortArr[index]) : null;
    button.classList.add('active');
  });
}

$button.addEventListener('click', () => {
  $modal.style.display = 'none';
  insertPics();
  start();
});
function timer() {
  let seconds = 60;
  $minutes.innerHTML = '00';
  const myTimer = setInterval(() => {
    $seconds.innerHTML = seconds.toString().length == 1 ? `0${--seconds}` : --seconds;
    if (seconds == 0) {
      $minutes.innerHTML = '01';
      clearInterval(myTimer);
    }
  }, 1000);
}

function end(textTitle, textButton) {
  $modal.style.display = 'flex';
  $modal.querySelector('h2').innerHTML = textTitle;
  $modal.querySelector('button').innerHTML = textButton;
}

function start() {
  setTimeout(end.bind(this, 'Time is over :(', 'Start again'), 60000);
  timer();
  count = 0;
  //Show card for 1 sec
  $card.forEach((card) => {
    card.addEventListener('click', flipCard);
    card.querySelector('.front').classList.remove('right');
    card.querySelector('.front').classList.remove('wrong');
    setTimeout(() => {
      card.classList.remove('active');
    }, 1000);
  });
}

function unflipCards() {
  firstPic.querySelector('.front').classList.add('wrong');
  secondPic.querySelector('.front').classList.add('wrong');
  wrong = true;
  flipped = false;
}

function disableCard() {
  firstPic.removeEventListener('click', flipCard);
  secondPic.removeEventListener('click', flipCard);
  firstPic.querySelector('.front').classList.add('right');
  secondPic.querySelector('.front').classList.add('right');
  flipped = false;
  firstPic = secondPic = null;
  count++;
  if (count == 6) {
    end('You WIN!', 'Start again!');
    clearInterval(myTimer);
  }
}

//Listener for click
function flipCard() {
  if (wrong) {
    firstPic.querySelector('.front').classList.remove('wrong');
    secondPic.querySelector('.front').classList.remove('wrong');
    firstPic.classList.remove('active');
    secondPic.classList.remove('active');
    firstPic = secondPic = null;
    wrong = false;
  }

  this.classList.add('active');
  if (!flipped) {
    firstPic = this;
    flipped = !flipped;
  } else {
    secondPic = this;
    console.log(firstPic, secondPic);

    //if same pictures
    if (firstPic.querySelector('.front').innerText == secondPic.querySelector('.front').innerText) {
      disableCard();
    } else {
      unflipCards();
    }
  }
}
