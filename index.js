const $card = document.querySelectorAll('.card');
const $rows = document.querySelector('.row');
const $selectedCards = document.querySelectorAll('.front');
const $cards = document.querySelector('.cards');
const $button = document.getElementById('btn-modal');
const $modal = document.querySelector('.modal');

const emogies = ['🐭', '🐹', '🦄', '🐸', '🐵', '🐷', '🐭', '🐹', '🦄', '🐸', '🐵', '🐷'];

$button.addEventListener('click', () => {
  $modal.style.display = 'none';
});

let firstPic,
  secondPic,
  count = 0,
  flipped = false;

//Shuffle array for random pictures
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function start() {
  flipped = false;
  const sortArr = shuffle(emogies);

  //Add picture in card
  $card.forEach((button, index) => {
    button.childNodes[3].innerHTML == '' ? (button.childNodes[3].innerHTML = sortArr[index]) : null;
    $card.forEach((card) => card.addEventListener('click', flipCard));
  });
}

function unflipCards() {
  firstPic.querySelector('.front').classList.add('wrong');
  secondPic.querySelector('.front').classList.add('wrong');
  setTimeout(() => {
    firstPic.classList.remove('active');
    secondPic.classList.remove('active');
  }, 1000);

  firstPic.querySelector('.front').classList.remove('wrong');
  secondPic.querySelector('.front').classList.remove('wrong');
}

function disableCard() {
  firstPic.removeEventListener('click', flipCard);
  secondPic.removeEventListener('click', flipCard);
  firstPic.querySelector('.front').classList.add('right');
  secondPic.querySelector('.front').classList.add('right');
  count++;
  if (count == 6) {
    $modal.style.display = 'flex';
    $modal.querySelector('h2').innerHTML = 'You WIN!';
    $modal.querySelector('button').innerHTML = 'Start again!';
  }
}

function flipCard() {
  this.classList.add('active');
  if (!flipped) {
    firstPic = this;
    flipped = true;
  } else {
    flipped = false;
    secondPic = this;
    firstPic.querySelector('.front').innerHTML == secondPic.querySelector('.front').innerHTML
      ? disableCard()
      : unflipCards();
  }
}

start();
