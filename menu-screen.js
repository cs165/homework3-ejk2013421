// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class MenuScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;
    var choice=this.containerElement.querySelector('#choices');
    for (let fd of FLASHCARD_DECKS){
      let choice_d=document.createElement('div');
      choice_d.appendChild(document.createTextNode(fd.title));
      choice.appendChild(choice_d);
    }
    choice=this.containerElement.querySelectorAll('#choices div');
    for(let choise_d of choice){
      choise_d.addEventListener('click',this.click.bind(this,choise_d.valueOf().textContent));
    }
    document.addEventListener('showMenuScreen',this.show.bind(this));

    /*
    this.containerElement.querySelector('#choices').innerHTML="<div>"+FLASHCARD_DECKS[0]['title']+"</div>";
    this.containerElement.querySelector('#choices').innerHTML+="<div>"+FLASHCARD_DECKS[1]['title']+"</div>";
    this.containerElement.querySelector('#choices').innerHTML+="<div>"+FLASHCARD_DECKS[2]['title']+"</div>";
*/
  }

  show() {
    this.containerElement.classList.remove('inactive');
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }

  click(title,t){
    //console.log(title);
    this.hide();
    document.dispatchEvent(new CustomEvent('showFlashcardScreen',{detail:{'titlename' : title}}));
  }
}
