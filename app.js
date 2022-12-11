let statut = document.querySelector('h2')
let activeGame = true
let playerCount = document.getElementById('player-count')
let iaCount = document.getElementById('ia-count')
let activePlayer = {
    player: "X",
    iaCount: 0,
    playerCount: 0
}
let stateGame = ['', '', '', '', '', '', '', '', '']
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const winMsg = () => `Le joueur ${activePlayer.player} a gagné`
const equalMsg = () => `Egalité `
const playerRoundMsg = () => `C'est au tour du joueur : ${activePlayer.player}`

statut.innerHTML = playerRoundMsg()

document.querySelectorAll('.cells').forEach(cell => cell.addEventListener('click', cellClickGestion))
document.querySelector('#restart').addEventListener('click', restart)


// FUNCTIONS

function cellClickGestion() {
    const indexCell = parseInt(this.dataset.index)
    console.log(this)
    if(stateGame[indexCell] !== '' || !activeGame){
        return
    }
   stateGame[indexCell] = activePlayer.player
   this.innerHTML = activePlayer.player
   verifyWin()
}

function verifyWin() {
    let winRound = false
   for(let winCondition of winConditions) {
        let value1 = stateGame[winCondition[0]]
        let value2 = stateGame[winCondition[1]]
        let value3 = stateGame[winCondition[2]]
        if (value1 === '' || value2 === '' || value3 === '') {
            continue
        } 
        if (value1 === value2 && value2 === value3) {
            winRound = true
            break
        }
   }
   if(winRound) {
    statut.innerHTML = winMsg()
    if(activePlayer.player === 'X') {
        activePlayer.playerCount++
        playerCount.innerHTML = activePlayer.playerCount
    }
    if(activePlayer.player === 'O') {
        activePlayer.iaCount++
        iaCount.innerHTML = activePlayer.iaCount
    }
    activeGame = false
    return
   }

   if(!stateGame.includes('')) {
        statut.innerHTML = equalMsg()
        activeGame = false
        return
   }
   activePlayer.player = activePlayer.player === 'X' ? 'O' : 'X'
   statut.innerHTML = playerRoundMsg()
}

function restart() {
    activePlayer.player = 'X'
    activeGame = true
    stateGame = ['', '', '', '', '', '', '', '', '']
    statut = playerRoundMsg()
    document.querySelectorAll('.cells').forEach(cell => cell.innerHTML = '')
   
}






