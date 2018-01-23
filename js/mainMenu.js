var mainMenu = function(game) {}

mainMenu.prototype = {
    create: function () {
        //add background
        var background = this.game.add.sprite(0, 0, 'menuBackground');
        background.width = this.game.world.width;
        background.height = this.game.world.height;

        //add start button
        var startButton = this.game.add.sprite(0, 0, 'startButton');

        startButton.inputEnabled = true;
        startButton.events.onInputDown.add(this.startGame, this);

        //add quit button
        var quitButton = this.game.add.sprite(this.game.world.width, this.game.world.height, 'quitButton');
        quitButton.anchor.set(1, 1);

        quitButton.inputEnabled = true;
        quitButton.events.onInputDown.add(this.quitGame, this);
    },

    startGame: function () {
        this.game.state.start ("theGame");
    },

    quitGame: function () {
        this.game.state.start ("theEnd");
    }
}