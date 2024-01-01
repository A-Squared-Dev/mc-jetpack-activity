<template>
  <div class="field">
    <label class="label">External Key</label>
    <div class="control">
      <input class="input is-small" type="text" v-model="upsert_externalKey" :class="[ this.v$.upsert_externalKey.$errors.length ? 'is-danger' : '' ]" />
    </div>
  </div>

  <attributeRepeater :dataFields="upsert_dataExtensionFields" :dataAttributes="upsert_dataAttributes" :errorObject="this.v$.upsert_dataAttributes" />
</template>

<script>
import attributeRepeater from '@/components/controllers/attributeRepeater';
import { useVuelidate } from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';

export default {
  setup () {
    return { v$: useVuelidate() }
  },
  components: { attributeRepeater },
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
