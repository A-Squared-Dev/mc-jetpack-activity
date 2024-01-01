<template>
  <div class="field">
    <div class="tile is-ancestor mb-0 is-flex-wrap-wrap">
      <div v-for="item in configTypes" :key="item.id" class="tile is-3 is-parent">
        <a v-on:click="selectType(item.id, $event)" class="tile is-child box" :class="tileClasses(item.id, config_type)">
          <p class="title is-5 mb-2">{{ item.title }}</p>
          {{ item.description }}
        </a>
      </div>
    </div>
    <p class="help is-danger mt-0 mb-1" v-if="this.v$.config_type.$errors.length">Select a configuration type.</p>
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
import configTypes from '../data/configTypes';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';

export default {
  setup () {
    return { v$: useVuelidate() }
  },
  data () {
    return {
      configTypes: configTypes
    }
  },
  computed: {
    config_type: {
      get () {
        return this.$store.state.configModal.config_type;
      },
      set (value) {
        this.$store.commit('updateConfigModal', { key: 'config_type', value });
      }
    }
  },
  methods: {
    selectType (value, element) {
      element.preventDefault();

      this.config_type = value;
    },
    tileClasses (item, currentItem) {
      if (item === currentItem) {
        return 'enabled';
      } else if (item !== currentItem && currentItem) {
        return 'disabled';
      }
    }
  },
  validations () {
    return {
      config_type: { required }
    }
  }
}
</script>
