<template>
  <VueMultiselect :class="errorObject.$errors.length > 0 ? 'is-danger' : '' || searchLoading || inputCount === 0 ? 'is-loading' : ''" v-model="inputValue" @select="searchSelect($emit, $event)" :options="dataExtensionResults" :options-limit="10" label="Name" track-by="CustomerKey" placeholder="Search data extensions..." :allow-empty="false" :show-labels="false" open-direction="bottom" :preserve-search="true" :close-on-select="true" :clear-on-select="false" :show-no-options="false" :show-no-results="inputCount > 0 || dataExtensionResults.length > 0" :loading="searchLoading" :disabled="false" @search-change="searchDataExtension" @input="searchInput" :hide-selected="true">
    <template #noResult>
      <p v-if="inputCount > 4">No data extensions found.</p>
      <p class="help is-danger" :class="inputCount > 4 ? 'mt-1' : 'mt-0'" v-if="inputCount < 5">Input at least five characters to search.</p>
    </template>
  </VueMultiselect>
</template>

<style>
@import 'vue-multiselect/dist/vue-multiselect.css';

.multiselect {
  min-height: auto;
}

.multiselect:hover .multiselect__select::before {
  color: #363636;
}

.multiselect:hover .multiselect__tags {
  border-color: #b5b5b5;
}

.multiselect--active:hover .multiselect__tags,
.multiselect--active .multiselect__tags {
  border-color: #485fc7;
  box-shadow: 0 0 0 0.125em rgba(72, 95, 199, 0.25);
}

.multiselect__tags {
  border-radius: 2px;
  min-height: auto;
  border-color: #dbdbdb;
  padding: 0px 2.5em 0px 0px;
  font-size: 0.75rem;
  height: 2.5em;
  box-shadow: inset 0 0.0625em 0.125em rgba(10, 10, 10, 0.05);
}

.is-danger .multiselect__tags,
.is-danger .multiselect__tags:hover {
  border-color: #f14668;
}

.is-danger.multiselect--active .multiselect__tags {
  box-shadow: 0 0 0 0.125em rgba(241, 70, 104, 0.25);
}

.multiselect__select {
  transition: none;
  transform: rotateZ(180deg);
}

.multiselect__select::before {
  content: "\0260C";
  margin: 0px;
  border: none;
  color: #485fc7;
  top: 4px;
}

.is-danger .multiselect__select::before {
  color: #dbdbdb;
}

.multiselect__select,
.multiselect__spinner {
  height: 28px;
  width: 30px;
  padding: 0px;
  font-size: 20px;
  line-height: 20px;
}

.multiselect__spinner::before,
.multiselect__spinner::after {
  border-color: #485fc7 transparent transparent;
}

.multiselect__input,
.multiselect__single,
.multiselect__placeholder {
  margin: 0px;
  padding: 0px 0px 0px calc(0.75em - 1px);
  display: block;
  height: 100%;
  width: 100%;
  line-height: calc(2.5em - 2px);
  font-size: inherit;
}

.multiselect--active:not(.multiselect--above) .multiselect__current,
.multiselect--active:not(.multiselect--above) .multiselect__input,
.multiselect--active:not(.multiselect--above) .multiselect__tags {
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
}

.multiselect__input,
.multiselect__single {
  color: #363636;
}

.multiselect__placeholder {
  color: rgba(54, 54, 54, 0.3);
}

::placeholder {
  color: rgba(54, 54, 54, 0.3) !important;
}

::-ms-input-placeholder {
  color: rgba(54, 54, 54, 0.3) !important;
}

.multiselect__content-wrapper {
  border-radius: 0px;
  border: none;
}

.is-danger .multiselect__content-wrapper,
.is-loading .multiselect__content-wrapper {
  display: none !important;
}

.multiselect__content-wrapper .multiselect__content {
  border: 1px solid #b5b5b5;
  border-top: none;
  border-radius: 2px;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
}

.multiselect__option {
  min-height: auto;
  padding: 8px;
  font-size: 0.75em;
}

.multiselect__option,
.multiselect__option--highlight {
  background-color: #ffffff;
  color: #363636;
}

.multiselect__element:hover .multiselect__option {
  background-color: whitesmoke;
}
</style>

<script>
import httpActivity from '@/mixins/httpActivity';
import { useVuelidate } from '@vuelidate/core';
import VueMultiselect from 'vue-multiselect';
import { parse } from 'tldts';

export default {
  props: [ 'dataExtension', 'errorObject' ],
  mixins: [ httpActivity ],
  components: { VueMultiselect },
  setup () {
    return { v$: useVuelidate() }
  },
  data () {
    return {
      inputValue: this.dataExtension,
      inputCount: 0,
      dataExtensionResults: [],
      searchLoading: false
    }
  },
  methods: {
    async searchDataExtension (searchTerm) {
      var endpointSubdomain = parse(this.$store.state.jbEndpoints.authTSSD).subdomain.replace('.auth', '');
      var accessToken = this.$store.state.jbTokens.fuel2token;

      if (searchTerm.length > 4) {
        this.searchLoading = true;

        this.dataExtensionSearch(accessToken, endpointSubdomain, 'Name', 'like', searchTerm)
          .then((response) => {
            this.dataExtensionResults = response;
            this.searchLoading = false;
          });
      }
    },
    async searchInput (searchElement) {
      this.inputCount = searchElement.target.value.length;
    },
    async searchSelect (emit, dataExtension) {
      this.searchLoading = true;
      
      emit('update:dataExtension', dataExtension);

      var endpointSubdomain = parse(this.$store.state.jbEndpoints.authTSSD).subdomain.replace('.auth', '');
      var accessToken = this.$store.state.jbTokens.fuel2token;

      this.dataExtensionFieldSearch(accessToken, endpointSubdomain, dataExtension.CustomerKey)
        .then((response) => {
          emit('update:dataExtensionFields', response);
          this.searchLoading = false;
        });
    }
  }
}
</script>
