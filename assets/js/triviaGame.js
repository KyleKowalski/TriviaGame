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

////////////////////////////////////////// above block to be removed once we have the top block working ///////////////////////////////////////////	

	// basic setup
		// how many questions
			// type of questions?
				// multiple choice - DONE
				// fill in the blank  TODO:  this is out of scope - DONE
					// take everything to lower case to make this easier. string comparison?
					// fuzzy string matching?  This would be HARD to do. - SKIP (for now - likely outside of scope)
		// genre(s)? - DONE - handled in question setup
		// time to answer (make this variable? ... why not? --- zero is infinite, otherwise use # of seconds)
		// time after answer (make this variable? ... why not? --- zero is infinite, otherwise use # of seconds)

	// TODO:  Advanced setup:  
		// Setup Teams
		// Option to only get one question before rotating - GOING WITH THIS METHOD (other is boring for other teams)

	// TODO:  Pause button (longer games will need it - throw up a splash screen so that the game is not visible?)
		// limit to 3x pauses or what not?

	// load questions based on above criteria
	
	// TODO this will be in some kind of loop - DONE
	
	
	

	// randomize questions - DONE

	// start timer - DONE

	// show question - DONE

	// dynamically build answers - DONE

	// on click user answers or timeout - MC NO - FITB DONE

	// correct or incorrect or timeout counters go up

	// load next question - DONE

	// TODO remove question from list when already answered - so next game has new questions - DONE

	var game = {};
	var gameQuestions = {};
	initializeGame();

	//beginGame();


	function initializeGame() {
		// this is done before we start so users can modify it
		game = {
			numberOfQuestions:3,
			currentQuestion:0,
			outOfQuestions:false,
			questionTypesSelected:[generalQuestionsMultipleChoice,
									geographyQuestionsMultipleChoice,
									generalQuestionsFillInTheBlank,
									geographyQuestionsFillInTheBlank],
			roundMaxTime:30, // assume seconds - no infinite, but give users ability to set at 'high' (nearly unlimited) number
			round: {
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
				pauseLength:3,
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
					console.log("COUNT: initial call "  + game.gameTimer.timer + " clock running is: " + game.gameTimer.clockRunning + " paused: " + game.gameTimer.pause);
					console.log("Just because: " + game.currentQuestion);

					if (game.gameTimer.pause) {
						console.log("game is paused for something...?");
						$("#scoreScreen").removeClass("hidden");
					}
					else if (!game.gameTimer.pause) {
						console.log("game is not paused - continuing");
						$("#scoreScreen").addClass("hidden");
					
						if ((game.gameTimer.timer <= game.roundMaxTime) && (game.gameTimer.timer > 0)) {
	    					game.gameTimer.timer--;
	    				}
	    				else if (game.gameTimer.timer <= 0) {
	    					console.log("COUNT: game timer is: " + game.gameTimer.timer + " clock running is: " + game.gameTimer.clockRunning);
	    					console.log("time is up!");
	    					game.gameTimer.pause = true;
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

			team1: { // TODO dynamically create me
				teamName:"Team Human", // TODO add
				members:"Kyle", // TODO add
				correctAnswers:0, // TODO add
				incorrectAnswers:0, // TODO add
				needTieBreaker:false // TODO add
			},
			
			team2: {// TODO dynamically create me 
				teamName:"Team Bot", // TODO add
				members:"Robot", // TODO add
				correctAnswers:0, // TODO add
				incorrectAnswers:0, // TODO add
				needTieBreaker:false // TODO add
			}
		}
	}

	function getQuestionsForGame() {
			// TODO establish teams (screens and prompts)
			// TODO select question types dynamically
			// TODO select number of questions, timer, etc
			gameQuestions = getAllQuestions(game.questionTypesSelected);
				
	}

	function beginGame() {
		getQuestionsForGame();
		adjustUserVariables();
		console.log("This will be a " + game.numberOfQuestions + " question long game.");
		game.gameTimer.nextQuestion();
	}

	function adjustUserVariables() {
		game.gameTimer.roundMaxTime = 30;
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

	function getOneRandomQuestionAndRemoveItFromPool() {
		console.log("===== We're in get one question from pool: =====");

		if (game.round.needsToBeGraded) {
			console.log("Yikes!  We should grade their answer before getting our own question!");
			// TODO Add grading stuff here
			if (game.round.answerToBeGraded !== "") {
				// alert("previous question needs to be graded... question: " + game.round.question + " real answer: " + game.round.answer + " user answer:" + game.round.answerToBeGraded);
				console.log("For Grading: " + game.round.answer.toLowerCase() + " VS " + game.round.answerToBeGraded.toLowerCase())
				if (game.round.answer.toLowerCase() === game.round.answerToBeGraded.toLowerCase()) {
					console.log("*****AMAZING!!!!  The answer was EXACTLY right! ***** (this will almost NEVER happen)");
				}
				// TODO more stuff here - how do we grade and what happens.  
			}
			else {
				console.log("They didn't try very hard - answer was blank - it is WRONG");
			}
			game.round.needsToBeGraded = false; // and we're done grading so we clear that out
			console.log("finished grading, on to next question");
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
		console.log("question: " + game.round.question);
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
			console.log("correct answer: " + game.round.answer);
			$("#mcAnswer" + randomNumberArray[0]).html(game.round.answer);
			// TODO redo this where we can have more then 3x fake answers - more specifically, the assigned number of fake answers
			// this allows us to handle both multiple guess and fill in the blank in the same function

			console.log("looks like a multple choice question - we need fake answers");

			// if (gameQuestions[Object.keys(gameQuestions)[randomNumber]].fakeAnswer1) {
			game.round.fakeAnswer1 = gameQuestions[Object.keys(gameQuestions)[randomNumber]].fakeAnswer1;
			console.log("fake answer1: " + game.round.fakeAnswer1);
			$("#mcAnswer" + randomNumberArray[1]).html(game.round.fakeAnswer1);
			game.round.fakeAnswer2 = gameQuestions[Object.keys(gameQuestions)[randomNumber]].fakeAnswer2
			console.log("fake answer2: " + game.round.fakeAnswer2);
			$("#mcAnswer" + randomNumberArray[2]).html(game.round.fakeAnswer2);
			game.round.fakeAnswer3 = gameQuestions[Object.keys(gameQuestions)[randomNumber]].fakeAnswer3;
			console.log("fake answer3: " + game.round.fakeAnswer3);
			$("#mcAnswer" + randomNumberArray[3]).html(game.round.fakeAnswer3);

			$("#fitb").addClass("hidden");
			$(".fitb-submit").addClass("hidden");
			$(".mc").removeClass("hidden");

		}
		else if (gameQuestions[Object.keys(gameQuestions)[randomNumber]].type === "fitb") {
			console.log("looks like a fill in the blank, we need to add blanks")
			game.round.showBlanks = gameQuestions[Object.keys(gameQuestions)[randomNumber]].showBlanks;
			var targetParent = $("#fitb")
			targetParent.empty();
			targetParent.removeClass("hidden");
			$(".fitb-submit").removeClass("hidden");
			$(".mc").addClass("hidden");

			for (var i = 1; i <= game.round.showBlanks; i++) {
				console.log("show: " + i);
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
		console.log("MC answer is: >" + clickedId + "< correct answer is: >" + game.round.correctAnswerStoredIn + "<");
		if (game.round.correctAnswerStoredIn == clickedId) {
			console.log("looks like we have the correct answer!");
			// TODO add the 'we win' logic - correct answer ++
		}
		else {
			console.log("MC answer is incorrect: " + clickedId);
			// TODO add the 'we lose' logic - incorrect answer ++
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
		$("#displayTimeHere").html("Time Remaining: " + game.gameTimer.roundMaxTime);

		// TODO more here
	}

	function getNumberOfQuestionsRemaining() {
		var numberOfQuestionsRemaining = Object.keys(gameQuestions).length;
		console.log("Number of questions remaining in this entire deck: " + numberOfQuestionsRemaining);
		return numberOfQuestionsRemaining;
	}

	function createAndShuffleRandomNumberArray(number) {
		var returnArray = [];
		for (var i = 1; i <= number; i++){
			console.log("numbers to array: " + i)
			returnArray.push(i);
		}
		console.log("Unsorted array: " + returnArray);
		shuffle(returnArray);
		console.log("Shuffled array: " + returnArray);
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

	function processForm(e) { // nabbed from: https://stackoverflow.com/questions/5384712/capture-a-form-submit-in-javascript
    if (e.preventDefault) e.preventDefault();

    	for (var i = 1; i <= game.round.showBlanks; i++) {
			console.log("getting value " + i + " from page: " + $("#answer" + i).val());
			game.round.answerToBeGraded += $("#answer" + i).val();
			if (game.round.showBlanks > 1 && i != game.round.showBlanks && $("#answer" + i).val() != "") {
				game.round.answerToBeGraded += ", ";
			}
		}
		console.log("final answer: >" + game.round.answerToBeGraded + "<");
		console.log("stopping clock with " + game.gameTimer.timer + " seconds remaining")
		game.gameTimer.pause = true;
		game.gameTimer.timer = 0;

    	return false;
	}

	var form = document.getElementById('fitb-form'); // nabbed from: https://stackoverflow.com/questions/5384712/capture-a-form-submit-in-javascript
		if (form.attachEvent) {
    		form.attachEvent("submit", processForm);
		} 
		else {
	    	form.addEventListener("submit", processForm);
		}

	$("#scoreScreen").click(function () {
		console.log("request received to dismiss score screen and continue");
		console.log("validating... current question num: " + game.currentQuestion + " >= " + game.numberOfQuestions + "?  if yes, keep going")
		$(".displayRoundHere").html("Round " + game.currentQuestion + " of " + game.numberOfQuestions);

		if (game.currentQuestion >= game.numberOfQuestions) {
			console.log("Click to continue:  No, game is over!");
			$(".gameOver").removeClass("hidden");	
			game.gameTimer.stop();	
		}
		else {			
			console.log("Click to continue:  Ok");
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
	});

	$("#goButton").click(function () {
		console.log("Go! button clicked")
		$("#setupScreen").addClass("hidden");
		beginGame();
	});

});