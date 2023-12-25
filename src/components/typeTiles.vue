<template>
  <div class="tile is-ancestor mb-0 is-flex-wrap-wrap">
    <div v-for="item in configTypes" :key="item.id" class="tile is-3 is-parent">
      <a v-on:click="selectType(item.id, $event)" :class="tileClasses(item.id, configType)">
        <p class="title is-5 mb-2">{{ item.title }}</p>
        {{ item.description }}
      </a>
    </div>
  </div>
</template>

<style>
a.box,
a.box:hover,
a.box:focus {
  box-shadow: 0 0.25em 0.5em -0.125em rgba(10, 10, 10, 0.1), 0 0 0 1px #d2d2d2;
}

a.box.enabled {
  box-shadow: 0 0.25em 0.5em -0.125em rgba(72, 95, 199, 0.25), 0 0 0 1px #485fc7;
}

a.box.disabled {
  opacity: 0.6;
}

@media screen and (min-width: 420px) and (max-width: 768px), print {
  .tile:not(.is-child) {
    display: flex;
  }

  .tile.is-3 {
    flex: 50%;
  }
}
</style>

<script>
export default {
  computed: {
    configType: {
      get () {
        return this.$store.state.configType;
      },
      set (value) {
        this.$store.commit('updateConfigType', value);
      }
    },
    configTypes: {
      get () {
        return this.$store.state.configTypes;
      }
    }
  },
  methods: {
    selectType (value, element) {
      element.preventDefault();

      this.configType = value;
      // this.scrollToForm();
    },
    tileClasses (item, currentItem) {
      var defaultClasses = 'tile is-child box';

      if (item === currentItem) {
        return defaultClasses + ' enabled';
      }
      else if (item !== currentItem && currentItem) {
        return defaultClasses + ' disabled';
      } else {
        return defaultClasses;
      }
    },
    scrollToForm () {
      document.getElementById("configForm").scrollIntoView({ behavior: 'smooth' });
    }
  }
}
</script>
