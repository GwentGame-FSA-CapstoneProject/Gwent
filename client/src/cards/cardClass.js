export class Card {
  constructor(scene) {
      this.render = (x, y, type) => {
          let image = this.image;
          let card = scene.add.image(x, y, image).setScale(0.25, 0.25).setInteractive().setData({
              "name": this.name,
              "type": this.type,
              "strength": this.strength,
              "row": this.row,
          });
          if (type === 'playerCard') {
              scene.input.setDraggable(card);
          }
          return card;
      }
  }
}

export class CardBack extends Card {
  constructor(scene) {
      super(scene);
      this.name = "cardback";
      this.image = "cardback"
  }
}

export class BovineDF extends Card {
  constructor(scene) {
    super(scene);
    this.name = "bovine_defense_force",
    this.strength = 8,
    this.type = "Unit",
    this.row = "Close",
    this.image = "bovine_defense_force"
  }
}

export class Albrich extends Card {
  constructor(scene) {
    super(scene);
    this.name = "albrich",
    this.strength = 2,
    this.type = 'Unit',
    this.row = "Range",
    this.image = "albrich"
  }
}

export class Cow extends Card {
  constructor(scene) {
    super(scene);
    this.name = "cow",
    this.strength = 0,
    this.type = "Unit",
    this.row = 'Range',
    this.image = 'cow'
  }
}

export class Dandelion extends Card {
  constructor(scene) {
    super(scene);
    this.name = "dandelion",
    this.strength = 2,
    this.type = 'Unit',
    this.row = "Close",
    this.image = 'dandelion'
  }
}

export class EmilRegis extends Card {
  constructor(scene) {
    super(scene);
    this.name = "emiel_regis",
    this.strength = 5,
    this.type = 'Unit',
    this.row = 'Close',
    this.image = 'emiel_regis'
  }
}

export class Gaunt extends Card {
  constructor(scene) {
    super(scene);
    this.name = "gaunt_odimm",
    this.strength = 2,
    this.type = "Unit",
    this.row = 'Siege',
    this.image = 'gaunt_odimm'
  }
}

export class GauntDarkness extends Card {
  constructor(scene) {
    super(scene);
    this.name = "gaunter_odimm_darkness",
    this.strength = 4,
    this.type = 'Unit',
    this.row = "Range",
    this.image = "gaunter_odimm_darkness"
  }
}

export class Botchling extends Card {
  constructor(scene) {
    super(scene);
    this.name = "botchling",
    this.strength = 4,
    this.type = "Unit",
    this.row = "Close",
    this.image = 'botchling'
  }
}

export class Vesemir extends Card {
  constructor(scene) {
    super(scene);
    this.name = "vesemir"
    this.strength = 6
    this.type = 'Unit'
    this.row = "Close"
    this.image = "vesemir"
  }
}

export class ZoltonChivay extends Card {
  constructor(scene) {
    super(scene);
    this.name = "zoltan"
    this.strength = 5
    this.type = 'Unit'
    this.row = "Close"
    this.image = "zoltan"
  }
}

export class BitingFrost extends Card {
  constructor(scene){
    super(scene);
    this.name = 'biting_frost'
    this.image = 'biting_frost'
  }
}

export class ClearWeather extends Card {
  constructor(scene){
    super(scene);
    this.name = 'clear_weather'
    this.image = 'clear_weather'
  }
}

export class ImpenetrableFog extends Card {
  constructor(scene){
    super(scene);
    this.name = 'impenetrable_fog'
    this.image = 'impenetrable_fog'
  }
}

export class SkelligeStorm extends Card {
  constructor(scene){
    super(scene);
    this.name = 'skellige_storm'
    this.image = 'skellige_storm'
  }
}

export class TorrentialRain extends Card {
  constructor(scene){
    super(scene);
    this.name = 'torrential_rain'
    this.image = 'torrential_rain'
  }
}

let cardback = new CardBack()
let bovine_defense_force = new BovineDF()
let albrich = new Albrich()
let cow = new Cow()
let dandelion = new Dandelion()
let emiel_regis = new EmilRegis()
let gaunt_odimm = new Gaunt()
let gaunter_odimm_darkness = new GauntDarkness()
let botchling = new Botchling()
let vesemir = new Vesemir()
let zoltan = new ZoltonChivay()
let biting_frost = new BitingFrost()
let clear_weather = new ClearWeather()
let impenetrable_fog = new ImpenetrableFog()
let skellige_storm = new SkelligeStorm()
let torrential_rain = new TorrentialRain()

const cardsArray = [
  cardback, bovine_defense_force, albrich, cow, dandelion,
  emiel_regis, gaunt_odimm, gaunter_odimm_darkness, botchling,
  vesemir, zoltan, biting_frost, clear_weather, impenetrable_fog,
  skellige_storm, torrential_rain
]

export default cardsArray
