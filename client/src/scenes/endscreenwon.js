import Phaser from "phaser";

export default class GameWon extends Phaser.Scene
{
  constructor(){
    super('GameWon')
  }
  preload()
  {
    this.load.image('queen','/assets/queen.jpg')
  }
  create()
  {
    this.add.image(640,1000,'queen')
   this.add.text(640,200,'You Won!',{
     fontSize: 90,
     color: 'DarkGoldenRod'
   }).setOrigin(0.5)
  //     this.add.text(1100,200,"Press space to play again!",{
  //    fontSize: 25
  //  }).setOrigin(0.5)
  //  this.input.keyboard.on('keydown-SPACE',()=>{
  //    this.scene.start('Game')
  //  })
 }
  }

