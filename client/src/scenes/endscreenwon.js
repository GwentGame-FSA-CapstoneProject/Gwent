import Phaser from "phaser";

export default class GameWon extends Phaser.Scene
{
  constructor(){
    super('GameWon')
  }
  create()
  {
   this.add.text(640,600,'You Won!',{
     fontSize: 90,
     color: 'DarkGoldenRod'
   }).setOrigin(0.5)
  }
}
