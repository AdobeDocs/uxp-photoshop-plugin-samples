<script>
  import { onMount } from "svelte";

  let count = 0;
  onMount(() => {
    const interval = setInterval(() => count++, 1000);
    return () => {
      clearInterval(interval);
    };
  });

  export let name;
</script>

<div>
  <sp-heading>Hello {name}!</sp-heading>
  <sp-heading>Plugin has been open for {count} seconds.</sp-heading>
  <sp-detail>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</sp-detail>
</div>

<style>
  div {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }
</style>
