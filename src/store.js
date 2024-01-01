import { createStore } from 'vuex';
// import jbSchema from './data/jbSchema';
// import jbTokens from './data/jbTokens';
// import jbEndpoints from './data/jbEndpoints';
// import jbActivity from './data/jbActivity';

export const store = createStore({
  state () {
    return {
      configModal: {
        config_type: null,
        validation_email: '',
        validation_types: [],
        upsert_externalKey: '',
        upsert_dataAttributes: [{
          key: null,
          value: null
        }],
        entry_eventDefinitionKey: '',
        entry_dataAttributes: [{
          key: null,
          value: null
        }],
        entry_contactKey: '',
        deletion_contactKey: ''
      },
      // jbActivity: jbActivity,
      jbActivity: {},
      // jbEndpoints: jbEndpoints,
      jbEndpoints: {},
      // jbTokens: jbTokens,
      jbTokens: {},
      jbCulture: {},
      jbInteractionDefaults: {},
      jbInteraction: {},
      jbTriggerEventDefinition: {},
      // jbSchema: jbSchema
      jbSchema: {}
    }
  },
  mutations: {
    updateConfigModal (state, object) {
      state.configModal[object.key] = object.value;
    },
    updateState (state, object) {
      state[object.key] = object.value;
    }
  }
});

export default store;
