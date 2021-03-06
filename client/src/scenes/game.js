import GameHandler from "../helpers/GameHandler";
import SocketHandler from "../helpers/socketHandler";
import DeckHandler from "../helpers/DeckHandler";
import InteractiveHandler from "../helpers/InteractiveHandler";
import UIHandler from "../helpers/UIHandler";
import WeatherHandler from "../helpers/WeatherHandler";
import cardsArray from "../cards/cardClass";

export default class Game extends Phaser.Scene {
  constructor() {
    super({
      key: "Game",
    });
  }

  preload() {
    this.load.image("albrich", "assets/albrich.png");
    this.load.image("rules", "assets/rules.png");
    this.load.image("cow", "assets/cow.png");
    this.load.image("cardback", "assets/cardback.png");
    this.load.image("board", "assets/board.jpg");
    this.load.image("botchling", "assets/botchling.png");
    this.load.image("gaunt_odimm", "assets/gaunt_odimm.png");
    this.load.image("bovine_defense_force", "assets/bovine_defense_force.png");
    this.load.image("dandelion", "assets/dandelion.png");
    this.load.image("emiel_regis", "assets/emiel_regis.png");
    this.load.image(
      "gaunter_odimm_darkness",
      "assets/gaunter_odimm_darkness.png"
    );
    this.load.image("vesemir", "assets/vesemir.png");
    this.load.image("zoltan", "assets/zoltan.png");

    this.load.image("clear_weather", "../assets/clear_weather.png");
    this.load.image("biting_frost", "../assets/biting_frost.png");
    this.load.image("torrential_rain", "../assets/torrential_rain.png");
    this.load.image("skellige_storm", "../assets/skellige_storm.png");
    this.load.image("impenetrable_fog", "../assets/impenetrable_fog.png");
    this.load.audio("draw",'../assets/draw.wav')
    this.load.audio("soundtrack",'../assets/soundtrack.mp3')
    this.load.image("ballista", "../assets/ballista.png");
    this.load.image("keira_metz", "../assets/keira_metz.png");
    this.load.image("philippa_eilhart", "../assets/philippa_eilhart.png");
    this.load.image("siege_tower", "../assets/siege_tower.png");
    this.load.image("trebuchet", "../assets/trebuchet.png");
    this.load.image("vernon_roche", "../assets/vernon_roche.png");
  }

  create() {
    this.board = this.add.image(640, 600, "board");
    this.sound.play('soundtrack',{volume: 0.25})
    this.DeckHandler = new DeckHandler(this);
    this.GameHandler = new GameHandler(this);
    this.SocketHandler = new SocketHandler(this);
    this.UIHandler = new UIHandler(this);
    this.UIHandler.buildUI();
    this.InteractiveHandler = new InteractiveHandler(this);
    this.WeatherHandler = new WeatherHandler(this);

  }

  update() {
    this.GameHandler.isMyTurn ? this.yourTurn.setVisible(true) && this.passTurn.setVisible(true): this.yourTurn.setVisible(false) && this.passTurn.setVisible(false);
  }
}
