class MemoryGame {
  constructor(cards) {
    this.cards = cards;
    this.pickedCards = [];
    this.pairsClicked = 0;
    this.pairsGuessed = 0;
  }


  shuffleCards() {
    if(!this.cards) {
      return undefined
    }
    for (let i = this.cards.length - 1; i > 0; i--)  {
    let j = Math.floor(Math.random() * i);
    let temp = this.cards[i];
    this.cards[i] = this.cards[j];
    this.cards[j] = temp;
  }
  return this.cards;
  }

checkIfPair(card1, card2) {
    this.pairsClicked ++;

    if(card1 === card2) {
      this.pairsGuessed ++;

      return true;
    } 

    return false;
  }

  checkIfFinished() {
     if(this.checkIfWin()) {
      return 'Winner'
    } else if(this.checkIfLost()) {
      return 'Lost'
    } 

    return false;
  }

  checkIfLost() {
    if (this.pairsClicked === this.cards.length) {
      return true;
    }
    
    return false;
  }

  checkIfWin() {
    if (this.pairsGuessed === this.cards.length / 2) {
      return true;
    }
    
    return false;
  }
}