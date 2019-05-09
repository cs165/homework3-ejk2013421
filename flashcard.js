// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class Flashcard {
  constructor(containerElement, frontText, backText) {
    this.containerElement = containerElement;

    this._flipCard = this._flipCard.bind(this);

    this.flashcardElement = this._createFlashcardDOM(frontText, backText);
    this.containerElement.append(this.flashcardElement);

    //this.flashcardElement.addEventListener('pointerup', this._flipCard);
    containerElement.addEventListener('pointerup', this._flipCard.bind(this));
    this.a=frontText;
    this.originX=null;
    this.originY=null;
    this.offsetX=null;
    this.offsetY=null;
    this.translateX=null;
    this.translateY=null;
    this.dragStarted = false;
    this.flag=true;
    this.frontText=frontText;
    this.backText=backText;

    containerElement.addEventListener('pointerdown', this.onDragStart.bind(this));
    //containerElement.addEventListener('pointerup', this.onDragEnd.bind(this));
    containerElement.addEventListener('pointermove', this.onDragMove.bind(this));

    this.correct=parseInt(document.querySelector('.status .correct').textContent);
    this.incorrect=parseInt(document.querySelector('.status .incorrect').textContent);
    this.correctValue=0;
    this.incorrectValue=0;
/*
    this.correct=document.querySelector('.status .correct').textContent;
    if(this.correct==null){
      this.correct=0;
      document.querySelector('.status .correct').textContent=0;
    }

    this.incorrect=document.querySelector('.status .incorrect').textContent;
    if(this.incorrect==null){
      this.incorrect=0;
      document.querySelector('.status .incorrect').textContent=0;
    }
*/
  }

  // Creates the DOM object representing a flashcard with the given
  // |frontText| and |backText| strings to display on the front and
  // back of the card. Returns a reference to root of this DOM
  // snippet. Does not attach this to the page.
  //
  // More specifically, this creates the following HTML snippet in JS
  // as a DOM object:
  // <div class="flashcard-box show-word">
  //   <div class="flashcard word">frontText</div>
  //   <div class="flashcard definition">backText</div>
  // </div>
  // and returns a reference to the root of that snippet, i.e. the
  // <div class="flashcard-box">
  _createFlashcardDOM(frontText, backText) {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('flashcard-box');
    cardContainer.classList.add('show-word');

    const wordSide = document.createElement('div');
    wordSide.classList.add('flashcard');
    wordSide.classList.add('word');
    wordSide.textContent = frontText;

    const definitionSide = document.createElement('div');
    definitionSide.classList.add('flashcard');
    definitionSide.classList.add('definition');
    definitionSide.textContent= backText;

    cardContainer.appendChild(wordSide);
    cardContainer.appendChild(definitionSide);
    return cardContainer;
  }

  _flipCard(event) {
    //console.log(this.translateX +"&&"+ this.translateY);
    if (Math.abs(this.translateX)<3 && Math.abs(this.translateY)<3)this.flashcardElement.classList.toggle('show-word');
    //event.currentTarget.style.transform = null;
    if(!(Math.abs(this.translateX) >= 150)) {
      event.currentTarget.classList.add('flashcard-container-reset');
      event.currentTarget.style.transform = 'translate(0, 0)';
    }

    this.onDragEnd(event);
  }

  onDragStart(event) {
    this.originX = event.clientX;
    this.originY = event.clientY;
    this.dragStarted = true;
    event.currentTarget.classList.remove('flashcard-container-reset');
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  onDragMove(event) {
    if (!this.dragStarted) {
      return;
    }
    event.preventDefault();
    const deltaX = event.clientX - this.originX;
    const deltaY = event.clientY - this.originY;
    this.translateX = this.offsetX + deltaX;
    this.translateY = this.offsetY + deltaY;
    event.currentTarget.style.transform = 'translate(' +
        this.translateX + 'px, ' + this.translateY + 'px)' + ' ' + 'rotate(' + this.translateX * 0.2 + 'deg)';

    if(this.translateX >= 150){
      document.querySelector('body').style.background='#97b7b7';
      this.correctValue=1;
    }
    else if(this.translateX <= -150){
      document.querySelector('body').style.background='#97b7b7';
      this.incorrectValue=1;
    }
    else{
      document.querySelector('body').style.background='#d0e6df';
      this.correctValue=0;
      this.incorrectValue=0;
    }
    document.querySelector('.status .correct').textContent=this.correct+this.correctValue;
    document.querySelector('.status .incorrect').textContent=this.incorrect+this.incorrectValue;
  }

  onDragEnd(event) {
    this.dragStarted = false;
    //this.offsetX += event.clientX - this.originX;
    //this.offsetY += event.clientY - this.originY;
    this.translateX=0;
    this.translateY=0;
    document.querySelector('body').style.background='#d0e6df';
    //this.flashcardElement.classList.toggle('show-word');
    this.correct+=this.correctValue;
    this.incorrect+=this.incorrectValue;
    const test = this.correctValue==1 || this.incorrectValue==1;
    if(test && this.flag){
      this.containerElement.removeChild(this.containerElement.querySelector("div"));
      event.currentTarget.style.transform = '';
      if(this.incorrectValue)
        document.dispatchEvent(new CustomEvent('next_card_w',{detail:{'f' : this.frontText,'b' : this.backText}}));
      else
        document.dispatchEvent(new CustomEvent('next_card'));
      //document.removeEventListener('next_card');
      //console.log(this.a);
      this.flag=false;
    }
    this.correctValue=0;
    this.incorrectValue=0;
  }


}
