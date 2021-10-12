import cardsArray from '../cards/cardClass';
export default class InteractiveHandler {
    constructor(scene){

        //card preview stuff (showing larger images w/ mroe game detail of cards you select)

        scene.drawCard.on('pointerdown', () => {                 //Draw card button is a production-only feature
            scene.socket.emit('drawCard', scene.socket.id);      // to be removed later when more gameplay is functional
            console.log('Draw Card Pressed');
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
            //scene.cardPreview.setVisible(false);
        })

        scene.input.on('dragend', (pointer, gameObject, dropped) => {
            gameObject.setTint();
            if (!dropped) {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
        })

        scene.input.on("drop", function (pointer, gameObject, dropZone) {
            let card = {}
            for(let i = 0 ;i<cardsArray.length;i++){
                if(cardsArray[i].name===gameObject.texture.key){
                     card = cardsArray[i]
                }
            }
            let yValue
            switch (card.row) {
                case 'Close':
                    yValue = 660
                  break;
                case 'Range':
                    yValue = 760
                    break
                case 'Siege':
                    yValue = 860
                  break;
                default:
                  console.log(`SocketHandler Switch Statment Problem`);
            }
            if (scene.GameHandler.isMyTurn && scene.GameHandler.gameState === 'Ready'){
                scene.GameHandler.playerField.push(card)
                gameObject.x = dropZone.x - 350 + scene.GameHandler.playerField.length * 100;
                gameObject.y = yValue;
                scene.socket.emit('cardPlayed', gameObject.data.values.name, scene.socket.id);
            }else{
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
          });
    }
}
