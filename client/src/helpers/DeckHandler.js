import {BovineDF, Albrich, Cow, Dandelion,
EmilRegis, Gaunt, GauntDarkness, Botchling,
Vesemir, ZoltonChivay, CardBack} from '../cards/cardClass';


export default class DeckHandler {
    constructor(scene) {
        this.dealCard = (x, y, name, type) => {
            let cards = {
                cardBack: new CardBack(scene),
                albrich: new Albrich(scene),
                cow: new Cow(scene),
                dandelion: new Dandelion(scene),
                emiel_regis: new EmilRegis(scene),
                gaunt_odimm: new Gaunt(scene),
                gaunter_odimm_darkness: new GauntDarkness(scene),
                botchling: new Botchling(scene),
                bovine_defense_force: new BovineDF(scene),
                vesemir: new Vesemir(scene),
                zoltan: new ZoltonChivay(scene),
            }
            let newCard = cards[name];
            return(newCard.render(x, y, type));
        }
    }
}
