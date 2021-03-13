export default class Place {
  constructor(scene) {
    this.render = (x, y, sprite) => {
      let card = scene.add
        .image(x, y, sprite)
        .setInteractive();

      scene.input.setDraggable(card);

      return card;
    };
  }
}
