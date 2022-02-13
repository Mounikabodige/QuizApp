const highScoresList = document.getElementById('highScoresList');
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];


highScoresList.innerHTML = 
highScores.map(user => {
    return `<li class="high-score">${user.name} - ${user.score}</li>`;
}).join("");