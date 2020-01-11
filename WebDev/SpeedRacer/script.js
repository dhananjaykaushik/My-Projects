$(
    () => {

        const paragraphs = [
            `This is a random paragraph for you to type and test the application. If you make any mistake character will become red while on correctly typing it turns green in color. So, test out your typing skills and improve in coding speed. Have Fun.`,
            `Testing`
        ];

        let gameOnGoing = false;
        let totalCharacters;
        let currentChar;
        let totalCharactersTyped = 0;
        let correctCharactersTyped = 0;
        let inCorrectCharactersTyped = 0;
        let startTime = 0;
        let endTime = 0;

        const resetGame = () => {
          
            gameOnGoing = false;
            currentChar = 0;
            totalCharactersTyped = 0;
            correctCharactersTyped = 0;
            inCorrectCharactersTyped = 0;
            startTime = 0;
            endTime = 0;
            $('.word > span').removeClass('right');
            $('.word > span').removeClass('wrong');
            $('button#start').removeClass('disabled');
            
        };

        const showStats = () => {
            const accuracy = (correctCharactersTyped / totalCharactersTyped) * 100;
            const totalTime = (endTime - startTime) / 1000;
            $('#total-words').html(totalCharactersTyped);
            $('#incorrect-words').html(inCorrectCharactersTyped);
            $('#accuracy').html(accuracy + '%');
            $('#speed').html(Math.round((totalCharactersTyped / totalTime) * 100) / 100);
            $('#time').html(totalTime);
            $('#modal').css('display', 'flex');
        };

        const initText = () => {
            let paraContent = breakParaContent(paragraphs[0]);
            currentChar = 0;
            $('p#sentence-container').html(paraContent);
        };

        const breakParaContent = (para) => {
            let index = 0;
            let words = para.split(' ');
            totalCharacters = 0;
            words = words.map(
                (word) => {
                    let chars = word.split('');
                    totalCharacters += (chars.length + 1);
                    chars = chars.map(
                        char => `<span id="char-${index++}">${char}</span>`
                    );
                    return `<div class="word">${chars.join('')}</div><span id="char-${index++}"> </span>`;
                }
            );
            return words.join(' ');
        };

        const handleCharacter = (keyPressed) => {
            totalCharactersTyped += 1;
            if (keyPressed === $('#char-' + currentChar).html()) {
                correctCharactersTyped += 1;
                $('#char-' + currentChar).addClass('right');
                currentChar += 1;
                if (currentChar === (totalCharacters - 1)) {
                    gameOnGoing = false;
                    endTime = new Date().getTime();     
                    // Game over
                    showStats();
                }

            } else {
                inCorrectCharactersTyped += 1;
                $('#char-' + currentChar).addClass('wrong');
            }
        };

        $(document).on("keypress", function (event) {
            if (!gameOnGoing) {
                return;
            }
            const keyPressed = String.fromCharCode(event.keyCode);
            handleCharacter(keyPressed);
        });

        $('button#start').on('click', () => {
            if (gameOnGoing) {
                return;
            }
            startTime = new Date().getTime();
            $('button#start').addClass('disabled');
            gameOnGoing = true;
        });

        $('#close-modal').on('click', () => {
            resetGame();
            $('#modal').css('display', 'none');
        });

        initText();
    }
);