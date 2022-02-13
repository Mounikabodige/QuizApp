const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText  = document.getElementById('progressText');
const scoreText = document.getElementById('score');
let acceptingAnswers = false;
let availibleQuestions = [];
let currQuestion = {};
let score = 0;
let questionCounter = 0;

let questions = [];

fetch("https://opentdb.com/api.php?amount=10&category=27&difficulty=medium&type=multiple")
    .then(res => {
        return res.json();
    })
    .then(loadQuestions => {
        console.log(loadQuestions.results);
        questions = loadQuestions.results.map( quest => {
            const formatedQuest = {
                question : quest.question
            };

            const answers = [...quest.incorrect_answers];
            formatedQuest.answer = Math.floor(Math.random() * 4) +1;
            answers.splice(
                formatedQuest.answer - 1, 
                0,
                quest.correct_answer
            );

            answers.forEach( (choice, index) => {
                formatedQuest['choice'+ (index +1)] = choice;
            });
            return formatedQuest;
        });

        // questions = loadQuestions;
        startGame();
    }).catch(err => {
        console.log(err);
    });

//Constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
    questionCounter = 0 ;
    score = 0 ;
    availibleQuestions = [...questions];
    getNewQuestion();
};


getNewQuestion = () => {
    if(availibleQuestions.length == 0 || questionCounter >= MAX_QUESTIONS){
        localStorage.setItem("mostRecentScore", score);
        //go to the end page.
        return window.location.assign("end.html");
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;

    //Update the progress bar.

    progressBarFull.style.width = `${(questionCounter/ MAX_QUESTIONS) * 100}%`;


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
        if(classToApply === 'correct'){
            incrementScore(CORRECT_BONUS);
        }    

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);

    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}
