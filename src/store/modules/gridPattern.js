const state = {
    dataSource: [0, 0, 0, 0, "X"],
    gridPattern: [],
    pattern: [],
    totalMines: 0,
    subPattern: []
};
const getters = {
    pattern(state) {
        return state.gridPattern;
    },
    totalMines(state) {
        return state.totalMines;
    }
};
const actions = {
    async createMinesPattern({ rootGetters, dispatch, commit }, size) {
        let gridSize = size ? size : rootGetters["gridSize/size"];
        let gridPattern = [];

        for (let rowIdx = 0; rowIdx < gridSize; rowIdx++) {
            let subPattern = await dispatch("createMinesSubPattern",
                {
                    gridSize: gridSize,
                    rowIdx: rowIdx,
                    gridPattern: gridPattern
                });
            gridPattern.push(subPattern);
        }
        commit("setMinesPattern", gridPattern);
        commit("setTotalMines", gridPattern);
    },
    async createMinesSubPattern({ state }, { gridSize, rowIdx, gridPattern }) {
        let subPattern = [];
        for (let colIdx = 0; colIdx < gridSize; colIdx++) {
            let random = Math.floor(Math.random() * state.dataSource.length);
            let source = state.dataSource[random];
            let prev = subPattern[colIdx - 1];
            if (prev) {
                let prevData = prev.data;
                if (typeof source === "string" && typeof prevData === "number") subPattern[colIdx - 1].data = prevData + 1;
                if (typeof source === "number" && typeof prevData == "string") source = source + 1;
            }

            if (rowIdx > 0) {
                let prevUpperLeft = gridPattern[rowIdx - 1][colIdx - 1];
                let prevUpperRight = gridPattern[rowIdx - 1][colIdx + 1];
                let prevUpperCenter = gridPattern[rowIdx - 1][colIdx];

                if (prevUpperLeft) {
                    let prevUpperLeftData = prevUpperLeft.data;
                    typeof source === "string"
                        ? typeof prevUpperLeftData === "number" ? gridPattern[rowIdx - 1][colIdx - 1].data = prevUpperLeftData + 1 : prevUpperLeftData
                        : typeof prevUpperLeftData === "string" ? source += 1 : source;
                }
                if (prevUpperRight) {
                    let prevUpperRightData = prevUpperRight.data;
                    typeof source === "string"
                        ? typeof prevUpperRightData === "number" ? gridPattern[rowIdx - 1][colIdx + 1].data = prevUpperRightData + 1 : prevUpperRightData
                        : typeof prevUpperRightData === "string" ? source += 1 : source;
                }
                if (prevUpperCenter) {
                    let prevUpperCenterData = prevUpperCenter.data;
                    typeof source === "string"
                        ? typeof prevUpperCenterData === "number" ? gridPattern[rowIdx - 1][colIdx].data = prevUpperCenterData + 1 : prevUpperCenterData
                        : typeof prevUpperCenterData === "string" ? source += 1 : source;
                }
            }
            subPattern.push({
                data: source,
                show: false,
                bomb: typeof source === "string" ,
                flagged: false 
            });
        }
        return subPattern;
    }
};
const mutations = {
    setMinesPattern(state, pattern) {
        state.gridPattern = pattern;
    },
    countMines(state) {
        state.totalMines += 1;
    },
    setTotalMines(state, gridPattern) {
        let mines = [].concat(...gridPattern).filter(el => {
            return el.bomb;
        });
        state.pattern = mines;
        state.totalMines = mines.length;
    }
};
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};