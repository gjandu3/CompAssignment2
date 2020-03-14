var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./Sprites/Sword1.png");
ASSET_MANAGER.queueDownload("./Sprites/Sword1Flip.png");
ASSET_MANAGER.queueDownload("./Sprites/Sword2.png");
ASSET_MANAGER.queueDownload("./Sprites/Sword2Flip.png");
ASSET_MANAGER.queueDownload("./Sprites/Sword3Flip.png");
ASSET_MANAGER.queueDownload("./Sprites/Sword3.png");
ASSET_MANAGER.queueDownload("./Sprites/Sword4.png");
ASSET_MANAGER.queueDownload("./Sprites/Sword4Flip.png");
ASSET_MANAGER.queueDownload("./Sprites/Sword5.png");
ASSET_MANAGER.queueDownload("./Sprites/Sword5Flip.png");
ASSET_MANAGER.queueDownload("./Sprites/Sword6.png");
ASSET_MANAGER.queueDownload("./Sprites/Sword6Flip.png");
ASSET_MANAGER.queueDownload("./Sprites/Sword7.png");
ASSET_MANAGER.queueDownload("./Sprites/Sword7Flip.png");
ASSET_MANAGER.queueDownload("./Sprites/Sword8.png");
ASSET_MANAGER.queueDownload("./Sprites/Sword8Flip.png");

ASSET_MANAGER.downloadAll(function () {
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');
    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();
    var Evolve = new AI(gameEngine, ASSET_MANAGER);
    gameEngine.addEntity(Evolve);
    var Stay = new PlayerSword(gameEngine, ASSET_MANAGER);
    gameEngine.addEntity(Stay);
    stater(Stay, Evolve); 
});

function stater(Stay, Evolve) {  
	var socket = io.connect("http://24.16.255.56:8888"); 
  var saveButton = document.getElementById("save");
  var loadButton = document.getElementById("load");
  socket.on("load", function(Sx) {
      Stay.x = Sx.Sx;
      Stay.y = Sx.Sy;
      Stay.timer = Sx.Stime;
      Stay.collided = Sx.Sc; 
      Stay.sword = Sx.Ssword;
      //Stay.animation = Sx.Sanime;
      Evolve.x = Sx.Ex;
      Evolve.y = Sx.Ey;
      Evolve.timer = Sx.Etime;
      Evolve.collided = Sx.Ec;
      Evolve.sword = Sx.Esword;
      //Evolve.animation = Sx.Eanime;
  }); 

  saveButton.onclick = function () {
    socket.emit("save", { studentname: "Gurkirat Jandu", statename:"sword positions", Sx: Stay.x, Sy: Stay.y, Stime: Stay.timer,
    Sc: Stay.collided, Ssword: Stay.sword, Sanime: Stay.animation, Ex: Evolve.x, Ey: Evolve.y, Etime: Evolve.timer, Ec: Evolve.collided,
    Esword: Evolve.sword, Eanime: Evolve.animation}); 
  };

  loadButton.onclick = function() {
    socket.emit("load", {studentname: "Gurkirat Jandu", statename: "sword positions"})
  };

}
