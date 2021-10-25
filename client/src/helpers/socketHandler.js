import io from 'socket.io-client';
import cardsArray from '../cards/cardClass';

export default class SocketHandler {
    constructor(scene){

        scene.socket = io();
        const gameHandler = scene.GameHandler;

        scene.socket.on('connect', () => {
            console.log('Connected!');
            scene.socket.emit('sendDeck', scene.socket.id);
        })

        scene.socket.on('opponentDisconnect', () => {
            scene.scene.start('GameWonDisconnect');
        })

        scene.socket.on('firstTurn', () => {
            gameHandler.changeTurn();
        })

        scene.socket.on('yourTurn', (socketId) => {
            console.log('got turn')
            if (socketId === scene.socket.id)
                scene.GameHandler.isMyTurn = true;
        })

        scene.socket.on('changeGameState', (gameState) => {
            console.log('receiving new gamestate', gameState)
            gameHandler.changeGameState(gameState);
            if(gameState === 'Initializing'){
                scene.DeckHandler.dealCard(1138, 703, 'cardback', 'opponentCard'); //this is called opponent card so it isnt draggable, is technically your deck i
                scene.DeckHandler.dealCard(1138, 498, 'cardback', 'opponentCard');
                scene.socket.emit('drawCard', scene.socket.id);
            }
        })

        scene.socket.on('changeTurn', () => {
            console.log('received changeTurn')
            gameHandler.changeTurn();
        })

        scene.socket.on('passTurn', (socketId) => {
            console.log("passed:", socketId);
            //this method isnt currently doing anything but might be needed when more...
            //...than one game is running depending on how the socket implementation is done
        })

        scene.socket.on('endRound', () => {
            console.log("End of Round placeholder");
            let playerStr = gameHandler.totalStrength(gameHandler.playerClose, gameHandler.playerRange, gameHandler.playerSiege);
            let opponentStr = gameHandler.totalStrength(gameHandler.opponentClose, gameHandler.opponentRange, gameHandler.opponentSiege);
            scene.GameHandler.endOfRound(playerStr, opponentStr)
            for(let i=0;i<scene.children.list.length;i++){
                if(scene.children.list[i].inPlay){
                    scene.children.list[i].setVisible(false)
                }
            }
            scene.socket.emit('endRound', scene.socket.id);
        })

        scene.socket.on('drawCard', (socketId, cards) => {
            if (socketId === scene.socket.id) {
                for (let i in cards) {
                    let card = scene.GameHandler.playerHand.push(scene.DeckHandler.dealCard(100 + (i * 125), 1060, cards[i], "playerCard"));
                }
            } else {
                for (let i in cards) {
                    let card = scene.GameHandler.opponentHand.push(scene.DeckHandler.dealCard(100 + (i * 125), 135, "cardback", "opponentCard"));
                }
            }

        })

        scene.socket.on('endGame', (socketId) => {
            if (socketId === scene.socket.id) {
                scene.scene.start('GameWon')
            }else {
                scene.scene.start('GameLost')
            }
        })

        scene.socket.on('cardPlayed', (cardName, socketId) => { //shows where opponent card goes
            if (socketId !== scene.socket.id) {
                let weather = ['biting_frost', 'clear_weather', 'impenetrable_fog', 'skellige_storm', 'torrential_rain'];
                if(weather.includes(cardName)){
                    scene.WeatherHandler.weatherPlayed(cardName);
                    scene.UIHandler.updateGameInfo();
                }else{
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
                        scene.UIHandler.updateGameInfo();
                        scene.DeckHandler.dealCard(425 + 70 * xOffset, yValue, cardName, "opponentCard").setCrop(0, 0, 300, 370).inPlay =true ;
                }
            }
        })
    }
}
