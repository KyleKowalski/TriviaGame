


var generalQuestionsMultipleChoice = {
	genmc1: {
		question:"Who is the only US President who was a bachelor (never married)?",
		answer:"James Buchanan",
		type:"mc",
		fakeAnswer1:"George Washington",
		fakeAnswer2:"Ronald Regan",
		fakeAnswer3:"Walter White"
	},
	genmc2: {
		question:"In the Lord Of The Rings books how many wizards (maiar) were there in Middle Earth?",
		answer:"Five",
		type:"mc",
		fakeAnswer1:"Three",
		fakeAnswer2:"Four",
		fakeAnswer3:"Two"
	},
	genmc3: {
		question:"How many US Presidents have died in office?",
		answer:"Four",
		type:"mc",
		fakeAnswer1:"Three",
		fakeAnswer2:"Five",
		fakeAnswer3:"Two"	
	},
	genmc4: {
		question:"What is the largest planet in our solar system?",
		answer:"Jupiter",
		type:"mc",
		fakeAnswer1:"Saturn",
		fakeAnswer2:"Neptune",
		fakeAnswer3:"Mercury"	
	},
	genmc5: {
		question:"How many Super Bowls have the Denver Broncos won?",
		answer:"Three",
		type:"mc",
		fakeAnswer1:"Four",
		fakeAnswer2:"Five",
		fakeAnswer3:"Two"	
	},
	genmc6: {
		question:"How many Super Bowls have the Denver Broncos been to?",
		answer:"Eight",
		type:"mc",
		fakeAnswer1:"Seven",
		fakeAnswer2:"Five",
		fakeAnswer3:"Six"	
	}

}

var generalQuestionsFillInTheBlank = {
	genfitb1: {
		question:"What controverial novel begins and ends with the title characters name",
		answer:"Lolita",
		showBlanks:1,
		type:"fitb"
	},
	genfitb2: {
		question:"How many football teams have won back-to-back Super Bowls?",
		answer:"7",
		showBlanks:1,
		type:"fitb"
	},
	genfitb3: {
		question:"Who wrote the original Little Mermaid fairy tale?",
		answer:"Hans Christian Andersen",
		showBlanks:1,
		type:"fitb"
	},
	genfitb4: {
		question:"Name 5 presidents since 1980?",
		answer:"(5 of these) Regan, Bush Jr, Bush Sr, Clinton, Obama, & Trump",
		showBlanks:5,
		type:"fitb"
	},
	genfitb5: {
		question:"In E=Mc^2 what does the 'c' stand for?",
		answer:"The speed of light or approx 299,792,458 m/s",
		showBlanks:1,
		type:"fitb"
	},
	genfitb6: {
		question:"What organ produces urine?",
		answer:"Kidneys",
		showBlanks:1,
		type:"fitb"
	},
	genfitb7: {
		question:"What actress won and academy award for playing another academy award winning actress?",
		answer:"Cate Blanchett (in The Aviator playing Katharine Hepburn)",
		showBlanks:1,
		type:"fitb"
	}
}

var geographyQuestionsMultipleChoice = {
	geomc1: {
		question:"Where is Colorado?",
		answer:"Roughly in the middle of the United States",
		type:"mc",
		fakeAnswer1:"On the border with Canada",
		fakeAnswer2:"On the west coast",
		fakeAnswer3:"On the east coast"
	},
	geomc2: {
		question:"What is the largest country by land area?",
		answer:"Russia",
		type:"mc",
		fakeAnswer1:"United States",
		fakeAnswer2:"Canada",
		fakeAnswer3:"China"
	},
	geomc3: {
		question:"What is the capital of Spain?",
		answer:"Madrid",
		type:"mc",
		fakeAnswer1:"Paris",
		fakeAnswer2:"Barceloa",
		fakeAnswer3:"Seville"
	},
	geomc4: {
		question:"Approximately what percentate of the worlds populace live North of the equator?",
		answer:"90%",
		type:"mc",
		fakeAnswer1:"80%",
		fakeAnswer2:"70%",
		fakeAnswer3:"95%"
	},
	geomc5: {
		question:"Which city does not have an official Disneyland/World?",
		answer:"Moscow",
		type:"mc",
		fakeAnswer1:"Tokyo",
		fakeAnswer2:"Hongkong",
		fakeAnswer3:"Orlando"
	},
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

var availableQuestionsArray = 	[["General Questions Multiple Choice", generalQuestionsMultipleChoice],
								["General Questions Fill In The Blank", generalQuestionsFillInTheBlank],
								["Geography Questions Multiple Choice", geographyQuestionsMultipleChoice],
								["Geography Questions Fill In The Blank", geographyQuestionsFillInTheBlank]]