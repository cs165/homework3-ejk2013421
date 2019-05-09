// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class ResultsScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;
    document.addEventListener('showResultsScreen',this.show.bind(this));
    this.containerElement.querySelector('.continue').addEventListener('click',this.continue_wrong.bind(this));
    this.containerElement.querySelector('.to-menu').addEventListener('click',this.tomenu.bind(this));
  }

  show(numberCorrect, numberWrong) {

    this.containerElement.classList.remove('inactive');
    this.correct=numberCorrect.detail.valueOf().correct;
    this.incorrect=numberCorrect.detail.valueOf().incorrect;
    const per=(this.correct/(this.correct+this.incorrect))*100;
    document.querySelector('.percent').textContent=per;
    if(per==100){
      document.querySelector('.continue').textContent="Start over?";
    }else{
      document.querySelector('.continue').textContent="Continue";
    }
    document.querySelector('#results .correct').textContent=this.correct;
    document.querySelector('#results .incorrect').textContent=this.incorrect;
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }

  continue_wrong(){
    this.hide();
    if(this.incorrect!=0) {
      document.dispatchEvent(new CustomEvent('fcontinue'));
      document.querySelector('#results .incorrect').textContent=0;
    }
    else {
      document.dispatchEvent(new CustomEvent('showFlashcardScreen',{detail:{'titlename' : ""}}));
      document.querySelector('#results .correct').textContent=0;
      document.querySelector('#results .incorrect').textContent=0;
    }
  }

  tomenu(){
    this.hide();
    document.dispatchEvent(new CustomEvent('showMenuScreen'));
  }
}
