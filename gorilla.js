var Gorilla = function(game, key){
	Phaser.Sprite.call(this, game, 10, 0, key);
	this.anchor.set(0.5);
	this.checkWorldBounds = true;
	this.outOfBoundsKill = true;
	this.exists = true;
	this.tracking = true;
	this. scaleSpeed = 0.5;
};
var gorillaRock = function(game, key){
	Phaser.Sprite.call(this, game, 0, 0, key);
	this.anchor.set(0.5)
}
Gorilla.prototype = Object.create(Phaser.Sprite.prototype);
Gorilla.prototype.constructor = Gorilla;

var mX = game.input.player.x;
var mY = game.input.player.y;
Gorilla.angle = Math.atan2(Gorilla.position.x - mX, Gorilla.position.y - mY)  * -57.2957795;

Gorilla.prototype.throw = function (x, y, angle, speed, gx, gy) {
    gx = gx || 0;
    gy = gy || 0;
    this.reset(x, y);
    this.scale.set(1);

    this.game.physics.arcade.velocityFromAngle(angle, speed, this.body.velocity);
    this.angle = angle;
    this.body.gravity.set(gx, gy);
};

game.physics.arcade.overlap(player, gorillaRock, hurtHealth, null, this);

Gorilla.prototype.hurtHealth = function(){
	player.health =- 5;
}

Gorilla.prototype.gorillaHit = function(){
	gorilla.health =- 1;
}