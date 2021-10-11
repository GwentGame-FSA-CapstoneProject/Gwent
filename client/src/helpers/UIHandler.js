import ZoneHandler from "./ZoneHandler";

export default class UIHandler {
    constructor(scene) {

        this.zoneHandler = new ZoneHandler(scene);

        this.buildZones = () => {

            scene.dropZone = this.zoneHandler.renderZone(470, 500);
            //this.zoneHandler.renderOutline(scene.dropZone);
        }

        this.buildGameText = () => {
            scene.drawCard = scene.add.text(160, 660, "Draw Card").setFontSize(20).setInteractive();
        }

        this.buildUI = () => {
            this.buildZones();
            this.buildGameText();
        }

    }
}