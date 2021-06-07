const state = {
    bombIcon: require("../../assets/bomb.png"),
    flagIcon: require("../../assets/flag.png"),
    winIcon: require("../../assets/win.png"),
    loseIcon: require("../../assets/lose.png"),
    playingIcon: require("../../assets/playing.png"),
};
const getters = {
    bombIcon(state) {
        return state.bombIcon;
    },
    flagIcon(state) {
        return state.flagIcon;
    },
    playIcon(state) {
        return state.playingIcon;
    },
    winIcon(state) {
        return state.winIcon;
    },
    loseIcon(state) {
        return state.loseIcon;
    },
    pattern(state, getters, { gridPattern }) {
        return gridPattern.gridPattern;
    }
};
const actions = {
    openSquare({ getters, commit, rootState, dispatch }, { row, col }) {
        let pattern = getters.pattern;
        if (!pattern[row] || !pattern[row][col]) return;

        let squareTarget = pattern[row][col];
        if (squareTarget.flagged || rootState.mainGame.lose) return;
        if (squareTarget.data === 0) {
            if (squareTarget.show) return;
            dispatch("floodFillSquare", { squareTarget: squareTarget, row: row, col: col });
        }
        commit("playGame", rootState);
        if (squareTarget.bomb) {
            commit("endGame", rootState);
        }
        commit("changeSquareShow", squareTarget);
    },
    flagSquare({ getters, commit, rootState }, { row, col }) {
        let squareTarget = getters.pattern[row][col];
        if (squareTarget.show || rootState.mainGame.lose) return;
        commit("changeSquareFlagged", { squareTarget: squareTarget, rootState: rootState });
    },
    floodFillSquare({ dispatch, commit }, { squareTarget, row, col }) {
        commit("changeSquareShow", squareTarget);
        dispatch("openSquare", { row: row, col: col + 1 });
        dispatch("openSquare", { row: row, col: col - 1 });
        dispatch("openSquare", { row: row + 1, col: col });
        dispatch("openSquare", { row: row - 1, col: col });
    },
    winningCheck({ getters, commit, rootState }) {
        let pattern = getters.pattern;
        let number = [].concat(...pattern).filter(el => {
            return !el.bomb && el.data > 0;
        });
        let openedSquare = [].concat(...pattern).filter(el => {
            return el.data > 0 && el.show;
        });
        if (number.length == openedSquare.length) commit("winGame", rootState);
    },
};
const mutations = {
    changeSquareShow(_, squareTarget) {
        squareTarget.show = true;
    },
    changeSquareFlagged(_, { squareTarget, rootState }) {
        squareTarget.flagged = !squareTarget.flagged;
        squareTarget.flagged
            ? rootState.gridPattern.totalMines -= 1
            : rootState.gridPattern.totalMines += 1;
    },
    endGame(_, rootState) {
        rootState.mainGame.lose = true;
        rootState.mainGame.playing = false;
        let minesPattern = rootState.gridPattern.pattern;
        minesPattern.map(el => {
            el.show = true;
        });
    },
    winGame(_, rootState) {
        rootState.mainGame.win = true;
        rootState.mainGame.playing = false;
    },
    playGame(_, rootState) {
        rootState.mainGame.playing = true;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};