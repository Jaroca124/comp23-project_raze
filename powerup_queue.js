function create_queue(number_enemies, powerup_group) {
	//Math.floor((Math.random() * 10) + 1);
    var queue = [];
	
	for (var i = 0; i < number_enemies; i++) {
        var health_objects = Health(health_powerups, 75, 250 + i*50, 250 + i*100);
        queue.push(health_objects);
    }

    return queue;
}

function spawn_item() {
	
}