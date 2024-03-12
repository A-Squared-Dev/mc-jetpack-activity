<template>
  <div class="field">
    <label class="label">Contact Key</label>
    <div class="control">
      <schemaDropdown v-model="deletion_contactKey" :errorObject="this.v$.deletion_contactKey" :typesArray="['Text']" />
    </div>
  </div>
</template>

<style>
.select.is-danger:not(:hover)::after {
  border-color: #dbdbdb;
}
</style>

<script>
import schemaDropdown from '../components/controllers/schemaDropdown.vue';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';

export default {
  setup () {
    return { v$: useVuelidate() }
  },
  components: { schemaDropdown },
  computed: {
    deletion_contactKey: {
      get () {
        return this.$store.state.configModal.deletion_contactKey;
      },
      set (value) {
        this.$store.commit('updateConfigModal', { key: 'deletion_contactKey', value });
        this.v$.deletion_contactKey.$touch();
      }
    }
  },
  validations () {
    return {
      deletion_contactKey: { required }
    }
  }
}
</script>
