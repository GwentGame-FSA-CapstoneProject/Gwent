import ZoneHandler from "./ZoneHandler";

export default class UIHandler {
    constructor(scene) {

        this.ZoneHandler = new ZoneHandler(scene);

        this.buildZones = () => {
            scene.dropZone = this.ZoneHandler.renderZone();
            this.ZoneHandler.renderOutline(scene.dropZone);
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
