<script>
  import UXPButton from './UXPButton.svelte';
  import { onMount } from 'svelte';

  let count = 0;
  onMount(() => {
    const interval = setInterval(() => count++, 1000);
    return () => {
      clearInterval(interval);
    };
  });

  export let src;
</script>

<div class="container">
  <img {src} alt="svelte" height="75px" width="75px"/>
  <div class="body">
    <sp-heading>Plugin has been open for {count} seconds.</sp-heading>
    <sp-detail>Visit the <a href="https://www.adobe.io/photoshop/uxp/">UXP documentation</a> to learn how to build plugins for Photoshop.</sp-detail>
  </div>
  <UXPButton variant="primary" icon="ChevronRightSmall" href="https://svelte.dev/"/>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 0.5em;
    margin: 0 auto;
  }

  .body {
    text-align: center;
    font-size: 12px;
  }
  
  sp-detail a {
    color: #34a1eb;
    text-decoration: none; 
  }

  sp-detail a:hover {
    text-decoration: underline;
  }
</style>
