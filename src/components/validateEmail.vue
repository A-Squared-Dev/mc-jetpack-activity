<template>
  <div class="field">
    <label class="label">Email Address</label>
    <div class="control">
      <div class="select is-small is-fullwidth" :class="[
        this.v$.validation_email.$errors.length ? 'is-danger' : '',
        !dynamic_options ? 'is-loading' : ''
      ]">
        <select v-model="validation_email" :disabled="!dynamic_options.length">

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

  <div class="field">
    <label class="label">Validators</label>
    <div class="control">
      <label class="checkbox is-size-7">
        <input type="checkbox" v-model="validation_types" value="SyntaxValidator">
        Syntax
      </label>
      <label class="checkbox is-size-7">
        <input type="checkbox" v-model="validation_types" value="MXValidator">
        MX Records
      </label>
      <label class="checkbox is-size-7">
        <input type="checkbox" v-model="validation_types" value="ListDetectiveValidator">
        List Detective
      </label>
    </div>
    <p class="help mt-1 is-danger" v-if="this.v$.validation_types.$errors.length">Select at least one validator.</p>
  </div>
</template>

<style>
.checkbox.is-size-7 {
  display: flex;
  color: #363636;
}

.checkbox.is-size-7 + .checkbox.is-size-7 {
  margin-top: 5px;
}

.checkbox.is-size-7 input {
  margin-right: 5px;
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
    validation_email: {
      get () {
        return this.$store.state.configModal.validation_email;
      },
      set (value) {
        this.$store.commit('updateConfigModal', { key: 'validation_email', value });
        this.v$.validation_email.$touch();
      }
    },
    validation_types: {
      get () {
        return this.$store.state.configModal.validation_types;
      },
      set (value) {
        this.$store.commit('updateConfigModal', { key: 'validation_types', value });
        this.v$.validation_types.$touch();
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
      validation_email: { required },
      validation_types: { required }
    }
  }
}
</script>
