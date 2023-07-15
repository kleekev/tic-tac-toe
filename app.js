const playerCreator = (mark) => {
    this.mark = mark;
    const getMark = () => {
        return mark;
    };
    return { getMark };
};

const gameBoard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];

    const placeMark = (mark, index) => {
        board[index] = mark;
    };

    const getMark = (index) => {
        return board[index];
    };

    const reset = () => {
        for (let i = 0; i < 9; i++) {
            board[i] = "";
        }
    };

    const getBoard = () => {
        return board;
    };

    return { placeMark, getMark, reset, getBoard };
})();

const displayController = (() => {
    const boxElements = document.querySelectorAll(".box");
    const messageElement = document.getElementById("message");
    const restart = document.getElementById("restart");
    
    boxElements.forEach((item) => {
        item.addEventListener("click", (e) => {
            if (gameController.getGameOver() || e.target.textContent !== "") {
                return;
            };
            gameController.playRound(parseInt(e.target.id));
            updateGameBoard();
        })
    });

    restart.addEventListener("click", (e) => {
        gameBoard.reset();
        gameController.reset();
        updateGameBoard();
        updateMsg("Player O's turn");
    });

    const updateMsg = (string) => {
        messageElement.textContent = string;
    };

    const updateGameBoard = () => {
        for (let i = 0; i < 9; i++) {
            boxElements[i].textContent = gameBoard.getMark(i);
        }
    };

    return { updateMsg };
})();

const gameController = (() => {
    const playerO = playerCreator('O');
    const playerX = playerCreator('X');
    let round = 1;
    let gameOver = false;

    const playRound = (index) => {
        gameBoard.placeMark(getCurrPlayer().getMark(), index);
        if (checkWinner(index)) {
            displayController.updateMsg(`Player ${getCurrPlayer().getMark()} has won!`);
            gameOver = true;
        } else if (round === 9) {
            displayController.updateMsg("Draw");
            gameOver = true;
        } else {
            round++;
            displayController.updateMsg(`Player ${getCurrPlayer().getMark()}'s turn`);
        }
        
    };

    const getCurrPlayer = () => {
        return (round % 2 == 0) ? playerX : playerO;
    };

    const checkWinner = (index) => {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        let isGameOver = false;

        const possibleWins = winConditions.filter((combination) => combination.includes(index));
        for (let i = 0; i < possibleWins.length; i++) {
            isGameOver = gameBoard.getMark(possibleWins[i][0]) === getCurrPlayer().getMark() &&
                       gameBoard.getMark(possibleWins[i][1]) === getCurrPlayer().getMark() &&
                       gameBoard.getMark(possibleWins[i][2]) === getCurrPlayer().getMark();
            if (isGameOver) {
                return isGameOver;
            }
        }
        return isGameOver;
    };

    const reset = () => {
        round = 1;
        gameOver = false;
    };

    const getGameOver = () => {
        return gameOver;
    };

    return  { playRound, reset, getGameOver };
})();