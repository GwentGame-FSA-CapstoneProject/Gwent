export default class GameHandler {
    constructor(scene) {
        this.gameState = "Initializing";
        this.playerPassed = false;
        this.isMyTurn = false;
        this.playerDeck = [];
        this.opponentDeck = [];
        this.playerHand = [];
        this.opponentHand = [];
        this.playerField = [];
        this.opponentField = [];
        this.opponentClose = [];
        this.opponentRange = [];
        this.opponentSiege = [];
        this.playerClose = [];
        this.playerRange = [];
        this.playerSiege = [];
        this.playerRoundWins = 0;
        this.opponentRoundWins = 0;

        this.changeTurn = () => {
            if(this.playerPassed === false){
                this.isMyTurn = !this.isMyTurn;
                console.log("isMyTurn: " + this.isMyTurn);
            }
        }

        this.changeGameState = (gameState) => {
            this.gameState = gameState;
            console.log("GameState: " + this.gameState);
        }

        this.totalStrength = (fieldArray) => {
            const reducerfunc = (accu, currentUnit) => {
                return accu + currentUnit.strength
            }
            return fieldArray.reduce(reducerfunc, 0)
        }

        this.endOfRound = (playerStr, OpponentStr) => {
            //add tie game later
            let playerWon = false;
            if(playerStr > OpponentStr){
                playerWon = true;
                console.log('player won the round!')
                this.playerRoundWins += 1;
                scene.socket.emit('playerWon', scene.socket.id);
            } else if (OpponentStr > playerStr){
                console.log('you lost the round!')
                this.opponentRoundWins += 1;
            }
            this.playerField = [];
            this.opponentField = [];
            this.opponentClose = [];
            this.opponentRange = [];
            this.opponentSiege = [];
            this.playerClose = [];
            this.playerRange = [];
            this.playerSiege = [];
            if(playerWon){
                this.isMyTurn = true;
            }else{
                this.isMyTurn = false;
            }
            this.playerPassed = false;
            scene.passTurn.setInteractive(true).setVisible(true);
        }
    }
}
