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

            scene.yourTurn = scene.add.text(600, 950, "Your Turn").setFontSize(32).setVisible(false);

            scene.rules = scene.add.text(10,870,'Rules of Gwent').setFontSize(30).setInteractive().setColor('DarkRed')

            //these are kind of ugly, they serve their purpose for now though
            scene.frost = scene.add.text(460, 560, "Biting Frost: Each Close unit (both players) set to 1 strength.").setColor('#FF5F1F').setVisible(false);
            scene.fog = scene.add.text(460, 460, "Impenetrable Fog: Each Range unit (both players) set to 1 strength.").setColor('#FF5F1F').setVisible(false);
            scene.rain = scene.add.text(460, 360, "Torrential Rain: Each Siege unit (both players) set to 1 strength.").setColor('#FF5F1F').setVisible(false);
            scene.storm = scene.add.text(460, 260, "Skellige Storm: Each Range and Siege unit (both players) set to 1 strength.").setColor('#FF5F1F').setVisible(false);
        }

        this.buildGameInfo = () => {
            scene.playerSiegeValue = scene.add.text(393, 850, '0').setFontSize(42)
            scene.playerRangeValue = scene.add.text(393, 745, '0').setFontSize(42)
            scene.playerCloseValue = scene.add.text(393, 645, '0').setFontSize(42)
            scene.playerTotalValue = scene.add.text(45, 680, 'total strength: 0').setFontSize(21)
            scene.opponentSiegeValue = scene.add.text(393, 330, '0').setFontSize(42)
            scene.opponentRangeValue = scene.add.text(393, 433, '0').setFontSize(42)
            scene.opponentCloseValue = scene.add.text(393, 535, '0').setFontSize(42)
            scene.opponentTotalValue = scene.add.text(45, 500, 'total strength: 0').setFontSize(21)
            scene.playerRoundsWon = scene.add.text(45,705,'Rounds Won: 0').setFontSize(21)
            scene.opponentRoundWon = scene.add.text(45,475,'Rounds Won: 0').setFontSize(21)
        }

        this.updateGameInfo = () => {
            const gameHandler = scene.GameHandler;
            const rowStr = gameHandler.rowStrength;
            scene.playerCloseValue.setText(rowStr(gameHandler.playerClose, 'close'));
            scene.playerSiegeValue.setText(rowStr(gameHandler.playerSiege, 'siege'));
            scene.playerRangeValue.setText(rowStr(gameHandler.playerRange, 'range'));
            scene.opponentCloseValue.setText(rowStr(gameHandler.opponentClose, 'close'));
            scene.opponentSiegeValue.setText(rowStr(gameHandler.opponentSiege, 'siege'));
            scene.opponentRangeValue.setText(rowStr(gameHandler.opponentRange, 'range'));
            scene.playerTotalValue.setText(`total strength: ${gameHandler.totalStrength(gameHandler.playerClose, gameHandler.playerRange, gameHandler.playerSiege)}`);
            scene.opponentTotalValue.setText(`total strength: ${gameHandler.totalStrength(gameHandler.opponentClose, gameHandler.opponentRange, gameHandler.opponentSiege)}`);
            scene.playerRoundsWon.setText(`Rounds Won: ${gameHandler.playerRoundWins}`)
            scene.opponentRoundWon.setText(`Rounds Won: ${gameHandler.opponentRoundWins}`)
        }

        this.yourTurn = () => {
            scene.yourTurn.setVisible(true);

            setTimeout(function(){
                scene.yourTurn.setVisible(false)
            }, 1500)
        }

        this.buildUI = () => {
            this.buildZones();
            this.buildGameText();
            this.buildGameInfo();
        }

    }
}
