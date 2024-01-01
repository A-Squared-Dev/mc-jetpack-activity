<template>
  <div class="field">
    <label class="label">Event Definition Key</label>
    <div class="control">
      <input class="input is-small" type="text" v-model="entry_eventDefinitionKey" :class="[ this.v$.entry_eventDefinitionKey.$errors.length ? 'is-danger' : '' ]" />
    </div>
  </div>

  <attributeRepeater :dataFields="entry_eventDefinitionFields" :dataAttributes="entry_dataAttributes" :errorObject="this.v$.entry_dataAttributes" />

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
import { helpers, required } from '@vuelidate/validators';

export default {
  setup () {
    return { v$: useVuelidate() }
  },
  components: { attributeRepeater },
  computed: {
    entry_eventDefinition: {
      get () {
        return this.$store.state.configModal.entry_eventDefinition;
      },
      set (value) {
        this.$store.commit('updateConfigModal', { key: 'entry_eventDefinition', value });
        this.v$.entry_eventDefinition.$touch();
      }
    },
    entry_eventDefinitionFields: {
      get () {
        return this.$store.state.configModal.entry_eventDefinitionFields;
      },
      set (value) {
        this.$store.commit('updateConfigModal', { key: 'entry_eventDefinitionFields', value });
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
      entry_eventDefinition: { required },
      entry_dataAttributes: {
        $each: helpers.forEach({
          key: { required },
          value: { required }
        })
      },
      entry_contactKey: { required }
    }
  }
}
</script>
