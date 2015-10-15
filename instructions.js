var instructionsState = {
	create: function() {
		var background = game.add.sprite(-5, 0, 'menu_background');
		var start_key = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		start_key.onDown.addOnce(this.start, this);
		
	},

	start: function() {
		game.state.start('level1');
	}
};