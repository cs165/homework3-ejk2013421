// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Rewriting some of the existing methods, such as changing code in `show()`
// - Adding methods
// - Adding additional fields

class FlashcardScreen {



  constructor(containerElement) {
    this.containerElement = containerElement;

    document.querySelector('.status .correct').textContent=0;
    document.querySelector('.status .incorrect').textContent=0;
    document.addEventListener('showFlashcardScreen',this.show.bind(this));
    document.addEventListener('next_card',this.next.bind(this));
    document.addEventListener('next_card_w',this.next_w.bind(this));
    document.addEventListener('fcontinue',this.continue_wrong.bind(this));

    this.cardtype=null;
    this.wrongcard=new Array(10);
  }

  show(titlename) {
    //console.log(titlename.detail.valueOf().titlename);
    this.containerElement.classList.remove('inactive');

    document.querySelector('.status .correct').textContent=0;
    document.querySelector('.status .incorrect').textContent=0;
    this.wrongcard=null;
    if(titlename.detail.valueOf().titlename!=""){
      this.cardtype=titlename.detail.valueOf().titlename;
    }
    //this.deck=new Array;
    for(let choice of FLASHCARD_DECKS){
      if(choice.title==this.cardtype){
        /*for(let word of Object.keys(choice.words)){
          this.deck[word]=choice.words[word.valueOf()];
        }*/
        //this.deck=choice.words;
        this.deck=Object.assign({}, choice.words);
      }
    }
    this.flashcardContainer = document.querySelector('#flashcard-container');
    //this.card = new Flashcard(flashcardContainer, 'word', 'definition');
    var firstElementindex=Object.keys(this.deck)[0];
    var firstElement = this.deck[firstElementindex];
    delete this.deck[firstElementindex];
    this.card = new Flashcard(this.flashcardContainer, firstElementindex, firstElement);
    /*
    for(let title of Object.keys(deck))
    {
      const card = new Flashcard(flashcardContainer, title, deck[title]);
    }
    */
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }

  next_w(item){
    if(this.wrongcard==null){
      this.wrongcard=new Array( item.detail.valueOf().f);
      this.wrongcard[item.detail.valueOf().f ]=item.detail.valueOf().b;
      this.wrongcard.shift();
    }
    else this.wrongcard[item.detail.valueOf().f ]=item.detail.valueOf().b;
    this.next();
  }

  next(){
    document.removeEventListener('next_card',this.next);
    delete this.card;
    var firstElementindex=Object.keys(this.deck)[0];
    var firstElement = this.deck[firstElementindex];
    delete this.deck[firstElementindex];
    //console.log(firstElementindex);
    if(firstElementindex==null){
      const correct=parseInt(document.querySelector('.status .correct').textContent);
      const incorrect=parseInt(document.querySelector('.status .incorrect').textContent);
      this.hide();
      document.dispatchEvent(new CustomEvent('showResultsScreen',{detail:{'correct' : correct,'incorrect' : incorrect}}));
    }
    else
      this.card = new Flashcard(this.flashcardContainer, firstElementindex, firstElement);
  }

  continue_wrong(){
    this.containerElement.classList.remove('inactive');
    this.deck=Object.assign({}, this.wrongcard);
    document.querySelector('.status .incorrect').textContent=0;
    this.next();
  }

  restart(){

  }
}
