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

function change_gun(group, gun_value, x, y) {
	var gun = group.create(0, 0, 'gun_' + gun_value);
	gun.position.x = x;
	gun.position.y = y;

	var current_weapon = gun_value;

	gun.scale.setTo(0.5,0.5);
	gun.anchor.setTo(0.5,0.5);

	game.physics.enable(gun, Phaser.Physics.ARCADE);
	
	gun.collide = function() {
		this.destroy();
		return gun_value;
	};
}