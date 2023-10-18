<template>
  <div>
    <sp-detail class="heading">{{ label }}</sp-detail>
    <sp-body v-if="text">{{ text }}</sp-body>
    <slot />
  </div>
</template>

<script>
  export default {
    name: "Section",
    props: {
      label: String,
      text: String
    }
  };
</script>

<style lang="css" scoped>
  .heading {
    width: fit-content;
    padding: 0.2em 0.45em 0.3em 0.55em;
    margin-bottom: 0.75em;
    border-radius: 4px;
    background: var(--uxp-host-widget-hover-background-color);
  }
</style>
