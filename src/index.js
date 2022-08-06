const cards = [
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' },
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' }
];

const memoryGame = new MemoryGame(cards);
memoryGame.shuffleCards();

function toggleCards(element, classesArray) {
  // console.log({element});
  classesArray.forEach((className) => element.classList.toggle(className));
}

//==========Start KeyPress Events ==========
window.addEventListener('keydown',(event) => {
  const h1Tag = document.getElementsByTagName('h1');
  console.log({event: event.code});

})


//==========End KeyPress Events ==========
  
window.addEventListener('load', (event) => {
let html = '';
  memoryGame.cards.forEach((pic) => {
    html += `
      <div class="card" data-card-name="${pic.name}">
        <div class="back" name="${pic.img}"></div>
        <div class="front" style="background: url(img/${pic.img}) no-repeat"></div>
      </div>
    `;
  });

  // below you will the cards by switching te class names then after the setTimeout you can set the html to be the normal backs of the cards
  let htmlShowCards = ''
  memoryGame.cards.forEach((pic) => {
    htmlShowCards += `
      <div class="card" data-card-name="${pic.name}">
        <div class="front" name="${pic.img}"></div>
        <div class="back" style="background: url(img/${pic.img}) no-repeat"></div>
      </div>
    `;
  });


  // Add all the divs to the HTML
  // this is a way to show your cards prior to starting the game
  document.querySelector('#memory-board').innerHTML = htmlShowCards;
setTimeout(() => {
  document.querySelector('#memory-board').innerHTML = html;
}, 1000)

  // Bind the click event of each element to a function
  document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('click', () => {
      // TODO: write some code here
      // console.log(`Card clicked: ${card}`);
      // console.log({card})

      const clicked = document.getElementById("pairs-clicked")
      const guessed = document.getElementById("pairs-guessed")

      // console.log({clicked: clicked.innerHTML, guessed: guessed.innerHTML});

      if(!card.classList.contains('blocked')) {
        toggleCards(card.children[0], ['front', 'back']);
        toggleCards(card.children[1], ['front', 'back']);
        
        card.classList.add('blocked');

        memoryGame.pickedCards.push(card);
      }

      if (memoryGame.pickedCards.length === 2) {
        const firstPicked = memoryGame.pickedCards[0];
        const secondPicked = memoryGame.pickedCards[1];

        // console.log({firstPicked, secondPicked});

        const cardName1 = firstPicked.getAttribute('data-card-name');
        const cardName2 = secondPicked.getAttribute('data-card-name');

        // console.log({cardName1, cardName2});

        if (memoryGame.checkIfPair(cardName1, cardName2)) {
          guessed.innerHTML = memoryGame.pairsGuessed;
        } else {
          setTimeout(() => {
            toggleCards(firstPicked.children[0], ['front', 'back']);
            toggleCards(firstPicked.children[1], ['front', 'back']);
            toggleCards(secondPicked.children[0], ['front', 'back']);
            toggleCards(secondPicked.children[1], ['front', 'back']);
            firstPicked.classList.remove('blocked');
            secondPicked.classList.remove('blocked');
          }, 1000);
        }


        memoryGame.pickedCards = [];
      }

      clicked.innerHTML = memoryGame.pairsClicked;

      // if(memoryGame.checkIfFinished()) {
      //   setTimeout(() => {
      //     alert('You Are the Winner!!')
      //   },10)
      // }
      switch(memoryGame.checkIfFinished()) {
        case 'Winner':
          setTimeout(() => {
                alert('You Are the Winner!!')
              },10);
          break;
        case 'Lost':
          setTimeout(() => {
                alert('You Lose, Try Again!!')
              },10);
          break;
      }
    });
  });
});