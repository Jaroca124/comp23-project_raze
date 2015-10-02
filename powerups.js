function Health(group, value, x, y) {
	//Set group position
	var health = group.create(0, 0, 'health_' + value);
	health.position.x = x;
	health.position.y = y;

	var health_points = value;
	
	health.scale.setTo(0.5,0.5);
	health.anchor.setTo(0.5,0.5);

	game.physics.enable(health, Phaser.Physics.ARCADE);
	
	health.collide = function() {
		this.destroy();
		return health_points;
	};
}