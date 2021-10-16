export default class WeatherHandler {
    constructor(scene){
        this.frost = true;
        this.fog = false;
        this.rain = false;
        this.storm = false;

        this.clearWeather = () => {
            this.frost = false;
            this.fog = false;
            this.rain = false;
            this.storm = false;
            this.UIHandler.clearWeather();
        }
    }
}