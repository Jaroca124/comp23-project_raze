Gorilla.prototype = Object.create(Phaser.Sprite.prototype);
Gorilla.prototype.constructor = Gorilla;
Gorilla.prototype.force = {x:0.0, y:0.0}; 


function Gorilla(group, x, y, player) {
    var gorilla = group.create(0, 0, 'gorilla');
    var player = player;
    gorilla.position.x = x;
    gorilla.position.y = y;
    gorilla.animations.add('walk');
    gorilla.scale.setTo(1, 1);
    gorilla.anchor.setTo(0.5, 0.5);
    gorilla.health = 5;

    game.physics.enable(gorilla, Phaser.Physics.ARCADE);
    return gorilla;
}

Gorilla.prototype.update = function() {

        forEach(function(gorilla) {
        if (player.position.x > gorilla.position.x){
            gorilla.position.x += .5;
        }
        if (player.position.y > gorilla.position.y){
            gorilla.position.y += .5;
        }
        if (player.position.x < gorilla.position.x){
            gorilla.position.x -= .5;
        }
        if (player.position.y < gorilla.position.y){
            gorilla.position.y -= .5;
        }
        
        gorilla.angle++;
    });
    game.physics.arcade.collide(player, gorilla);
    game.physics.arcade.overlap(ship, enemies, collide2, null, this);


}
Gorilla.prototype.collide2 =function(x, y){
    x.kill(true);

}