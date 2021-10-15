import Phaser from "phaser";


export default class GameLost extends Phaser.Scene
{
  constructor(){
    super('GameLost')
  }
  create()
  {
   this.add.text(640,600,'You Lost!',{
     fontSize: 90,
     color: 'DarkRed'
   }).setOrigin(0.5)
  }
}
