var theGame = function (game) {}

var reactionsSpriteSheet;

var counter = 0;

var p1Score = 0;
var p2Score = 0;
var p3Score = 0;
var p4Score = 0;

//array for flags
var flags = ['nederlands', 'germany', 'china', 'romania'];
        
//arrays position values for flags
var xPositions = [350, 1340, 1160, 160];
var yPositions = [660, 730, 60, 7];

//vars for deck sprites

var situationDeck;
var reactionDeck;

var p1Group;
var p2Group;
var p3Group;
var p4Group;

//array for situations
var situations = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

//array for reactions
var reactions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 
29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62,
63, 64, 65, 66, 67];

//discard piles
var discardSituations = [];
var discardReactions = [];

//keyboard and click input vars
var changeSituation;
var changeReaction;

var situationSprite;

var p1PlayedCard;
var p2PlayedCard;
var p3PlayedCard;
var p4PlayedCard;

var p1CardX;
var p1CardY;
var p2CardX;
var p2CardY;
var p3CardX;
var p3CardY;
var p4CardX;
var p4CardY;

var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

theGame.prototype = {

    preload: function () {
        //loading sprites for reaction deck
        reactionsSpriteSheet = this.game.load.spritesheet('reaction', 'sprites/reactions.png', 128, 200, 68);
    },

    create: function () {
        //add background
        var background = this.game.add.sprite(0, 0, 'background');
        background.width = this.game.world.width;
        background.height = this.game.world.height;
            
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
            var pX = [380, 1290, 1130, 210];
            var pY = [610, 700, 110, 37];

            var angle = [0, -90, -180, 90];
            var flag = this.game.add.sprite(xPositions[i], yPositions[i], flags[i]);
            flag.angle = angle[i];

            var text = this.game.add.text(pX[i], pY[i], p1Score, style);
            text.angle = angle[i];
        }

        //add sprites of decks
        situationDeck = this.game.add.sprite(550, this.game.world.centerY, 'situationDeck');
        situationDeck.anchor.set(0.5, 0.5);

        reactionDeck = this.game.add.sprite(950, this.game.world.centerY, 'reactionDeck');
        reactionDeck.anchor.set(0.5, 0.5);

        //quit button
        var quitButton = this.game.add.sprite(this.game.world.width, this.game.world.height, 'quitButton');
        quitButton.anchor.set(1, 1);
        quitButton.height = 50;
        quitButton.width = 125;

        quitButton.inputEnabled = true;
        quitButton.events.onInputDown.add(this.quitGame, this);

        //call the next situation function
        this.nextSituation();

        this.player1Turn ();
        this.player2Turn ();
        this.player3Turn ();
        this.player4Turn ();
    },

    nextSituationEnable: function () {
        situationDeck.inputEnabled = true;
        situationDeck.events.onInputDown.add(this.situation, this);
    },

    situation: function () {
        this.nextSituation();

        p1CardX = p1PlayedCard.x;
        p1CardY = p1PlayedCard.y;
        p2CardX = p2PlayedCard.x;
        p2CardY = p2PlayedCard.y;
        p3CardX = p3PlayedCard.x;
        p3CardY = p3PlayedCard.y;
        p4CardX = p4PlayedCard.x;
        p4CardY = p4PlayedCard.y;

        p1PlayedCard.destroy();
        p2PlayedCard.destroy();
        p3PlayedCard.destroy();
        p4PlayedCard.destroy();

        this.player1Turn ();
        this.player2Turn ();
        this.player3Turn ();
        this.player4Turn ();
    },

    nextSituation: function () {
        var text;

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

        for( var i=0; i<4; i++) {
            var pX = [380, 1290, 1130, 210];
            var pY = [610, 700, 110, 37];
            var angle = [0, -90, -180, 90];

            text = this.game.add.text(pX[i], pY[i], p1Score, style);
            text.angle = angle[i];
        }

        console.log(p1Score);

        situationDeck.events.onInputDown.removeAll();
    },

    gameEnds: function () {
        this.game.state.start('theEnd');
    },

    player1Turn: function () {
        p1Group = p1Group ? p1Group : this.game.add.group();

        if (p1Group.children.length == 0) {
            for( var i=0; i<5; i++) {
                var xPosition = [500, 628, 756, 884, 1012];
                /*var card = this.game.add.sprite(xPosition[i], 630, 'reactionDeck');
                card.anchor.set(0.5, 0.5);*/
    
                var randomNumber = Math.floor(Math.random()*reactions.length);
                reactionSprite = this.game.add.sprite(xPosition[i], 630, 'reaction');
                reactionSprite.frame = reactions[randomNumber];
                reactionSprite.anchor.set(0.5, 0.5);

                p1Group.add(reactionSprite);

                reactions.splice(randomNumber, 1);
            }
        }

        else if (reactions.length != 0) {
            var randomNumber = Math.floor(Math.random()*reactions.length);
            reactionSprite = this.game.add.sprite(p1CardX, p1CardY + 60, 'reaction');
            reactionSprite.frame = reactions[randomNumber];
            reactionSprite.anchor.set(0.5, 0.5);

            p1Group.add(reactionSprite);

            reactions.splice(randomNumber, 1);
        }

        this.changeTurns(p1Group);
    },

    player2Turn: function () {
        p2Group = p2Group ? p2Group : this.game.add.group();

        if (p2Group.children.length == 0) {
            for( var i=0; i<5; i++) {
                var yPosition = [70, 198, 326, 454, 582];
                /*var card = this.game.add.sprite(1300, yPosition[i], 'reactionDeck');
                card.anchor.set(0.5, 0.5);
                card.angle = -90;*/
    
                var randomNumber = Math.floor(Math.random()*reactions.length);
                reactionSprite = this.game.add.sprite(1300, yPosition[i], 'reaction');
                reactionSprite.frame = reactions[randomNumber];
                reactionSprite.anchor.set(0.5, 0.5);
                reactionSprite.angle = -90;

                p2Group.add(reactionSprite);

                reactions.splice(randomNumber, 1);
            }
        }

        else if (reactions.length != 0) {
            var randomNumber = Math.floor(Math.random()*reactions.length);
            reactionSprite = this.game.add.sprite(p2CardX + 60, p2CardY, 'reaction');
            reactionSprite.frame = reactions[randomNumber];
            reactionSprite.anchor.set(0.5, 0.5);
            reactionSprite.angle = -90;

            p2Group.add(reactionSprite);

            reactions.splice(randomNumber, 1);
        }
    },

    player3Turn: function () {
        p3Group = p3Group ? p3Group : this.game.add.group();

        if (p3Group.children.length == 0) {
            for( var i=0; i<5; i++) {
                var xPosition = [500, 628, 756, 884, 1012];
                /*var card = this.game.add.sprite(xPosition[i], 100, 'reactionDeck');
                card.anchor.set(0.5, 0.5);
                card.angle = 180;*/
    
                var randomNumber = Math.floor(Math.random()*reactions.length);
                reactionSprite = this.game.add.sprite(xPosition[i], 100, 'reaction');
                reactionSprite.frame = reactions[randomNumber];
                reactionSprite.anchor.set(0.5, 0.5);
                reactionSprite.angle = 180;

                p3Group.add(reactionSprite);

                reactions.splice(randomNumber, 1);
            }
        }

        else if (reactions.length != 0) {
            var randomNumber = Math.floor(Math.random()*reactions.length);
            reactionSprite = this.game.add.sprite(p3CardX, p3CardY - 60, 'reaction');
            reactionSprite.frame = reactions[randomNumber];
            reactionSprite.anchor.set(0.5, 0.5);
            reactionSprite.angle = 180;

            p3Group.add(reactionSprite);

            reactions.splice(randomNumber, 1);
        }
    },

    player4Turn: function () {
        p4Group = p4Group ? p4Group : this.game.add.group();

        if (p4Group.children.length == 0) {
            for( var i=0; i<5; i++) {
                var yPosition = [150, 278, 406, 534, 662];
                /*var card = this.game.add.sprite(200, yPosition[i], 'reactionDeck');
                card.anchor.set(0.5, 0.5);
                card.angle = 90;*/
    
                var randomNumber = Math.floor(Math.random()*reactions.length);
                reactionSprite = this.game.add.sprite(200, yPosition[i], 'reaction');

                reactionSprite.frame = reactions[randomNumber];
                reactionSprite.anchor.set(0.5, 0.5);
                reactionSprite.angle = 90;

                p4Group.add(reactionSprite);

                reactions.splice(randomNumber, 1);
            }
        }

        else if (reactions.length != 0) {
            var randomNumber = Math.floor(Math.random()*reactions.length);
            reactionSprite = this.game.add.sprite(p4CardX - 60, p4CardY, 'reaction');
            reactionSprite.frame = reactions[randomNumber];
            reactionSprite.anchor.set(0.5, 0.5);
            reactionSprite.angle = 90;

            p4Group.add(reactionSprite);

            reactions.splice(randomNumber, 1);
        }
    },

    changeTurns: function (playerGroup) {
        p1Group = p1Group ? p1Group : this.game.add.group();
        p2Group = p2Group ? p2Group : this.game.add.group();
        p3Group = p3Group ? p3Group : this.game.add.group();
        p4Group = p4Group ? p4Group : this.game.add.group();

        for (var i=0; i<p1Group.children.length; i++) {
            var currentCard = p1Group.children[i];
            currentCard.events.onInputDown.removeAll();
        }

        for (var i=0; i<p2Group.children.length; i++) {
            var currentCard = p2Group.children[i];
            currentCard.events.onInputDown.removeAll();
        }

        for (var i=0; i<p3Group.children.length; i++) {
            var currentCard = p3Group.children[i];
            currentCard.events.onInputDown.removeAll();
        }

        for (var i=0; i<p4Group.children.length; i++) {
            var currentCard = p4Group.children[i];
            currentCard.events.onInputDown.removeAll();
        }

        for (var i=0; i<playerGroup.children.length; i++) {
            var currentCard = playerGroup.children[i];
            currentCard.inputEnabled = true;
            currentCard.events.onInputDown.add(this.playerPlays, this);
        }
    },

    playerPlays: function (sprite, pointer) {

        switch (counter) {
            case 0:
                sprite.y -= 60; 

                this.changeTurns(p2Group);
                p1PlayedCard = sprite;

                this.checkAnswer();
                
                break;
            case 1:
                sprite.x -= 60;

                this.changeTurns(p3Group);
                p2PlayedCard = sprite;
                
                break;
            case 2:
                sprite.y += 60;

                this.changeTurns(p4Group);
                p3PlayedCard = sprite;

                break;
            case 3:
                sprite.x += 60;

                this.nextSituationEnable();
                p4PlayedCard = sprite;
                
                break;
        }

        if (counter == 3) {
            counter = 0;
        }
        else {
            counter++;
        }
    },

    quitGame: function () {
        this.game.state.start ("theEnd");
    },

    checkAnswer: function () {

        var correctAnswers = [
            {
                situation: 0,
                correctCards: [
                    0, 
                    1, 
                    2, 
                    3
                ]
            },
            {
                situation: 1,
                correctCards: [
                    4, 
                    5, 
                    6, 
                    7
                ]
            },
        ]

        debugger;

        for (var i=0; i < 4; i++) {
            if (p1PlayedCard.frame == correctAnswers[0].correctCards[i] && situationSprite.frame == correctAnswers[0].situation) {
                p1Score++;
            }
        }

        for (var i=0; i < 4; i++) {
            if (p1PlayedCard.frame == correctAnswers[1].correctCards[i] && situationSprite.frame == correctAnswers[1].situation) {
                p1Score++;
            }
        }
    }
}
