var spritesheetsplayer = []; 
function loadPlayerSwordSpriteSheets(AM) {
	spritesheetsplayer['one'] = AM.getAsset("./Sprites/Sword1.png"); 
	spritesheetsplayer['two'] = AM.getAsset("./Sprites/Sword2.png"); 
	spritesheetsplayer['three'] = AM.getAsset("./Sprites/Sword3.png"); 
	spritesheetsplayer['four'] = AM.getAsset("./Sprites/Sword4.png"); 
	spritesheetsplayer['five'] = AM.getAsset("./Sprites/Sword5.png"); 
	spritesheetsplayer['six'] = AM.getAsset("./Sprites/Sword6.png"); 
	spritesheetsplayer['seven'] = AM.getAsset("./Sprites/Sword7.png"); 
	spritesheetsplayer['eight'] = AM.getAsset("./Sprites/Sword8.png"); 
}

function PlayerSword(game, AssetManager) {
	this.AM = AssetManager;
	loadPlayerSwordSpriteSheets(this.AM); 
	this.game = game; 
	this.ctx = game.ctx; 
	this.sword = 6; 
	this.name = "psword"
	this.x = 100; 
	this.collided = false; 
	this.y = 100;
	this.timer = 0; 
	this.speed = 200; 
	this.animation = new Animation(spritesheetsplayer['six'], 400, 200, 1, 0.10, 1, true, .4); 
}

PlayerSword.prototype = new Entity(); 
PlayerSword.prototype.constructor = PlayerSword;

PlayerSword.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

PlayerSword.prototype.update = function () {
    this.x += this.game.clockTick * this.speed;
    Entity.prototype.update.call(this);
    if (this.collided === true) {
    	this.timer++; 
    }
    if (this.timer >= 10) {
    	this.collided = false;
    	this.timer = 0;  
    }
    if (this.x >= 550) {
    	this.reset(0); 
    }
    for (var i = 0; i < this.game.entities.length; i++) {
    	var ent = this.game.entities[i];
    	if (ent.name === 'AI') {
    		if (ent.collided) this.reset(0); 
    		if (this.collide(ent)) this.compare(ent); 
	    }
    }	
}

PlayerSword.prototype.picker = function() {
	var pick = Math.floor(Math.random() * 8) + 1;
	this.sword = pick; 
	this.choose(pick); 
}

PlayerSword.prototype.choose = function(number) {
	if (number === 1) {
		this.animation = new Animation(spritesheetsplayer['one'], 400, 200, 1, 0.10, 1, true, .4); 
	}
	if (number === 2) {
		this.animation = new Animation(spritesheetsplayer['two'], 400, 200, 1, 0.10, 1, true, .4); 
	}
	if (number === 3) {
		this.animation = new Animation(spritesheetsplayer['three'], 400, 200, 1, 0.10, 1, true, .4); 
	}
	if (number === 4) {
		this.animation = new Animation(spritesheetsplayer['four'], 400, 200, 1, 0.10, 1, true, .4); 
	}
	if (number === 5) {
		this.animation = new Animation(spritesheetsplayer['five'], 400, 200, 1, 0.10, 1, true, .4); 
	}
	if (number === 6) {
		this.animation = new Animation(spritesheetsplayer['six'], 400, 200, 1, 0.10, 1, true, .4); 
	}
	if (number === 7) {
		this.animation = new Animation(spritesheetsplayer['seven'], 400, 200, 1, 0.10, 1, true, .4); 
	}
	if (number === 8) {
		this.animation = new Animation(spritesheetsplayer['eight'], 400, 200, 1, 0.10, 1, true, .4); 
	}
}

PlayerSword.prototype.collide = function(other) {
    if ((other.x - 100) < this.x && this.x < (other.x + 100)) {
   		return true; 
   }
}

PlayerSword.prototype.compare = function (other) {
	var lowweak = ((other.sword + 5) % 8) + 1;
	var highweak = ((other.sword + 7) % 8) + 1; 
	if (lowweak <= this.sword <= highweak) {
		this.reset(1); 
	} else if (other.sword === this.sword) {
		this.reset(1); 
	} else {
		this.reset(0); 
	}
}

PlayerSword.prototype.reset = function(check) {
	if (check === 0) this.x = 100;
	if (check === 1) {
		this.x = 100; 
		this.collided = true;
		this.picker(); 
	}
}
