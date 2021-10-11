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
            if (scene.GameHandler.isMyTurn && scene.GameHandler.gameState === 'Ready'){
                dropZone.data.values.cards++;
                gameObject.x = dropZone.x - 350 + dropZone.data.values.cards * 100;
                gameObject.y = dropZone.y;
                scene.socket.emit('cardPlayed', gameObject.data.values.name, scene.socket.id);
            }else{
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
          });
    }
}