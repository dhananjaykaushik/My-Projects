/*
*
*
*   Classes
*
*
*/

class Character {
    positionX;
    positionY;
    direction;
    preferredDirection;
    boardRef;
    isHero;
    types = new OptionType();
    lastPosX = null;
    lastPosY = null;
    lastPosData = null;
    directionNotPreferred;

    constructor(positionX, positionY, boardRef, isHero = false) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.boardRef = boardRef;
        this.direction = directions.LEFT;
        this.preferredDirection = directions.LEFT;
        this.isHero = isHero;
    }

    moveRight() {
        this.preferredDirection = directions.RIGHT;
        this.makeMove(this.positionX, this.positionY + 1);
    }

    moveLeft() {
        this.preferredDirection = directions.LEFT;
        this.makeMove(this.positionX, this.positionY - 1);
    }

    moveUp() {
        this.preferredDirection = directions.UP;
        this.makeMove(this.positionX - 1, this.positionY);
    }

    moveDown() {
        this.preferredDirection = directions.DOWN;
        this.makeMove(this.positionX + 1, this.positionY);
    }

    enemyMove() {
        if (this.direction === directions.RIGHT) {
            this.makeMove(this.positionX, this.positionY + 1);
        } else if (this.direction === directions.LEFT) {
            this.makeMove(this.positionX, this.positionY - 1);
        } else if (this.direction === directions.UP) {
            this.makeMove(this.positionX - 1, this.positionY);
        } else if (this.direction === directions.DOWN) {
            this.makeMove(this.positionX + 1, this.positionY);
        }
    }

    makeMove(posX, posY) {
        if (this.isMovePossible(posX, posY)) {
            if (!this.isHero) {
                //  Populate last item
                if (this.lastPosData) {
                    this.boardRef[generateKey(this.positionX, this.positionY)] = this.lastPosData;
                    $(`#${getBoxId(this.positionX, this.positionY)}`)[0].className = `box clickable ${this.lastPosData.type}`;
                } else {
                    this.boardRef[generateKey(this.positionX, this.positionY)] = new MapOption(0, 0, this.types.PATH, 'Path');
                    $(`#${getBoxId(this.positionX, this.positionY)}`)[0].className = `box clickable ${this.types.PATH}`;
                }
                this.lastPosData = this.boardRef[generateKey(posX, posY)];
                // Move enemy
                $(`#${getBoxId(posX, posY)}`)[0].className = `box clickable ${this.types.ENEMY}`;
                this.boardRef[generateKey(posX, posY)] = this.boardRef[generateKey(this.positionX, this.positionY)];
                this.positionX = posX;
                this.positionY = posY;
            }
        } else {
            this.direction = this.getPossibleDirection(this.positionX, this.positionY);
            this.enemyMove();
        }
    }

    isMovePossible(posX, posY) {
        if (!this.isHero && this.boardRef[generateKey(posX, posY)]) {
            let count = 0;
            const myCoords = this.getNextPossiblePosition();
            const conflicts = [];
            enemies.forEach(
                enemy => {
                    const enemyCoords = enemy.getNextPossiblePosition();
                    if (myCoords.posX === enemyCoords.posX && myCoords.posY === enemyCoords.posY) {
                        conflicts.push(enemy);
                        ++count;
                    }
                }
            );
            if (count > 1) {
                conflicts.forEach(
                    en => {
                        en.reverseDirection();
                    }
                );
                return false;
            }
        }
        if (posX === 0 || posY === 0 || posX === 19 || posY === 19) {
            return false;
        }
        if (this.boardRef[generateKey(posX, posY)]
            && (this.boardRef[generateKey(posX, posY)].type === this.types.WALL
                || this.boardRef[generateKey(posX, posY)].type === this.types.BOUNDARY
            )) {
            return false;
        }
        return true;
    }

    getPossibleDirection(posX, posY) {
        let possibleMoves = [];

        if (this.isMovePossible(posX, posY + 1)) {
            possibleMoves.push(directions.RIGHT);
        }

        if (this.isMovePossible(posX, posY - 1)) {
            possibleMoves.push(directions.LEFT);
        }

        if (this.isMovePossible(posX - 1, posY)) {
            possibleMoves.push(directions.UP);
        }

        if (this.isMovePossible(posX + 1, posY)) {
            possibleMoves.push(directions.DOWN);
        }

        if (!possibleMoves.length) {
            return this.getReverseDirection();
        }

        return possibleMoves[getRandomInt(0, possibleMoves.length - 1)];

    }

    reverseDirection() {
        this.direction = this.getReverseDirection();
    }

    getReverseDirection() {
        if (this.direction === directions.LEFT) {
            return directions.RIGHT;
        }
        if (this.direction === directions.RIGHT) {
            return directions.LEFT;
        }
        if (this.direction === directions.UP) {
            return directions.DOWN;
        }
        if (this.direction === directions.DOWN) {
            return directions.UP;
        }
    }

    getNextPossiblePosition() {
        const pos = {
            posX: 0,
            posY: 0
        };
        if (this.direction === directions.RIGHT) {
            pos.posX = this.positionX;
            pos.posY = this.positionY + 1;
        } else if (this.direction === directions.LEFT) {
            pos.posX = this.positionX;
            pos.posY = this.positionY - 1;
        } else if (this.direction === directions.UP) {
            pos.posX = this.positionX - 1;
            pos.posY = this.positionY;
        } else if (this.direction === directions.DOWN) {
            pos.posX = this.positionX + 1;
            pos.posY = this.positionY;
        }
        return pos;
    }

};

class MapOption {
    maxCount;
    count;
    type;
    name;

    constructor(maxCount, count, type, name) {
        this.maxCount = maxCount;
        this.count = count;
        this.type = type;
        this.name = name;
    }

}

class OptionType {
    WALL = 'wall';
    ENEMY = 'enemy';
    HERO = 'hero';
    SPECIAL_FOOD = 'specialfood';
    FOOD = 'food';
    PATH = 'path';
    BOUNDARY = 'boundary';
}

/*
*
*
*   Code
*
*
*/

const boardJsonPath = `https://storage.googleapis.com/pacman-dbc0c.appspot.com/pacman/board.json`;
const configJsonPath = `https://storage.googleapis.com/pacman-dbc0c.appspot.com/pacman/config.json`;

const rows = 20;
const columns = 20;
const mapBindings = {};
let currentOption = null;
let specialFood = null;
const gameBoard = $('.game-board')[0];
const creatingMap = false;
posXattr = 'data-positionx';
posYattr = 'data-positiony';
let boardJson = null;
let configJson = null;
let options = null;
const enemies = [];
let hero;
let totalFood = 0;
let totalSpecialFood = 0;
const directions = {
    LEFT: 'left',
    RIGHT: 'right',
    UP: 'up',
    DOWN: 'down',
};

const initBoard = async () => {
    let options = null;
    if (creatingMap) {
        options = mapGenerator();
    } else {
        await getFiles();
        if (!boardJson) {
            return;
        }
    }
    for (let i = 0; i < rows; ++i) {
        const rowElement = document.createElement('div');
        $(rowElement).addClass('row');
        for (let j = 0; j < columns; ++j) {
            const boxElement = document.createElement('span');
            $(boxElement).addClass('box');
            $(boxElement).attr('id', getBoxId(i, j));

            // Preparing boundary
            if (i === 0 || j === 0 || i === (rows - 1) || j === (columns - 1)) {
                $(boxElement).addClass('wall boundary');
            } else if (creatingMap) {
                $(boxElement).addClass('map-generator clickable');
                $(boxElement).on('click', (event) => { fillBox(event, options) });
            } else {
                const type = boardJson[generateKey(i, j)].type;
                const optionsType = new OptionType();
                if (type === optionsType.ENEMY) {
                    enemies.push(new Character(i, j, boardJson));
                } else if (type === optionsType.HERO) {
                    hero = new Character(i, j, boardJson, true);
                } else if (type === optionsType.FOOD) {
                    totalFood = boardJson[generateKey(i, j)].count;
                } else if (type === optionsType.SPECIAL_FOOD) {
                    totalSpecialFood = boardJson[generateKey(i, j)].count;
                }
                $(boxElement).addClass(`box ${type}`);
            }
            $(boxElement).attr(posXattr, i);
            $(boxElement).attr(posYattr, j);
            rowElement.append(boxElement);
        }
        gameBoard.appendChild(rowElement);
    }
    if (!creatingMap) {
        beginGame();
    }

};

const generateKey = (posX, posY) => {
    return posX + '-' + posY;
};

const expandCoordinates = (position) => {
    const coordinates = position.split('-');
    return [coordinates[0], coordinates[1]];
};

const getFiles = async () => {
    const boardData = await fetch(boardJsonPath);
    const boardJsonData = await boardData.json();

    const configData = await fetch(configJsonPath);
    const configJsonData = await configData.json();

    boardJson = boardJsonData;
    configJson = configJsonData;
}

const mapGenerator = () => {
    return fillOptions(getOptions());
};

const getOptions = () => {
    const hero = new MapOption(1, 0, new OptionType().HERO, 'Hero');
    const enemies = new MapOption(5, 0, new OptionType().ENEMY, 'Enemy');
    const walls = new MapOption(Infinity, 0, new OptionType().WALL, 'Wall');
    const food = new MapOption(Infinity, 0, new OptionType().FOOD, 'Food');
    const specialFood = new MapOption(Infinity, 0, new OptionType().SPECIAL_FOOD, 'Special Food');
    const path = new MapOption(Infinity, 0, new OptionType().PATH, 'Path');

    currentOption = walls;

    return [hero, enemies, walls, food, specialFood, path];
};

const fillBox = (event, options) => {

    if ((currentOption.count + 1) > currentOption.maxCount) {
        return;
    }

    const target = $(event.target)[0];
    const posX = $(target).attr(posXattr);
    const posY = $(target).attr(posYattr);

    const key = generateKey(posX, posY);
    let lastOption = null;
    if (mapBindings[key]) {
        lastOption = mapBindings[key];
    }

    if (lastOption === null || lastOption.type !== currentOption.type) {
        if (lastOption) {
            lastOption.count--;
        }
        currentOption.count++;
        mapBindings[key] = currentOption;
        target.className = `box clickable ${currentOption.type}`;
    }
};

const changeOption = (option) => {
    currentOption = option;
}

const fillOptions = (options) => {
    const optionsRef = $('.options')[0];

    options.forEach(
        option => {
            const optionElement = $(`<div class="option clickable">
            <span class = "icon box ${option.type}"></span>
            <span class = "name">${option.name}(${option.maxCount})</span>
            </div>`);
            optionsRef.append(optionElement[0]);
            $(optionElement[0]).on('click', () => { changeOption(option) });
        }
    );
    return options;
};

const beginGame = () => {
    const gameInterval = setInterval(
        () => {
            updateBoard();
            if (checkGameEnd()) {
                clearInterval(gameInterval);
            }
        }, 200
    );
};

$(document).on("keypress", event => {
    if (event.which === 13) {
        updateBoard();
    }
});

const updateBoard = () => {
    let count = 1;
    enemies.forEach(
        enemy => {
            enemy.name = `Enemy ${count++}`;
            enemy.enemyMove();
        }
    );
};

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getBoxId = (posX, posY) => {
    return `box-${posX}-${posY}`;
}

const checkGameEnd = () => {
    return false;
};

initBoard();
