var game_overState = {
	create: function() {

		var background = game.add.sprite(-5, 0, 'game_over');

		var submit_button = game.add.button(600, 520, 'sb', submit_score, this);
        submit_button.anchor.set(.5);

        scoreText = game.add.text(385, 380, score, {font: '32px Verdana', fill: 'white'});

        nameText = game.add.text(345, 180, name, {font: '64px Verdana', fill: 'white'});
        console.log("why wont you print kdjhfks");
        
        var main_menu = game.add.button(150, 490, 'mm', return_to_main_menu, this);
	}
};

function submit_score() {
	var request = new XMLHttpRequest();
	var parameters = "name=" + name + "&score=" + score;
    var url = "https://evening-basin-5839.herokuapp.com/sendScores";
    request.open("POST", url, true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send(parameters);

    game.state.start('leaderboard');
}

function return_to_main_menu() {
	location.reload();
}