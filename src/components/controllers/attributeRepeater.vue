<template>
  <table class="table is-fullwidth mb-0" v-if="dataFields.length > 0">
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
            <div class="select is-small is-fullwidth" :class="[ errorObject.$each.$response.$errors[index].key.length > 0 ? 'is-danger' : '' ]">
              <select v-model="attribute.key" :disabled="attribute.required === 'true'" @change="selectAttribute">
                <option :selected="!attribute.key" disabled value="">Select a field...</option>

                <option v-if="attribute.key" :selected="true">
                  {{ attribute.key }}
                </option>

                <option v-for="option in distinctDataFields" :value="option.Name" :key="option.Name">
                  {{ option.Name }}
                </option>
              </select>
            </div>
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
            <button class="button is-small is-link is-light" v-on:click="addAttribute" :disabled="errorObject.$invalid || distinctDataFields.length === 0">Add Attribute</button>
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
  props: [ 'dataFields', 'dataAttributes', 'errorObject' ],
  computed: {
    distinctDataFields: {
      get () {
        return this.dataFields.filter(a => !this.dataAttributes.some(b => b.key === a.Name));
      }
    }
  },
  methods: {
    addAttribute (element) {
      element.preventDefault();

      this.dataAttributes.push({
        key: null,
        type: null,
        required: null,
        value: null
      });
    },
    deleteAttribute (index, element) {
      element.preventDefault();
      element.target.blur();

      this.dataAttributes.splice(index, 1);
    },
    selectAttribute (element) {
      var currentValue = element.target.value;
      var dataFields = this.dataFields;
      var dataAttributes = this.dataAttributes;

      var thisObject = dataAttributes.find(object => object.key === currentValue);
      var sourceObject = dataFields.find(object => object.Name === currentValue);
      var objectIndex = dataAttributes.findIndex(object => object === thisObject);

      this.dataAttributes[objectIndex] = {
        key: thisObject.key,
        type: sourceObject.FieldType,
        required: sourceObject.IsRequired,
        value: thisObject.value
      }
    }
  }
}
</script>
