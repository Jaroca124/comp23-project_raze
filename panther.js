Panther.prototype = Object.create(Phaser.Sprite.prototype);

Panther.prototype.constructor = Panther;

Panther.prototype.force = {x:0.0, y:0.0}; 


function Panther(group, x, y, sprite) {
    var panther = group.create(0, 0, 'panther');
    panther.position.x = x;
    panther.position.y = y;
    panther.scale.setTo(0.5, 0.5);
    panther.anchor.setTo(0.5, 0.5);
    panther.enablebody = true;
    
    game.physics.enable(panther, Phaser.Physics.ARCADE);
    panther.angle;
    panther.speed = 700;
    panther.player = sprite;
    //Panther.set_angle(panther);
    return panther;
};
/*
function panther_create(group) {
    console.log("ran create");
    this.panther_set_angle();
};

function panther_set.angle(group) {
    console.log(group);
    angle = Math.angleBetween(group.position.x, group.position.y,
			      player.position.x, player.position.y);
};

function panther_chase(group) {
    group.body.velocity.x = speed * Math.sin(angle);
    group.body.velocity.y = speed * Math.cos(angle);
};

function panther_update(group) {
    console.log("running update");
    this.chase(group);
};*/