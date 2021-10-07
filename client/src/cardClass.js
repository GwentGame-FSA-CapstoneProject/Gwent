class Card {
  constructor(name, strength, type, row, imageUrl) {
    (this.name = name),
      (this.strength = strength),
      (this.type = type),
      (this.row = row),
      (this.imageUrl = imageUrl);
  }
}

const card1 = new Card(
  "Bovine Defense Force",
  15,
  "Unit",
  "Close",
  "../assets/bovine_defense_force.png"
);

const card2 = new Card("Albrich", 2, "Unit", "Range", "../assets/albrich.png");

const card3 = new Card("Cow", 0, "Unit", "Range", "../assets/cow.png");

const card4 = new Card(
  "Dandelion",
  2,
  "Unit",
  "Close",
  "../assets/dandelion.png"
);

const card5 = new Card(
  "Emiel Regis",
  5,
  "Unit",
  "Close",
  "../assets/emiel_regis.png"
);

const card6 = new Card(
  "Gaunt O'Dimm",
  2,
  "Unit",
  "Siege",
  "../assets/gaunt_odimm.png"
);

const card7 = new Card(
  "Gaunt O'Dimm: Darkness",
  4,
  "Range",
  "../assets/gaunter_odimm_darkness.png"
);

const card8 = new Card(
  "Botchling",
  4,
  "Unit",
  "Close",
  "../assets/botchling.png"
);

const card9 = new Card("Vesemir", 6, "Unit", "Close", "../assets/vesemir.png");

const card10 = new Card(
  "Zoltan Chivay",
  5,
  "Unit",
  "Close",
  "../assets/zoltan.png"
);
