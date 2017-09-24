class TicTacToe {
    constructor(rate = 3) {
        this.turns = 0;
        this.gameIsFinished = false;
        this.rate = rate;
        this.battlefield = new Array(this.rate);
        for (let i = 0; i < this.rate; i++) {
            this.battlefield[i] = [];
        }
        this.player = true;

        this._players = {
            first: 'x',
            second: 'o'
        }
    }

    getCurrentPlayerSymbol() {
        return this.player ? this._players.first : this._players.second;
    }

    nextTurn(rowIndex, columnIndex) {
        if (this.isEmptyField(rowIndex, columnIndex)) {
            this.battlefield[rowIndex][columnIndex] = this.getCurrentPlayerSymbol();
            this.turns++;
            this.player = !this.player;
            this.check();
        }
    }

    isEmptyField(rowIndex, columnIndex) {
        return typeof this.battlefield[rowIndex][columnIndex] === 'undefined';
    }

    isFinished() {
        return this.gameIsFinished;
    }

    getWinner() {
        let winnersMap = new Map([
            [this._players.first, false],
            [this._players.second, false]
        ]);

        for (let i = 0; i < this.rate; i++) {
            for (let j = 0; j < this.rate; j++) {
                if (!this.isEmptyField(i, j) && isInLine(i, j, this)) {
                    winnersMap.set(this.battlefield[i][j], true);
                }
            }
        }

        if (winnersMap.get(this._players.first) && winnersMap.get(this._players.second)) {
            return null;
        } else if (winnersMap.get(this._players.first)) {
            return this._players.first;
        } else if (winnersMap.get(this._players.second)) {
            return this._players.second;
        }

        return null;

        function isInLine(rowIndex, columnIndex, game) {
            let temp = game.battlefield[rowIndex][columnIndex];

            return checkXords(rowIndex, columnIndex) || checkYords(rowIndex, columnIndex) || checkDiagonals(rowIndex, columnIndex);

            function checkXords(rowIndex, columnIndex) {
                if (columnIndex === 0 || columnIndex === game.rate - 1) {
                    return false;
                }
                return temp === game.getFieldValue(rowIndex, columnIndex - 1) && temp === game.getFieldValue(rowIndex, columnIndex + 1);

            }

            function checkYords(rowIndex, columnIndex) {
                if (rowIndex === 0 || rowIndex === game.rate - 1) {
                    return false;
                }
                return temp === game.getFieldValue(rowIndex - 1, columnIndex) && temp === game.getFieldValue(rowIndex + 1, columnIndex);

            }

            function checkDiagonals(rowIndex, columnIndex) {
                if (rowIndex === 0 || rowIndex === game.rate - 1 || columnIndex === 0 || columnIndex === game.rate - 1) {
                    return false;
                }
                let inverse = temp === game.getFieldValue(rowIndex - 1, columnIndex - 1) && temp === game.getFieldValue(rowIndex + 1, columnIndex + 1);
                let reverse = temp === game.getFieldValue(rowIndex - 1, columnIndex + 1) && temp === game.getFieldValue(rowIndex + 1, columnIndex - 1);
                return inverse || reverse;

            }
        }
    }

    noMoreTurns() {
        return this.turns === Math.pow(this.rate, 2);
    }

    isDraw() {
        return !!(this.noMoreTurns() && this.getWinner() === null);

    }

    getFieldValue(rowIndex, colIndex) {
        let result = null;
        if (typeof this.battlefield[rowIndex][colIndex] === 'undefined') {
            return result;
        }
        return this.battlefield[rowIndex][colIndex];
    }

    check() {
        this.gameIsFinished = this.isDraw() || this.getWinner() !== null
    }
}

module.exports = TicTacToe;