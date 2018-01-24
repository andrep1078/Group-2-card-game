var preload = function (game) {}

preload.prototype = {
    preload: function () {
        //loading flag sprites
        this.game.load.image('nederlands', 'sprites/nederlands.png');
        this.game.load.image('germany', 'sprites/germany.png');
        this.game.load.image('china', 'sprites/china.png');
        this.game.load.image('romania', 'sprites/romania.png');
            
        //loading graphics for players
        /*game.load.image('player1sprite', 'sprites/player1.png');
        game.load.image('player2sprite', 'sprites/player2.png');
        game.load.image('player3sprite', 'sprites/player3.png');
        game.load.image('player4sprite', 'sprites/player4.png');*/

        //loading sprites for situation deck
        this.game.load.spritesheet('situation','sprites/situations.png', 128, 200, 17);

        //loading sprites for decks
        this.game.load.image('reactionDeck', 'sprites/reactionBack.png');
        this.game.load.image('situationDeck', 'sprites/situationBack.png');

        //load background
        this.game.load.image('background', 'sprites/background.png');

        //load menu sprites
        this.game.load.image('menuBackground', 'sprites/menuBackground.png');
        this.game.load.image('startButton', 'sprites/startButton.png');
        this.game.load.image('quitButton', 'sprites/quitButton.png');

        //load end sprites
        this.game.load.image('endBackground', 'sprites/endBackground.png');
        this.game.load.image('restartButton', 'sprites/restartButton.png');
    },

    create: function () {
        this.game.state.start('mainMenu');
    }
}