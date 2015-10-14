var menuState = {
	create: function() {
		var loadingLabel = game.add.text(100, 100, 'Project Raze', {font: '30px Courier', fill: '#ffffff'});
		var startLabel = game.add.text(100, 200, 'Press Space to Start', {font: '30px Courier', fill: '#ffffff'});
		var start_key = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		start_key.onDown.addOnce(this.start, this);
		console.log('menu');
	},

	start: function() {
		game.state.start('play');
	}
};