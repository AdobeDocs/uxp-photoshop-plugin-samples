<template>
  <div class="plugin">
    <div class="pluginCard" @click="toggleDropdown">
      <img class="icon iconLight" :src="iconLight" />
      <img class="icon iconDark" :src="iconDark" />
      <sp-body size="S">{{ plugin.name }}</sp-body>
      <sp-icon class="chevron" :name="dropdown ? 'ui:ChevronDownSmall' : 'ui:ChevronRightSmall'" size="xs"></sp-icon>
    </div>
    <div v-if="dropdown" class="dropdown">
      <sp-divider class="dropdownDivider"></sp-divider>
      <Carousel v-if="plugin.type === 'uxp'" :images="media" />
      <Level :list="topInfo" />
      <template v-if="plugin.type === 'uxp'">
        <Section label="INFO" :text="latestVersion.localizedMetadata[0].values.description" />
        <Section label="WHAT'S NEW" :text="latestVersion.localizedMetadata[0].values.releaseNotes" />
        <Section label="CATEGORIES">
          <TagList :tags="categories" v-slot="{ tag }">
            {{ tag.name }}
          </TagList>
        </Section>
        <Section label="TAGS">
          <TagList :tags="storeInfo.localizedMetadata[0].values.keywords" v-slot="{ tag }">
            {{ tag }}
          </TagList>
        </Section>
      </template>
    </div>
  </div>
</template>

<script>
  import uxp from "uxp";
  import filesize from "filesize";

  import Section from "@/components/Section";
  import TagList from "@/components/TagList";
  import Level from "@/components/Level";
  import Carousel from "@/components/Carousel";

  export default {
    name: "Plugin",
    props: {
      plugin: Object
    },
    components: {
      Section,
      TagList,
      Level,
      Carousel
    },
    data() {
      return {
        iconLight: "",
        iconDark: "",
        dropdown: false,
        storeInfo: {},
        storeCategories: {}
      };
    },
    computed: {
      latestVersion() {
        return this.storeInfo.versions[this.storeInfo.versions.length - 1];
      },
      categories() {
        return this.storeInfo.appTags.map(tag => {
          return this.storeCategories.find(category => category.id === tag.id);
        });
      },
      topInfo() {
        let data = [];

        if (this.plugin.type === "uxp") {
          data = [
            {
              text: "Author",
              value: this.storeInfo.publisher.name
            },
            {
              text: "Version",
              value: `${this.latestVersion.version} (installed ${this.plugin.version})`
            },
            {
              text: "Type",
              value: "UXP"
            },
            {
              text: "Size",
              value: filesize(this.latestVersion.packageSize)
            }
          ];
        } else if (this.plugin.type === "cep") {
          data = [
            {
              text: "Version",
              value: this.plugin.version
            },
            {
              text: "Type",
              value: "CEP"
            }
          ];
        }

        return data;
      },
      media() {
        return this.latestVersion.media.map(media => media.image.link);
      }
    },
    async mounted() {
      if (this.plugin.type === "uxp") {
        const icons = this.plugin.manifest.icons;

        if (icons) {
          for (const icon of icons) {
            const src = await this.getImage(icon.path, "uxp");

            if (icon.theme.includes("light")) {
              this.iconLight = src;
            } else if (icon.theme.includes("dark")) {
              this.iconDark = src;
            }
          }
        }

        this.getPluginInfo(this.plugin.manifest.id);
        this.getCategories();
      } else if (this.plugin.type === "cep") {
        const iconTags = this.plugin.manifest.dom.documentElement.getElementsByTagName("Icon");

        const icons = [];

        for (let i = 0; i < iconTags.length; i++) {
          const icon = iconTags.item(i);

          icons.push({
            type: icon.attributes.getNamedItem("Type").value,
            path: icon.firstChild.data
          });
        }

        const normal = icons.find(icon => icon.type === "Normal");
        const darkNormal = icons.find(icon => icon.type === "DarkNormal");

        if (normal) {
          this.iconLight = await this.getImage(normal.path, "cep");
        }

        if (darkNormal) {
          this.iconDark = await this.getImage(darkNormal.path, "cep");
        }
      }
    },
    methods: {
      toggleDropdown() {
        this.dropdown = !this.dropdown;
      },
      getPluginInfo(id) {
        fetch(`https://appregistry.adobe.io/myxchng/v1/apps?appId=${id}&api_key=APP_AdobeExchange_PROD`)
          .then(res => res.json())
          .then(data => {
            this.storeInfo = data.extensions;
          });
      },
      getCategories() {
        fetch("https://appregistry.azureedge.net/getUXPcategories")
          .then(res => res.json())
          .then(data => {
            this.storeCategories = data.categories;
          });
      },
      async getImage(path, type) {
        const iconPath = path.split(/(\.)/);
        const extension = iconPath.pop();

        iconPath.pop();

        try {
          const entry = await this.plugin.folder.getEntry(
            iconPath.join("") + (type === "uxp" ? "@1x." : ".") + extension
          );
          const file = await entry.read({ format: uxp.storage.formats.binary });

          return `data:image/${extension};base64,` + Buffer.from(file).toString("base64");
        } catch (err) {
          console.error(err);

          return "";
        }
      }
    }
  };
</script>

<style lang="css" scoped>
  .pluginCard {
    display: flex;
    padding: 1em;
    border-radius: 4px;
    color: var(--uxp-host-text-color);
  }

  .plugin {
    margin: 0.4em 0;
    border: 1px solid;
    border-radius: 4px;
  }

  .pluginCard sp-body {
    margin: 0;
  }

  .pluginCard sp-button {
    padding: 0;
  }

  .icon {
    height: 24px;
    width: 24px;
    margin-right: 1em;
  }

  .chevron {
    color: var(--uxp-host-text-color-secondary);
    margin: auto 0.5em auto auto;
    align-self: flex-end;
  }

  .dropdown {
    padding: 0 1em 1em 1em;
  }

  .dropdown sp-divider {
    max-width: 95%;
    margin: auto;
    margin-bottom: 1em;
  }

  .dropdown * {
    margin-bottom: 1.5em;
  }

  .dropdown *:last-child {
    margin-bottom: 0em !important;
  }

  @media (prefers-color-scheme: light), (prefers-color-scheme: lightest) {
    .iconDark {
      display: none;
    }
  }

  @media (prefers-color-scheme: dark), (prefers-color-scheme: darkest) {
    .iconLight {
      display: none;
    }
  }

  @media (prefers-color-scheme: lightest) {
    .plugin {
      border-color: #d8d8d8;
      background-color: #fcfcfc;
    }

    .pluginCard:hover {
      background-color: #f5f5f5;
    }
  }

  @media (prefers-color-scheme: light) {
    .plugin {
      border-color: #9d9d9d;
      background-color: #d1d1d1;
    }

    .pluginCard:hover {
      background-color: #c9c9c9;
    }
  }

  @media (prefers-color-scheme: dark) {
    .plugin {
      border-color: #606060;
      background-color: #464646;
    }

    .pluginCard:hover {
      background-color: #3d3d3d;
    }
  }

  @media (prefers-color-scheme: darkest) {
    .plugin {
      border-color: #424242;
      background-color: #292929;
    }

    .pluginCard:hover {
      background-color: #212121;
    }
  }
</style>
