<template>
  <section class="section pt-5">
    <form id="configForm">
      <typeTiles />

      <validateEmail v-if="configType === 1" />
      <upsertDE v-if="configType === 2" />
      <entryEvent v-if="configType === 3" />
      <deleteContact v-if="configType === 4" />

      <div v-if="isDevelopment">
        <div class="field is-grouped is-grouped-centered">
          <div class="control">
            <button class="button is-small is-light" v-on:click="formCancel">Cancel</button>
          </div>

          <div class="control">
            <button class="button is-small is-link" v-on:click="formSave">Save</button>
          </div>
        </div>

        <div class="tags mb-0">
          <span class="tag">Debug</span>
          <span class="tag is-warning is-light">State</span>
        </div>
        <pre>{{ this.$store.state }}</pre>
      </div>
    </form>
  </section>
</template>

<script>
import customActivity from '../mixins/customActivity';
import typeTiles from '../components/typeTiles.vue';
import validateEmail from '../components/validateEmail.vue';
import upsertDE from '../components/upsertDE.vue';
import entryEvent from '../components/entryEvent.vue';
import deleteContact from '../components/deleteContact.vue';
import { useVuelidate } from '@vuelidate/core';

const NODE_ENV = process.env.NODE_ENV || 'development';

export default {
  name: 'Main',
  mixins: [ customActivity ],
  components: {
    typeTiles,
    validateEmail,
    upsertDE,
    entryEvent,
    deleteContact
  },
  setup () {
    return { v$: useVuelidate() }
  },
  data () {
    return {
      isDevelopment: NODE_ENV === 'development'
    }
  },
  computed: {
    configType: {
      get () {
        return this.$store.state.configModal.config_type;
      }
    }
  },
  methods: {
    formCancel (element) {
      element.preventDefault();

      this.destroy();
    },
    formSave (element) {
      element.preventDefault();

      this.clickedNext();
    }
  }
}
</script>
