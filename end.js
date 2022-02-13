const username = document.getElementById('username');
const saveScore = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');
finalScore.innerText = mostRecentScore;

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const MAX_HIGH_SCORES = 5;

username.addEventListener( 'keyup', () =>{
    saveScore.disabled = !username.value;
});

saveHighScore = e => {
    console.log("Clicked the save button");
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value,
    };

    highScores.push(score);
    highScores.sort( (a,b) => b.score - a.score );
    highScores.splice(MAX_HIGH_SCORES);

    localStorage.setItem('higHScores', JSON.stringify(highScores));
    window.location.assign("/");
};