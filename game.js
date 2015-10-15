var game = new Phaser.Game(800, 600, Phaser.AUTO, "gameDiv");

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('level1', level1State);
game.state.add('instructions', instructionsState);
//game.state.add('win', bootState);

game.state.start('boot');