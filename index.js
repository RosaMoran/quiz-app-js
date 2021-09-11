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


let questions =  [
    {
        question: 'Which are correct ways to declare a variable in JavaScript?',
        choice1: 'const name = "Tim";',
        choice2: 'name = "Tim";',
        choice3: 'let name = "Tim";',
        choice4: 'var name = "Tim";',
        answer: 1   
    },
    {
        question: 'What does `typeof` do?',
        choice1: 'changes the type of a primitive value',
        choice2: 'returns a string describing the type of a value',
        choice3: 'determines if a value is primitive',
        choice4: 'can tell the difference between arrays and objects',
        answer: 2,
    },
    {
        question: 'How many values can take a Boolean?',
        choice1: 'three values: true, false and if',
        choice2: 'four values: true, false, if and else',
        choice3: 'one value: boolean',
        choice4: 'two values: true and false',
        answer: 4,
    },
    {
        question: 'What is an Array?',
        choice1: 'An array is a series of elements of the same type in contiguous memory locations',
        choice2: 'An array is a series of element',
        choice3: 'An array is a series of elements of the same type placed in non-contiguous memory locations',
        choice4: 'An array is an element of the different type',
        answer: 1,
    },
    {
        question: 'Which of the following accesses the seventh element stored in array?',
        choice1: 'array[7];',
        choice2: 'array[6];',
        choice3: 'array(7);',
        choice4: 'array;',
        answer: 2,
    },
    {
        question: 'What is the index number of the last element of an array with 9 elements?',
        choice1: '9',
        choice2: '8',
        choice3: '0',
        choice4: 'Programmer-defined',
        answer: 2,
    },
];


const SCORE_POINTS = 100
const MAX_QUESTIONS = 6;

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