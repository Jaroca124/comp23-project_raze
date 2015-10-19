var menuState = {
	create: function() {
		var background = game.add.sprite(-5, 0, 'menu_background');
		var start_key = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		start_key.onDown.addOnce(this.start, this);

		// Music
        menu_music = game.add.audio('game_music');
        menu_music.play();
		
	},

	start: function() {
		game.state.start('instructions');
	}
};