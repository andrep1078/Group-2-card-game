var theEnd = function (game) {}

theEnd.prototype = {
    create: function () {
        //add background
        var background = this.game.add.sprite(0, 0, 'endBackground');
        background.width = this.game.world.width;
        background.height = this.game.world.height;

        //add restart buttom
        var restart = this.game.add.sprite(this.game.world.width - 20, this.game.world.height, 'restartButton');
        restart.anchor.set(1, 1);
        restart.width = 360;
        restart.height = 144;

        restart.inputEnabled = true;
        restart.events.onInputDown.add(this.restartGame, this);

        //add flags
        for( var i=0; i<4; i++) {
            var yPos = [50, 200, 350, 500]

            var flag = this.game.add.sprite(350, yPos[i], flags[i]);
            flag.width = 150;
            flag.height = 90;
        }

        var style1 = { font: "bold 70px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

        //scores
        this.game.add.text(600, 50, p1Score, style1);
        this.game.add.text(600, 200, p2Score, style1);
        this.game.add.text(600, 350, p3Score, style1);
        this.game.add.text(600, 500, p4Score, style1);
    },

    restartGame: function() {
        this.game.state.start ("mainMenu");
    }
}