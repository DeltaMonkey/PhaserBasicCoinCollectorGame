import 'phaser';

class PlayGame extends Phaser.Scene {

    private player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private diamond: Phaser.Types.Physics.Arcade.SpriteWithStaticBody;
    private scoreText: Phaser.GameObjects.Text;
    private arrow:  Phaser.Types.Input.Keyboard.CursorKeys;
    private score: number;

    preload() {
        this.load.image('player', 'assets/monster.png');
        this.load.image('diamond', 'assets/diamond.png');
        this.score = 0;
    }

    create() {
        this.player = this.physics.add.sprite(100, 100, 'player');
        this.diamond = this.physics.add.staticSprite(300, 300, 'diamond');
        
        // Display the score in the top left corner
        const scoreStyle: Phaser.Types.GameObjects.Text.TextStyle = { font: '20px Arial', color: '#fff',  };
        this.scoreText = this.add.text(20, 20, 'Score:' + this.score, scoreStyle);

        this.arrow = this.input.keyboard!.createCursorKeys();
    }

    update() {
        // Handle horizontal movements
        if(this.arrow.right.isDown) {
            this.player.x += 3;
        }
        else if(this.arrow.left.isDown) {
            this.player.x -= 3;
        }

        // Handle vertical movements
        if(this.arrow.down.isDown) {
            this.player.y += 3;
        }
        else if(this.arrow.up.isDown) {
            this.player.y -= 3;
        }
    }
}

const GameConfig: Phaser.Types.Core.GameConfig = {
    width: 700,
    height: 400,
    backgroundColor: '#3498db',
    scene: PlayGame, // The name of scene we created above
    physics: { default: 'arcade' }, // The physics engine to use
    parent: 'thegame', // Create the game inside div in the index.html <div id='thegame'>,
}

new Phaser.Game(GameConfig);