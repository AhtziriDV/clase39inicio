class Player {
  constructor(){
    this.index = null;
    this.distance = 0;
    this.name = null;
  }

  getCount(){ //obiene el playerCount de la BD
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on("value",(data)=>{
      playerCount = data.val();
    });
  }

  updateCount(count){ //actualiza el playerCount en BD
    database.ref('/').update({
      playerCount: count
    });
  }

  update(){ //Crea matriz Player con 4 jugadores, cada uno con nombre y distancia
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({
      name:this.name,
      distance:this.distance
    });
  }

  static getPlayerInfo(){ //Obtiene valores de los jugadores de la BD
    var playerInfoRef = database.ref('players');
    playerInfoRef.on("value",(data)=>{
      allPlayers = data.val();
    })
  }
}
