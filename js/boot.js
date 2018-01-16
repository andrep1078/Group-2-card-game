var boot = function (game) {}

boot.prototype = {

    create: function () {
        this.game.state.start ("preload");
    }
}