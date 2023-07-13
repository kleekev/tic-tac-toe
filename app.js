const playerCreator = (mark) => {
    this.mark = mark;
    const getMark = () => {
        return mark;
    };
    return { getMark };
};

const gameBoard = (() => {
    let board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    const getBoard = () => {
        return board;
    };

    const placeMark = (mark, index) => {
        board[index] = mark;
    };

    const getMark = (index) => {
        return board[index];
    };

    const reset = () => {
        for (let i = 0; i < 9; i++) {
            board[i] = 0;
        }
    };

    return { getBoard, placeMark, reset };
})();

const displayController = (() => {
    const boxElements = document.querySelectorAll(".box");
    const messageElement = document.getElementsByClassName("msg");
    
    boxElements.forEach((item) => {
        item.addEventListener("click", (e) => {

        })
    })
})
