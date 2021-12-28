class Form {
  constructor() {
    this.input = createInput("Nombre");
    this.button = createButton('Jugar');
    this.greeting = createElement('h2');
    //nuevo
    this.title = createElement('h2');
  }

  hide(){
    this.greeting.hide();
    this.button.hide();
    this.input.hide();
    //nuevo
    this.title.hide();
  }

  display(){
    //var title = createElement('h2')
    this.title.html("Juego De Carreras De Autos");
    this.title.position(displayWidth/2 - 50, 0);

    this.input.position(displayWidth/2 - 40, 160);
    this.button.position(displayWidth/2 - 30, 220);

    this.button.mousePressed(()=>{
      this.input.hide();
      this.button.hide();
      player.name = this.input.value();
      playerCount+=1;
      player.index = playerCount;
      player.update();
      player.updateCount(playerCount);
      this.greeting.html("Hola " + player.name + "!");
      this.greeting.position(displayWidth/2 - 70, displayHeight/4);
    });

  }
}
