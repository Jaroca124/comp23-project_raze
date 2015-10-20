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

function create_powerup(type, group, current_weapon) {
	if (type == 'health') {
	    var health_values = [25, 50, 75];
		var index = Math.floor((Math.random() * 3));
		var random_position = Math.floor((Math.random() * 1500) + 1);
	    var health_object = Health(group, health_values[index], ((250 + (random_position * 200)) % 1100) + 200, ((250 * (random_position * 300)) % 900)) + 500;
	    return health_object;
	}
	if (type == 'gun') {
		var random_position = Math.floor((Math.random() * 1100) + 1);
		if (current_weapon == 0) {
			return change_gun(guns, 1, ((250 + (random_position * 600)) % 1100) + 200, ((323 * (random_position * random_position)) % 1100)) + 200;
		}
		if (current_weapon == 1) {
			return change_gun(guns, 2, ((250 + (random_position * 800)) % 1100) + 200, ((453 * (random_position * random_position)) % 1100)) + 200;
		}
		else {
			return null;
		}
	}
}