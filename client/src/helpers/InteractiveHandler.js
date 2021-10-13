import cardsArray from '../cards/cardClass';
export default class InteractiveHandler {
    constructor(scene){

        scene.cardPreview = null;

        scene.input.on('pointerover', (event, gameObjects) => {
            if (gameObjects[0].type === "Image" && gameObjects[0].data.list.name !== "cardBack") {
                scene.cardPreview = scene.add.image(1180, 600, gameObjects[0].data.values.name).setScale(0.5, 0.5);
            }
        });

        scene.input.on('pointerout', (event, gameObjects) => {
            // if(gameObjects[0].type === "Image" && gameObjects[0].data.list.name)
            //     console.log(gameObjects[0].data.list.name);

            if (gameObjects[0].type === "Image" && gameObjects[0].data.list.name !== "cardBack") {
                scene.cardPreview.setVisible(false);
            }
        });

        scene.drawCard.on('pointerdown', () => {
            scene.socket.emit('drawCard', scene.socket.id);
            scene.drawCard.disableInteractive();
            scene.drawCard.setVisible(false);
        })

        scene.drawCard.on('pointerover', () => {
            scene.drawCard.setColor('#ff69b4');
        })

        scene.drawCard.on('pointerout', () => {
            scene.drawCard.setColor('#00ffff')
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
        let totalPlayerStrength =0
        scene.input.on("drop", function (pointer, gameObject, dropZone) {
            let card = {}
            for(let i = 0 ;i<cardsArray.length;i++){
                if(cardsArray[i].name===gameObject.texture.key){
                     card = cardsArray[i]
                }
            }

            let yValue;
            let xOffset;
            switch (card.row) {
                case 'Close':
                    yValue = 660
                    scene.GameHandler.playerClose.push(card);
                    xOffset = scene.GameHandler.playerClose.length;
                    break;
                case 'Range':
                    yValue = 760
                    scene.GameHandler.playerRange.push(card);
                    xOffset = scene.GameHandler.playerRange.length;
                    break;
                case 'Siege':
                    yValue = 860
                    scene.GameHandler.playerSiege.push(card);
                    xOffset = scene.GameHandler.playerSiege.length;
                    break;
                default:
                  console.log(`InteractiveHandler Switch Statement Problem`);
            }
            if (scene.GameHandler.isMyTurn && scene.GameHandler.gameState === 'Ready'){

                scene.GameHandler.playerField.push(card)
                console.log('Player card strength:',card.strength)
                totalPlayerStrength+=card.strength
                console.log('Total Player strength:',totalPlayerStrength)
                gameObject.x = dropZone.x - 350 + xOffset * 100;
                gameObject.y = yValue;
                scene.socket.emit('cardPlayed', gameObject.data.values.name, scene.socket.id);
                scene.input.setDraggable(gameObject, false);
            }else{
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
          });
    }
}
