Panther.prototype = Object.create(Phaser.Sprite.prototype);

Panther.prototype.constructor = Panther;

Panther.prototype.force = {x:0.0, y:0.0}; 


function Panther(group, x, y) {
    var panther = group.create(0, 0, 'panther');
    panther.position.x = x;
    panther.position.y = y;
    panther.scale.setTo(0.05, 0.05);
    panther.anchor.setTo(0.5, 0.5);

    game.physics.enable(panther, Phaser.Physics.ARCADE);
}

Panther.prototype.chase = function(player) {
    var xgoal = player.position.x;
    var ygoal = player.position.y;
    var goal_angle = Math.angleBetween(position.x, position.y, player.position.x, player.position.y);
    caught = false;
    while (false /*panther is onscreen)*/) {
	if (!caught) {
	    
	}
    }
}