import Phaser from "phaser";


export default class GameLost extends Phaser.Scene
{
  constructor(){
    super('GameLost')
  }

  preload()
  {
    this.load.image('olgierd','/assets/olgierd.jpg')
  }
  create()
  {
    this.add.image(640,1000,'olgierd')
   this.add.text(640,200,'You Lost!',{
     fontSize: 90,
     color: 'DarkRed'
   }).setOrigin(0.5)
  //  this.add.text(1100,200,"Press space to play again!",{
  //    fontSize: 25
  //  }).setOrigin(0.5)
  //  this.input.keyboard.on('keydown-SPACE',()=>{
  //    this.scene.start('Game')
  //  })
 }
  }

