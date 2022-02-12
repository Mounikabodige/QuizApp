const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName('choice-text'));

let acceptingAnswers = false;
let availibleQuestions = [];
let currQuestion = {};
let score = 0;
let questionCounter = 0;

let questions = [
    {
        question : "Inside which HTML element do we put JavaScript??",
        choice1: "<script>",
        choice2: "<javascript>",
        choice3: "<js>",
        choice4: "<scripting>",
        answer : 1
    },
    {
        question : "What is the correct syntax for refering to external sript??",
        choice1: "<script href='file.js'>",
        choice2: "<script name='file.js'>",
        choice3: "<js name='file.js'>",
        choice4: "<scripting = 'file.js'>",
        answer:3
    },
    {
        question : "How do you write 'Hello World' in alert box??",
        choice1: "msgBox('Hello World')",
        choice2: "alertBox('Hello World')",
        choice3: "msg('Hello World')",
        choice4: "alert('Hello World')",
        answer:4
    }
];

//Constants

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0 ;
    score = 0 ;
    availibleQuestions = [...questions];
    getNewQuestion();
};


getNewQuestion = () => {
    if(availibleQuestions.length == 0 || questionCounter > MAX_QUESTIONS){
        return window.location.assign("end.html");
    }
    questionCounter++;
    const questionIndex = Math.floor(Math.random() * availibleQuestions.length);
    currQuestion = availibleQuestions[questionIndex];
    question.innerText = currQuestion.question;
    choices.forEach(choice => {
        const num = choice.dataset["number"];
        choice.innerText = currQuestion['choice' + num]
    });

    availibleQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click',e =>{
        if(!acceptingAnswers){
            return;
        }
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        const classToApply = 
            selectedAnswer == currQuestion.answer ?  "correct" : "incorrect";

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);

    });
});

startGame();
