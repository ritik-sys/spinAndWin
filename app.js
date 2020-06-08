var config = {
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,     
    }
};
var game = new Phaser.Game(config);
function preload ()
{
    this.load.image('background', 'assets/BACKGROUND.png');
    this.load.image('mywheel', 'assets/MYWHEEL.png');
    this.load.image('pin', 'assets/PIN.png');;
    this.load.image('stand', 'assets/STAND.png');
    this.load.image('startBtn','assets/button.png');
    this.load.image('yougot','assets/YOUGOT.png');
    this.load.image('try','assets/TRYYOURLUCK.png');
    this.load.image('restart', 'assets/restart.png');
    this.load.audio('soundd','assets/sound.mp3');
    this.load.audio('drum','assets/drum.mp3')
}
function create ()
{
    background=this.add.sprite(400,300,'background');
    this.pin=this.add.sprite(395,70,'pin').setScale(0.25);
    this.pin.depth=1;
    this.stand=this.add.sprite(410,370,'stand').setScale(0.25);
    this.wheel=this.add.sprite(400,300,'mywheel').setScale(0.25).setOrigin(0.5,0.5);
    this.startBtn = this.add.sprite(130,70, 'startBtn').setScale(.50).setInteractive({cursor:'pointer'});
    this.try=this.add.sprite(700,70,'try').setScale(.50);
    this.yougot=this.add.sprite(400,300,'yougot');
    this.yougot.visible=false;
    this.restart=this.add.sprite(400,500,'restart').setScale(0.25);
    this.restart.visible=false;
    this.soundd=this.sound.add('soundd');
    this.drum=this.sound.add('drum');
    this.startBtn.on('pointerdown', spinWheel,this);  
}
function spinWheel(){
    this.startBtn.visible=false;
    this.try.visible=false;
    this.sound.play('soundd');
    //console.log("spin wheel called");
    let rounds=Phaser.Math.Between(0,11);
    if(rounds===8){
        rounds=Phaser.Math.Between(0,11);
    }    
    let prizes=["50% OFF","Amazon Voucher","Buy 1 Get 1","CB Goodies","CB Tshirt","Free NETFLIX",`3000 CB CREDITS`,"CB Book","100% OFF","Hard Luck","CB Swagpacks","2 Extra Spins"];
    //console.log(prizes[rounds]);
    let tween = this.tweens.add({
        targets:this.wheel,
        ease: 'cubic.out',
        angle: 1363+(30*rounds),
        duration: 11000
    })    
    setTimeout(()=>{
        this.sound.play('drum');
        this.pin.visible=false;
        this.yougot.visible=true;
        this.add.text(250,400, `${prizes[rounds]}`,{
            fontSize: '40px',
            fontFamily: 'Arial',
            color: 'black',
            backgroundColor:'white'
        });
        this.restart.visible=true;
        this.input.on("pointerdown",restart,this);
    },13000);
    
}
function restart(){
   this.scene.restart();
    
}
