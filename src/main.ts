import 'phaser';

class PlayGame extends Phaser.Scene {

    private player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private diamond: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
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
        this.diamond = this.physics.add.sprite(300, 300, 'diamond');
        
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

        // If the player is overllaping with the diamond
        if(this.physics.overlap(this.player, this.diamond)) {
            this.hit();
        } 
    }

    hit() {
        // Change the position x and y of the diamond randomly
        this.diamond.x = Phaser.Math.Between(100, 600);
        this.diamond.y = Phaser.Math.Between(100, 300);

        // Increment the score by 10
        this.score += 10;

        // Display the updated score on the screen
        this.scoreText.setText('Score: ' + this.score);

        this.tweens.add({
            targets: this.player,
            duration: 200,
            scaleX: 1.2,
            scaleY: 1.2,
            yoyo: true
        })
    }
}

const GameConfig: Phaser.Types.Core.GameConfig = {
    width: 700,
    height: 400,
    backgroundColor: '#3498db',
    scene: PlayGame, // The name of scene we created above
    physics: { default: 'arcade' /*, arcade: { debug: true } */ }, // The physics engine to use
    parent: 'thegame', // Create the game inside div in the index.html <div id='thegame'>,
}

new Phaser.Game(GameConfig);