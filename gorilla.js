var Rock = function (game, key) {
    Phaser.Sprite.call(this, game, 0, 0, key);
    this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
    this.anchor.set(0.5);
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.exists = false;
    this.tracking = false;
    this.scaleSpeed = 0;
};

Rock.prototype = Object.create(Phaser.Sprite.prototype);
Rock.prototype.constructor = Rock;

Gorilla.prototype = Object.create(Phaser.Sprite.prototype);

Gorilla.prototype.constructor = Gorilla;

Gorilla.prototype.force = {x:0.0, y:0.0}; 


function Gorilla(group, x, y) {
    var gorilla = group.create(0, 0, 'gorilla');
    gorilla.position.x = x;
    gorilla.position.y = y;
    gorilla.scale.setTo(0.05, 0.05);
    gorilla.anchor.setTo(0.5, 0.5);

    game.physics.enable(gorilla, Phaser.Physics.ARCADE);
}

Gorilla.prototype.throw = function (x, y, rock) {

        x = x + 10;
        y = y + 50;
        rock.throw(x, y, this.angle - 90, 150, 0, 0);

};
Gorilla.prototype.update = function() {

    this.throw(this.position.x,this.position.y);


}
Rock.prototype.update = function () {
    if (this.tracking) {
        this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);
    }
    if (this.scaleSpeed > 0) {
        this.scale.x += this.scaleSpeed;
        this.scale.y += this.scaleSpeed;
    }
};
Rock.prototype.throw = function (x, y, angle, speed, gx, gy) {
    gx = gx || 0;
    gy = gy || 0;
    this.reset(x, y);
    this.scale.set(1);
    this.game.physics.arcade.velocityFromAngle(angle, speed, this.body.velocity);
    this.angle = angle;
    this.body.gravity.set(gx, gy);
};