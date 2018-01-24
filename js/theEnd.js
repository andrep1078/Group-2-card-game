var theEnd = function (game) {}

theEnd.prototype = {
    create: function () {
        //add background
        var background = this.game.add.sprite(0, 0, 'background');
        background.width = this.game.world.width;
        background.height = this.game.world.height;
    }
}