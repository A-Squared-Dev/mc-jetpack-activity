<template>
  <div class="select is-small is-fullwidth" :class="[
    errorObject.$errors.length > 0 ? 'is-danger' : '',
    !dynamic_options(typesArray) ? 'is-loading' : ''
  ]">
    <select :v-model="modelValue" @input="$emit('update:modelValue', $event.target.value)" :disabled="!dynamic_options.length">

      <option selected disabled hidden value="" v-if="!dynamic_options(typesArray)">Loading...</option>
      <option selected disabled hidden value="" v-if="!dynamic_options(typesArray).length">No fields available...</option>
      <option selected disabled hidden value="" v-if="dynamic_options(typesArray).length">Select a field...</option>

      <option v-for="option in dynamic_options(typesArray)" :value="option.key" :key="option.key">
        {{ option.name }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: [ 'modelValue', 'errorObject', 'typesArray' ],
  methods: {
    dynamic_options (types_array) {
      var schema_array = this.$store.state.jbSchema.schema || false;

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
  }
}
</script>
