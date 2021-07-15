<template>
  <div class="container">
    <sp-label class="category" v-for="(tag, i) in tags" :key="i">
      <slot :tag="tag" />
    </sp-label>
  </div>
</template>

<script>
  export default {
    name: "TagList",
    props: {
      tags: {
        type: Array,
        required: true
      }
    }
  };
</script>

<style lang="css" scoped>
  .container {
    display: flex;
    flex-flow: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
  }

  .category {
    margin: 0.5em;
    padding: 0.5em;
    border: 1px solid currentColor;
    border-radius: 4px;
    font-size: 1em;
  }
</style>
