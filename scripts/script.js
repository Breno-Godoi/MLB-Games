
const TESTCON = 200;
var xmlRequest = new XMLHttpRequest();
var counter = 0;
var arrayLenght = 0;
var gameArray = [];

function getJSONdata(api) {
    xmlRequest.onload = function () {
        if (xmlRequest.status === TESTCON) {

            var jsonObject = JSON.parse(xmlRequest.responseText);
            var homeTeam = jsonObject.data.games.game[counter].home_team_name;
            var awayTeam = jsonObject.data.games.game[counter].away_team_name;
            var winningPich = jsonObject.data.games.game[counter].winning_pitcher.first + " " + jsonObject.data.games.game[counter].winning_pitcher.last;
            var losingPitch = jsonObject.data.games.game[counter].losing_pitcher.first + " " + jsonObject.data.games.game[counter].losing_pitcher.last;
            var venue = jsonObject.data.games.game[counter].venue;
            var newJSON = JSON.stringify(jsonObject);

            arrayLenght = jsonObject.data.games.game.length
            console.log(arrayLenght);

            document.getElementById("home-team").value = homeTeam;
            document.getElementById("away-team").value = awayTeam;
            document.getElementById("win-pitch").value = winningPich;
            document.getElementById("lost-pitch").value = losingPitch;
            document.getElementById("venue").value = venue;

        }
    };
    xmlRequest.open("GET", api, true);
    xmlRequest.send();
}


function getChosenData() {
    var selectedYear = document.getElementById("year").value;
    var selectedMonth = document.getElementById("month").value;
    var selectedDay = document.getElementById("day").value;

    console.log(selectedYear);
    console.log(selectedMonth);
    console.log(selectedDay);

    var concURL = "https://gd2.mlb.com/components/game/mlb/year_" + selectedYear + "/month_" + selectedMonth + "/day_" + selectedDay + "/master_scoreboard.json";

    getJSONdata(concURL);
}

function nextGame() {
    if (counter < arrayLenght) {
        counter++;
        getChosenData();
    }
    else {
        counter = 0;
        getChosenData();
    }
}

function previousGame() {
    if (counter > 0) {
        counter--;
        getChosenData();
    }
    else {
        counter = arrayLenght;

        console.log(arrayLenght);
        getChosenData();
    }
}

function saveChanges() {

    var curHomeT = document.getElementById("home-team").value;
    var curAwayT = document.getElementById("away-team").value;
    var curWinp = document.getElementById("win-pitch").value;
    var curlosp = document.getElementById("lost-pitch").value;
    var curvenue = document.getElementById("venue").value;

    function SavedGames(homeTeam, AwayTeam, winningPitcher, losingPitcher, venue) {
        this.homeTeam = homeTeam;
        this.AwayTeam = AwayTeam;
        this.winningPitcher = winningPitcher;
        this.losingPitcher = losingPitcher;
        this.venue = venue;
    }

    gameArray.push(new SavedGames(curHomeT, curAwayT, curWinp, curlosp, curvenue));

    alert("Game Saved!");

    console.log(gameArray); //loged the Games Array on the console to check if the objects are being added correctly

}