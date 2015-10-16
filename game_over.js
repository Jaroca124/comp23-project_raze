var game_overState = {
	create: function() {

		var background = game.add.sprite(-5, 0, 'game_over');

		var submit_button = game.add.button(660, 400, 'sb', submit_score, this);
        submit_button.anchor.set(.5);

        scoreText = game.add.text(377, 260, score, {fontsize: '1000px', fill: 'white'});

        var input_field = game.add.sprite(260, 360, 'input');
        nameText = game.add.text(375, 380, name, {fontsize: '1000px', fill: 'black'});

        var main_menu = game.add.button(350, 500, 'mm', return_to_main_menu, this);
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