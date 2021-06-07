<template>
  <v-container>
    <div v-if="isPlaying">
      <v-btn
          elevation="2"
          icon
          @click="iconAction()">
        <v-img class="ma-2" :src="playIcon" />
      </v-btn>
    </div>
    <div v-if="isLose" class="dialog-bg">
        <v-btn
            elevation="2"
            icon
            @click="iconAction()">
          <v-img class="ma-2" :src="loseIcon" />
        </v-btn>
    </div>
    <div v-if="isWin" class="dialog-bg">
      <v-btn
          elevation="2"
          icon
          @click="iconAction()">
        <v-img class="ma-2" :src="winIcon" />
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
export default {
  computed: {
    ...mapGetters({
      isWin: "mainGame/isWin",
      isLose: "mainGame/isLose",
      isPlaying: "mainGame/isPlaying",
      gridSize: "gridSize/size"
    }),
    ...mapGetters("gridSquare", ["playIcon", "loseIcon", "winIcon"]),
  },
  methods: {
    ...mapActions({
      setGridSize: "gridSize/setGridSize",
      createMinesPattern: "gridPattern/createMinesPattern",
      restartGame: "mainGame/restartGame"
    }),
    iconAction() {
      this.createMinesPattern(this.gridSize);
      this.setGridSize(this.gridSize);
      this.restartGame();
    }
  }
};
</script>

<style lang="scss" scoped>
.v-btn {
  overflow: hidden;
}
.v-img {
  max-height: 36px;
  max-width: 36px;
}
.ma-2 {
  max-width: 40px
}
</style>
