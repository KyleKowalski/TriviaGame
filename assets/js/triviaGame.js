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

	var generalQuestions = {
		gen1: {
			question:"What's my name bitch?",
			answer:"Uhh... uhh... Kyle",
			fakeAnswer1:"Kyle..?",
			fakeAnswer2:"Yo daddy.",
			fakeAnswer3:"The trivia master"
		},
		gen2: {
			question:"What's my favorite color?",
			answer:"Green",
			fakeAnswer1:"Yellow",
			fakeAnswer2:"Pink",
			fakeAnswer3:"Go choke on a pancake"
		}
	}

	var geographyQuestions = {
		geo1: {
			question:"Where is Colorado?",
			answer:"In the middle of the United States",
			fakeAnswer1:"It's a figment of your imagination",
			fakeAnswer2:"Where we all are",
			fakeAnswer3:"Everywhere."
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
		timer:30 // assume seconds - 0 is 'infinite', otherwise just seconds
	}

	// TODO:  Advanced setup:  
		// Setup Teams
		// Option to answer again and again if correct
		// Option to only get one question before rotating

	// TODO:  Pause button (longer games will need it - throw up a splash screen so that the game is not visible?)


	

	// load questions based on above criteria

	// get questions --- based on user select of type 
	var questionTypesSelected = [generalQuestions, geographyQuestions]
	var gameQuestions = getQuestions(questionTypesSelected);
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

	function getQuestions (typeOfQuestionArray) {
		var questionObject = {};
		for (var i = 0; i < typeOfQuestionArray.length; i++) {
			console.log("Users selected: " + typeOfQuestionArray[i] + " so we will add these to the possible questions");
			$.each(typeOfQuestionArray[i], function(name, character){
				console.log("Here's the list... " + name);

			});

			
		
		}
		console.log("this is our final result: " + questionObject)
		//return questionArray
	}

});