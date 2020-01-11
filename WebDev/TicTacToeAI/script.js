$(

    () => {

        let gameOnGoing = true;
        const storage = sessionStorage;

        const players = {
            'o': `<i class="fas fa-circle"></i>`,
            'x': `<i class="fas fa-times"></i>`
        };

        let currentTurn = Object.keys(players)[0];
        const user = Object.keys(players)[0];
        const ai = Object.keys(players)[1];

        const initGame = () => {
            currentTurn = Object.keys(players)[0];
            $('.box').removeClass('filled');
            $('#turn-value').html(`${players[currentTurn]}`);
        };

        const fillBox = (boxId) => {
            if ($('#' + boxId).hasClass('filled')) {
                // Box Already Filled
                return false;
            } else {
                $('#' + boxId).addClass('filled');
            }
            $('#' + boxId).html(`${players[currentTurn]}`);
            return true;
        };

        const toggleTurn = () => {
            currentTurn = currentTurn === 'o' ? 'x' : 'o';
            $('#turn-value').html(`${players[currentTurn]}`);
        };

        const isGameEnded = () => {
            const box1 = $('#box-1').html().trim();
            const box2 = $('#box-2').html().trim();
            const box3 = $('#box-3').html().trim();
            const box4 = $('#box-4').html().trim();
            const box5 = $('#box-5').html().trim();
            const box6 = $('#box-6').html().trim();
            const box7 = $('#box-7').html().trim();
            const box8 = $('#box-8').html().trim();
            const box9 = $('#box-9').html().trim();

            const gameWinner = checkGameEndConditions(box1, box2, box3, box4, box5, box6, box7, box8, box9);
            if (gameWinner) {
                gameOnGoing = false;
                endGame(getName(gameWinner));
                return true;
            }

            return false;

        };

        const checkGameEndConditions = (box1, box2, box3, box4, box5, box6, box7, box8, box9) => {
            // Checking horizontals
            if ((box1 && box2 && box3) && box1 === box2 && box1 === box3) {
                return box1;
            }

            if ((box4 && box5 && box6) && box4 === box5 && box4 === box6) {
                return box4;
            }

            if ((box7 && box8 && box9) && box7 === box8 && box7 === box9) {
                return box7;
            }

            // Checking verticals
            if ((box1 && box4 && box7) && box1 === box4 && box1 === box7) {
                return box1;
            }

            if ((box2 && box5 && box8) && box2 === box5 && box2 === box8) {
                return box2;
            }

            if ((box3 && box6 && box9) && box3 === box6 && box3 === box9) {
                return box3;
            }

            // Checking right diagonal
            if ((box1 && box5 && box9) && box1 === box5 && box1 === box9) {
                return box1;
            }

            // Checking left diagonal
            if ((box3 && box5 && box7) && box3 === box5 && box3 === box7) {
                return box3;
            }

            return false;
        };

        const getName = (val) => {
            let name = null;
            const keys = Object.keys(players);
            keys.forEach(
                key => {
                    if (players[key] === val) {
                        name = key;
                    }
                }
            );
            return name;
        };

        const endGame = (name) => {
            $('#winner').html(`${players[name]}`);
            let wins = 0;
            if (storage.getItem(name) != null) {
                wins = parseInt(storage.getItem(name));
            }
            storage.setItem(name, ++wins);
        };

        const closeModal = () => {
            $('#modal').css('display', 'none');
            if (!gameOnGoing) {
                resetGame();
            }
        };

        const openModal = (modal) => {
            $('.modal').css('display', 'none');
            $('#modal').css('display', 'flex');
            $('#' + modal).css('display', 'flex');
        };

        const resetGame = () => {
            gameOnGoing = false;
            currentTurn = user;
            for (let i = 1; i <= 9; ++i) {
                $('#box-' + i).html('');
                $('#box-' + i).html('');
            }
            initGame();
        };

        const setScores = () => {
            Object.keys(players).forEach(
                (key, index) => {
                    let playerWins = 0;
                    if (storage.getItem(key) != null) {
                        playerWins = parseInt(storage.getItem(key));
                    }
                    $('#player-' + (index + 1) + '-name').html(players[key]);
                    $('#player-' + (index + 1) + '-score').html(playerWins);
                }
            );
        };

        const handleTasks = (blockId) => {
            if (! fillBox(blockId)) {
                return;
            }
            toggleTurn();
            if (isGameEnded()) {
                openModal('result-modal');
            }
            if ($('.box.filled').length === 9) {
                resetGame();
                return;
            }
            return true;
        };

        const hookUpAI = () => {
            const blockId = getBlockIdToFill();
            if (blockId) {
                handleTasks(blockId);
            }
        };

        const getBlockIdToFill = () => {
            // return getRandomId();
            return getOptimalId();
        };

        const getRandomId = () => {
            const unfilledBoxes = $($('.box:not(.filled)'));
            const randomIndex = Math.floor(Math.random() * Math.floor(unfilledBoxes.length));
            const id = $($('.box:not(.filled)')[randomIndex])[0].id;
            return id;
        };

        const getOptimalId = () => {
            let box1 = getName($('#box-1').html().trim());
            let box2 = getName($('#box-2').html().trim());
            let box3 = getName($('#box-3').html().trim());
            let box4 = getName($('#box-4').html().trim());
            let box5 = getName($('#box-5').html().trim());
            let box6 = getName($('#box-6').html().trim());
            let box7 = getName($('#box-7').html().trim());
            let box8 = getName($('#box-8').html().trim());
            let box9 = getName($('#box-9').html().trim());

            let currentState = [box1, box2, box3, box4, box5, box6, box7, box8, box9];

            // drawState(...currentState);

            // Check if opponent wins
            const userWins = checkOpponentImmediateWin(currentState);
            if (userWins) {
                return 'box-' + (userWins.index);
            }

            const bestStateResults = processBestState(currentState, ai, true);

            if (!bestStateResults) {
                return null;
            }
            const result = getBestResult(bestStateResults);
            return 'box-' + (result.index);

        };

        const checkOpponentImmediateWin = (state) => {
            // Getting available places
            let availableMoves = [];
            state.forEach(
                (key, index) => {
                    if (!key || !key.length) {
                        availableMoves.push(index + 1);
                    }
                }
            );
            let userWins = null;
            availableMoves.forEach(
                move => {
                    const currentState = JSON.parse(JSON.stringify(state));
                    currentState[move - 1] = user;

                    const gameWinner = checkGameEndConditions(...currentState);
                    if (gameWinner && gameWinner === user) {
                        userWins = {
                            index: move,
                            result: 1
                        };
                    }
                }
            );
            return userWins;
        };

        const processBestState = (state, playerTurn, level1) => {

            // Checking if game has winner
            const gameWinner = checkGameEndConditions(...state);
        
            if (gameWinner) {
                // Game is over
                return gameWinner === user ? -1: 1;
            }
        
            // Getting available places
            let availableMoves = [];
            state.forEach(
                (key, index) => {
                    if (!key || !key.length) {
                        availableMoves.push(index + 1);
                    }
                }
            );
        
        
            if (!availableMoves.length) {
                // No available moves left. Game is draw
                return 0;
            }
        
            const movesResult = [];
            let optimizedMove = null;
        
        
            availableMoves.forEach(
                move => {
                    const newState = JSON.parse(JSON.stringify(state));
                    // Applying move
                    newState[move - 1] = playerTurn;
        
                    // Changing turn
                    const currentTurn = playerTurn === user ? ai : user;
        
                    const bestMoveResult = processBestState(newState, currentTurn, false);
        
                    if (!optimizedMove || (bestMoveResult < optimizedMove)) {
                        optimizedMove = bestMoveResult;
                    }
        
                    movesResult.push(
                        {
                            index: move,
                            result: bestMoveResult
                        }
                    );
                }
            );
        
            if (level1) {
                // Return result with index
                return movesResult;
            }
        
            // Return minimum value
            return optimizedMove;
        };

        const getBestResult = (bestStateResults) => {
            let result = bestStateResults[0];
            bestStateResults.forEach(
                outcome => {
                    if (outcome.result > result.result) {
                        result = outcome;
                    }
                }
            );
            return result;
        };

        const drawState = (box1, box2, box3, box4, box5, box6, box7, box8, box9) => {

            box1 = box1 ? box1 : '-';
            box2 = box2 ? box2 : '-';
            box3 = box3 ? box3 : '-';
            box4 = box4 ? box4 : '-';
            box5 = box5 ? box5 : '-';
            box6 = box6 ? box6 : '-';
            box7 = box7 ? box7 : '-';
            box8 = box8 ? box8 : '-';
            box9 = box9 ? box9 : '-';

            console.log(`
                ${box1} | ${box2} | ${box3}
                ----------
                ${box4} | ${box5} | ${box6}
                ----------
                ${box7} | ${box8} | ${box9}
            `);
        };

        $('.box').on('click', (event) => {
            if (currentTurn === user) {
                if (handleTasks(event.currentTarget.id)) {
                    hookUpAI();
                }
            }
        });

        $('#close-modal').on('click', (event) => {
            closeModal();
        });

        $('#reset-game').on('click', (event) => {
            resetGame();
        });

        $('#game-about').on('click', (event) => {
            openModal('info-modal');
        });

        $('#show-scores').on('click', (event) => {
            setScores();
            openModal('score-modal');
        });

        initGame();
    }

);
