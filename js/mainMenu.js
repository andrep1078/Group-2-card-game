var mainMenu = function(game) {}

mainMenu.prototype = {
    create: function () {
        //add background
        var background = this.game.add.sprite(0, 0, 'menuBackground');
        background.width = this.game.world.width;
        background.height = this.game.world.height;
    }
}