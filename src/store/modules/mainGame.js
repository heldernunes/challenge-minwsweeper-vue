const state = {
    lose: false,
    win: false,
    playing: true
};
const getters = {
    isLose(state) {
        return state.lose;
    },
    isWin(state) {
        return state.win;
    },
    isPlaying(state) {
        return state.playing;
    }
};
const actions = {
    restartGame({ commit  }) {
        commit("restartGame");
    }
};
const mutations = {
    restartGame(state) {
        state.win = false;
        state.lose = false;
        state.playing = true;
    }
};
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};