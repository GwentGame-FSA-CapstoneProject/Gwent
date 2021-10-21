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

        this.rowStrength = (row, rowType) => {
            const reducer = (accu, currentUnit) => {
                return accu + currentUnit.strength
            }
    
            const weather = scene.WeatherHandler;
            switch(rowType){
                case 'close':
                    return (weather.frost ? row.length : row.reduce(reducer, 0));
                case 'range':
                    return ((weather.fog || weather.storm) ? row.length : row.reduce(reducer, 0));
                case 'siege':
                    return ((weather.rain || weather.storm) ? row.length : row.reduce(reducer, 0));
                default:
                    console.log('Error: GameHandler rowStrength passed invalid row type.');
            }
        }

        this.totalStrength = (close, range, siege) => {
            return this.rowStrength(close, 'close') + this.rowStrength(range, 'range') + this.rowStrength(siege, 'siege');
        }
        
        this.endOfRound = (playerStr, OpponentStr) => {
            let playerWon = false;
            if(playerStr > OpponentStr){
                playerWon = true;
                console.log('you won the round!')
                this.playerRoundWins += 1;
                scene.socket.emit('playerWon', scene.socket.id);
            } else if (OpponentStr > playerStr){
                console.log('you lost the round!')
                this.opponentRoundWins += 1;
            }else {
                console.log('A draw!');
                this.playerRoundWins += 1;
                this.opponentRoundWins += 1;
                if(this.opponentRoundWins > 1){
                    scene.scene.start('GameLost'); 
                }else if (this.playerRoundWins > 1 ){
                    scene.scene.start('GameWon');
                }else{
                    scene.socket.emit('draw', scene.socket.id);
                }

            }
            this.playerField = [];
            this.opponentField = [];
            this.opponentClose = [];
            this.opponentRange = [];
            this.opponentSiege = [];
            this.playerClose = [];
            this.playerRange = [];
            this.playerSiege = [];
            scene.UIHandler.updateGameInfo();
            scene.WeatherHandler.clearWeather();
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
