import 'phaser';

class PlayGame extends Phaser.Scene {

    player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

    preload() {
        this.load.image('player', 'assets/monster.png', )
    }

    create() {
        this.player = this.physics.add.sprite(100, 100, 'player');
    }

    update() {
    }
}

const GameConfig: Phaser.Types.Core.GameConfig = {
    width: 350,
    height: 200,
    backgroundColor: '#3498db',
    scene: PlayGame, // The name of scene we created above
    physics: { default: 'arcade' }, // The physics engine to use
    parent: 'thegame', // Create the game inside div in the index.html <div id='thegame'>,
    zoom: 2
}

new Phaser.Game(GameConfig);