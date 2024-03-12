<template>
  <div class="field">
    <label class="label">Email Address</label>
    <div class="control">
      <schemaDropdown v-model="validation_email" :errorObject="this.v$.validation_email" :typesArray="['Text', 'EmailAddress']" />
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
import schemaDropdown from '../components/controllers/schemaDropdown.vue';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';

export default {
  setup () {
    return { v$: useVuelidate() }
  },
  components: { schemaDropdown },
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
