var theEnd = function (game) {}

theEnd.prototype = {
    create: function () {
        //add background
        var background = this.game.add.sprite(0, 0, 'endBackground');
        background.width = this.game.world.width;
        background.height = this.game.world.height;

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
}