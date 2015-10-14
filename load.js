var loadState = {
	preload: function() {
		var loadingLabel = game.add.text(400, 800, 'Loading...', {font: '64px Ariel', fill: 'white'});
		
		// Loading Assets
		game.load.image('sky', 'assets/sky.png');
	    game.load.image('ground', 'assets/platform.png');
	    game.load.atlasJSONHash('sheet_small', 'assets/maps/sheet_small.png', 'assets/maps/sheet_small.json');
	    game.load.image('bullet4', 'assets/bullet4.png');
	    game.load.image('rude', 'assets/rude.png');
	    game.load.image('rock', 'assets/maps/rock.png');
	    game.load.spritesheet('player', 'assets/player_sheet.png', 32, 32, 14);
	    game.load.image('gorilla', 'assets/Gorilla_1.png');
	    game.load.image('grass', 'assets/maps/grass_small.png');
	    game.load.image('health_25', 'assets/health_25.png');
	    game.load.image('health_50', 'assets/health_50.png');
	    game.load.image('health_75', 'assets/health_75.png');
	    game.load.image('gun_0', 'assets/gun_0.png');
	    game.load.image('gun_1', 'assets/gun_1.png');
	    game.load.image('gun_2', 'assets/gun_2.png');
	    game.load.image('header', 'assets/header.png');
	    game.load.image('tree1', 'assets/tree_assets/tree1.png');
	    game.load.image('tree2', 'assets/tree_assets/tree2.png');
	    game.load.image('rock1', 'assets/rock1.png');
	    game.load.image('rock2', 'assets/rock2.png');
	    game.load.image('healthbar', 'assets/health_bar.png');
	    game.load.image('healthbar_bg', 'assets/health_bar_background.png');
	    game.load.image('ammo_circle', 'assets/ammo_circle.png');
	    game.load.image('heart', 'assets/heart.png');
	    game.load.image('respawn', 'assets/respawn.png');
	    game.load.image('menu_background', 'assets/start_menu.png')
	    //game.renderer.renderSession.roundPixels = true;
	},

	create: function() {
		game.state.start('menu');
	}
};