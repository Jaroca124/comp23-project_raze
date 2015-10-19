//Functions for Bullets
//Functions for Bullets
var Bullet = function (game, key) {

    Phaser.Sprite.call(this, game, 0, 0, key);
    this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.anchor.set(0.5);
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.exists = false;
    this.tracking = false;
    this.scaleSpeed = 0;
};

Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;

Bullet.prototype.fire = function (x, y, angle, speed, gx, gy) {
    gx = gx || 0;
    gy = gy || 0;
    this.reset(x, y);
    this.scale.set(1);
    this.game.physics.arcade.velocityFromAngle(angle, speed, this.body.velocity);
    this.angle = angle;
    this.body.gravity.set(gx, gy);
};

Bullet.prototype.update = function () {
    if (this.tracking) {
        this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);
    }
    if (this.scaleSpeed > 0) {
        this.scale.x += this.scaleSpeed;
        this.scale.y += this.scaleSpeed;
    }
    	game.physics.arcade.overlap(this, gorillas, collide2);

};

var Weapon = {};

Weapon.SingleBullet = function (game) {
    Phaser.Group.call(this, game, game.world, 'Single Bullet', false, true, Phaser.Physics.ARCADE);
    this.nextFire = 0;
    this.bulletSpeed = 700;
    this.fireRate = 100;

    for (var i = 0; i < 64; i++) {
        this.add(new Bullet(game, 'bullet4'), true);
    }

    return this;

};

Weapon.SingleBullet.prototype = Object.create(Phaser.Group.prototype);
Weapon.SingleBullet.prototype.constructor = Weapon.SingleBullet;

Weapon.SingleBullet.prototype.fire = function (source, Dual) {

    if (game.time.time < this.nextFire) { return; }
    var x;
    var y;
    if (Dual) {
        x = source.x + 10;
        y = source.y;
        this.getFirstExists(false).fire(x, y, player.angle, this.bulletSpeed, 0, 0);
        x = source.x - 10;
        y = source.y;
        this.getFirstExists(false).fire(x, y, player.angle, this.bulletSpeed, 0, 0);
    }
    else {
        x = source.x + (Math.sin(player.angle) * 4;
        y = source.y + (Math.sin(player.angle) * 4;
        this.getFirstExists(false).fire(x, y, player.angle, this.bulletSpeed, 0, 0);
    }

    this.nextFire = game.time.time + this.fireRate;

};

function determine_gun(semi, current_weapon) {
    
}