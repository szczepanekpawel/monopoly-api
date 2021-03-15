import Phaser from "phaser";
import player1 from "../assets/player1.png";
import player2 from "../assets/player2.png";
import player3 from "../assets/player3.png";
import player4 from "../assets/player4.png";

export default class LoadingScreen extends Phaser.Scene {

  playersImgMap = {
    player1: "player1",
    player2: "player2",
    player3: "player3",
    player4: "player4"
  };

  constructor() {
    super();
  }

  preload() {
    this.load.image("player1", player1);
    this.load.image("player2", player2);
    this.load.image("player3", player3);
    this.load.image("player4", player4);
  }

  init(data) {
    this.client = data.client;
    this.registerEvents();
  }

  registerEvents() {
    let playersVisible = {
      1: false,
      2: false,
      3: false,
      4: false
    };

    let lastImgPos = this.cameras.main.centerX - ((100 + 20) * 4) / 2;

    this.client.on("PlayerJoinedToTable", (playersAmount) => {
      console.log("PlayerJoinedToTable", playersAmount);
      for (let i = 1; i <= playersAmount; i++) {
        if (!playersVisible[i]) {
          lastImgPos += 100;
          this.add.image(lastImgPos, this.cameras.main.centerY + 100, this.playersImgMap[`player${i}`]);
          playersVisible[i] = true;
        }
      }
    });

    this.client.on("GameStarted", () => {
      this.add
        .text(this.cameras.main.centerX, this.cameras.main.centerY + 150, ["Starting game in...3..2..1"])
        .setFontSize(20)
        .setColor("#be8b33");

      setTimeout(() => {
        this.scene.start("game");
      }, 3000);
    });
  }

  create() {
    this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, ["LOADING"],
      { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle", align: 'center' }
    );

    this.client.emit("JoinTable", "table1");
  }
}
