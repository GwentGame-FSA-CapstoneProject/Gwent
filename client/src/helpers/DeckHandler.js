import {BovineDF, Albrich, Cow, Dandelion,
EmilRegis, Gaunt, GauntDarkness, Botchling,
Vesemir, ZoltonChivay, CardBack, BitingFrost,
ClearWeather, ImpenetrableFog, SkelligeStorm,
TorrentialRain, Ballista, KeiraMetz, PhilippaEilhart,
SiegeTower, Trebuchet, VernonRoche} from '../cards/cardClass';


export default class DeckHandler {
    constructor(scene) {
        this.dealCard = (x, y, name, type) => {
            let cards = {
                cardback: new CardBack(scene),
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
                biting_frost: new BitingFrost(scene),
                clear_weather: new ClearWeather(scene),
                impenetrable_fog: new ImpenetrableFog(scene),
                skellige_storm: new SkelligeStorm(scene),
                torrential_rain: new TorrentialRain(scene),
                ballista: new Ballista(scene),
                keira_metz: new KeiraMetz(scene),
                philippa_eilhart: new PhilippaEilhart(scene),
                siege_tower: new SiegeTower(scene),
                trebuchet: new Trebuchet(scene),
                vernon_roche: new VernonRoche(scene)
            }
            let newCard = cards[name];
            return(newCard.render(x, y, type));
        }
    }
}
