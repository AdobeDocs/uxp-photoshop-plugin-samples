<template>
  <div>
    <sp-heading class="heading">
      <sp-icon
        class="icon"
        :class="success ? 'success' : 'failure'"
        size="s"
        :name="success ? 'ui:SuccessSmall' : 'ui:AlertSmall'"
      ></sp-icon>
      {{ title }}
    </sp-heading>
    <sp-divider class="divider"></sp-divider>
    <sp-body>
      {{ label }}
      <span class="highlight">{{ labelHighlight || ". . ." }}</span>
    </sp-body>
    <sp-button class="button" variant="primary" @click="$emit('click', $event)">Select Directory</sp-button>
  </div>
</template>

<script>
  export default {
    name: "SetupStep",
    props: {
      title: String,
      label: String,
      labelHighlight: String,
      success: Boolean
    }
  };
</script>

<style lang="css" scoped>
  .divider {
    margin: 0.75em 0;
    max-width: 100%;
  }

  .highlight {
    display: inline-block;
    padding: 0.2em 0.4em;
    margin-top: 0.25em;
    border-radius: 4px;
    background-color: #343132;
  }

  .icon {
    margin-right: 0.1em;
  }

  .success {
    color: #2e9d78;
  }

  .failure {
    color: #db5a60;
  }
</style>
