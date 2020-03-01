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
});
