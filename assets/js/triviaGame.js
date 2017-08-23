$(document).ready(function() {

	// TODO:  Advanced setup:  
		// Setup Teams
		// Option to only get one question before rotating - GOING WITH THIS METHOD (other is boring for other teams)	
	
	// load questions based on above criteria
	
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
					console.log("****starting game timer called using : " + game.gameTimer.timer + " and clock is running: " + game.gameTimer.clockRunning + "*****")
					if (!game.gameTimer.clockRunning) {
						game.gameTimer.resetClock();
        				game.timeInterval = setInterval(game.gameTimer.count, 1000);
        				game.gameTimer.clockRunning = true;
      				}
      				else if (game.gameTimer.clockRunning) {
      					console.log("GameTimer Start was called with clock running - this is baaaddd mmmmkay");
      				}
  				},
				stop: function() {
    				clearInterval(game.timeInterval);
    				game.gameTimer.clockRunning = false;
				},
				count: function() {
					console.log("COUNT: call using: "  + game.gameTimer.timer + " clock running is: " + game.gameTimer.clockRunning + " paused: " + game.gameTimer.pause);

					if (game.gameTimer.pause) {
						console.log("game is paused for something...?");
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
			// TODO establish teams (screens and prompts)
			// TODO select question types dynamically
			// TODO select number of questions, timer, etc
			gameQuestions = getAllQuestions(game.questionTypesSelected);	
	}

	// function iterateThroughTeams() { // This is my boiler plate to get everything out of teams
	// 	console.log(game.teams);

	// 	$.each(game.teams, function(key, value) {
	// 	  console.log("team: " + key);
	// 	  $.each(value, function (key, innerValue) {
	// 	  	console.log("team stats: " + key + " value: " + innerValue);
	// 	  });
	// 	});
	// }

	// iterateThroughTeams();

	function beginGame(newGame) {
		if (newGame) {
			console.log("getting new questions");
			getQuestionsForGame();
			game.gameTimer.nextQuestion();

		}
		$(".gameOver").addClass("hidden");
		console.log("This will be a " + game.numberOfQuestions + " question long game.");
	}

	function getAllQuestions(typeOfQuestionArray) {
		console.log("===== We're in get all questions: =====");
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
		console.log("Request received to create teams, this many: " + game.numberOfTeams);

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
				console.log("*****Creating new team (empty shell): team" + [i]);
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
		console.log("Team Name: " + thisTeamName);

		if (thisTeamName != "") {
			game.teams[teamNumber].teamName = thisTeamName
		}
		else {
			alert("Team name was blank, you will be given team name: " + teamNumber);
		}

		$(".teamMember").each(function() {
			var thisOne = $(this).val();
    		console.log("this one... is...")
    		console.log(thisOne);
			game.teams[teamNumber].members += thisOne;
			console.log("Current team members: " + game.teams[teamNumber].members);
			if (thisOne != "") {
				game.teams[teamNumber].members += ", ";
			}
		});
		game.teams[teamNumber].members = game.teams[teamNumber].members.replace(/,\s*$/, ""); // remove any trailing garbage
		game.teams[teamNumber].teamAssignedNameAndMembers = true;
		console.log("Final team is: ");
		console.log(game.teams[teamNumber]);
	}

	function addTeamMemberInput() {
		// console.log("adding member input")
		var targetParent = $("#teamMembersDiv")
		var newRow = document.createElement("row");
		var newDiv = document.createElement("div");
		var newInput = document.createElement("input");
		newInput.type = "text";
		newInput.classList.add("teamMember");
		// newInput.classList.add("form-control");
		// newInput.value = "Randy Random"; // TODO don't really like adding this... 
		targetParent.append(newRow);
		newRow.append(newDiv);
		newDiv.append(newInput);
	}

	function gradingRequired() {
		if (game.round.answerToBeGraded !== "") {
			console.log("For Grading: " + game.round.answer.toLowerCase() + " VS " + game.round.answerToBeGraded.toLowerCase())
			if (game.round.answer.toLowerCase() === game.round.answerToBeGraded.toLowerCase()) {
				console.log("*****AMAZING!!!!  The answer was EXACTLY right! ***** (this will almost NEVER happen)");
				updateScore("correct");
				changeTeam();
				$("#gradingScreen").addClass("hidden");
				$("#scoreScreen").removeClass("hidden");
			}
			else {
				console.log("Manual grading required!");
				$("#previousQuestionHere").html(game.round.question);
				$("#previousAnswerHere").html(game.round.answer);
				$("#answerToBeGradedHere").html(game.round.answerToBeGraded);
			}  
		}
		else {
			console.log("They didn't try very hard - answer was blank - it is WRONG");
			updateScore("noAnswer");
			changeTeam();
			$("#gradingScreen").addClass("hidden");
			$("#scoreScreen").removeClass("hidden");
		}
		game.round.gradingRequired = false;
	}

	function getOneRandomQuestionAndRemoveItFromPool() {
		console.log("===== We're in get one question from pool: =====");

		cleanUpForNextQuestion();

		var numberOfQuestionsRemaining = getNumberOfQuestionsRemaining();

		console.log("Questions remaining in game (after this one): " + (game.numberOfQuestions - game.currentQuestion) + " questions remaining to be asked: " + numberOfQuestionsRemaining);
		if (numberOfQuestionsRemaining < (game.numberOfQuestions - game.currentQuestion)) {
			// TODO need to handle this more gracefully
			console.log("***** WARNING ***** not enough questions to finish the game");
		}
		if (numberOfQuestionsRemaining === 0) {
			console.log("Well... we're out of cake... so your options are 'or death' --- game is over (we're out of questions).");
			alert("No more questions available to be asked - so... we need to do something else");
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

			// TODO modify these to be not present at start, but on click
			// $("#mcAnswer" + randomNumberArray[0]).addClass("bg-success");
			$("#mcAnswer" + randomNumberArray[1]).removeClass("bg-success");
			$("#mcAnswer" + randomNumberArray[2]).removeClass("bg-success");
			$("#mcAnswer" + randomNumberArray[3]).removeClass("bg-success");
			// TODO REMOVE THE ABOVE LINES - this is just for testing

			$("#mcAnswer" + randomNumberArray[0]).html(game.round.answer);
			// TODO redo this where we can have more then 3x fake answers - more specifically, the assigned number of fake answers
			// this allows us to handle both multiple guess and fill in the blank in the same function

			//console.log("looks like a multple choice question - we need fake answers");

			// if (gameQuestions[Object.keys(gameQuestions)[randomNumber]].fakeAnswer1) {
			game.round.fakeAnswer1 = gameQuestions[Object.keys(gameQuestions)[randomNumber]].fakeAnswer1;
			//console.log("fake answer1: " + game.round.fakeAnswer1);
			$("#mcAnswer" + randomNumberArray[1]).html(game.round.fakeAnswer1);
			game.round.fakeAnswer2 = gameQuestions[Object.keys(gameQuestions)[randomNumber]].fakeAnswer2
			//console.log("fake answer2: " + game.round.fakeAnswer2);
			$("#mcAnswer" + randomNumberArray[2]).html(game.round.fakeAnswer2);
			game.round.fakeAnswer3 = gameQuestions[Object.keys(gameQuestions)[randomNumber]].fakeAnswer3;
			// console.log("fake answer3: " + game.round.fakeAnswer3);
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

			}
			game.round.needsToBeGraded = true;
			game.round.answerToBeGraded = "";
		}
		else {
			console.log("do we have an issue creating our questions?  we might, have a look")
		}
		// nuke the question so it can't be asked again until we reload the questions - decriment number of questions in game
		delete gameQuestions[Object.keys(gameQuestions)[randomNumber]];
		$(".displayRoundHere").html("Round " + game.currentQuestion + " of " + game.numberOfQuestions);
		// TODO set the focus on the first input if availalb.e
	}

	function checkMultipleChoiceAnswer(clickedId) {
		if (game.round.correctAnswerStoredIn == clickedId) {
			console.log("looks like we have the correct answer!");
			updateScore("correct");
		}
		else {
			console.log("MC answer is incorrect: " + clickedId);
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

		// TODO more here?
	}

	function getNumberOfQuestionsRemaining() {
		var numberOfQuestionsRemaining = Object.keys(gameQuestions).length;
		console.log("Number of questions remaining in this entire deck: " + numberOfQuestionsRemaining);
		$("#countOfQuestionsRemaining").html("Remaining Questions In Deck: " + numberOfQuestionsRemaining);
		// TODO move this count somewhere nicer.  
		return numberOfQuestionsRemaining;
	}

	function updateScore(scoreUpdate) {
		console.log("We're on team: " + game.round.team + " score update is: " + scoreUpdate);

		if (scoreUpdate == "correct") {
			game.teams[game.round.team].correctAnswer++;
		}
		else if (scoreUpdate == "wrong") {
			game.teams[game.round.team].wrongAnswer++;
		}
		else if (scoreUpdate == "noAnswer") {
			game.teams[game.round.team].noAnswer++
		}

		$("#thisTeamsNameHere").html("Team: " + game.teams[game.round.team].teamName);
		$("#numberCorrectHere").html("Correct: " + game.teams[game.round.team].correctAnswer);
		$("#numberWrongHere").html("Wrong: " + game.teams[game.round.team].wrongAnswer);
		$("#numberNoAnswerHere").html("No Answer: " + game.teams[game.round.team].noAnswer);
		console.log("answer to be graded: >" + game.round.answerToBeGraded + "< or >" + game.round.needsToBeGraded + "<");

		// TODO show all teams?  We'll have to at the end?  Might as well each round?


	}

	function changeTeam() {
		if (game.numberOfTeams > 1) {
			var nextTeam = "";

			// TODO requires significant amounts of testing.
			for (var i = 1; i<= game.numberOfTeams; i++) {
				var teamFound = false;
				for (var key in game.teams) {
					console.log("looking for:" + game.round.team + " got: " + key);
					if (key == game.round.team) {
						console.log("We found this team - now we need the next team");
						teamFound = true;
					}
					else if (teamFound && nextTeam == "") {
						game.round.team = key;
						console.log("Next team is: " + game.round.team);
					}
					else {
						console.log("Back to team 1 since we didn't find a higher teamNumber");
						game.round.team = "team1";
					}
				}
			}
		}
		else {
			console.log("We have only 1 team - so no need to change anything");
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
		game.teams.team1.correctAnswer = 0;
		game.teams.team1.wrongAnswer = 0;
		game.teams.team1.noAnswer = 0;
		game.currentQuestion = 0;
		// TODO reset round here
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
  			beginGame(true);
  		}
  		else {
	  		if (game.numberOfTeams == 1 || game.numberOfTeams == 0) {
	  			console.log("we have 0 or 1 as our team request...")
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
	  			console.log("More then 1 team selected... let's create teams");
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
		$(".displayRoundHere").html("Round " + game.currentQuestion + " of " + game.numberOfQuestions);
		if (game.currentQuestion >= game.numberOfQuestions) {
			console.log("Click to continue:  No, game is over!");
			$(".gameOver").removeClass("hidden");	
			game.gameTimer.stop();
		}
		else if (game.currentQuestion < game.numberOfQuestions) {			
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
		$(".gameOver").addClass("hidden");
		$("#scoreScreen").addClass("hidden");
		$("#numberOfTeams").prop("disabled", false);
		$("#setupScreen").removeClass("hidden");
	});

	$("#stopHere").click(function () {
		game.gameTimer.stop();
		// console.log("global stop for testing purposes - will be removed later");
		// console.log(game.teams)
		console.log(game.round.team)
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