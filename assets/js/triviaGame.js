$(document).ready(function() {

	var game = {};
	var gameQuestions = {};
	initializeGame();

	function initializeGame() {
		// this is done before we start so users can modify it
		game = {
			numberOfTeams:0,
			numberOfQuestions:0,
			currentQuestion:0,
			outOfQuestions:false,
			questionTypesSelected:[], // these dynamically load based on game setup
			roundMaxTime:0, // assume seconds - no infinite, but give users ability to set at 'high' (nearly unlimited) number
			round: {
				team:"team1",
				roundNumber:1,
				// questionNumber:1,
				question:"",
				answer:"",
				type:"",
				fakeAnswer1:"",
				fakeAnswer2:"",
				fakeAnswer3:"",
				correctAnswerStoredIn:"",
				showBlanks:"",
				needsToBeGraded:false,
				answerToBeGraded:""
			},
			gameTimer: { 
				timer:0,
				clockRunning:false,
				pause:false,
				start: function() {
					if (!game.gameTimer.clockRunning) {
						game.gameTimer.resetClock();
        				game.timeInterval = setInterval(game.gameTimer.count, 1000);
        				game.gameTimer.clockRunning = true;
      				}
      				else if (game.gameTimer.clockRunning) {
      					console.log("GameTimer Start was called with clock running - this is baaaddd mmmmkay, fix it.");
      				}
  				},
				stop: function() {
    				clearInterval(game.timeInterval);
    				game.gameTimer.clockRunning = false;
				},
				count: function() {
					// console.log("COUNT: call using: "  + game.gameTimer.timer + " clock running is: " + game.gameTimer.clockRunning + " paused: " + game.gameTimer.pause);

					if (game.gameTimer.pause) {
						// console.log("game is paused for something...?");
					}
					else if (!game.gameTimer.pause) {
						$("#scoreScreen").addClass("hidden");

						if ((game.gameTimer.timer <= game.roundMaxTime) && (game.gameTimer.timer > 0)) {
	    					game.gameTimer.timer--;
	    				}
	    				else if (game.gameTimer.timer <= 0) {
	    					console.log("COUNT: game timer is: " + game.gameTimer.timer + " clock running is: " + game.gameTimer.clockRunning);
	    					console.log("time is up!");
	    					$("#scoreScreen").removeClass("hidden");
	    					updateScore("noAnswer");
	    					changeTeam();
	    					game.gameTimer.pause = true; 
	    				}
	    				else if (game.gameTimer.timer > game.roundMaxTime) {
	    					game.gameTimer.timer = game.roundMaxTime;
	    					game.gameTimer.timer--;
	    					console.log("time was above max somehow - look into this error");
	    				}
	    				else {
	    					console.log("we appear to have an issue with gametimer counting");
	    					console.log(game.gameTimer.timer + "/" + game.roundMaxTime);
	    				}
    				}
    				$("#displayTimeHere").html("Time Remaining: " + game.gameTimer.timeConverter(game.gameTimer.timer));
  				},
  				resetClock: function() {
  					game.gameTimer.timer = game.roundMaxTime;
  				},
  				nextQuestion: function() {
  					game.gameTimer.stop();
  					game.currentQuestion++;
  					getOneRandomQuestionAndRemoveItFromPool();
  					game.gameTimer.start();
  				},
				timeConverter: function (t) { 
				    //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
				    var minutes = Math.floor(t / 60);
				    var seconds = t - (minutes * 60);

				    if (seconds < 10) {
				      seconds = "0" + seconds;
				    }

				    if (minutes === 0) {
				      minutes = "0";
				    }
				    return minutes + ":" + seconds;
  				}
  			},
  			teams: {
			}
		}
		createCheckboxArrayForQuestionTypes();
	}

	function getQuestionsForGame() {
			gameQuestions = getAllQuestions(game.questionTypesSelected);	
	}

	function beginGame(newGame) {
		game.round.team = "team1"; //resets team to team1 (from setup earlier)
		if (newGame) {
			console.log("getting new questions");
			getQuestionsForGame();
			game.gameTimer.nextQuestion();

		}
		$(".gameOver").addClass("hidden");
		console.log("This will be a " + game.numberOfQuestions + " question long game.");
	}

	function getAllQuestions(typeOfQuestionArray) {
		var questionObject = {};
		typeOfQuestionArray.forEach(function(item){
			var thisItem = item;
			questionObject = Object.assign(questionObject, thisItem);
		});
		return questionObject;
	}

	function createCheckboxArrayForQuestionTypes () {
		targetParent = $("#checkboxArrayForQuestionTypesHere");
		targetParent.empty();
		availableQuestionsArray.forEach(function(item){
			var newRow = document.createElement("row");
			var newDiv = document.createElement("div");
			var newInput = document.createElement("input");
			var newLabel = document.createElement("label");
			newInput.type = "checkbox";
			newInput.name = "selectQuestionTypesCheckbox";
			newInput.id = item[0];
			newInput.value = item[0];
			newLabel.for = item[0];
			newLabel.innerHTML = item[0];
			targetParent.append(newRow);
			newRow.append(newDiv);
			newDiv.append(newLabel);
			newDiv.append(newInput);
			(document.createTextNode('text for label after checkbox'));
			newInput.setAttribute("class", "form-control");
			newInput.setAttribute("class", "big-checkbox");
			newInput.setAttribute("checked", true);
		});
	}

	function createTeams() {
		for (var i = 1; i <= game.numberOfTeams; i++) {
			var teamExists = false;
			$.each(game.teams, function(key, value) {
				var thisTeam = "team" + [i]
				if (thisTeam == key || teamExists == true) {
					teamExists = true;
				}
				else {
					// console.log("team" + [i] + "  this isn't it... moving on");
				}
			});
			if (!teamExists) {
				var newTeamName = "team" + [i];
				var newTeamObject = {[newTeamName]: {
										teamName:newTeamName,
										members:"Human 1, plus others?",
										teamAssignedNameAndMembers:false,
										correctAnswer:0,
										wrongAnswer:0,
										noAnswer:0,
										needTieBreaker:false
									}
				}
				game.teams = Object.assign(game.teams, newTeamObject);
				// creating empty shell teams - these will be populated later with actual user data
			}
			else if (teamExists) {
				console.log("Looks like we had a pre-filled team" + [i] + " - check on this (why wasn't it cleared out)?")
			}
		}
	}

	function setupTeamNameAndMembers() {
		addTeamMemberInput();

		var teamNumber = "";

		$.each(game.teams, function(key, value) {
			if (value.teamAssignedNameAndMembers === false) {
				teamNumber = key;
				return false; // this allows teams to be filled in order (team1, team2, etc)
			}
		});
		
		$("#teamName").val(teamNumber);
		$("#creatingThisTeam").html("Creating: " + teamNumber);

		if (teamNumber != "") {
			game.round.team = teamNumber;
		}
		else if (teamNumber == "") {
			$("#teamCreationScreen").addClass("hidden");
			$("#numberOfTeams").prop("disabled", true);
		}
		else {
			console.log("Something happened with setup team name and members")
		}
	}

	function assignTeamNameAndMembers() {
		var teamNumber = game.round.team;
		game.teams[teamNumber].members = "";
		var thisTeamName = $("#teamName").val();

		if (thisTeamName != "") {
			game.teams[teamNumber].teamName = thisTeamName
		}
		else {
			alert("Team name was blank, you will be given team name: " + teamNumber);
		}

		$(".teamMember").each(function() {
			var thisOne = $(this).val();
			game.teams[teamNumber].members += thisOne;
			if (thisOne != "") {
				game.teams[teamNumber].members += ", ";
			}
		});
		game.teams[teamNumber].members = game.teams[teamNumber].members.replace(/,\s*$/, ""); // remove any trailing garbage
		game.teams[teamNumber].teamAssignedNameAndMembers = true;
	}

	function addTeamMemberInput() {
		var targetParent = $("#teamMembersDiv")
		var newRow = document.createElement("row");
		var newDiv = document.createElement("div");
		var newInput = document.createElement("input");
		newInput.type = "text";
		newInput.classList.add("teamMember");
		newInput.classList.add("form-control");
		newInput.setAttribute("autocomplete", "off");
		targetParent.append(newRow);
		newRow.append(newDiv);
		newDiv.append(newInput);
	}

	function gradingRequired() {
		if (game.round.answerToBeGraded !== "") {
			if (game.round.answer.toLowerCase() === game.round.answerToBeGraded.toLowerCase()) {
				updateScore("correct");
				changeTeam();
				$("#gradingScreen").addClass("hidden");
				$("#scoreScreen").removeClass("hidden");
			}
			else {
				$("#previousQuestionHere").html(game.round.question);
				$("#previousAnswerHere").html(game.round.answer);
				$("#answerToBeGradedHere").html(game.round.answerToBeGraded);
			}  
		}
		else {
			updateScore("noAnswer");
			changeTeam();
			$("#gradingScreen").addClass("hidden");
			$("#scoreScreen").removeClass("hidden");
		}
		game.round.gradingRequired = false;
	}

	function getOneRandomQuestionAndRemoveItFromPool() {
		cleanUpForNextQuestion();

		var numberOfQuestionsRemaining = getNumberOfQuestionsRemaining();

		if (numberOfQuestionsRemaining < (game.numberOfQuestions - game.currentQuestion)) {
			// TODO need to handle this more gracefully
			console.log("***** WARNING ***** not enough questions to finish the game");
		}
		if (numberOfQuestionsRemaining === 0) {
			console.log("Well... we're out of cake... so your options are 'or death' --- game is over (we're out of questions).");
			alert("No more questions available to be asked - game is over");
			// TODO prompt for a question deck reload?
			game.outOfQuestions = true;
			game.gameTimer.stop();
			return false;
		}
		var randomNumber = Math.floor(Math.random() * numberOfQuestionsRemaining);
		game.round.question = gameQuestions[Object.keys(gameQuestions)[randomNumber]].question;
		$("#question").html("<h1>" + game.round.question + "</h1>");
		game.round.answer = gameQuestions[Object.keys(gameQuestions)[randomNumber]].answer;

		if (gameQuestions[Object.keys(gameQuestions)[randomNumber]].type == "mc") {
			
			var randomNumberArray = createAndShuffleRandomNumberArray(4); // TODO this should be the length of the answers, not hard coded

			game.round.correctAnswerStoredIn = "mcAnswer" + randomNumberArray[0];

			// TODO modify these to do something fun on click (good and bad?)
			// $("#mcAnswer" + randomNumberArray[0]).addClass("bg-success");
			// $("#mcAnswer" + randomNumberArray[1]).removeClass("bg-success");
			// $("#mcAnswer" + randomNumberArray[2]).removeClass("bg-success");
			// $("#mcAnswer" + randomNumberArray[3]).removeClass("bg-success");

			$("#mcAnswer" + randomNumberArray[0]).html(game.round.answer);
			// TODO redo this where we can have more then 3x fake answers - more specifically, the assigned number of fake answers

			game.round.fakeAnswer1 = gameQuestions[Object.keys(gameQuestions)[randomNumber]].fakeAnswer1;
			$("#mcAnswer" + randomNumberArray[1]).html(game.round.fakeAnswer1);
			game.round.fakeAnswer2 = gameQuestions[Object.keys(gameQuestions)[randomNumber]].fakeAnswer2
			$("#mcAnswer" + randomNumberArray[2]).html(game.round.fakeAnswer2);
			game.round.fakeAnswer3 = gameQuestions[Object.keys(gameQuestions)[randomNumber]].fakeAnswer3;
			$("#mcAnswer" + randomNumberArray[3]).html(game.round.fakeAnswer3);

			$("#fitb").addClass("hidden");
			$(".fitb-submit").addClass("hidden");
			$(".mc").removeClass("hidden");

		}
		else if (gameQuestions[Object.keys(gameQuestions)[randomNumber]].type === "fitb") {
			game.round.showBlanks = gameQuestions[Object.keys(gameQuestions)[randomNumber]].showBlanks;
			var targetParent = $("#fitb")
			targetParent.empty();
			targetParent.removeClass("hidden");
			$(".fitb-submit").removeClass("hidden");
			$(".mc").addClass("hidden");

			for (var i = 1; i <= game.round.showBlanks; i++) {
				var newRow = document.createElement("row");
				var newDiv = document.createElement("div");
				var newInput = document.createElement("input");
				newInput.type = "text";
				newInput.id = "answer" + i;
				targetParent.append(newRow);
				newRow.append(newDiv);
				newDiv.append(newInput);
				newInput.setAttribute("class", "form-control");
				newInput.setAttribute("autocomplete", "off");
			}
			game.round.needsToBeGraded = true;
			game.round.answerToBeGraded = "";
		}
		else {
			console.log("do we have an issue creating our questions?  we might, have a look")
		}
		// nuke the question so it can't be asked again until we reload the questions - decriment number of questions in game
		delete gameQuestions[Object.keys(gameQuestions)[randomNumber]];
		$(".displayRoundHere").html(game.teams[game.round.team].teamName + "<br>Round " + game.round.roundNumber + " of " + game.numberOfQuestions);
		// TODO set the focus on the first input if availalble
	}

	function checkMultipleChoiceAnswer(clickedId) {
		if (game.round.correctAnswerStoredIn == clickedId) {
			updateScore("correct");
		}
		else {
			updateScore("wrong");
		}
		changeTeam();
		game.gameTimer.pause = true;
		game.gameTimer.timer = 0;
	}

	function cleanUpForNextQuestion() {

		// first we clean up
		$("#question").empty();
		game.round.needsToBeGraded = false;
		game.round.answerToBeGraded = "";
		game.round.correctAnswerStoredIn = "";
		$("#displayTimeHere").html("Time Remaining: " + game.gameTimer.timeConverter(game.roundMaxTime));

	}

	function getNumberOfQuestionsRemaining() {
		var numberOfQuestionsRemaining = Object.keys(gameQuestions).length;
		$("#countOfQuestionsRemaining").html("Remaining Questions In Deck: " + numberOfQuestionsRemaining);
		// TODO move this count somewhere nicer.  
		return numberOfQuestionsRemaining;
	}

	function updateScore(scoreUpdate) {

		if (scoreUpdate == "correct") {
			game.teams[game.round.team].correctAnswer++;
		}
		else if (scoreUpdate == "wrong") {
			game.teams[game.round.team].wrongAnswer++;
		}
		else if (scoreUpdate == "noAnswer") {
			game.teams[game.round.team].noAnswer++
		}

		// TODO revamp this into a grid
		// <blank> Correct / Incorrect / No answer
		// Team1Name # / # / # 
		// Team2Name # / # / #
		// TeamnName # / # / #

		$("#thisTeamsNameHere").html("Team: " + game.teams[game.round.team].teamName);
		$("#numberCorrectHere").html("Correct: " + game.teams[game.round.team].correctAnswer);
		$("#numberWrongHere").html("Wrong: " + game.teams[game.round.team].wrongAnswer);
		$("#numberNoAnswerHere").html("No Answer: " + game.teams[game.round.team].noAnswer);

	}

	function changeTeam() {
		if (game.numberOfTeams > 1) {
			var nextTeam = "";
			var teamFound = false;

			for (var key in game.teams) {
				if (key == game.round.team) {
					teamFound = true;
				}
				else if (teamFound) {
					game.round.team = key;
					nextTeam = key;
					return false; // break out if we find our next team
				}
				else {
					// console.log("These aren't the droids we're looking for... - looking for"  + game.round.team + " got: " + key);
				}
			}
			console.log("Team Found: " + teamFound + " next team: " + nextTeam)
			if (nextTeam == "") {
				game.round.team = "team1";
				game.round.roundNumber++;
			}
		}
	}

	function createAndShuffleRandomNumberArray(number) {
		var returnArray = [];
		for (var i = 1; i <= number; i++){
			returnArray.push(i);
		}
		shuffle(returnArray);
		
		return returnArray;
	}

	function shuffle(array) { // shamelessly copied from: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  		var currentIndex = array.length, temporaryValue, randomIndex;

  		// While there remain elements to shuffle...
  		while (0 !== currentIndex) {

		    // Pick a remaining element...
		    randomIndex = Math.floor(Math.random() * currentIndex);
		    currentIndex -= 1;

	    	// And swap it with the current element.
	    	temporaryValue = array[currentIndex];
	    	array[currentIndex] = array[randomIndex];
	    	array[randomIndex] = temporaryValue;
		}
  	return array;
	}

	function clearScores() {
		console.log("loop through teams and reset their scores to zero");
		// TODO team loop (once teams are ready)
		game.round.roundNumber = 1;
		game.currentQuestion = 0;


 		$.each(game.teams, function(key, value) {
 			game.teams[key].correctAnswer = 0;
 			game.teams[key].wrongAnswer = 0;
 			game.teams[key].noAnswer = 0;
		});
	}

	function processAnswerSubmit(e) { // nabbed from: https://stackoverflow.com/questions/5384712/capture-a-form-submit-in-javascript
    if (e.preventDefault) e.preventDefault();    

    	for (var i = 1; i <= game.round.showBlanks; i++) {
			game.round.answerToBeGraded += $("#answer" + i).val();
			if (game.round.showBlanks > 1 && i != game.round.showBlanks && $("#answer" + i).val() != "") {
				game.round.answerToBeGraded += ", ";
			}
		}
		
		$("#gradingScreen").removeClass("hidden");
		gradingRequired();
		game.gameTimer.pause = true;
		game.gameTimer.timer = 0;

		// TODO get the focus off the submit element (which is behind the screen that is visible)
		//$("#scoreScreen").focus(); // this isn't working as I'd like

    	return false;
	}

	var form = document.getElementById('fitb-form'); // nabbed from: https://stackoverflow.com/questions/5384712/capture-a-form-submit-in-javascript
		if (form.attachEvent) {
    		form.attachEvent("submit", processAnswerSubmit);
		} 
		else {
	    	form.addEventListener("submit", processAnswerSubmit);
		}

	function processSetupSubmit(e) { // nabbed from: https://stackoverflow.com/questions/5384712/capture-a-form-submit-in-javascript
        if (e.preventDefault) e.preventDefault();

    	// this grabs our checkboxes for questions - will be used to begin game below
  		$("input:checkbox[name=selectQuestionTypesCheckbox]:checked").each(function(){
  			var thisQuestionArrayItem = [] 
  			for (var i = 0; i < availableQuestionsArray.length; i++) {
  				thisQuestionArrayItem = availableQuestionsArray[i][0];
  				if ($(this).val() == thisQuestionArrayItem) { 
	    			game.questionTypesSelected.push(availableQuestionsArray[i][1]);
	    		}
	    	}
		});


    	if ($("#numberOfTeams").val() != "") {
  			game.numberOfTeams = $("#numberOfTeams").val();
		}
  		game.numberOfQuestions = $("#numberOfQuestionsId").val();
  		game.roundMaxTime = $("#lengthOfRoundId").val();

  		var countOfTeamsAssignedNameAndMembers = 0;
  		$.each(game.teams, function(key, value) {
				if (value.teamAssignedNameAndMembers == true) {
					countOfTeamsAssignedNameAndMembers++;
				}
		});

  		if (countOfTeamsAssignedNameAndMembers == game.numberOfTeams && game.numberOfTeams != 0) {
  			$("#setupScreen").addClass("hidden");
  			beginGame(true);
  		}
  		else {
	  		if (game.numberOfTeams == 1 || game.numberOfTeams == 0) {
	  			$("#setupScreen").addClass("hidden");
	  			game.numberOfTeams = 1;
	  			createTeams(); // creates the single shell team with a generic name
	  			beginGame(true);
	  		}
	  		else if (game.numberOfTeams < 0) {
	  			// TODO handle if it's not a number as well
	  			console.log("So... uhh... negative teams huh?");
	  			alert ("Try a better number for teams, eh?");
	  			return false;
	  		}
	  		else {
	  			$("#teamCreationScreen").removeClass("hidden");
	  			createTeams();
	  			setupTeamNameAndMembers();
	  		}
	  	}
  		// TODO force this to be numeric - ideally ranged 1-99
    	return false;
	}

    var setupForm = document.getElementById('setupForm'); // source nabbed from: https://stackoverflow.com/questions/5384712/capture-a-form-submit-in-javascript
    if (setupForm.attachEvent) {
            setupForm.attachEvent("submit", processSetupSubmit);
		} 
		else {
            setupForm.addEventListener("submit", processSetupSubmit);
		}

	$("#scoreScreen").click(function () {
		var totalQuestions = game.numberOfTeams * game.numberOfQuestions;
		$(".displayRoundHere").html(game.teams[game.round.team].teamName + "<br>Round " + game.round.roundNumber + " of " + game.numberOfQuestions);
		console.log("we're at question: " + game.currentQuestion + " of (in the game):" + totalQuestions);
		if (game.currentQuestion >= totalQuestions) {
			console.log("Click to continue:  No, game is over!");
			$(".gameOver").removeClass("hidden");	
			game.gameTimer.stop();
		}
		else if (game.currentQuestion < totalQuestions) {			
			game.gameTimer.pause = false;
			game.gameTimer.nextQuestion();
			$("#scoreScreen").addClass("hidden");
		}
		else {
			console.log("Score Screen Click... absorbing something that shouldn't exist")
		}
	});

	$("#newGameSamePeople").click(function () {
		clearScores();
		$("#scoreScreen").addClass("hidden");
		$(".gameOver").addClass("hidden");
		beginGame(false); // false signifies we don't need new questions in begin game
	});

	$("#newGameDifferentPeople").click(function () {
		initializeGame();
		$("#teamMembersDiv").empty();
		$(".gameOver").addClass("hidden");
		$("#scoreScreen").addClass("hidden");
		$("#numberOfTeams").prop("disabled", false);
		$("#setupScreen").removeClass("hidden");
	});

	$("#stopHere").click(function () { // useful for testing - will remove when we're done, done
		game.gameTimer.stop();
		console.log("global stop for testing purposes - will be removed later");
		console.log(game.teams)
		console.log(game.round.team)
		console.log("round: "+ game.round.roundNumber);
	});

	$(".mc").click(function (event) {
		checkMultipleChoiceAnswer(event.target.id);
		$("#scoreScreen").removeClass("hidden");
	});

	$("#correctAnswerButton").click(function () {
		$("#gradingScreen").addClass("hidden");
		updateScore("correct");
		changeTeam();
		$("#scoreScreen").removeClass("hidden");
	});

	$("#wrongAnswerButton").click(function () {
		$("#gradingScreen").addClass("hidden");
		updateScore("wrong");
		changeTeam();
		$("#scoreScreen").removeClass("hidden");
	});

	$("#teamCreationButton").click(function () {
		assignTeamNameAndMembers();
		$("#teamName").html("");
		$("#teamMembersDiv").empty();
		setupTeamNameAndMembers();
	});

	$("#clickToAddTeamMember").click(function () {
		addTeamMemberInput();
	});
});