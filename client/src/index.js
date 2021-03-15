import Phaser from 'phaser';
import LoadingScreen from './scenes/loading-screen';
import Game from './scenes/game';
import getClient from './client';

const game = new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: window.innerWidth,
  height: window.innerHeight,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
});

game.scene.add('loadingScreen', LoadingScreen);
game.scene.add('game', Game);
game.scene.start('loadingScreen', { client: getClient() });
