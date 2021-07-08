<template>
  <div class="container">
    <div class="icon left" v-show="selected > 0" @click="imageIndex--">
      <sp-icon size="xs" name="ui:ChevronLeftMedium" @click="imageIndex--"></sp-icon>
    </div>
    <div class="icon right" v-show="selected < images.length - 1" @click="imageIndex++">
      <sp-icon size="xs" name="ui:ChevronRightMedium" @click="imageIndex++"></sp-icon>
    </div>
    <img class="image" :src="images[selected]" />
    <div class="indicators">
      <svg
        class="indicator"
        :class="{ highlighted: selected === i }"
        height="12"
        width="12"
        v-for="(image, i) in images"
        :key="i"
      >
        <circle cx="6" cy="6" r="5" />
      </svg>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Carousel",
    props: {
      images: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        imageIndex: 0
      };
    },
    computed: {
      selected() {
        return this.imageIndex;
      }
    }
  };
</script>

<style lang="css" scoped>
  .container {
    position: relative;
  }

  .icon {
    display: flex;
    position: absolute;
    padding: 0.6em;
    border: 1px solid;
    border-radius: 50%;
    color: var(--uxp-host-text-color-secondary);
  }

  .left {
    left: -8px;
  }

  .right {
    right: -8px;
  }

  .image {
    width: 100%;
  }

  .indicators {
    display: flex;
    flex-flow: row nowrap;
  }

  .indicator {
    margin: 0.5em 0.25em;
    fill: var(--uxp-host-background-color);
  }

  .highlighted {
    fill: var(--uxp-host-text-color-secondary);
  }

  @media (prefers-color-scheme: lightest) {
    .icon {
      border-color: #fcfcfc;
      background-color: #fcfcfc;
    }

    .icon:hover {
      background-color: #f5f5f5;
    }
  }

  @media (prefers-color-scheme: light) {
    .icon {
      border-color: #d1d1d1;
      background-color: #d1d1d1;
    }

    .icon:hover {
      background-color: #c9c9c9;
    }
  }

  @media (prefers-color-scheme: dark) {
    .icon {
      border-color: #464646;
      background-color: #464646;
    }

    .icon:hover {
      background-color: #3d3d3d;
    }
  }

  @media (prefers-color-scheme: darkest) {
    .icon {
      border-color: #292929;
      background-color: #292929;
    }

    .icon:hover {
      background-color: #212121;
    }
  }
</style>
