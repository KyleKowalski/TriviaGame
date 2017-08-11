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
			type:"fitb"
		},
		genfitb2: {
			question:"What's my favorite color?",
			answer:"Green",
			type:"fitb"
		},
		genfitb3: {
			question:"Name 3 presidents?",
			type:"fitb",
			answer:"needs human review",
			answer2:"needs human review",
			answer3:"needs human review"
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
			type:"fitb"
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
		numberOfQuestions:5,
		outOfQuestions:false,
		typeOfQuestions:"all",
		// TODO teams
		// TODO team members
		allowFillInTheBlank:true,
		timer:30, // assume seconds - 0 is 'infinite', otherwise just seconds
		round: {
			question:"",
			answer:"",
			type:"",
			fakeAnswer1:"",
			fakeAnswer2:"",
			fakeAnswer3:"",
			correctAnswerStoredIn:"",
			fillInTheBlank1:"",
			fillInTheBlank2:"",
			fillInTheBlank3:""
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
								// ];
								, 
								generalQuestionsFillInTheBlank, 
								geographyQuestionsFillInTheBlank];
	var gameQuestions = getAllQuestions(questionTypesSelected);
	
	// TODO this will be in some kind of loop
	getOneRandomQuestionAndRemoveItFromPool();
	writeQuestionAndAnswerToScreen();
	

	// getOneRandomQuestionAndRemoveItFromPool();
	// getOneRandomQuestionAndRemoveItFromPool();
	// getOneRandomQuestionAndRemoveItFromPool();

	// randomize questions

	// start timer

	// show question

	// dynamically build answers

	// on click user answers or timeout

	// correct or incorrect or timeout counters go up

	// load next question

	// TODO remove question from list when already answered - so next game has new questions




	function getAllQuestions(typeOfQuestionArray) {
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

	function getOneRandomQuestionAndRemoveItFromPool() {
		console.log("===== We're in get one question from pool: =====");
		var numberOfQuestionsRemaining = getNumberOfQuestionsRemaining();

		console.log("Questions remaining in game: " + game.numberOfQuestions + " questions remaining to be asked: " + numberOfQuestionsRemaining);
		if (numberOfQuestionsRemaining < game.numberOfQuestions) {
			// TODO need to handle this more gracefully
			console.log("***** WARNING ***** not enough questions to finish the game");
		}
		if (numberOfQuestionsRemaining === 0) {
			console.log("Well... we're out of cake... so your options are 'or death' --- game is over (we're out of questions).");
			game.outOfQuestions = true;
			return false;
		}

		var randomNumber = Math.floor(Math.random() * numberOfQuestionsRemaining);
		// TODO use this to randomize the answers
		createRandomNumberArray(4); // TODO don't hard code this.

		game.round.question = gameQuestions[Object.keys(gameQuestions)[randomNumber]].question;
		console.log("question: " + game.round.question);
		game.round.answer = gameQuestions[Object.keys(gameQuestions)[randomNumber]].answer;
		console.log("correct answer: " + game.round.answer);
		$("#mcAnswer1").html(game.round.answer);
		// TODO redo this with another key in the object that defines multiple choice and fill in the blank - then iterate through what is left (gives no longer fixed length answers)
		// this allows us to handle both multiple guess and fill in the blank in the same function
		if (gameQuestions[Object.keys(gameQuestions)[randomNumber]].type == "mc") {
			console.log("looks like a multple choice question - we need fake answers");

			// if (gameQuestions[Object.keys(gameQuestions)[randomNumber]].fakeAnswer1) {
			game.round.fakeAnswer1 = gameQuestions[Object.keys(gameQuestions)[randomNumber]].fakeAnswer1;
			console.log("fake answer1: " + game.round.fakeAnswer1);
			$("#mcAnswer2").html(game.round.fakeAnswer1);
			game.round.fakeAnswer2 = gameQuestions[Object.keys(gameQuestions)[randomNumber]].fakeAnswer2
			console.log("fake answer2: " + game.round.fakeAnswer2);
			$("#mcAnswer3").html(game.round.fakeAnswer2);
			game.round.fakeAnswer3 = gameQuestions[Object.keys(gameQuestions)[randomNumber]].fakeAnswer3;
			console.log("fake answer3: " + game.round.fakeAnswer3);
			$("#mcAnswer4").html(game.round.fakeAnswer3);

			$(".fitb").addClass("hidden");
			$(".mc").removeClass("hidden");

		}
		else if (gameQuestions[Object.keys(gameQuestions)[randomNumber]].type == "fitb") {
			console.log("looks like a fill in the blank, we need to add blanks")
			// TODO cycle through here and add in secondary and tertiary options when needed - loop for N answers
			$(".fitb").removeClass("hidden");
			$(".mc").addClass("hidden");
		}
		// nuke the question so it can't be asked again until we reload the questions - decriment number of questions in game
		delete gameQuestions[Object.keys(gameQuestions)[randomNumber]];
		game.numberOfQuestions--;
	}

	function writeQuestionAndAnswerToScreen() {
		// first we clean up
		$("#question").empty();
		$("#answer1").empty();
		$("#answer2").empty();
		$("#answer3").empty();
		$("#answer4").empty();

		$("#question").html(game.round.question);




		// correct answer written to:  
		game.round.correctAnswerStoredIn = ""
	}

	function getNumberOfQuestionsRemaining() {
		var numberOfQuestionsRemaining = Object.keys(gameQuestions).length;
		console.log("Number of questions remaining: " + numberOfQuestionsRemaining);
		return numberOfQuestionsRemaining;
	}

	function createRandomNumberArray(number) {
		var returnArray = [];
		for (var i = 1; i <= number; i++){
			console.log("numbers to array: " + i)
			returnArray.push(i);
		}
		console.log("Unsorted array: " + returnArray);
		shuffle(returnArray);
		console.log("Sorted 'shuffled' array: " + returnArray);
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
});