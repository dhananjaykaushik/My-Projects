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
    icon;
    color;

    contructor(positionX, positionY, icon, color) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.icon = icon;
        this.color = color;
    }

    moveRight() {
        this.positionX += 1;
    }

    moveLeft() {
        this.positionX -= 1;
    }

    moveUp() {
        this.positionY += 1;
    }

    moveDown() {
        this.positionY -= 1;
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
let options = null;

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

            // Preparing boundary
            if (i === 0 || j === 0 || i === (rows - 1) || j === (columns - 1)) {
                $(boxElement).addClass('wall boundary');
            } else if (creatingMap) {
                $(boxElement).addClass('map-generator clickable');
                $(boxElement).on('click', (event) => { fillBox(event, options) });
            } else {
                $(boxElement).addClass(`box ${boardJson[i + '-' + j].type}`);
            }
            $(boxElement).attr(posXattr, i);
            $(boxElement).attr(posYattr, j);
            rowElement.append(boxElement);
        }
        gameBoard.appendChild(rowElement);
    }

};

const getFiles = async () => {
    console.log('Getting files');
    const data = await fetch(configJsonPath);
    const boardJsonData = await data.json();
    console.log(boardJsonData);
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
        console.log(`${currentOption.name} maxed out`);
        return;
    }

    const target = $(event.target)[0];
    const posX = $(target).attr(posXattr);
    const posY = $(target).attr(posYattr);

    const key = `${posX}-${posY}`;
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

    console.log(mapBindings);
    console.log(options);
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

initBoard();





