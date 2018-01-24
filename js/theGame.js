var theGame = function (game) {}

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
    {
        situation: 2,
        correctCards: [
            8, 
            9, 
            10, 
            11
        ]
    },
    {
        situation: 3,
        correctCards: [
            12, 
            13, 
            14, 
            15
        ]
    },
    {
        situation: 4,
        correctCards: [
            16, 
            17, 
            18, 
            19
        ]
    },
    {
        situation: 5,
        correctCards: [
            20, 
            21, 
            22, 
            23
        ]
    },
    {
        situation: 6,
        correctCards: [
            24, 
            25, 
            26, 
            27
        ]
    },
    {
        situation: 7,
        correctCards: [
            28, 
            29, 
            30, 
            31
        ]
    },
    {
        situation: 8,
        correctCards: [
            32, 
            33, 
            34, 
            35
        ]
    },
    {
        situation: 9,
        correctCards: [
            36, 
            37, 
            38, 
            39
        ]
    },
    {
        situation: 10,
        correctCards: [
            40, 
            41, 
            42, 
            43
        ]
    },
    {
        situation: 11,
        correctCards: [
            44, 
            45, 
            46, 
            47
        ]
    },
    {
        situation: 12,
        correctCards: [
            48, 
            49, 
            50, 
            51
        ]
    },
    {
        situation: 13,
        correctCards: [
            52, 
            53, 
            54, 
            55
        ]
    },
    {
        situation: 14,
        correctCards: [
            56, 
            57, 
            58, 
            59
        ]
    },
    {
        situation: 15,
        correctCards: [
            60, 
            61, 
            62, 
            63
        ]
    },
    {
        situation: 16,
        correctCards: [
            64, 
            65, 
            66, 
            67
        ]
    },
]

var reactionsSpriteSheet;

var counter = 0;

var p1Score = 0;
var p2Score = 0;
var p3Score = 0;
var p4Score = 0;

//array for flags
var flags = ['nederlands', 'germany', 'china', 'romania'];
var countriesArray = ['china', 'germany', 'nederlands', 'romania'];
        
//arrays position values for flags
var xPositions = [350, 1340, 1160, 160];
var yPositions = [660, 730, 60, 7];

//vars for deck sprites

var situationDeck;
var reactionDeck;

var text1;
var text2;
var text3;
var text4;

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
        }

        var pX = [380, 1290, 1130, 210];
        var pY = [610, 700, 110, 37];
        var angle = [0, -90, -180, 90];

        text1 = this.game.add.text(pX[0], pY[0], p1Score, style);
        text1.angle = angle[0];

        text2 = this.game.add.text(pX[1], pY[1], p2Score, style);
        text2.angle = angle[1];

        text3 = this.game.add.text(pX[2], pY[2], p3Score, style);
        text3.angle = angle[2];

        text4 = this.game.add.text(pX[3], pY[3], p4Score, style);
        text4.angle = angle[3];

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

    printScore: function () {
        
        text1.destroy();
        text2.destroy();
        text3.destroy();
        text4.destroy();

        var pX = [380, 1290, 1130, 210];
        var pY = [610, 700, 110, 37];
        var angle = [0, -90, -180, 90];

        text1 = this.game.add.text(pX[0], pY[0], p1Score, style);
        text1.angle = angle[0];

        text2 = this.game.add.text(pX[1], pY[1], p2Score, style);
        text2.angle = angle[1];

        text3 = this.game.add.text(pX[2], pY[2], p3Score, style);
        text3.angle = angle[2];

        text4 = this.game.add.text(pX[3], pY[3], p4Score, style);
        text4.angle = angle[3];
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

        this.printScore();

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

                this.checkAnswer1();
                
                break;
            case 1:
                sprite.x -= 60;

                this.changeTurns(p3Group);
                p2PlayedCard = sprite;

                this.checkAnswer2();
                
                break;
            case 2:
                sprite.y += 60;

                this.changeTurns(p4Group);
                p3PlayedCard = sprite;

                this.checkAnswer3();

                break;
            case 3:
                sprite.x += 60;

                this.nextSituationEnable();
                p4PlayedCard = sprite;

                this.checkAnswer4()
                
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

    checkAnswer1: function () {
        var index;

        for (var i=0; i < 17; i++) {
            if (flags[0] === countriesArray[i]) {
                index = i;
            }
        }

        for (var a=0; a < 17; a++) {
            if (p1PlayedCard.frame == correctAnswers[a].correctCards[index] && situationSprite.frame == correctAnswers[a].situation) {
                p1Score += 2;
            }

            else {
                for (var i=0; i < 4; i++) {
                    if (p1PlayedCard.frame == correctAnswers[a].correctCards[i] && situationSprite.frame == correctAnswers[a].situation) {
                        p1Score++;
                    }
                }
            }
        }
    },

    checkAnswer2: function () {
        
        var index;

        for (var i = 0; i < 17; i++) {
            if (flags[1] === countriesArray[i]) {
                index = i;
            }
        }

        for (var a = 0; a < 17; a++) {
            if (p2PlayedCard.frame == correctAnswers[a].correctCards[index] && situationSprite.frame == correctAnswers[a].situation) {
                p2Score += 2;
            }

            else {
                for (var i = 0; i < 4; i++) {
                    if (p2PlayedCard.frame == correctAnswers[a].correctCards[i] && situationSprite.frame == correctAnswers[a].situation) {
                        p2Score++;
                    }
                }
            }
        }
    },

    checkAnswer3: function () {
        
        var index;
        
        for (var i = 0; i < 17; i++) {
            if (flags[2] === countriesArray[i]) {
                index = i;
            }
        }

        for (var a = 0; a < 17; a++) {
            if (p3PlayedCard.frame == correctAnswers[a].correctCards[index] && situationSprite.frame == correctAnswers[a].situation) {
                p3Score += 2;
            }

            else {
                for (var i = 0; i < 4; i++) {
                    if (p3PlayedCard.frame == correctAnswers[a].correctCards[i] && situationSprite.frame == correctAnswers[a].situation) {
                        p3Score++;
                    }
                }
            }
        }
    },

    checkAnswer4: function () {
        var index;
        
        for (var i = 0; i < 17; i++) {
            if (flags[3] === countriesArray[i]) {
                index = i;
            }
        }

        for (var a = 0; a < 17; a++) {
            if (p4PlayedCard.frame == correctAnswers[a].correctCards[index] && situationSprite.frame == correctAnswers[a].situation) {
                p4Score += 2;
            }

            else {
                for (var i = 0; i < 4; i++) {
                    if (p4PlayedCard.frame == correctAnswers[a].correctCards[i] && situationSprite.frame == correctAnswers[a].situation) {
                        p4Score++;
                    }
                }
            }
        }
        console.log(p4Score);
    }
}
