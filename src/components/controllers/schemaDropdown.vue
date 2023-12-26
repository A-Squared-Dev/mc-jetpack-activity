<template>
  <div class="select is-small is-fullwidth" :class="[
    errorObject.$errors.length > 0 ? 'is-danger' : '',
    !optionsLoaded && !optionsCount ? 'is-loading' : ''
  ]">
    <select :v-model="modelValue" @input="$emit('update:modelValue', $event.target.value)" :disabled="!optionsArray.length">

      <option selected disabled hidden value="" v-if="!optionsLoaded && !optionsCount">Loading...</option>
      <option selected disabled hidden value="" v-if="!optionsArray.length">No fields available...</option>
      <option selected disabled hidden value="" v-if="optionsArray.length">Select a field...</option>

      <option v-for="option in optionsArray" :value="option.key" :key="option.key">
        {{ option.name }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: [ 'modelValue', 'errorObject', 'typesArray' ],
  data () {
    return {
      optionsArray: [],
      optionsCount: null,
      optionsLoaded: false
    }
  },
  methods: {
    getOptions (typesArray) {
      var schemaArray = this.$store.state.jbSchema.schema;

      if (schemaArray) {
        this.optionsArray = schemaArray.filter(function (object) {
          var key_format = object.key.replace(/[{}/"]/g, '');
          var key_split = key_format.split('.');

          object.key = `{{${key_split[0]}.${key_split[1]}."${key_split[2]}"}}`;

          return typesArray.includes(object.type);
        });
      }

      this.optionsCount = 1;
      this.optionsLoaded = true;
    }
  },
  created () {
    this.getOptions(this.$props.typesArray);
  }
}
</script>
