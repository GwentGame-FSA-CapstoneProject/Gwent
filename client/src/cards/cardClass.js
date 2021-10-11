export default class Card {
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
    this.name = "Bovine Defense Force",
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
    this.name = "Dandelion",
    this.strength = 2,
    this.type = 'Unit',
    this.row = "Close",
    this.image = 'dandelion'
  }
}

export class EmilRegis extends Card {
  constructor(scene) {
    super(scene);
    this.name = "Emil Regis",
    this.strength = 5,
    this.type = 'Unit',
    this.row = 'Close',
    this.image = 'emil_regis'
  }
}

export class Gaunt extends Card {
  constructor(scene) {
    super(scene);
    this.name = "Gaunt O'Dimm",
    this.strength = 2,
    this.type = "Unit",
    this.row = 'Siege',
    this.image = 'gaunt_odimm'
  }
}

export class GauntDarkness extends Card {
  constructor(scene) {
    super(scene);
    this.name = "Gaunt O'Dimm: Darkness",
    this.strength = 4,
    this.type = 'Unit',
    this.row = "Range",
    this.image = "gaunter_odimm_darkness"
  }
}

export class Botchling extends Card {
  constructor(scene) {
    super(scene);
    this.name = "Botchling",
    this.strength = 4,
    this.type = "Unit",
    this.row = "Close",
    this.image = 'botchling'
  }
}

export class Vesemir extends Card {
  constructor(scene) {
    super(scene);
    this.name = "Vesemir",
    this.strength = 6,
    this.type = 'Unit',
    this.row = "Close",
    this.image = "vesemir"
  }
}

export class ZoltonChivay extends Card {
  constructor(scene) {
    super(scene);
    this.name = "ZoltonChivay",
    this.strength = 5,
    this.type = 'Unit'
    this.row = "Close"
    this.image = "zoltan"
  }
}
