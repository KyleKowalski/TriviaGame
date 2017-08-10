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
			question:"What's my name bitch?",
			answer:"Uhh... uhh... Kyle",
			fakeAnswer1:"Kyle..?",
			fakeAnswer2:"Yo daddy.",
			fakeAnswer3:"The trivia master"
		},
		genmc2: {
			question:"What's my favorite color?",
			answer:"Green",
			fakeAnswer1:"Yellow",
			fakeAnswer2:"Pink",
			fakeAnswer3:"Go choke on a pancake"
		}
	}

	var generalQuestionsFillInTheBlank = {
		genfitb1: {
			question:"What's my name bitch?",
			answer:"Kyle"
		},
		genfitb2: {
			question:"What's my favorite color?",
			answer:"Green",
			fakeAnswer1:"Yellow",
			fakeAnswer2:"Pink",
			fakeAnswer3:"Go choke on a pancake"
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
			fakeAnswer3:""
		}
	}



	// TODO:  Advanced setup:  
		// Setup Teams
		// Option to answer again and again if correct
		// Option to only get one question before rotating

	// TODO:  Pause button (longer games will need it - throw up a splash screen so that the game is not visible?)


	

	// load questions based on above criteria

	// get questions --- based on user select of type 
	var questionTypesSelected = [generalQuestionsMultipleChoice, geographyQuestionsMultipleChoice];
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



	//var gameQuestions = generalQuestions;
	//console.log("so..." + generalQuestions);
	//console.log("game questions: " + generalQuestions.gen1.question);

	function getAllQuestions (typeOfQuestionArray) {
		console.log("We're in get all questions:");
		var questionObject = {};
		questionObject = Object.assign(generalQuestionsMultipleChoice, geographyQuestionsMultipleChoice); 
		// TODO fix this so you can have more then 2x types - or iterate through somehow
		console.log(questionObject);
		console.log(generalQuestionsMultipleChoice);
		return questionObject;
	}

	function getOneRandomQuestionAndRemoveItFromPool () {
		console.log("We're in get one question from pool: ");
		//var questionObjectKey; //fetch_random(gameQuestions);
		// TODO make this random
		var randomNumber = 0;

		question = gameQuestions[Object.keys(gameQuestions)[randomNumber]].question;
		console.log(gameQuestions[Object.keys(gameQuestions)[randomNumber]].question);
		answer = gameQuestions[Object.keys(gameQuestions)[randomNumber]].answer;
		console.log(gameQuestions[Object.keys(gameQuestions)[randomNumber]].answer);
		fakeAnswer1 = gameQuestions[Object.keys(gameQuestions)[randomNumber]].fakeAnswer1;
		console.log(gameQuestions[Object.keys(gameQuestions)[randomNumber]].fakeAnswer1);
		fakeAnswer2 = gameQuestions[Object.keys(gameQuestions)[randomNumber]].fakeAnswer2
		console.log(gameQuestions[Object.keys(gameQuestions)[randomNumber]].fakeAnswer2);
		fakeAnswer3 = gameQuestions[Object.keys(gameQuestions)[randomNumber]].fakeAnswer3;
		console.log(gameQuestions[Object.keys(gameQuestions)[randomNumber]].fakeAnswer3);

		// nuke the question so it can't be asked again
		delete gameQuestions[Object.keys(gameQuestions)[randomNumber]];

	}

	// function fetch_random(obj) {
	// 	var temp_key, keys = [];
	// 	for(temp_key in obj) {
	// 		console.log("object: " + obj);
	// 		console.log("temp key 1: " + temp_key);
	// 		if(obj.hasOwnProperty(temp_key)) {
	// 			keys.push(temp_key);
	// 			console.log("temp_key: " + temp_key.question);
	// 		}
	// 	}
	// 	return obj[keys[Math.floor(Math.random() * keys.length)]];
	// }
});