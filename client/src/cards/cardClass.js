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
      this.name = "cardBack";
      this.image = "cardBack"
  }
}

export class BovineDF extends Card {
  constructor(scene) {
    super(scene);
    this.name = "bovine_defense_force",
    this.strength = 15,
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
    this.name = "vesemir",
    this.strength = 6,
    this.type = 'Unit',
    this.row = "Close",
    this.image = "vesemir"
  }
}

export class ZoltonChivay extends Card {
  constructor(scene) {
    super(scene);
    this.name = "zoltan",
    this.strength = 5,
    this.type = 'Unit'
    this.row = "Close"
    this.image = "zoltan"
  }
}

let cardBack = new CardBack()
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

const cardsArray = [
  cardBack, bovine_defense_force, albrich, cow, dandelion,
  emiel_regis, gaunt_odimm, gaunter_odimm_darkness, botchling,
  vesemir, zoltan
]

export default cardsArray
