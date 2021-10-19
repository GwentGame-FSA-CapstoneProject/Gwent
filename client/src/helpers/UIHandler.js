import ZoneHandler from "./ZoneHandler";

export default class UIHandler {
    constructor(scene) {

        this.ZoneHandler = new ZoneHandler(scene);

        this.buildZones = () => {
            scene.dropZone = this.ZoneHandler.renderZone();
            this.ZoneHandler.renderOutline(scene.dropZone);
        }

        this.buildGameText = () => {
            scene.drawCard = scene.add.text(370, 1030, "Click here to start!").setFontSize(42).setInteractive();

            scene.passTurn = scene.add.text(1100, 590, "Pass Turn").setFontSize(25).setInteractive().setColor('#00ffff');
            
            //these ar ekind of ugly, they serve their purpose for now though 
            scene.frost = scene.add.text(460, 560, "Biting Frost: Each Close unit (both players) set to 1 strength.").setColor('#FF5F1F').setVisible(false);
            scene.fog = scene.add.text(460, 460, "Impenetrable Fog: Each Range unit (both players) set to 1 strength.").setColor('#FF5F1F').setVisible(false);
            scene.rain = scene.add.text(460, 360, "Torrential Rain: Each Siege unit (both players) set to 1 strength.").setColor('#FF5F1F').setVisible(false);
            scene.storm = scene.add.text(460, 260, "Skellige Storm: Each Range and Siege unit (both players) set to 1 strength.").setColor('#FF5F1F').setVisible(false);
        }

        this.buildUI = () => {
            this.buildZones();
            this.buildGameText();
        }

    }
}
