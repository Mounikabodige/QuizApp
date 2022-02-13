const username = document.getElementById('username');
const saveScore = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');
finalScore.innerText = mostRecentScore;

username.addEventListener( 'keyup', () =>{
    saveScore.disabled = username.value;
});

saveHighScore = e => {
    console.log("Clicked the save button");
    e.preventDefault();
};