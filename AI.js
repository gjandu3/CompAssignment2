var spritesheetsai = [];  
function loadAISpriteSheets(AM) {
	spritesheetsai['one'] = AM.getAsset("./Sprites/Sword1Flip.png"); 
	spritesheetsai['two'] = AM.getAsset("./Sprites/Sword2Flip.png"); 
	spritesheetsai['three'] = AM.getAsset("./Sprites/Sword3Flip.png"); 
	spritesheetsai['four'] = AM.getAsset("./Sprites/Sword4Flip.png"); 
	spritesheetsai['five'] = AM.getAsset("./Sprites/Sword5Flip.png"); 
	spritesheetsai['six'] = AM.getAsset("./Sprites/Sword6Flip.png"); 
	spritesheetsai['seven'] = AM.getAsset("./Sprites/Sword7Flip.png"); 
	spritesheetsai['eight'] = AM.getAsset("./Sprites/Sword8Flip.png"); 
}

function AI(game, AssetManager) {
	this.AM = AssetManager;
	loadAISpriteSheets(this.AM);
	this.game = game; 
	this.ctx = game.ctx; 
	this.name = "AI"; 
	this.sword = 1; 
	this.collided = false;
	this.timer = 0; 
	this.x = 900; 
	this.y = 100;
	this.speed = -200;
	this.animation = new Animation(spritesheetsai['one'], 400, 200, 1, 0.10, 1, true, .4); 
}

AI.prototype = new Entity();
AI.prototype.constructor = AI;

AI.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

AI.prototype.update = function () {
	if (this.collided) this.timer++;
	if (this.timer >= 10) {
		this.collided = false; 
		this.timer = 0;
	}
    this.x += this.game.clockTick * this.speed;
    if (this.x <= 350) {
    	console.log("this shouldn't happen"); 
    	this.reset(0); 
    }
    Entity.prototype.update.call(this);
    for (var i = 0; i < this.game.entities.length; i++) {
    	var ent = this.game.entities[i];
    	if (ent.name === "psword") {
    		if (ent.collided) this.reset(0, ent)
    		if (this.collide(ent)) this.compare(ent);
	    }
    }	
}

AI.prototype.choose = function(number) {
	if (number === 1) {
		this.animation = new Animation(spritesheetsai['one'], 400, 200, 1, 0.10, 1, true, .4); 
	}
	if (number === 2) {
		this.animation = new Animation(spritesheetsai['two'], 400, 200, 1, 0.10, 1, true, .4); 
	}
	if (number === 3) {
		this.animation = new Animation(spritesheetsai['three'], 400, 200, 1, 0.10, 1, true, .4); 
	}
	if (number === 4) {
		this.animation = new Animation(spritesheetsai['four'], 400, 200, 1, 0.10, 1, true, .4); 
	}
	if (number === 5) {
		this.animation = new Animation(spritesheetsai['five'], 400, 200, 1, 0.10, 1, true, .4); 
	}
	if (number === 6) {
		this.animation = new Animation(spritesheetsai['six'], 400, 200, 1, 0.10, 1, true, .4); 
	}
	if (number === 7) {
		this.animation = new Animation(spritesheetsai['seven'], 400, 200, 1, 0.10, 1, true, .4); 
	}
	if (number === 8) {
		this.animation = new Animation(spritesheetsai['eight'], 400, 200, 1, 0.10, 1, true, .4); 
	}
}

AI.prototype.compare = function (other) {
	console.log("compare for ai is called"); 
	var lowweak = ((other.sword + 5) % 8) + 1;
	var highweak = ((other.sword + 7) % 8) + 1; 
	if (lowweak <= this.sword <= highweak) {
		this.reset(1, other); 
	} else if (other.sword === this.sword) {
		this.reset(1, other); 
	} else {
		this.reset(0, other); 
	}
}

AI.prototype.selectSword = function(other) {
	this.x = 900; 
	var weak = ((other.sword + 5) % 8) + 1;
	this.sword = weak; 
	console.log("AI Sword: " + this.sword); 
	this.choose(weak);  
	 
}

AI.prototype.collide = function(other) {
    if ((other.x - 100) < this.x && this.x < (other.x + 100)) {
   		return true; 
   }
}

AI.prototype.reset = function(check, other) {
	if (check === 0) this.x = 900;
	if (check === 1) {
		this.collided = true; 
		this.selectSword(other); 
	}
}