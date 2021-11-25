<template>
  <form style="padding: 20px">
    <sp-heading>
      {{ message }}
    </sp-heading>
    <sp-body> Button has been clicked {{ count }} times. </sp-body>
    <sp-button v-on:click="increment">Click me</sp-button>
  </form>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    let count = ref(0);
    const message = "Hello World Vue 3 Component!";

    const increment = () => {
      count.value++;
    };
    return { count, message, increment };
  },
};
</script>
