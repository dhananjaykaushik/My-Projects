// Classes
class Player {
    posX;
    posY;
    direction;
    isHero;
    playerClass;
    movesDone = 0;
    name;
    constructor(posX, posY, isHero = false, playerClass, name) {
        this.posX = posX;
        this.posY = posY;
        this.isHero = isHero;
        this.playerClass = playerClass;
        this.name = name;
        this.direction = 'LEFT';
    }
    makeMove() {
        ++this.movesDone;
        let posX = this.posX;
        let posY = this.posY;
        if (this.direction === 'LEFT') {
            posX = this.posX;
            posY = this.posY - 1;
        } else if (this.direction === 'RIGHT') {
            posX = this.posX;
            posY = this.posY + 1;
        } else if (this.direction === 'UP') {
            posX = this.posX - 1;
            posY = this.posY;
        } else if (this.direction === 'DOWN') {
            posX = this.posX + 1;
            posY = this.posY;
        }

        if (this.movesDone % 14 === 0 && !this.isHero) {
            const possibleDirections = this.getPossibleDirection();
            this.direction = possibleDirections[getRandomInt(0, possibleDirections.length - 1)];
        }

        if (this.checkIfMovePossible(posX, posY)) {
            this.movePlayer(posX, posY);
            this.posX = posX;
            this.posY = posY;
            if (this.isHero) {
                this.changeFace();
            }
        } else {
            if (!this.isHero) {
                const possibleDirections = this.getPossibleDirection();
                this.direction = possibleDirections[getRandomInt(0, possibleDirections.length - 1)];
                this.makeMove();
            }
        }
    }
    changeFace() {
        const hero = $(`#${boxId(this.posX, this.posY)}`)[0];
        $(hero).removeClass('up');
        $(hero).removeClass('down');
        $(hero).removeClass('left');
        $(hero).removeClass('right');

        if (this.direction === 'LEFT') {
            $(hero).addClass('left');
        } else if (this.direction === 'RIGHT') {
            $(hero).addClass('right');
        } else if (this.direction === 'UP') {
            $(hero).addClass('up');
        } else if (this.direction === 'DOWN') {
            $(hero).addClass('down');
        }
    }
    changeDirection(direction) {
        this.direction = direction;
    }
    checkIfMovePossible(posX, posY) {
        if (posX === 0 || posY === 0 || posX === (rows - 1) || posY === (columns - 1)) {
            return false;
        }
        if (!boardJson[boxId(posX, posY)]) {
            return true;
        }
        const element = nameClassMap[boardJson[boxId(posX, posY)].name];
        if (element === blockClass) {
            return false;
        }
        return true;
    }
    movePlayer(posX, posY) {
        const newBox = $(`#${boxId(posX, posY)}`);
        const lastBox = $(`#${boxId(this.posX, this.posY)}`);

        if (this.isHero) {
            if ($(newBox).hasClass(foodClass)) {
                totalFood--;
                $(newBox).removeClass(foodClass);
            } else if ($(newBox).hasClass(specialFoodClass)) {
                totalSpecialFood--;
                $(newBox).removeClass(specialFoodClass);
            } else if ($(newBox).hasClass(enemyClass)) {
                endGame(true);
            } else if ($(lastBox).hasClass(enemyClass)) {
                endGame(true);
            }
        } else {
            if ($(newBox).hasClass(heroClass)) {
                endGame(true);
            } else if ($(lastBox).hasClass(heroClass)) {
                endGame(true);
            }
        }

        $(newBox).addClass(this.playerClass);
        $(lastBox).removeClass(this.playerClass);
    }
    getPossibleDirection() {
        const possibleDirections = [];
        if (this.checkIfMovePossible(this.posX, this.posY - 1)) {
            possibleDirections.push('LEFT');
        }
        if (this.checkIfMovePossible(this.posX, this.posY + 1)) {
            possibleDirections.push('RIGHT');
        }
        if (this.checkIfMovePossible(this.posX - 1, this.posY)) {
            possibleDirections.push('UP');
        }
        if (this.checkIfMovePossible(this.posX + 1, this.posY)) {
            possibleDirections.push('DOWN');
        }
        return possibleDirections;
    }
}

const boardHeight = 360;
const boardWidth = 900;
const boxDimensions = 18; // Sqaure so values used as height and width

const creatingMap = false;
const gameBoard = $('#game-board')[0];
const options = $('#options')[0];
const gameEnd = $('#game-end')[0];
const heroClass = 'hero';
const enemyClass = 'enemy';
const blockClass = 'block';
const foodClass = 'food';
const specialFoodClass = 'specialfood';
const emptyClass = 'empty'; // Used while creating board for reference

const enemyRef = [];
let heroRef = {};

const boardJsonPath = `https://storage.googleapis.com/pacman-dbc0c.appspot.com/pacmanv2/board.json`;
let boardJson = {};

const boxTypes = {
    'hero': {
        maxCount: 1,
        name: 'Pacman',
        totalCount: 0
    },
    'enemy': {
        maxCount: 5,
        name: 'Enemy',
        totalCount: 0
    },
    'block': {
        maxCount: Infinity,
        name: 'Block',
        totalCount: 0
    },
    'food': {
        maxCount: Infinity,
        name: 'Food',
        totalCount: 0
    },
    'specialfood': {
        maxCount: Infinity,
        name: 'Special Food',
        totalCount: 0
    }
};

let currentOption = 'hero';

let totalFood = 0;
let totalSpecialFood = 0;

let gameInterval;

let rows;
let columns;

const nameClassMap = {};
(() => {
    Object.keys(boxTypes).forEach(
        boxClass => {
            nameClassMap[boxTypes[boxClass].name] = boxClass;
        }
    );
})();

const init = async () => {
    $(gameEnd).hide();
    if (creatingMap) {
        populateOptions();
        $(options).show();
    } else {
        $(options).hide();
        await getBoardJson();
    }
    generateBoard();
};

const getBoardJson = async () => {
    const boardData = await fetch(boardJsonPath);
    boardJson = await boardData.json();
};

const populateOptions = () => {
    Object.keys(boxTypes).forEach(
        type => {
            const spanElement = $(`<span class = "box ${type}"></span>`);
            const nameElement = $(`<span>${boxTypes[type].name} (${boxTypes[type].maxCount})</span>`);
            $(spanElement).css({
                height: `${boxDimensions}px`,
                width: `${boxDimensions}px`,
                minHeight: `${boxDimensions}px`,
                minWidth: `${boxDimensions}px`,
                marginRight: '12px'
            });
            const option = $(`<span class = "option"></span>`);
            $(option).append(spanElement);
            $(option).append(nameElement);

            $(option).on('click', (event) => {
                optionClicked(event, type);
            });

            $(options).append(option);
        }
    );
}

const optionClicked = (event, option) => {
    currentOption = option;
}

const boxClicked = (posX, posY) => {
    if ((boxTypes[currentOption].totalCount + 1) > boxTypes[currentOption].maxCount) {
        return;
    }
    const boxClicked = $(`#${boxId(posX, posY)}`)[0];
    if ($(boxClicked).hasClass(heroClass)) {
        boxTypes[heroClass].totalCount--;
        $(boxClicked).removeClass(heroClass);
    }
    if ($(boxClicked).hasClass(enemyClass)) {
        boxTypes[enemyClass].totalCount--;
        $(boxClicked).removeClass(enemyClass);
    }
    if ($(boxClicked).hasClass(blockClass)) {
        boxTypes[blockClass].totalCount--;
        $(boxClicked).removeClass(blockClass);
    }
    if ($(boxClicked).hasClass(foodClass)) {
        boxTypes[foodClass].totalCount--;
        $(boxClicked).removeClass(foodClass);
    }
    if ($(boxClicked).hasClass(specialFoodClass)) {
        boxTypes[specialFoodClass].totalCount--;
        $(boxClicked).removeClass(specialFoodClass);
    }
    if ($(boxClicked).hasClass(emptyClass)) {
        $(boxClicked).removeClass(emptyClass);
    }

    $(boxClicked).addClass(currentOption);
    boxTypes[currentOption].totalCount++;

    boardJson[boxId(posX, posY)] = boxTypes[currentOption];


};

const generateBoard = () => {
    $(gameBoard).css({
        height: `${boardHeight}px`,
        width: `${boardWidth}px`,
        minHeight: `${boardHeight}px`,
        minWidth: `${boardWidth}px`
    });
    rows = boardHeight / boxDimensions;
    columns = boardWidth / boxDimensions;

    for (let i = 0; i < rows; ++i) {

        const rowElement = $(`<div class = "row"></div>`);

        for (let j = 0; j < columns; ++j) {

            let spanElement;
            if (i === 0 || j === 0 || i === rows - 1 || j === columns - 1) {
                spanElement = $(`<span id = "${boxId(i, j)}" class = "box ${blockClass}"></span>`);
            } else {
                spanElement = $(`<span id = "${boxId(i, j)}" class = "box ${getClass(i, j)}"></span>`);
            }
            $(spanElement).css({
                height: `${boxDimensions}px`,
                width: `${boxDimensions}px`,
                minHeight: `${boxDimensions}px`,
                minWidth: `${boxDimensions}px`
            });

            if (creatingMap) {
                $(spanElement).on('click', (event) => {
                    boxClicked(i, j);
                });
            }

            $(rowElement).append(spanElement);

        }

        $(gameBoard).append(rowElement);

    }

    if (!creatingMap) {
        beginGame();
    }

};
let num = 1;
const getClass = (posX, posY) => {
    if (creatingMap) {
        return emptyClass;
    } else {
        // Use JSON to populate these
        if (boardJson[boxId(posX, posY)]) {
            const boxClass = nameClassMap[boardJson[boxId(posX, posY)].name];
            if (boxClass === enemyClass) {
                enemyRef.push(new Player(posX, posY, false, enemyClass, 'Num ' + num++));
            } else if (boxClass === heroClass) {
                heroRef = new Player(posX, posY, true, heroClass);
            } else if (boxClass === foodClass) {
                totalFood = boardJson[boxId(posX, posY)].totalCount;
            } else if (boxClass === specialFoodClass) {
                totalSpecialFood = boardJson[boxId(posX, posY)].totalCount;
            }
            return boxClass;
        } else {
            return '';
        }
    }
}

const boxId = (posX, posY) => {
    return `${posX}-${posY}`;
};

const beginGame = () => {
    gameInterval = setInterval(
        () => {
            updateBoard();
            checkGameEndCondition();
        }, 240
    );
    $(document).on("keypress", event => {
        // if (event.which === 13) {
        //     updateBoard();
        // }
        switch (event.which) {
            case 119: heroRef.changeDirection('UP');
                break;
            case 100: heroRef.changeDirection('RIGHT');
                break;
            case 115: heroRef.changeDirection('DOWN');
                break;
            case 97: heroRef.changeDirection('LEFT');
                break;
        }
    });

};

const updateBoard = () => {
    enemyRef.forEach(
        enemy => {
            enemy.makeMove();
        }
    );
    heroRef.makeMove();
    checkGameEndCondition();
};

const checkGameEndCondition = () => {
    if (!totalFood && !totalSpecialFood) {
        endGame();
    }
};

const endGame = (death = false) => {
    clearInterval(gameInterval);
    const message = `${death ? 'Better luck next time' : 'Game Over'}`;
    const buttonMessage = `${death ? 'Try' : 'Play'} Again`;
    $(gameEnd).children('#message').html(message);
    $(gameEnd).children('button').html(buttonMessage);
    $(gameEnd).show();
};

$($(gameEnd).children('button')).on('click', () => {
    window.location.reload();
});

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

init();