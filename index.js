const $buttons = document.querySelectorAll('.card')
const $rows = document.querySelector('.row')
const $selectedCards = document.querySelectorAll('.front')

let countPics = 0
const emogies = ['🐭','🐹','🦄','🐸','🐵','🐷','🐭','🐹','🦄','🐸','🐵','🐷']
const sortArr = shuffle(emogies)

let firstPic 
let secondPic

//Shuffle array for random pictures
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

//Add listener for card and add picture in card
$buttons.forEach((button,index)=>{
  button.childNodes[3].innerHTML==''?button.childNodes[3].innerHTML=sortArr[index]:null
  button.addEventListener('click',()=>{
    button.classList.toggle('active')
    console.log(index, sortArr[index])
  })
})

function check() {
  
}







