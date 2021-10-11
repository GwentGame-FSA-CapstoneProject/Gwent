import ZoneHandler from "./ZoneHandler";

export default class UIHandler {
    constructor(scene) {

        this.meleeZoneHandler = new ZoneHandler(scene);
        this.rangedZoneHandler = new ZoneHandler(scene);
        this.siegeZoneHandler = new ZoneHandler(scene);

        this.buildZones = () => {

            scene.dropZone = this.meleeZoneHandler.renderZone(660);
            this.meleeZoneHandler.renderOutline(scene.dropZone);
            scene.dropZone = this.rangedZoneHandler.renderZone(760);
            this.rangedZoneHandler.renderOutline(scene.dropZone);
            scene.dropZone = this.siegeZoneHandler.renderZone(860);
            this.siegeZoneHandler.renderOutline(scene.dropZone);
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
