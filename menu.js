var menuState = {
	create: function() {
		var background = game.add.sprite(-5, 0, 'menu_background');
		var start_key = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		start_key.onDown.addOnce(this.start, this);

		// Music
        music = game.add.audio('thrice');
        music.play();
		
	},

	start: function() {
		//game.state.start('instructions');
		game.state.start('instructions');
	}
};