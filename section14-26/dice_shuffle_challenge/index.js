const shuffleBtn = document.getElementById("shuffle");

function Shuffle(){
    var dice1 = Math.floor(Math.random()*6) + 1; 
    var dice2 = Math.floor(Math.random()*6) + 1;
    ChangeIMG(dice1,dice2);
    ChangeTxt(dice1,dice2);
}

function ChangeTxt(player1,player2){
    if (player1>player2){
        document.querySelector('h1').textContent = "Player 1 Wins!";
    } else if (player2>player1){
        document.querySelector('h1').textContent = "Player 2 Wins!";
    } else {
        document.querySelector('h1').textContent = "Draw!";
    }
}

function ChangeIMG(dice1,dice2){
    dice1--;
    dice2--;
    var imagesPath = [];
    for (var i = 1; i <= 6; i++){
        imagesPath.push(`./assets/images/dice${i}.png`);
    }
    document.querySelector('.img1').src = imagesPath[dice1];
    document.querySelector('.img2').src = imagesPath[dice2];
}

shuffleBtn.addEventListener("click", Shuffle);