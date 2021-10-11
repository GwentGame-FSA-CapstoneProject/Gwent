import io from 'socket.io-client';

export default class SocketHandler {
    constructor(scene){

        scene.socket = io('http://localhost:3000');

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

        scene.socket.on('drawCard', (socketId, cards) => {
            if (socketId === scene.socket.id) {
                for (let i in cards) {
                    let card = scene.GameHandler.playerHand.push(scene.DeckHandler.dealCard(155 + (i * 155), 1060, cards[i], "playerCard"));
                }
            } else {
                for (let i in cards) {
                    let card = scene.GameHandler.opponentHand.push(scene.DeckHandler.dealCard(155 + (i * 155), 135, "cardBack", "opponentCard"));
                }
            }
        })

        scene.socket.on('cardPlayed', (cardName, socketId) => { //shows where opponent card goes
            if (socketId !== scene.socket.id) {
                scene.GameHandler.opponentHand.shift().destroy();
                //scene.DeckHandler.dealCard((scene.dropZone1.x - 350) + (scene.dropZone1.data.values.cards * 50), scene.dropZone1.y, cardName, "opponentCard");
                scene.DeckHandler.dealCard(500, 500, cardName, "opponentCard");
                scene.dropZone.data.values.cards++;
            }
        })
    }
}