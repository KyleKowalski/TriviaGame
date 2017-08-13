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

	var game = {};
	var gameQuestions = {};
		// 	numberOfQuestions:5,
	// 	outOfQuestions:false,
	// 	typeOfQuestions:"all",
	// 	// TODO teams
	// 	// TODO team members
	// 	allowFillInTheBlank:true,
	// 	timer:30, // assume seconds - 0 is 'infinite', otherwise just seconds
	// 	round: {
	// 		question:"",
	// 		answer:"",
	// 		type:"",
	// 		fakeAnswer1:"",
	// 		fakeAnswer2:"",
	// 		fakeAnswer3:"",
	// 		correctAnswerStoredIn:"",
	// 		showBlanks:"",
	// 		needsToBeGraded:"",
	// 		answerToBeGraded:""  // separate by...?  something?  
	// 	},
	// 	team1: { // TODO dynamically create me
	// 		members:"",
	// 		correctAnswers:0,
	// 		incorrectAnswers:0,
	// 		needTieBreaker:false
	// 	},
	// 	team2: {// TODO dynamically create me 
	// 		members:"",
	// 		correctAnswers:0,
	// 		incorrectAnswers:0,
	// 		needTieBreaker:false
	// 	}
	// }



	// TODO:  Advanced setup:  
		// Setup Teams
		// Option to answer again and again if correct - PASS
		// Option to only get one question before rotating - GOING WITH THIS METHOD (other is boring for other teams)

	// TODO:  Pause button (longer games will need it - throw up a splash screen so that the game is not visible?)
		// limit to 3x pauses or what not?


	

	// load questions based on above criteria

	// get questions --- based on user select of type 
	// var questionTypesSelected = [generalQuestionsMultipleChoice, 
	// 							geographyQuestionsMultipleChoice
	// 							// ];
	// 							, 
	// 							generalQuestionsFillInTheBlank, 
	// 							geographyQuestionsFillInTheBlank];
	// var gameQuestions = getAllQuestions(questionTypesSelected);
	
	
	// // TODO this will be in some kind of loop
	
	// getOneRandomQuestionAndRemoveItFromPool();
	
	beginGame();

	// randomize questions - DONE

	// start timer

	// show question - DONE

	// dynamically build answers - DONE

	// on click user answers or timeout

	// correct or incorrect or timeout counters go up

	// load next question

	// TODO remove question from list when already answered - so next game has new questions - DONE

	function setupGame() {
		game = {
			numberOfQuestions:5,
			outOfQuestions:false,
			typeOfQuestions:"all",
			allowFillInTheBlank:true,
			timer:30, // TODO assume seconds - 0 is 'infinite', otherwise just seconds
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
			team1: { // TODO dynamically create me
				members:"", // TODO add
				correctAnswers:0, // TODO add
				incorrectAnswers:0, // TODO add
				needTieBreaker:false // TODO add
			},
			team2: {// TODO dynamically create me 
				members:"", // TODO add
				correctAnswers:0, // TODO add
				incorrectAnswers:0, // TODO add
				needTieBreaker:false // TODO add
			}
		}	

		// TODO establish teams (screens and prompts)

		// TODO select question types dynamically

		// TODO select number of questions, timer, etc

		var questionTypesSelected = [generalQuestionsMultipleChoice, 
								geographyQuestionsMultipleChoice
								// ];
								, 
								generalQuestionsFillInTheBlank, 
								geographyQuestionsFillInTheBlank];
		gameQuestions = getAllQuestions(questionTypesSelected);
			
	
	}

	function beginGame() {
		setupGame();

		console.log("This will be a " + game.numberOfQuestions + " question long game.")
		
		getOneRandomQuestionAndRemoveItFromPool();

		// for (var i = 0; i < game.numberOfQuestions; i++) {
			

		// }

	}

	function getAllQuestions(typeOfQuestionArray) {
		console.log("===== We're in get all questions: =====");
		var questionObject = {};
		typeOfQuestionArray.forEach(function(item){
			var thisItem = item;
			console.log("adding this: ");
			console.log(thisItem);
			questionObject = Object.assign(questionObject, thisItem);
		});
		console.log("and we have this total: ");
		console.log(questionObject);
		return questionObject;
	}

	function getOneRandomQuestionAndRemoveItFromPool() {
		console.log("===== We're in get one question from pool: =====");

		if (game.round.needsToBeGraded = true) {
			console.log("Yikes!  We should grade their answer before getting our own question!");
			// TODO Add grading stuff here
			if (game.round.answerToBeGraded !== "") {
				alert("previous question needs to be graded... question: " + game.round.question + " answer:" + game.round.answerToBeGraded);
				if (game.round.answer.toLowerCase() == game.round.answerToBeGraded.toLowerCase()) {
					console.log("*****AMAZING!!!!  The answer was EXACTLY right! ***** (this will almost NEVER happen)");
				}
				// TODO more stuff here.
			}
			else {
				console.log("They didn't try very hard - answer was blank - it is WRONG");
			}
			game.round.needsToBeGraded = false; // and we're done grading so we clear that out
		}
		console.log("finished grading, on to next question");
		cleanUpForNextQuestion();

		var numberOfQuestionsRemaining = getNumberOfQuestionsRemaining();

		console.log("Questions remaining in game: " + game.numberOfQuestions + " questions remaining to be asked: " + numberOfQuestionsRemaining);
		if (numberOfQuestionsRemaining < game.numberOfQuestions) {
			// TODO need to handle this more gracefully
			console.log("***** WARNING ***** not enough questions to finish the game");
		}
		if (numberOfQuestionsRemaining === 0) {
			console.log("Well... we're out of cake... so your options are 'or death' --- game is over (we're out of questions).");
			alert("No more questions available to be asked - so... we need to do something else");
			game.outOfQuestions = true;
			return false;
		}

		var randomNumber = Math.floor(Math.random() * numberOfQuestionsRemaining);
		var randomNumberArray = createAndShuffleRandomNumberArray(4); // TODO this should be the length of the answers, not hard coded

		game.round.question = gameQuestions[Object.keys(gameQuestions)[randomNumber]].question;
		console.log("question: " + game.round.question);
		$("#question").html("<h1>" + game.round.question + "</h1>");
		game.round.answer = gameQuestions[Object.keys(gameQuestions)[randomNumber]].answer;
		game.round.correctAnswerStoredIn = "#mcAnswer" + randomNumberArray[0];

		// TODO REMOVE THE FOLLOWING LINE - this is just for testing
		$("#mcAnswer" + randomNumberArray[0]).addClass("bg-success");
		// TODO REMOVE THE ABOVE LINE - this is just for testing
		console.log("correct answer: " + game.round.answer);
		$("#mcAnswer" + randomNumberArray[0]).html(game.round.answer);
		// TODO redo this where we can have more then 3x fake answers - more specifically, the assigned number of fake answers
		// this allows us to handle both multiple guess and fill in the blank in the same function
		if (gameQuestions[Object.keys(gameQuestions)[randomNumber]].type == "mc") {
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
			$("#fitb-submit").addClass("hidden");
			$(".mc").removeClass("hidden");

		}
		else if (gameQuestions[Object.keys(gameQuestions)[randomNumber]].type == "fitb") {
			console.log("looks like a fill in the blank, we need to add blanks")
			game.round.showBlanks = gameQuestions[Object.keys(gameQuestions)[randomNumber]].showBlanks;
			var targetParent = $("#fitb")
			targetParent.empty();
			targetParent.removeClass("hidden");
			$("#fitb-submit").removeClass("hidden");
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
		game.numberOfQuestions--;
	}

	function cleanUpForNextQuestion() {
		// first we clean up
		$("#question").empty();
		game.round.needsToBeGraded = true;
		game.round.answerToBeGraded = "";
		game.round.correctAnswerStoredIn = "";

		// TODO more here
	}

	function getNumberOfQuestionsRemaining() {
		var numberOfQuestionsRemaining = Object.keys(gameQuestions).length;
		console.log("Number of questions remaining: " + numberOfQuestionsRemaining);
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

    console.log("here we are submitting the form");
    	for (var i = 1; i <= game.round.showBlanks; i++) {
			console.log("getting value " + i + " from page: " + $("#answer" + i).val());
			game.round.answerToBeGraded += $("#answer" + i).val();
			if (game.round.showBlanks > 1 && i != game.round.showBlanks) {
				game.round.answerToBeGraded += ", ";
			}
		}
		console.log("final answer: " + game.round.answerToBeGraded);

		// TODO on submit change to next question.  

    return false;
	}

	var form = document.getElementById('fitb-form'); // nabbed from: https://stackoverflow.com/questions/5384712/capture-a-form-submit-in-javascript
		if (form.attachEvent) {
    		form.attachEvent("submit", processForm);
		} 
		else {
	    	form.addEventListener("submit", processForm);
		}
});