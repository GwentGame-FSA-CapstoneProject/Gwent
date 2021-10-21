import cardsArray from '../cards/cardClass';
export default class InteractiveHandler {
    constructor(scene){

        scene.cardPreview = null;

        scene.input.on('pointerover', (event, gameObjects) => {
            if (gameObjects[0].type === "Image" && gameObjects[0].data.list.name !== "cardback") {
                scene.cardPreview = scene.add.image(1180, 600, gameObjects[0].data.values.name).setScale(0.75, 0.75);
            }
        });

        scene.input.on('pointerout', (event, gameObjects) => {
            // if(gameObjects[0].type === "Image" && gameObjects[0].data.list.name)
            //     console.log(gameObjects[0].data.list.name);

            if (gameObjects[0].type === "Image" && gameObjects[0].data.list.name !== "cardback") {
                scene.cardPreview.setVisible(false);
            }
        });

        scene.passTurn.on('pointerdown', () => {              //pass turn button
            if(scene.GameHandler.isMyTurn){
                scene.socket.emit('passTurn', scene.socket.id);
                scene.GameHandler.playerPassed = true;
                scene.passTurn.disableInteractive().setVisible(false);
            }
        })

        scene.passTurn.on('pointerover', () => {
            if(scene.GameHandler.isMyTurn)
                scene.passTurn.setColor('#ff69b4');
        })

        scene.passTurn.on('pointerout', () => {
            scene.passTurn.setColor('#00ffff')
        })

        scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
        })

        scene.input.on('dragstart', (pointer, gameObject) => {
            gameObject.setTint(0xff69b4);
            scene.children.bringToTop(gameObject);
            scene.cardPreview.setVisible(false);
        })

        scene.input.on('dragend', (pointer, gameObject, dropped) => {
            gameObject.setTint();
            if (!dropped) {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
        })

        scene.input.on("drop", function (pointer, gameObject, dropZone) {
            let gameHandler = scene.GameHandler;
            console.log('drop in interactiveHandler', gameHandler.isMyTurn, gameHandler.gameState, gameHandler.playerPassed)
            if (gameHandler.isMyTurn && gameHandler.gameState === 'Ready' && gameHandler.playerPassed === false){
                let weather = ['biting_frost', 'clear_weather', 'impenetrable_fog', 'skellige_storm', 'torrential_rain'];
                if(weather.includes(gameObject.data.values.name)){
                    scene.WeatherHandler.weatherPlayed(gameObject.data.values.name);
                    scene.socket.emit('cardPlayed', gameObject.data.values.name, scene.socket.id);
                    scene.UIHandler.updateGameInfo();
                    gameObject.setVisible(false).setInteractive(false);//destroying them causes a bug with the pointer off function
                }else{
                    let card = {};

                    if(!gameHandler.playerPassed)
                    for(let i = 0; i<cardsArray.length; i++){
                        if(cardsArray[i].name===gameObject.texture.key){
                            card = cardsArray[i]
                        }
                    }

                    let yValue;
                    let xOffset;
                    gameObject.inPlay=true

                    switch (card.row) {
                        case 'Close':
                            yValue = 670;
                            gameHandler.playerClose.push(card);
                            xOffset = gameHandler.playerClose.length;
                            break;
                        case 'Range':
                            yValue = 770;
                            gameHandler.playerRange.push(card);
                            xOffset = gameHandler.playerRange.length;
                            break;
                        case 'Siege':
                            yValue = 875;
                            gameHandler.playerSiege.push(card);
                            xOffset = gameHandler.playerSiege.length;
                            break;
                        default:
                        console.log(`InteractiveHandler Switch Statement Problem`);
                    }
                    gameHandler.playerField.push(card);
                    gameObject.x = dropZone.x - 340 + xOffset * 70;
                    gameObject.y = yValue;
                    gameObject.setCrop(0, 0, 300, 370); //removes bottom text on card
                    scene.socket.emit('cardPlayed', gameObject.data.values.name, scene.socket.id);
                    scene.UIHandler.updateGameInfo();
                    scene.input.setDraggable(gameObject, false);
                }
            }else{
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
        });
    }
}
