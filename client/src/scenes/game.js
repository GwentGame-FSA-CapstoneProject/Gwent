import io from "socket.io-client";

export default class Game extends Phaser.Scene {
    constructor() {
        super({
            key: 'Game'
        });
    }

    preload() {
        this.load.image('albrich', 'client/src/assets/albrich.png');
        this.load.image('board','client/src/assets/board.jpg')
    }

    create() {
        this.socket = io('http://localhost:3000');

        this.socket.on('connect', function () {
        	console.log('Connected!');
        });

        this.board = this.add.image(640,390 , 'board')
		this.card = this.add.image(300, 300, 'albrich').setScale(0.3, 0.3).setInteractive();
        this.input.setDraggable(this.card);


        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        })
    }

    update() {

    }
}
