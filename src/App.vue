<template>
  <v-app>
    <v-content>
      <v-row justify="center">
        <grid-menu />
      </v-row>
      <v-row justify="center">
        <main-grid />
      </v-row>
    </v-content>
  </v-app>
</template>

<script>
import GridMenu from "./components/GridMenu";
import MainGrid from "./components/MainGrid";

export default {
  name: "App",
  components: {
    GridMenu,
    MainGrid,
  }
};
</script>

<style lang="scss">
#app {
  min-height:100px;
}
.container {
  width: auto;
  margin: auto 0;
}
.row {
  margin-left: 0;
  margin-right: 0;
}
</style>
