<template>
  <div class="field">
    <label class="label">Event Definition Key</label>
    <div class="control">
      <input class="input is-small" type="text" v-model="entry_eventDefinitionKey" :class="[ this.v$.entry_eventDefinitionKey.$errors.length ? 'is-danger' : '' ]" />
    </div>
  </div>

  <attributeRepeater :dataAttributes="entry_dataAttributes" />

  <div class="field">
    <label class="label">Contact Key</label>
    <div class="control">
      <input class="input is-small" type="text" v-model="entry_contactKey" :class="[ this.v$.entry_contactKey.$errors.length ? 'is-danger' : '' ]" />
    </div>
  </div>
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
    entry_eventDefinitionKey: {
      get () {
        return this.$store.state.configModal.entry_eventDefinitionKey;
      },
      set (value) {
        this.$store.commit('updateConfigModal', { key: 'entry_eventDefinitionKey', value });
        this.v$.entry_eventDefinitionKey.$touch();
      }
    },
    entry_dataAttributes: {
      get () {
        return this.$store.state.configModal.entry_dataAttributes;
      },
      set (value) {
        this.$store.commit('updateConfigModal', { key: 'entry_dataAttributes', value });
        this.v$.entry_dataAttributes.$touch();
      }
    },
    entry_contactKey: {
      get () {
        return this.$store.state.configModal.entry_contactKey;
      },
      set (value) {
        this.$store.commit('updateConfigModal', { key: 'entry_contactKey', value });
        this.v$.entry_contactKey.$touch();
      }
    }
  },
  validations () {
    return {
      entry_eventDefinitionKey: { required },
      entry_contactKey: { required }
    }
  }
}
</script>
