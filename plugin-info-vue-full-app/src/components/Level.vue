<template>
  <div class="sideBySide">
    <div class="container" v-for="(item, i) in list" :key="i">
      <sp-detail>{{ item.text }}</sp-detail>
      <sp-label>{{ item.value }}</sp-label>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Level",
    props: {
      list: {
        type: Array,
        required: true
      }
    }
  };
</script>

<style lang="css" scoped>
  .sideBySide {
    display: flex;
    margin-bottom: 1em;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
  }

  .container {
    display: flex;
    margin: 0.5em;
    flex-flow: row;
    align-items: center;
    gap: 1em;
  }

  .container sp-detail,
  .container sp-label {
    margin: 0;
    padding: 0;
    line-height: 0;
  }

  .container sp-detail {
    margin-right: 0.5em;
  }
</style>
