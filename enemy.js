function Enemy(group, viewGroup, x, y, enemy_type) {
    var enemyGroup = game.add.group();
    var alive = true;
    game.add.sprite(200, 200, enemy_type);
    enemyGroup.position.x = x;
    enemyGroup.position.y = y;
    var enemy = enemyGroup.create(0, 0, 'enemy');
    enemy.scale.setTo(0.05, 0.05);
    enemy.anchor.setTo(0.5, 0.5);
    enemy.angle = Math.atan2(enemy.position.x - player.position.x, enemy.position.y - player.position.y)  * -57.2957795;
    //enemy.pivot.setTo(x+256, y+256);
    //enemy.anchor.setTo(0.5, 0.5);
    //var cone = enemyGroup.create(0, -100, 'view');
    //cone.anchor.setTo(0.5, 0.5);
    //cone.collide = function() {
    //};
    //game.physics.enable(cone, Phaser.Physics.ARCADE);
    group.add(enemyGroup);
    game.physics.enable(enemy, Phaser.Physics.ARCADE);
    enemy.collide = function() {
        enemyGroup.destroy();
    };
//    enemy.addChild(cone);
}

// Missiles are a type of Phaser.Sprite
//nemy.prototype = Object.create(Phaser.Sprite.prototype);
//Enemy.prototype.constructor = Enemy;

function update_enemies(enemy, x, y) {

    // Calculate the angle from the missile to the mouse cursor game.input.x
    // and game.input.y are the mouse position; substitute with whatever
    // target coordinates you need.
    var targetAngle = game.math.angleBetween(
        game.enemy.x, game.enemy.y,
        game.player.x, game.player.y
    );

    // Make each missile steer away from other missiles.
    // Each missile knows the group that it belongs to (missileGroup).
    // It can calculate its distance from all other missiles in the group and
    // steer away from any that are too close. This avoidance behavior prevents
    // all of the missiles from bunching up too tightly and following the
    // same track.
    /*
    var avoidAngle = 0;
    this.parent.forEachAlive(function(m) {
        // Don't calculate anything if the other missile is me
        if (this == m) return;

        // Already found an avoidAngle so skip the rest
        if (avoidAngle !== 0) return;

        // Calculate the distance between me and the other missile
        var distance = this.game.math.distance(this.x, this.y, m.x, m.y);

        // If the missile is too close...
        if (distance < this.AVOID_DISTANCE) {
            // Chose an avoidance angle of 90 or -90 (in radians)
            avoidAngle = Math.PI/2; // zig
            if (this.game.math.chanceRoll(50)) avoidAngle *= -1; // zag
        }
    }, this);


    // Add the avoidance angle to steer clear of other missiles
    targetAngle += avoidAngle;*/

    // Gradually (this.TURN_RATE) aim the missile towards the target angle
    if (enemy.rotation !== targetAngle) {
        // Calculate difference between the current angle and targetAngle
        var delta = targetAngle - enemy.rotation;

        // Keep it in range from -180 to 180 to make the most efficient turns.
        if (delta > Math.PI) delta -= Math.PI * 2;
        if (delta < -Math.PI) delta += Math.PI * 2;

        if (delta > 0) {
            // Turn clockwise
            enemy.angle += enemy.TURN_RATE;
        } else {
            // Turn counter-clockwise
            enemy.angle -= enemy.TURN_RATE;
        }

        // Just set angle to target angle if they are close
        if (Math.abs(delta) < enemy.game.math.degToRad(enemy.TURN_RATE)) {
            enemy.rotation = targetAngle;
        }
    }

    // Calculate velocity vector based on enemy.rotation and enemy.SPEED
    enemy.body.velocity.x = Math.cos(enemy.rotation) * enemy.SPEED;
    enemy.body.velocity.y = Math.sin(enemy.rotation) * enemy.SPEED;
};