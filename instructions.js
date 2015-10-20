var instructionsState = {
	create: function() {
		var background = game.add.sprite(-5, -8, 'instructions_screen');
		var start_key = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		start_key.onDown.addOnce(this.start, this);
		name = prompt("Please enter your name:");
	},

	start: function() {
		game.state.start('controls');
	}
};