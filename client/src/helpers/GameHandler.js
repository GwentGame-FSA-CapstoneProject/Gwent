export default class GameHandler {
    constructor(scene) {
        this.gameState = "Initializing";
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

        this.changeTurn = () => {
            this.isMyTurn = !this.isMyTurn;
            console.log("isMyTurn: " + this.isMyTurn);
        }

        this.changeGameState = (gameState) => {
            this.gameState = gameState;
            console.log("GameState: " + this.gameState);
        }
    }
}
