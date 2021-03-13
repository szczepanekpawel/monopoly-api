import Phaser from 'phaser';
import logoImg from '../assets/logo.png';
import mapImg from '../assets/map.jpg';
import Place from '../helpers/place';

export default class Game extends Phaser.Scene {
  constructor() {
    super('game');
  }

  preload() {
    this.load.image('logo', logoImg);
    this.load.image('map', mapImg);
  }

  create() {
    let firstPlace = new Place(this);
    firstPlace.render(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      'map',
    );
  }
}
