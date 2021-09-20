const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
		{
			"question": "Which are correct ways to declare a variable in JavaScript? (strict mode)",
			"answered": false,
			"answers": [
				{
					"text": "const name = \"Tim\";",
					"correct": true,
					"selected": true
				},
				{
					"text": "name = \"Tim\";",
					"correct": false,
					"selected": false
				},
				{
					"text": "let name;",
					"correct": false,
					"selected": false
				},
				{
					"text": "var  = \"Tim\";",
					"correct": false,
					"selected": false
				}
			],
			"links": [
				{
					"text": "javascript.info",
					"url": "https://javascript.info/variables"
				},
				{
					"text": "Tyler McGinnis",
					"url": "https://ui.dev/var-let-const/"
				}
			]
		},
		{
			"question": "What does `typeof` do?",
			"answered": false,
			"answers": [
				{
					"text": "changes the type of a primitive value",
					"correct": false,
					"selected": false
				},
				{
					"text": "returns a string describing the type of a value",
					"correct": true,
					"selected": true
				},
				{
					"text": "determines if a value is primitive",
					"correct": false,
					"selected": false
				},
				{
					"text": "can tell the difference between arrays and objects",
					"correct": false,
					"selected": false
				}
			],
			"links": [
				{
					"text": "javascript.info",
					"url": "https://javascript.info/types#type-typeof"
				},
				{
					"text": "MDN",
					"url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof"
				}
			]
		},
		{
			"question": "How many values can take a Boolean?",
			"answered": false,
			"answers": [
				{
					"text": "two values: true and false",
					"correct": true,
					"selected": true
				},
				{
					"text": "one value: boolean",
					"correct": false,
					"selected": false
				},
				{
					"text": "four values: true, false, if and else",
					"correct": false,
					"selected": false
				},
				{
					"text": "three values: true, false and if",
					"correct": false,
					"selected": false
				}
			],
			"links": [
				{
					"text": "w3schools.com",
					"url": "https://www.w3schools.com/js/js_booleans.asp"
				}
			]
		},
		{
			"question": "What is an Array?",
			"answered": false,
			"answers": [
				{
					"text": "An array is a series of element",
					"correct": false,
					"selected": false
				},
				{
					"text": "An array is a series of elements of the same type in contiguous memory locations",
					"correct": true,
					"selected": true
				},
				{
					"text": "An array is an element of the different type",
					"correct": false,
					"selected": false
				},
				{
					"text": "An array is a series of elements of the same type placed in non-contiguous memory locations",
					"correct": false,
					"selected": false
				}
			],
			"links": [
				{
					"text": "w3schools.com",
					"url": "https://www.w3schools.com/js/js_arrays.asp"
				},
				{
					"text": "javatpoint",
					"url": "https://www.javatpoint.com/array-in-java"
				}
			]
		},
		{
			"question": "Which of the following accesses the seventh element stored in array",
			"answered": false,
			"answers": [
				{
					"text": "array[7];",
					"correct": false,
					"selected": false
				},
				{
					"text": "array(7);",
					"correct": false,
					"selected": false
				},
				{
					"text": "array;",
					"correct": false,
					"selected": false
				},
				{
					"text": "array[6];",
					"correct": true,
					"selected": true
				}
			],
			"links": [
				{
					"text": "w3schools.com",
					"url": "https://www.w3schools.com/js/js_arrays.asp"
				},
				{
					"text": "javatpoint",
					"url": "https://www.javatpoint.com/array-in-java"
				}
			]
		},
		{
			"question": "What is the index number of the last element of an array with 9 elements?'",
			"answered": false,
			"answers": [
				{
					"text": "Programmer-defined",
					"correct": false,
					"selected": false
				},
				{
					"text": "9",
					"correct": false,
					"selected": false
				},
				{
					"text": "8",
					"correct": true	,
					"selected": true
				},
				{
					"text": "5",
					"correct": false,
					"selected": false
				}
			],
			"links": [
				{
					"text": "w3schools.com",
					"url": "https://www.w3schools.com/js/js_arrays.asp"
				}
			]
		},
		{
			"question": "which 3 methods can extracting a string parts?",
			"answered": false,
			"answers": [
				{
					"text": "It doesn't exist methods",
					"correct": false,
					"selected": false
				},
				{
					"text": "Map (): method",
					"correct": false,
					"selected": false
				},
				{
					"text": "slice(start, end), substring(start, end) and substr(start, length)",
					"correct": true,
					"selected": false
				},
				{
					"text": "no answer is correct",
					"correct": true,
					"selected": true
				}
			],
			"links": [
				{
					"text": "w3schools.com",
					"url": "https://www.w3schools.com/js/js_string_methods.asp"
				}
			]
		},
		{
			"question": "JavaScript Can Change HTML Content",
			"answered": false,
			"answers": [
				{
					"text": "No",
					"correct": false,
					"selected": false
				},
				{
					"text": "Yes with (addElement ())",
					"correct": false,
					"selected": false
				},
				{
					"text": "Yes, with (document.createElement(tagName[, options]))",
					"correct": false,
					"selected": false
				},
				{
					"text": "Yes, with (document.getElementById(tagId))",
					"correct": true,
					"selected": true
				}
			],
			"links": [
				{
					"text": "w3schools.com",
					"url": "https://www.w3schools.com/js/js_intro.asp"
				}
			]
		},
		{
			"question": "What is a javascript function?",
			"answered": false,
			"answers": [
				{
					"text": "A javaScript function is a block of code designed to perform a particular task.",
					"correct": true,
					"selected": true
				},
				{
					"text": "An array is a series of element",
					"correct": false,
					"selected": false
				},
				{
					"text": "A javaScript function can be used to explain JavaScript code, and to make it more readable.",
					"correct": false,
					"selected": false
				},
				{
					"text": "A javaScript function are used for storing and manipulating text.",
					"correct": false,
					"selected": false
				}
			],
			"links": [
				{
					"text": "w3schools",
					"url": "https://www.w3schools.com/js/js_functions.asp"
				}
			]
		},
		{
			"question": "How many ways exists to declare a variable?",
			"answered": false,
			"answers": [
				{
					"text": "only one way (const)",
					"correct": false,
					"selected": false
				},
				{
					"text": "only two ways (var and const)",
					"correct": false,
					"selected": false
				},
				{
					"text": "three ways (const, let and var",
					"correct": true,
					"selected": true
				},
				{
					"text": "function name () {}",
					"correct": false,
					"selected": false
				}
			],
			"links": [
				{
					"text": "w3schools",
					"url": "https://www.w3schools.com/js/js_functions.asp"
				}
			]
		}
	]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()
