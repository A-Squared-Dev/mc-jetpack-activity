<template>
  <table class="table is-fullwidth mb-0" v-if="dataAttributes.length > 0">
    <thead>
      <tr>
        <th colspan="2">Attribute</th>
        <th colspan="2">Value</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(attribute, index) in dataAttributes" :key="index">
        <td style="width: 50%;">
          <div class="control">
            <input class="input is-small" type="text" v-model="attribute.key" :class="[ errorObject.$each.$response.$errors[index].key.length ? 'is-danger' : '' ]" />
          </div>
        </td>
        <td style="vertical-align: middle;">&#10141;</td>
        <td style="width: 50%;">
          <div class="control">
            <input class="input is-small" type="text" v-model="attribute.value" :class="[ errorObject.$each.$response.$errors[index].value.length ? 'is-danger' : '' ]" />
          </div>
        </td>
        <td style="width: 16px; padding-left: 0px;">
          <button class="button is-small is-rounded is-danger is-light is-inverted" v-on:click="deleteAttribute(index, $event)" :disabled="dataAttributes.length < 2">&#10005;</button>
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="4" style="padding-right: 0px;">
          <div class="buttons is-right">
            <button class="button is-small is-link is-light" v-on:click="addAttribute" :disabled="errorObject.$invalid">Add Attribute</button>
          </div>
        </td>
      </tr>
    </tfoot>
  </table>
</template>

<style>
.button.is-danger.is-light,
.button.is-danger.is-light:hover,
.button.is-danger.is-light.is-hovered,
.button.is-danger.is-inverted[disabled],
fieldset[disabled] .button.is-danger.is-inverted {
  background-color: #ffffff;
  color: #cc0f35;
}

.button.is-link[disabled],
fieldset[disabled] .button.is-link {
  border-color: #eff1fa;
}

.button.is-link.is-light:hover,
.button.is-link.is-light.is-hovered {
  background-color: #eff1fa;
}
</style>

<script>
export default {
  props: [ 'dataAttributes', 'errorObject' ],
  methods: {
    addAttribute (element) {
      element.preventDefault();

      this.dataAttributes.push({
        key: '',
        value: ''
      });
    },
    deleteAttribute (index, element) {
      element.preventDefault();

      this.dataAttributes.splice(index, 1);
    }
  }
}
</script>
