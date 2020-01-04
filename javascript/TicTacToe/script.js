$(

    () => {

        let gameOnGoing = true;
        const storage = sessionStorage;

        const players = {
            'o': `<i class="fas fa-circle"></i>`,
            'x': `<i class="fas fa-times"></i>`
        };

        let currentTurn = Object.keys(players)[0];

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

            // Checking horizontals
            if ((box1 && box2 && box3) && box1 === box2 && box1 === box3) {
                gameOnGoing = false;
                endGame(getName(box1));
                return true;
            }
            if ((box4 && box5 && box6) && box4 === box5 && box4 === box6) {
                gameOnGoing = false;
                endGame(getName(box4));
                return true;
            }
            if ((box7 && box8 && box9) && box7 === box8 && box7 === box9) {
                gameOnGoing = false;
                endGame(getName(box7));
                return true;
            }

            // Checking verticals
            if ((box1 && box4 && box7) && box1 === box4 && box1 === box7) {
                gameOnGoing = false;
                endGame(getName(box1));
                return true;
            }
            if ((box2 && box5 && box8) && box2 === box5 && box2 === box8) {
                gameOnGoing = false;
                endGame(getName(box2));
                return true;
            }
            if ((box3 && box6 && box9) && box3 === box6 && box3 === box9) {
                gameOnGoing = false;
                endGame(getName(box3));
                return true;
            }

            // Checking right diagonal
            if ((box1 && box5 && box9) && box1 === box5 && box1 === box9) {
                gameOnGoing = false;
                endGame(getName(box1));
                return true;
            }

            // Checking left diagonal
            if ((box3 && box5 && box7) && box3 === box5 && box3 === box7) {
                gameOnGoing = false;
                endGame(getName(box3));
                return true;
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
            currentTurn = 'o';
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
                    console.log('#player-' + (index + 1) + 'name');
                    $('#player-' + (index + 1) + '-name').html(players[key]);
                    $('#player-' + (index + 1) + '-score').html(playerWins);
                }
            );
        };


        $('.box').on('click', (event) => {
            if (! fillBox(event.currentTarget.id)) {
                return;
            }
            if (isGameEnded()) {
                openModal('result-modal');
            }
            if ($('.box.filled').length === 9) {
                resetGame();
                return;
            }
            toggleTurn();
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
