var theGame = function (game) {}


//array for flags
var flags = ['nederlands', 'germany', 'china', 'romania'];
        
//arrays position values for flags
var xPositions = [350, 1340, 1160, 160];
var yPositions = [660, 730, 60, 7];

//variables for sprite of players
/*var player1sprite;
var player2sprite;
var player3sprite;
var player4sprite;*/

//vars for deck sprites

var situationDeck;
var reactionDeck;

//players cards
var player1 = [];
var player2 = [];
var player3 = [];
var player4 = [];

//array for situations
var situations = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

//array for reactions
var reactions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 
29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59];

//discard piles
var discardSituations = [];
var discardReactions = [];

//keyboard and click input vars
var changeSituation;
var changeReaction;

var situationSprite;

theGame.prototype = {
    create: function () {
        //add background
        var background = this.game.add.sprite(0, 0, 'background');
        background.width = this.game.world.width;
        background.height = this.game.world.height;


        //add player sprites
        /*player1sprite = game.add.sprite(xPositions[0], 630, 'player1sprite');
        player2sprite = game.add.sprite(xPositions[1], 630, 'player2sprite');
        player3sprite = game.add.sprite(xPositions[2], 630, 'player3sprite');
        player4sprite = game.add.sprite(xPositions[3], 630, 'player4sprite');*/
            
        //shuffle flags
        for( var i = 0; i < 10; i++) {
            var randomIndex1 = Math.floor(Math.random()*flags.length);
            var randomIndex2 = Math.floor(Math.random()*flags.length);

            var temp = flags[randomIndex1];
            flags[randomIndex1] = flags[randomIndex2];
            flags[randomIndex2] = temp;
        }

        //add sprites to flags
        for( var i=0; i<4; i++) {
            var angle = [0, -90, -180, 90];
            var flag = this.game.add.sprite(xPositions[i], yPositions[i], flags[i]);
            flag.angle = angle[i];
        }

        //add sprites of decks
        situationDeck = this.game.add.sprite(550, this.game.world.centerY, 'situationDeck');
        situationDeck.anchor.set(0.5, 0.5);

        reactionDeck = this.game.add.sprite(950, this.game.world.centerY, 'reactionDeck');
        reactionDeck.anchor.set(0.5, 0.5);

        //call the next situation function
        this.nextSituation();

        //enabling key board and click
        situationDeck.inputEnabled = true;
        situationDeck.events.onInputDown.add(this.nextSituation, this); 

        reactionDeck.inputEnabled = true;
        reactionDeck.events.onInputDown.add(this.playerDraws, this); 

        /*changeReaction = game.input.keyboard.addKey(Phaser.Keyboard.A);
        changeReaction.onDown.add(function () {nextReaction(player1, 0)}, this);

        changeReaction = game.input.keyboard.addKey(Phaser.Keyboard.S);
        changeReaction.onDown.add(function () {nextReaction(player2, 1)}, this);

        changeReaction = game.input.keyboard.addKey(Phaser.Keyboard.D);
        changeReaction.onDown.add(function () {nextReaction(player3, 2)}, this);

        changeReaction = game.input.keyboard.addKey(Phaser.Keyboard.F);
        changeReaction.onDown.add(function () {nextReaction(player4, 3)}, this);*/

        //layout update P1
        for( var i=0; i<5; i++) {
            var xPosition = [500, 628, 756, 884, 1012];
            var card = this.game.add.sprite(xPosition[i], 630, 'reactionDeck');
            card.anchor.set(0.5, 0.5);
        }

        //layout update P2
        for( var i=0; i<5; i++) {
            var yPosition = [70, 198, 326, 454, 582];
            var card = this.game.add.sprite(1300, yPosition[i], 'reactionDeck');
            card.anchor.set(0.5, 0.5);
            card.angle = -90;
        }

        //layout update P3
        for( var i=0; i<5; i++) {
            var xPosition = [500, 628, 756, 884, 1012];
            var card = this.game.add.sprite(xPosition[i], 100, 'reactionDeck');
            card.anchor.set(0.5, 0.5);
            card.angle = 180;
        }

        //layout update P4
        for( var i=0; i<5; i++) {
            var yPosition = [150, 278, 406, 534, 662];
            var card = this.game.add.sprite(200, yPosition[i], 'reactionDeck');
            card.anchor.set(0.5, 0.5);
            card.angle = 90;
        }
    },

    nextSituation: function () {
        if ( situations.length != 0) {
            var randomNumber = Math.floor(Math.random()*situations.length);
                
            situationSprite = this.game.add.sprite(756, this.game.world.centerY, 'situation');
            situationSprite.frame = situations[randomNumber];
            situationSprite.anchor.set(0.5, 0.5);
    
            var discardCard = situations.splice(randomNumber, 1);
            discardSituations.push(discardCard);
        }

        else {
            this.gameEnds();
        }
    },

    playerDraws: function () {
        var reactionSprite;

        if (player1.length < 5) {
                
            var randomNumber = Math.floor(Math.random()*reactions.length);

            reactionSprite = this.game.add.sprite(1012, 630, 'reaction');
            reactionSprite.frame = reactions[randomNumber];

            var discardCard = reactions.splice(reactions[randomNumber], 1);
            player1.push(discardCard);
        }
    },

    gameEnds: function () {
        this.game.state.start('theEnd');
    }
}


/*function nextReaction (player, xPosition) {
    var yPositions = [450, 350, 250, 150, 50];

    for ( var i =0; i<5; i++) {
        var randomNumber = Math.floor(Math.random()*reactions.length);
            
        var reactionSprite = game.add.sprite(xPositions[xPosition], yPositions[i], 'reaction');
        reactionSprite.frame = reactions[randomNumber];
            
        var discardCard = reactions.splice(reactions[randomNumber], 1);
        player.push(discardCard);
    }
}*/

/*function update () {

}*/