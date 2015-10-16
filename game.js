var game = new Phaser.Game(800, 600, Phaser.AUTO, "gameDiv");

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('level1', level1State);
game.state.add('instructions', instructionsState);
game.state.add('controls', controlState);
game.state.add('game_over', game_overState);
game.state.add('leaderboard', leaderboardState);

game.state.start('boot');