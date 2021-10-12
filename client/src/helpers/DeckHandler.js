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
                emielRegis: new EmilRegis(scene),
                gaunt: new Gaunt(scene),
                gauntDarkness: new GauntDarkness(scene),
                botchling: new Botchling(scene),
                bovineDf: new BovineDF(scene),
                vesemir: new Vesemir(scene),
                zoltonChivay: new ZoltonChivay(scene),
            }
            let newCard = cards[name];
            return(newCard.render(x, y, type));
        }
    }
}