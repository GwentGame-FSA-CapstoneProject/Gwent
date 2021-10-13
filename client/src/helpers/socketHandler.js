import io from 'socket.io-client';
import cardsArray from '../cards/cardClass';

export default class SocketHandler {
    constructor(scene){

        scene.socket = io('http://localhost:5000');

        scene.socket.on('connect', () => {
            console.log('Connected!');
            scene.socket.emit('sendDeck', scene.socket.id);
        })

        scene.socket.on('firstTurn', () => {
            scene.GameHandler.changeTurn();
        })

        scene.socket.on('changeGameState', (gameState) => {
            scene.GameHandler.changeGameState(gameState);
            if(gameState === 'Initializing'){
                scene.DeckHandler.dealCard(1138, 703, 'cardBack', 'opponentCard'); //this is called opponent card so it isnt draggable, is technically your deck
                scene.DeckHandler.dealCard(1138, 498, 'cardBack', 'opponentCard');
                //drawCard interactive?
            }
        })

        scene.socket.on('changeTurn', () => {
            scene.GameHandler.changeTurn();
        })

        scene.socket.on('passTurn', (socketId) => {
            console.log("****passed*****", socketId);
        })

        scene.socket.on('endRound', () => {
            console.log("End of Round placeholder");
        })

        scene.socket.on('drawCard', (socketId, cards) => {
            if (socketId === scene.socket.id) {
                for (let i in cards) {
                    let card = scene.GameHandler.playerHand.push(scene.DeckHandler.dealCard(100 + (i * 125), 1060, cards[i], "playerCard"));
                }
            } else {
                for (let i in cards) {
                    let card = scene.GameHandler.opponentHand.push(scene.DeckHandler.dealCard(100 + (i * 125), 135, "cardBack", "opponentCard"));
                }
            }
        
        })

        scene.socket.on('cardPlayed', (cardName, socketId) => { //shows where opponent card goes
            if (socketId !== scene.socket.id) {
                let card = {};

                for(let i = 0 ; i<cardsArray.length; i++){
                    if(cardsArray[i].name === cardName){
                        card = cardsArray[i]
                    }
                }
                let yValue;
                let xOffset = 0;
                switch (card.row) {
                    case 'Close':
                        yValue = 560;
                        scene.GameHandler.opponentClose.push(card);
                        xOffset = scene.GameHandler.opponentClose.length;
                    break;
                    case 'Range':
                        yValue = 458;
                        scene.GameHandler.opponentRange.push(card);
                        xOffset = scene.GameHandler.opponentRange.length;
                        break;
                    case 'Siege':
                        yValue = 355;
                        scene.GameHandler.opponentSiege.push(card);
                        xOffset = scene.GameHandler.opponentSiege.length;
                    break;
                    default:
                    console.log(`SocketHandler Switch Statement Problem`);
                }

                    scene.GameHandler.opponentField.push(card)
                    scene.GameHandler.opponentHand.shift().destroy();
                    scene.DeckHandler.dealCard(425 + 70 * xOffset, yValue, cardName, "opponentCard").setCrop(0, 0, 300, 370);
                    scene.dropZone.data.values.cards++;
            }
        })
    }
}
