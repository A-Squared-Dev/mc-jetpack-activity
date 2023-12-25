<template>
  <div class="field">
    <label class="label">External Key</label>
    <div class="control">
      <input class="input is-small" type="text" v-model="upsert_externalKey" :class="[ this.v$.upsert_externalKey.$errors.length ? 'is-danger' : '' ]" />
    </div>
  </div>

  <attributeRepeater :dataAttributes="upsert_dataAttributes" />
</template>

<script>
import attributeRepeater from '@/components/controllers/attributeRepeater';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';

export default {
  setup () {
    return { v$: useVuelidate() }
  },
  components: { attributeRepeater },
  computed: {
    upsert_externalKey: {
      get () {
        return this.$store.state.configModal.upsert_externalKey;
      },
      set (value) {
        this.$store.commit('updateConfigModal', { key: 'upsert_externalKey', value });
        this.v$.upsert_externalKey.$touch();
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
      upsert_externalKey: { required }
    }
  }
}
</script>
