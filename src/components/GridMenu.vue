<template>
  <v-container class="text-center">
    <v-row>
      <play-icon />
    </v-row>
  </v-container>
</template>

<script>
import PlayIcon from "./PlayIcon";

export default {
  components: {
    PlayIcon
  }
};
</script>

<style lang="scss" scoped>
@media(max-width: 516px) {
  .container {
    order: 0;
    margin: 0;
  }
}
.row {
    align-content: center;
    align-items: center;
  }
</style>