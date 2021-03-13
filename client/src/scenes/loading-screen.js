import Phaser from 'phaser';
import player1 from '../assets/player1.png';
import player2 from '../assets/player2.png';
import player3 from '../assets/player3.png';
import player4 from '../assets/player4.png';

export default class LoadingScreen extends Phaser.Scene {

  playersImgMap = {
    player1: 'player1',
    player2: 'player2',
    player3: 'player3',
    player4: 'player4',
  }

  constructor() {
    super();
  }

  preload() {
    this.load.image('player1', player1);
    this.load.image('player2', player2);
    this.load.image('player3', player3);
    this.load.image('player4', player4);
  }

  init(data) {
    this.client = data.client;
    this.registerEvents();
  }

  registerEvents() {
    let playersCount = 1
    let imageHorizontalPosition = 100;

    this.client.on('YouJoinedToTable', () => {
      this.add.image(imageHorizontalPosition, 50, `player${playersCount}`);
      playersCount++;
      imageHorizontalPosition += 100;
    });

    this.client.on('OtherPlayerJoinedToTable', () => {
      this.add.image(imageHorizontalPosition, 50, this.playersImgMap[`player${playersCount}`]);
      playersCount++;
      imageHorizontalPosition += 100;
    });

    this.client.on('GameStarted', () => {
      this.add.image(imageHorizontalPosition, 50, this.playersImgMap[`player${playersCount}`]);
      this.add
        .text(this.cameras.main.centerX, this.cameras.main.centerY  + 100, ['Starting game in...3..2..1'])
        .setFontSize(20)
        .setColor('#be8b33');

      setTimeout(() => {
        this.scene.start('game');
      }, 3000)
    });
  }

  create() {
    this.add
      .text(this.cameras.main.centerX, this.cameras.main.centerY, ['LOADING'])
      .setFontSize(40)
      .setColor('#ffffff');

    this.client.emit('JoinTable', 'table1');
  }
}
