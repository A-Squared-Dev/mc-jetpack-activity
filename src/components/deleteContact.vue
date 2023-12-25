<template>
  <div class="field">
    <label class="label">Contact Key</label>
    <div class="control">
      <div class="select is-small is-fullwidth" :class="[
        this.v$.deletion_contactKey.$errors.length ? 'is-danger' : '',
        !dynamic_options ? 'is-loading' : ''
      ]">
        <select v-model="deletion_contactKey" :disabled="!dynamic_options.length">

          <option selected disabled hidden value="" v-if="!dynamic_options">Loading...</option>
          <option selected disabled hidden value="" v-if="!dynamic_options.length">No fields available...</option>
          <option selected disabled hidden value="" v-if="dynamic_options.length">Select a field...</option>

          <option v-for="option in dynamic_options" :value="option.key" :key="option.key">
            {{ option.name }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<style>
.select.is-danger:not(:hover)::after {
  border-color: #dbdbdb;
}
</style>

<script>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';

export default {
  setup () {
    return { v$: useVuelidate() }
  },
  computed: {
    deletion_contactKey: {
      get () {
        return this.$store.state.configModal.deletion_contactKey;
      },
      set (value) {
        this.$store.commit('updateConfigModal', { key: 'deletion_contactKey', value });
        this.v$.deletion_contactKey.$touch();
      }
    },
    dynamic_options () {
      var schema_array = this.$store.state.jbSchema.schema || false;
      var types_array = ['Text', 'EmailAddress', 'Phone', 'Date'];

      if (schema_array) {
        return schema_array.filter(function (object) {
          var key_format = object.key.replace(/[{}/"]/g, '');
          var key_split = key_format.split('.');

          object.key = `{{${key_split[0]}.${key_split[1]}."${key_split[2]}"}}`;

          return types_array.includes(object.type);
        });
      } else {
        return schema_array;
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
