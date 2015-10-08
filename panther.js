Panther.prototype = Object.create(Phaser.Sprite.prototype);

Panther.prototype.constructor = Panther;

Panther.prototype.force = {x:0.0, y:0.0}; 


function Panther(group, x, y, sprite) {
    var panther = group.create(0, 0, 'panther', null);
    panther.position.x = x;
    panther.position.y = y;
    panther.scale.setTo(0.5, 0.5);
    panther.anchor.setTo(0.5, 0.5);
    
    game.physics.enable(panther, Phaser.Physics.ARCADE);
    var angle;
    var speed = 100;
    var player = sprite;
    console.log("created");
    return panther;
}

Panther.prototype.create = function() {
    console.log("ran create");
    this.set_angle();
}

Panther.prototype.set_angle = function() {
    console.log(this);
    angle = Math.angleBetween(this.position.x, this.position.y,
			      player.position.x, player.position.y);
}

Panther.prototype.chase = function() {
    this.body.velocity.x = speed * Math.sin(angle);
    this.body.velocity.y = speed * Math.cos(angle);
}

Panther.prototype.update = function() {
    console.log("running update");
    this.chase();
}