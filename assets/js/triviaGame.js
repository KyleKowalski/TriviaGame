$(document).ready(function() {

	// //this function includes all necessary js files for the application
	// function include(file)
	// {

	//   var script  = document.createElement('script');
	//   script.src  = file;
	//   script.type = 'text/javascript';
	//   script.defer = true;

	//   document.getElementsByTagName('head').item(0).appendChild(script);

	// }

	/* include any js files here */
	// include('assets/js/triviaQuestionRepository.js');
	// above code shamelessly copied from:  http://chapter31.com/2006/12/07/including-js-files-from-within-js-files/


// var imported = document.createElement('script');
// imported.src = 'assets/js/triviaQuestionRepository.js';
// document.head.appendChild(imported);	

// console.log(imported); //.generalQuestions.q1.question)

// $.getScript("assets/js/triviaQuestionRepository.js", function(){

//    alert("Script loaded but not necessarily executed.");

// });

////////////////////////////////////////// above block not seeming to work yet ///////////////////////////////////////////

	var generalQuestionsMultipleChoice = {
		genmc1: {
			question:"What's my name?",
			answer:"Kyle",
			type:"mc",
			fakeAnswer1:"Hey you",
			fakeAnswer2:"The admin.",
			fakeAnswer3:"The trivia master"
		},
		genmc2: {
			question:"What's my favorite color?",
			answer:"Green",
			type:"mc",
			fakeAnswer1:"Yellow",
			fakeAnswer2:"Pink",
			fakeAnswer3:"Go eat a pancake"
		}
	}

	var generalQuestionsFillInTheBlank = {
		genfitb1: {
			question:"What's my name?",
			answer:"Kyle",
			showBlanks:1,
			type:"fitb"
		},
		genfitb2: {
			question:"What's my favorite color?",
			answer:"Green",
			showBlanks:1,
			type:"fitb"
		},
		genfitb3: {
			question:"Name 3 presidents?",
			answer:"needs human review",
			showBlanks:3,
			type:"fitb"
		},
		genfitb4: {
			question:"Name 5 presidents since 1980?",
			answer:"(5 of these) Regan, Bush Jr, Bush Sr, Clinton, Obama, & Trump",
			showBlanks:5,
			type:"fitb"
		}
	}

	var geographyQuestionsMultipleChoice = {
		geomc1: {
			question:"Where is Colorado?",
			answer:"In the middle of the United States",
			type:"mc",
			fakeAnswer1:"It's a figment of your imagination",
			fakeAnswer2:"Where we all are",
			fakeAnswer3:"Everywhere."
		}
	}

	var geographyQuestionsFillInTheBlank = {
		geofitb1: {
			question:"Spell Colorado?",
			answer:"Colorado",
			showBlanks:1,
			type:"fitb"
		},
		geofitb1: {
			question:"Name States that start with C?",
			answer:"Colorado, Connecticut, California",
			showBlanks:3,
			type:"fitb"
		}
	}

	var availableQuestionsArray = 	[["General Questions Multiple Choice",generalQuestionsMultipleChoice],
									["General Questions Fill In The Blank",generalQuestionsFillInTheBlank],
									["Geography Questions Multiple Choice",geographyQuestionsMultipleChoice],
									["Geography Questions Fill In The Blank",geographyQuestionsFillInTheBlank]]

////////////////////////////////////////// above block to be removed once we have the top block working ///////////////////////////////////////////	

	// basic setup
		// how many questions - DONE
			// type of questions?
				// multiple choice - DONE
				// fill in the blank  TODO:  this is out of scope - DONE
					// take everything to lower case to make this easier. string comparison? - DONE
					// fuzzy string matching?  This would be HARD to do. - SKIP (for now - likely outside of scope)
		// genre(s)? - DONE - handled in question setup
		// time to answer (make this variable? ... why not? --- zero is infinite, otherwise use # of seconds) - DONE
		// time after answer (make this variable? ... why not? --- zero is infinite, otherwise use # of seconds) - DONE

	// TODO:  Advanced setup:  
		// Setup Teams
		// Option to only get one question before rotating - GOING WITH THIS METHOD (other is boring for other teams)

	// TODO:  Pause button (longer games will need it - throw up a splash screen so that the game is not visible?)
		// limit to 3x pauses or what not? - SKIP (probably) - doable, just makes the game mechanic weird

	// load questions based on above criteria
	
	// TODO this will be in some kind of loop - DONE

	// randomize questions - DONE

	// start timer - DONE

	// show question - DONE

	// dynamically build answers - DONE

	// on click user answers or timeout - DONE

	// correct or incorrect or timeout counters go up

	// load next question - DONE

	// TODO remove question from list when already answered - so next game has new questions - DONE

	var game = {};
	var gameQuestions = {};
	initializeGame();

	// mapFunction(); // TODO figure this out later

	// function mapFunction() {
	// 	Map.prototype.keys
	// };
	
	// createCheckboxArrayForQuestionTypes()

	function initializeGame() {
		// this is done before we start so users can modify it
		game = {
			numberOfTeams:0,
			numberOfQuestions:0,
			currentQuestion:0,
			outOfQuestions:false,
			questionTypesSelected:[generalQuestionsMultipleChoice,
									geographyQuestionsMultipleChoice,
									generalQuestionsFillInTheBlank,
									geographyQuestionsFillInTheBlank],
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
				// pauseLength:3,
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
					// console.log("Just because: " + game.currentQuestion);

					if (game.gameTimer.pause) {
						console.log("game is paused for something...?");
					}
					else if (!game.gameTimer.pause) {
						// console.log("game is not paused - continuing");
						$("#scoreScreen").addClass("hidden");
					
						if ((game.gameTimer.timer <= game.roundMaxTime) && (game.gameTimer.timer > 0)) {
	    					game.gameTimer.timer--;
	    				}
	    				else if (game.gameTimer.timer <= 0) {
	    					console.log("COUNT: game timer is: " + game.gameTimer.timer + " clock running is: " + game.gameTimer.clockRunning);
	    					console.log("time is up!");
	    					game.gameTimer.pause = true;
	    					$("#scoreScreen").removeClass("hidden");
	    				}
	    				else if (game.gameTimer.timer > game.roundMaxTime) {
	    					game.gameTimer.timer = game.roundMaxTime;
	    					game.gameTimer.timer--;
	    					console.log("time was above max somehow - look into this");
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
				team1: { // TODO dynamically create me
					teamName:"Team Human", // TODO add
					members:"Kyle", // TODO add
					correctAnswer:0, // TODO add
					wrongAnswer:0, // TODO add
					noAnswer:0, // TODO add
					needTieBreaker:false // TODO add
				},
				
				team2: { // TODO dynamically create me 
					teamName:"Team Bot", // TODO add
					members:"Robot", // TODO add
					correctAnswer:0, // TODO add
					wrongAnswer:0, // TODO add
					noAnswer:0, // TODO add
					needTieBreaker:false // TODO add
				}
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

	function beginGame() {
		getQuestionsForGame();
		console.log("This will be a " + game.numberOfQuestions + " question long game.");
		game.gameTimer.nextQuestion();
	}

	function getAllQuestions(typeOfQuestionArray) {
		console.log("===== We're in get all questions: =====");
		var questionObject = {};
		typeOfQuestionArray.forEach(function(item){
			var thisItem = item;
			// console.log("adding this: ");
			// console.log(thisItem);
			questionObject = Object.assign(questionObject, thisItem);
		});
		// console.log("adding this question object to total: ");
		// console.log(questionObject);
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
			newInput.id = item;
			newInput.value = item;
			newLabel.for = item;
			newLabel.innerHTML = item;
			targetParent.append(newRow);
			newRow.append(newDiv);
			newDiv.append(newLabel);
			newDiv.append(newInput);
			(document.createTextNode('text for label after checkbox'));
			newInput.setAttribute("class", "form-control");
			newInput.setAttribute("class", "big-checkbox");
			//console.log("adding this array item: " + item);

		});
	}

	function createTeams() {
		console.log("Request received to create teams, this many: " + game.numberOfTeams);
		$("#teamCreationScreen").removeClass("hidden"); // TODO move this?

		for (var i = 1; i<= game.numberOfTeams; i++) {
			var teamExists = false;
			for (var key in game.teams) {
				console.log("looking for: team" + [i] + " got: " + key);
				var thisTeam = "team" + [i];
				if (key == thisTeam || teamExists == true) {
					console.log("Team exists - moving on");
					teamExists = true;
				}
				else {
					//console.log("team" + [i] + " does not exist");
				}
			}
			if (!teamExists) {
				console.log("*****Creating new team: team" + [i]);
				$("#teamName").html("Team " + [i] + " Name:");
				// TODO create and store team information here
			}
		}
	}

	function gradingRequired() {
		if (game.round.answerToBeGraded !== "") {
			console.log("For Grading: " + game.round.answer.toLowerCase() + " VS " + game.round.answerToBeGraded.toLowerCase())
			if (game.round.answer.toLowerCase() === game.round.answerToBeGraded.toLowerCase()) {
				console.log("*****AMAZING!!!!  The answer was EXACTLY right! ***** (this will almost NEVER happen)");
				updateScoreAndChangeTeam("correct");
				$("#gradingScreen").addClass("hidden");
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
			updateScoreAndChangeTeam("noAnswer");
			$("#gradingScreen").addClass("hidden");
		}
	}

	function getOneRandomQuestionAndRemoveItFromPool() {
		console.log("===== We're in get one question from pool: =====");

		console.log("for testing puroses");
		console.log(game.teams.team1);

		if (game.round.needsToBeGraded) {
			console.log("Yikes!  We should grade the previous answer before getting our own question!");
			gradingRequired();
		}
		
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
			return false;
		}
		var randomNumber = Math.floor(Math.random() * numberOfQuestionsRemaining);
		game.round.question = gameQuestions[Object.keys(gameQuestions)[randomNumber]].question;
		//console.log("question: " + game.round.question);
		$("#question").html("<h1>" + game.round.question + "</h1>");
		game.round.answer = gameQuestions[Object.keys(gameQuestions)[randomNumber]].answer;

		if (gameQuestions[Object.keys(gameQuestions)[randomNumber]].type == "mc") {
			
			var randomNumberArray = createAndShuffleRandomNumberArray(4); // TODO this should be the length of the answers, not hard coded

			//game.round.answer = gameQuestions[Object.keys(gameQuestions)[randomNumber]].answer;
			game.round.correctAnswerStoredIn = "mcAnswer" + randomNumberArray[0];

			// TODO REMOVE THE FOLLOWING LINES - this is just for testing
			$("#mcAnswer" + randomNumberArray[0]).addClass("bg-success");
			$("#mcAnswer" + randomNumberArray[1]).removeClass("bg-success");
			$("#mcAnswer" + randomNumberArray[2]).removeClass("bg-success");
			$("#mcAnswer" + randomNumberArray[3]).removeClass("bg-success");
			// TODO REMOVE THE ABOVE LINES - this is just for testing
			//console.log("correct answer: " + game.round.answer);
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
			// console.log("looks like a fill in the blank, we need to add blanks")
			game.round.showBlanks = gameQuestions[Object.keys(gameQuestions)[randomNumber]].showBlanks;
			var targetParent = $("#fitb")
			targetParent.empty();
			targetParent.removeClass("hidden");
			$(".fitb-submit").removeClass("hidden");
			$(".mc").addClass("hidden");

			for (var i = 1; i <= game.round.showBlanks; i++) {
				//console.log("show: " + i);
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

	}

	function checkMultipleChoiceAnswer(clickedId) {
		//console.log("MC answer is: >" + clickedId + "< correct answer is: >" + game.round.correctAnswerStoredIn + "<");
		if (game.round.correctAnswerStoredIn == clickedId) {
			console.log("looks like we have the correct answer!");
			updateScoreAndChangeTeam("correct");
		}
		else {
			console.log("MC answer is incorrect: " + clickedId);
			updateScoreAndChangeTeam("wrong");
		}
		game.gameTimer.pause = true;
		game.gameTimer.timer = 0;
	}

	function cleanUpForNextQuestion() {

		// first we clean up
		$("#question").empty();
		game.round.needsToBeGraded = false;
		game.round.answerToBeGraded = "";
		game.round.correctAnswerStoredIn = "";
		$("#displayTimeHere").html("Time Remaining: " + game.roundMaxTime);

		// TODO more here?
	}

	function getNumberOfQuestionsRemaining() {
		var numberOfQuestionsRemaining = Object.keys(gameQuestions).length;
		console.log("Number of questions remaining in this entire deck: " + numberOfQuestionsRemaining);
		return numberOfQuestionsRemaining;
	}

	function updateScoreAndChangeTeam(scoreUpdate) {
		console.log("We're on team: " + game.round.team + " score update is: " + scoreUpdate);

		if (scoreUpdate == "correct") {
			console.log(game.round.team + " logged answer correct!");
			game.teams[game.round.team].correctAnswer++;
		}
		else if (scoreUpdate == "wrong") {
			console.log(game.round.team + " logged answer wrong!");
			game.teams[game.round.team].wrongAnswer++;
		}
		else if (scoreUpdate == "noAnswer") {
			console.log(game.round.team + " logged no answer!");
			game.teams[game.round.team].noAnswer++
		}

		$("#thisTeamsNameHere").html("Team: " + game.teams[game.round.team].teamName);
		$("#numberCorrectHere").html("Correct: " + game.teams[game.round.team].correctAnswer);
		$("#numberWrongHere").html("Wrong: " + game.teams[game.round.team].wrongAnswer);
		$("#numberNoAnswerHere").html("No Answer: " + game.teams[game.round.team].noAnswer);
		console.log("answer to be graded: >" + game.round.answerToBeGraded + "< or >" + game.round.needsToBeGraded + "<");
		if (game.round.answerToBeGraded == "") {
			$(".gradingRequiredMessage").addClass("hidden");
		}
		else {
			$(".gradingRequiredMessage").removeClass("hidden");
		}

		// TODO change team

		if (game.numberOfTeams > 1) {
			// var currentTeam = game.round.team;
			var nextTeam = "";


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
			//console.log("numbers to array: " + i)
			returnArray.push(i);
		}
		//console.log("Unsorted array: " + returnArray);
		shuffle(returnArray);
		//console.log("Shuffled array: " + returnArray);
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

	function processAnswerSubmit(e) { // nabbed from: https://stackoverflow.com/questions/5384712/capture-a-form-submit-in-javascript
    if (e.preventDefault) e.preventDefault();    

    	for (var i = 1; i <= game.round.showBlanks; i++) {
			//console.log("getting value " + i + " from page: " + $("#answer" + i).val());
			game.round.answerToBeGraded += $("#answer" + i).val();
			if (game.round.showBlanks > 1 && i != game.round.showBlanks && $("#answer" + i).val() != "") {
				game.round.answerToBeGraded += ", ";
			}
		}
		// console.log("final answer: >" + game.round.answerToBeGraded + "<");
		// console.log("stopping clock with " + game.gameTimer.timer + " seconds remaining");
		$("#scoreScreen").removeClass("hidden");
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

    	//console.log("request recieved to process the setup form");
    	if ($("#numberOfTeams").val() != "") {
  			game.numberOfTeams = $("#numberOfTeams").val();
		}
  		game.numberOfQuestions = $("#numberOfQuestionsId").val();
  		game.roundMaxTime = $("#lengthOfRoundId").val();



  		if (game.numberOfTeams == 1 || game.numberOfTeams === 0) {
  			// console.log("just one team eh?  Let's go");
  			$("#setupScreen").addClass("hidden");
  			// TODO create a single team here automagically (or prompt?)
			beginGame();
  		}
  		else {
  			console.log("More then 1 team selected... we do something here");
  			createTeams();
  		}
    	return false;
	}

	var form = document.getElementById('setupForm'); // source nabbed from: https://stackoverflow.com/questions/5384712/capture-a-form-submit-in-javascript
		if (form.attachEvent) {
    		form.attachEvent("submit", processSetupSubmit);
		} 
		else {
	    	form.addEventListener("submit", processSetupSubmit);
		}

	$("#scoreScreen").click(function () {
		// console.log("request received to dismiss score screen and continue");
		// console.log("validating... current question num: " + game.currentQuestion + " >= " + game.numberOfQuestions + "?  if no, keep going")
		$(".displayRoundHere").html("Round " + game.currentQuestion + " of " + game.numberOfQuestions);

		if (game.currentQuestion >= game.numberOfQuestions) {
			console.log("Click to continue:  No, game is over!");
			$(".gameOver").removeClass("hidden");	
			game.gameTimer.stop();	
		}
		else if (game.round.needsToBeGraded) {
			// console.log("at score screen - we need to do some grading");
			$("#scoreScreen").addClass("hidden");
			$("#gradingScreen").removeClass("hidden");
			game.gameTimer.nextQuestion();
		}
		else {			
			// console.log("Click to continue:  Ok");
			game.gameTimer.pause = false;
			game.gameTimer.nextQuestion();
			$("#scoreScreen").addClass("hidden"); // TODO move this to a more appropriate space
		}
	});

	$("#newGameSamePeople").click(function () {
		// TODO something here
	});

	$("#newGameDifferentPeople").click(function () {
		// TODO something here
	});

	$("#stopHere").click(function () {
		game.gameTimer.stop();
		console.log("global stop for testing purposes - will be removed later")
	});

	$(".mc").click(function (event) {
		checkMultipleChoiceAnswer(event.target.id);
		$("#scoreScreen").removeClass("hidden");
	});

	$("#correctAnswerButton").click(function () {
		// console.log("The grader said:  answer was CORRECT")
		$("#gradingScreen").addClass("hidden");
		updateScoreAndChangeTeam("correct")
		game.gameTimer.pause = false;
	});

	$("#wrongAnswerButton").click(function () {
		// console.log("The grader said:  nope, incorrect");
		$("#gradingScreen").addClass("hidden");
		updateScoreAndChangeTeam("wrong")
		game.gameTimer.pause = false;
	});

	$("#teamCreationButton").click(function () {
		console.log("clicked 'go' for team creation - starting")
		// $("#setupScreen").addClass("hidden");
		$("#teamCreationScreen").addClass("hidden");
		createTeams();
		// beginGame();
	});

});