class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){ //inicia juego
    if(gameState === 0){ //si estado juego es 0 -- llenar form y crea jugador
      player = new Player(); //crea jugador activo
      var playerCountRef = await database.ref('playerCount').once("value"); //recibe el playerCount de BD

      if(playerCountRef.exists()){ //cuando obtuvo el conteo
        playerCount = playerCountRef.val(); //actualiza variable local
        player.getCount(); 
      }
      form = new Form(); //crea el form para el jugador
      form.display(); //muestra el form 
    }

    //crea los sprites de los autos
    car1 = createSprite(100,200);
    car2 = createSprite(300,200);
    car3 = createSprite(500,200);
    car4 = createSprite(700,200);
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();
    //textSize(30);
    //text("Inicio del Juego", 120, 100)
    Player.getPlayerInfo();

    if(allPlayers !== undefined){
      //var display_position = 130;
      var index = 0;
      var x = 0;
      var y;

      for(var plr in allPlayers){ //recorre cada jugador
        index= index+1;
        x = x+200; //distancia entre carros en x
        y = displayHeight - allPlayers[plr].distance; //distancia en Y se muestra segun distancia recorrida
        cars[index-1].x = x; //asigna posicion al auto en x
        cars[index-1].y = y; //asigna posicion al auto en y
        

        if(index === player.index){ //if que detecta si es el jugador que principal (activo)
          cars[index - 1].shapeColor = "red"; //auto rojo
          camera.position.x = displayWidth/2; //camara en x centrado
          camera.position.y = cars[index-1].y; //camara en y lo sigue con su distancia recorrida
        }
       /* if (plr === "player" + player.index)
          fill("red")
        else
          fill("black");

        display_position+=20;
        textSize(15);
        text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      */
      }
      
    }

    //mueve el auto con flecha arriba, solo si jugador ya se creo (lleno el form)
    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10;  //se aumenta distancia
      player.update(); //actualiza la BD para que el auto se mueva
    }

    drawSprites(); //muestra los sprites de los autos

  } // fin metodo PLAY()
}
