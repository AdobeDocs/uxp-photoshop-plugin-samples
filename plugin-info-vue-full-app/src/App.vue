<template>
  <div id="app">
    <div v-if="plugins.length < 1 || setup" class="container">
      <Setup v-if="setup" @setupComplete="setupComplete" />
      <template v-else>
        <sp-heading class="heading" size="L">Plugin Info</sp-heading>
        <sp-divider class="divider"></sp-divider>
        <sp-detail>Welcome to Plugin Info! Locate your plugin directories to get started!</sp-detail>
        <sp-button class="button" @click="start">{{ hasToken ? "Continue" : "Load Plugins" }}</sp-button>
        <sp-button v-if="hasToken" class="button" size="xxs" variant="secondary" @click="setup = true" quiet>
          Reload Plugins
        </sp-button>
      </template>
    </div>
    <div v-else class="list">
      <Plugin v-for="(plugin, i) in plugins" :key="i" :plugin="plugin" />
    </div>
  </div>
</template>

<script>
  import { storage } from "uxp";
  import utils from "@/lib/utils";

  import Plugin from "@/components/Plugin";
  import Setup from "@/components/Setup";

  const fs = storage.localFileSystem;

  export default {
    name: "App",
    components: {
      Plugin,
      Setup
    },
    data() {
      return {
        setup: false,
        plugins: [],
        uxpToken: localStorage.getItem("uxpToken"),
        cepToken: localStorage.getItem("cepToken")
      };
    },
    computed: {
      hasToken() {
        return this.uxpToken || this.cepToken;
      }
    },
    methods: {
      start() {
        if (this.hasToken) {
          this.loadPlugins();
        } else {
          this.setup = true;
        }
      },
      setupComplete(tokens) {
        this.uxpToken = tokens.uxpToken;
        this.cepToken = tokens.cepToken;

        this.setup = false;

        this.loadPlugins();
      },
      async loadPlugins() {
        this.plugins = [];

        if (this.uxpToken) {
          try {
            const uxpDir = await fs.getEntryForPersistentToken(this.uxpToken);

            this.plugins = this.plugins.concat(await utils.loadPlugins(uxpDir, "uxp"));
          } catch (err) {
            console.error(err);

            this.uxpToken = "";

            localStorage.setItem("uxpToken", "");
          }
        }

        if (this.cepToken) {
          try {
            const cepDir = await fs.getEntryForPersistentToken(this.cepToken);

            this.plugins = this.plugins.concat(await utils.loadPlugins(cepDir, "cep"));
          } catch (err) {
            console.error(err);

            this.cepToken = "";

            localStorage.setItem("cepToken", "");
          }
        }

        if (!this.uxpToken && !this.cepToken) {
          this.setup = true;
        }
      }
    }
  };
</script>

<style>
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    padding: 12px;
    height: 100%;
  }

  html,
  body {
    margin: 0;
    height: 100%;
    width: 100%;
    overflow: auto;
  }

  .heading {
    margin-top: 0;
  }

  .divider {
    margin-top: 0.5em;
    margin-bottom: 0.75em;
    max-width: 50%;
  }

  .container {
    display: flex;
    flex-flow: column;
    text-align: center;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .button {
    margin-top: 2em;
  }

  .button:last-child {
    margin-top: 1em;
    font-size: 1.1em;
  }

  .list {
    padding-bottom: 1em;
  }
</style>
