var leaderboardState = {
	create: function() {
		var background = game.add.sprite(-5, 0, 'leader_bg');
		var main_menu = game.add.button(350, 500, 'mm', return_to_main_menu, this);
		get_scores(game);
	}
};

function get_scores(game) {
    var request = new XMLHttpRequest();
    var url = "https://evening-basin-5839.herokuapp.com/getScores";
    request.open("GET", url, true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var scores = [];

    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
        	scores = JSON.parse(request.responseText);
        	if (scores.length > 4) {
	        	for (i = 0; i < 5; i++) {
					score1 = game.add.text(325, 200 + 50 * i, scores[i].name + ' - ' + scores[i].score, { fontSize: '170px', fill: 'white'});
				}
			}
			else {
				for (i = 0; i < scores.length; i++) {
					score1 = game.add.text(325, 200 + 50 * i, scores[i].name + ' - ' + scores[i].score, { fontSize: '170px', fill: 'white'});
				}	
			}
	     }
    }

    request.send();
}