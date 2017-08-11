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
			fakeAnswer1:"Hey you",
			fakeAnswer2:"The admin.",
			fakeAnswer3:"The trivia master"
		},
		genmc2: {
			question:"What's my favorite color?",
			answer:"Green",
			fakeAnswer1:"Yellow",
			fakeAnswer2:"Pink",
			fakeAnswer3:"Go eat a pancake"
		}
	}

	var generalQuestionsFillInTheBlank = {
		genfitb1: {
			question:"What's my name?",
			answer:"Kyle"
		},
		genfitb2: {
			question:"What's my favorite color?",
			answer:"Green"
		}
	}

	var geographyQuestionsMultipleChoice = {
		geomc1: {
			question:"Where is Colorado?",
			answer:"In the middle of the United States",
			fakeAnswer1:"It's a figment of your imagination",
			fakeAnswer2:"Where we all are",
			fakeAnswer3:"Everywhere."
		}
	}

	var geographyQuestionsFillInTheBlank = {
		geofitb1: {
			question:"Spell Colorado?",
			answer:"Colorado"
		}
	}

////////////////////////////////////////// above block to be removed once we have the top block working ///////////////////////////////////////////	

	// basic setup
		// how many questions
			// type of questions?
				// multiple choice
				// fill in the blank  TODO:  this is out of scope
					// take everything to lower case to make this easier. string comparison?
					// fuzzy string matching?  This would be HARD to do.
		// genre(s)?
		// time to answer (make this variable? ... why not? --- zero is infinite, otherwise use # of seconds)
		// time after answer (make this variable? ... why not? --- zero is infinite, otherwise use # of seconds)

	var game = {
		numberOfQuestions:3,
		outOfQuestions:false,
		typeOfQuestions:"all",
		// TODO teams
		// TODO team members
		allowFillInTheBlank:false,
		timer:30, // assume seconds - 0 is 'infinite', otherwise just seconds
		round: {
			question:"",
			answer:"",
			fakeAnswer1:"",
			fakeAnswer2:"",
			fakeAnswer3:"",
			correctAnswerStoredIn:""
		}
	}



	// TODO:  Advanced setup:  
		// Setup Teams
		// Option to answer again and again if correct
		// Option to only get one question before rotating

	// TODO:  Pause button (longer games will need it - throw up a splash screen so that the game is not visible?)


	

	// load questions based on above criteria

	// get questions --- based on user select of type 
	var questionTypesSelected = [generalQuestionsMultipleChoice, 
								geographyQuestionsMultipleChoice
								// ]
								, 
								generalQuestionsFillInTheBlank, 
								geographyQuestionsFillInTheBlank];
	var gameQuestions = getAllQuestions(questionTypesSelected);
	var thisQuestion = getOneRandomQuestionAndRemoveItFromPool();
	var thisQuestion = getOneRandomQuestionAndRemoveItFromPool();
	var thisQuestion = getOneRandomQuestionAndRemoveItFromPool();
	var thisQuestion = getOneRandomQuestionAndRemoveItFromPool();

	// randomize questions

	// start timer

	// show question

	// dynamically build answers

	// on click user answers or timeout

	// correct or incorrect or timeout counters go up

	// load next question

	// TODO remove question from list when already answered - so next game has new questions




	function getAllQuestions (typeOfQuestionArray) {
		console.log("===== We're in get all questions: =====");
		var questionObject = {};
		typeOfQuestionArray.forEach(function(item){
			var thisItem = item;
			console.log("adding this: ");
			console.log(thisItem);
			questionObject = Object.assign(questionObject, thisItem);
		});
		console.log("and we have this total: ")
		console.log(questionObject);
		return questionObject;
	}

	function getOneRandomQuestionAndRemoveItFromPool () {
		console.log("===== We're in get one question from pool: =====");
		var numberOfQuestionsRemaining = Object.keys(gameQuestions).length;
		console.log("Questions remaining: " + numberOfQuestionsRemaining);
		if (numberOfQuestionsRemaining === 0) {
			console.log("Well... we're out of cake... so your options are 'or death' --- game is over (we're out of questions).");
			game.outOfQuestions = true;
			return false;
		}

		var randomNumber = Math.floor(Math.random() * numberOfQuestionsRemaining);

		game.round.question = gameQuestions[Object.keys(gameQuestions)[randomNumber]].question;
		console.log(game.round.question);
		game.round.answer = gameQuestions[Object.keys(gameQuestions)[randomNumber]].answer;
		console.log(game.round.answer);
		
		// this allows us to handle both multiple guess and fill in the blank in the same function
		if (gameQuestions[Object.keys(gameQuestions)[randomNumber]].fakeAnswer1) {
			game.round.fakeAnswer1 = gameQuestions[Object.keys(gameQuestions)[randomNumber]].fakeAnswer1;
			console.log(game.round.fakeAnswer1);
			game.round.fakeAnswer2 = gameQuestions[Object.keys(gameQuestions)[randomNumber]].fakeAnswer2
			console.log(game.round.fakeAnswer2);
			game.round.fakeAnswer3 = gameQuestions[Object.keys(gameQuestions)[randomNumber]].fakeAnswer3;
			console.log(game.round.fakeAnswer3);
		}
		else {
			game.round.fakeAnswer1 = game.round.fakeAnswer2 = game.round.fakeAnswer3 = "";
		}
		// nuke the question so it can't be asked again
		delete gameQuestions[Object.keys(gameQuestions)[randomNumber]];
	}

	function writeQuestionAndAnswerToScreen () {
		// first we clean up
		$("#question").empty();
		$("#answer1").empty();
		$("#answer2").empty();
		$("#answer3").empty();
		$("#answer4").empty();

		// need to randomize the answers:

		// correct answer written to:  
		game.round.correctAnswerStoredIn = ""
	}

});