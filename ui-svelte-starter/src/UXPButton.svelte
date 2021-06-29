<script>
  export let variant;
  export let icon;
  export let href;
</script>

<div class="container">
  <sp-icons-medium></sp-icons-medium>
  <sp-button {variant} quiet>
    {#if icon}
      <sp-icon name="ui:{icon}" size="xxs" slot="icon"></sp-icon>
    {/if}
    <a {href}>Try Svelte</a> 
  </sp-button>
</div>

<style>
  .container {
    margin-top: 3px;
    padding: 2px;
  }

  sp-button a {
    color: var(--uxp-host-text-color);
    text-decoration: none; 
  }

  sp-button a:hover {
    text-decoration: none;
  }
</style>
