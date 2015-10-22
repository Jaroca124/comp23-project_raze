var json_received;

var loadState = {
	preload: function() {
		var loadingLabel = game.add.text(300, 300, 'Loading...', {font: '64px Ariel', fill: 'white'});
		
		var request = new XMLHttpRequest();
        var url = "data.json";
        request.open("GET", url, true);

        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 200) {
                json_received = JSON.parse(request.responseText);
                health = json_received.health;
                ammo = json_received.ammo;
                starting_enemies = json_received.starting_enemies;
            }
        }

        request.send();

        // Loading Assets
        game.load.audio('game_music', 'assets/game.mp3');
		game.load.image('sky', 'assets/sky.png');
	    game.load.image('ground', 'assets/platform.png');
	    game.load.atlasJSONHash('sheet_small', 'assets/maps/sheet_small.png', 'assets/maps/sheet_small.json');
	    game.load.image('bullet4', 'assets/bullet6.png');
	    game.load.image('rude', 'assets/rude.png');
	    game.load.image('rock', 'assets/maps/rock.png');
        game.load.image('player', 'assets/player_centered.png');
	    game.load.spritesheet('gorilla', 'assets/gorilla_sheet2.png', 132.5, 140);
	    game.load.image('grass', 'assets/maps/grass_small.png');
	    game.load.image('health_25', 'assets/health_25.png');
	    game.load.image('health_50', 'assets/health_50.png');
	    game.load.image('health_75', 'assets/health_75.png');
	    game.load.image('gun_0', 'assets/gun_0.png');
	    game.load.image('gun_1', 'assets/gun_1.png');
	    game.load.image('gun_2', 'assets/gun_2.png');
	    game.load.image('header', 'assets/header1.png');
	    game.load.image('tree1', 'assets/tree_assets/tree1.png');
	    game.load.image('tree2', 'assets/tree_assets/tree2.png');
	    game.load.image('rock1', 'assets/rock1.png');
	    game.load.image('rock2', 'assets/rock2.png');
	    game.load.image('healthbar', 'assets/health_bar.png');
	    game.load.image('healthbar_bg', 'assets/health_bar_background.png');
	    game.load.image('ammo_circle', 'assets/ammo_circle.png');
	    game.load.image('heart', 'assets/heart.png');
	    game.load.image('respawn', 'assets/respawn.png');
	    game.load.image('menu_background', 'assets/start_menu.png');
	    game.load.image('level_exit', 'assets/level_exit.png');
        game.load.image('instructions_screen', 'assets/instructions_screen.png');
        game.load.image('control_screen', 'assets/control_screen.png');
        game.load.image('mm', 'assets/main_menu_button.png');
        game.load.image('sb', 'assets/submit_button.png');
        game.load.image('game_over', 'assets/gameover_screen.png');
        game.load.image('leader_bg', 'assets/leader_bg.png');
        game.load.image('input', 'assets/input.png');
        game.load.image('player_damage', 'assets/player_damaged.png');
	},

	create: function() {
		game.state.start('menu');
	}
};

//  Load various functions and objects
var score = 0;
var health_count = 0;
var current_weapon = 0;
var fired = false;
var semi = true;
var health;
var ammo;
var time;
var last_health_spawn = 0;
var last_weapon_spawn = 0;
var last_gorilla_spawn = 0;
var current_weapon_powerup;
var ammo_circle;
var healthbar;
var stashed;
var stashed_check = false;
var reloadText;
weapons = [];
var starting_enemies;
var name;


function load_level1() {
    game.state.start('level1', true);
}

function reload() {
    if (stashed_check) {
        reloadText.text = 'RELOADING';
    }
    if (game.time.now > stashed + 5000) {
        ammo = 200;
        ammoText.text = ammo;
        stashed_check = false;
        reloadText.text = '';
    }
}

function collide() {
    health -= 2;
    player.key = 'player_damage';
    changeTexture();
    healthText.text = health;
}

function enemy_collide(g1, g2) {
    g1.body.bounce.y = 1;
    g1.body.bounce.x = 1;
}

function collide2(x, y) {
    y.health--;
    x.kill(true);
    if (y.health <= 0){
       y.kill(true);
       score += 1000;
    }
}

// Maximum Health = 100
function c_Health(player, collider) {
    health += collider.collide();
    if (health > 100) {
        health = 100;
    }
    healthText.text = health;
}

function c_Gun(player, collider) {
    reloadText.text = '';
    guns.forEach(function(gun) {
        gun.kill(true);
    });
    ammo = 200;
    ammoText.text = ammo;
    current_weapon = collider.collide();
}

function collisionHandler(player, collider) {
    collider.collide();
}

function create_item(group, type) {
    var item = create_powerup(type, group, current_weapon);
    if (type == 'health') {
        health_count++;    
    }
    return item;
}

function level_collisions(powerup, level_object) {
    powerup.kill();
}

function changeTexture() {
    if (player.key === 'player')
    {
        player.loadTexture('player', 0, false);
    }
    else
    {
        player.loadTexture('player_damage', 0, false);
    }
}