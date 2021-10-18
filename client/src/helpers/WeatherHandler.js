export default class WeatherHandler {
    constructor(scene){
        this.frost = false;
        this.fog = false;
        this.rain = false;
        this.storm = false;

        this.clearWeather = () => {
            this.frost = false;
            this.fog = false;
            this.rain = false;
            this.storm = false;
            scene.frost.setVisible(false);
            scene.fog.setVisible(false);
            scene.rain.setVisible(false);
            scene.storm.setVisible(false);
        }

        this.weatherPlayed = (cardName) => {
            switch(cardName){
                case 'biting_frost':
                    this.frost = true;
                    scene.frost.setVisible(true).depth = 100;
                    break;
                case 'impenetrable_fog':
                    this.fog = true;
                    scene.fog.setVisible(true).depth = 100;
                    break;
                case 'torrential_rain':
                    this.rain = true;
                    scene.rain.setVisible(true).depth = 100;
                    break;
                case 'skellige_storm':
                    this.storm = true;
                    scene.storm.setVisible(true).depth = 100;
                    break;
                case 'clear_weather':
                    this.clearWeather();
                    break;
            }
        }
    }
}