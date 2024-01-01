<template>
  <div class="field">
    <label class="label">Data Extension</label>
    <div class="control">
      <dataExtensionSearch :dataExtension="upsert_dataExtension" @update:dataExtension="updateDataExtension" @update:dataExtensionFields="updateDataExtensionFields" :errorObject="this.v$.upsert_dataExtension" />
    </div>
  </div>

  <attributeRepeater :dataFields="upsert_dataExtensionFields" :dataAttributes="upsert_dataAttributes" :errorObject="this.v$.upsert_dataAttributes" />
</template>

<script>
import dataExtensionSearch from '@/components/controllers/dataExtensionSearch';
import attributeRepeater from '@/components/controllers/attributeRepeater';
import { useVuelidate } from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';

export default {
  setup () {
    return { v$: useVuelidate() }
  },
  components: {
    dataExtensionSearch,
    attributeRepeater
  },
  computed: {
    upsert_dataExtension: {
      get () {
        return this.$store.state.configModal.upsert_dataExtension;
      },
      set (value) {
        this.$store.commit('updateConfigModal', { key: 'upsert_dataExtension', value });
        this.v$.upsert_dataExtension.$touch();
      }
    },
    upsert_dataExtensionFields: {
      get () {
        return this.$store.state.configModal.upsert_dataExtensionFields;
      },
      set (value) {
        this.$store.commit('updateConfigModal', { key: 'upsert_dataExtensionFields', value });
      }
    },
    upsert_dataAttributes: {
      get () {
        return this.$store.state.configModal.upsert_dataAttributes;
      },
      set (value) {
        this.$store.commit('updateConfigModal', { key: 'upsert_dataAttributes', value });
        this.v$.upsert_dataAttributes.$touch();
      }
    }
  },
  methods: {
    updateDataExtension (value) {
      this.upsert_dataExtension = value;
      this.upsert_dataExtensionFields = []
      this.upsert_dataAttributes = [{
        key: null,
        type: null,
        required: null,
        value: null
      }]
    },
    updateDataExtensionFields (value) {
      this.upsert_dataExtensionFields = value;

      var requiredFields = []

      if (value.length > 0) {
        for (let i = 0; i < value.length; i++) {
          if (value[i].IsRequired === 'true') {
            requiredFields.push(value[i]);
          }
        }
      }

      if (requiredFields.length > 0) {
        for (let i = 0; i < requiredFields.length; i++) {
          this.upsert_dataAttributes = [{
            key: requiredFields[i].Name,
            type: requiredFields[i].FieldType,
            required: requiredFields[i].IsRequired,
            value: null
          }]
        }
      }
    }
  },
  validations () {
    return {
      upsert_dataExtension: { required },
      upsert_dataAttributes: {
        $each: helpers.forEach({
          key: { required },
          value: { required }
        })
      }
    }
  }
}
</script>
