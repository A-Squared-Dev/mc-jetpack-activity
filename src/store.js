import { createStore } from 'vuex';
// import jbSchema from './data/jbSchema';
// import jbTokens from './data/jbTokens';
// import jbActivity from './data/jbActivity';

export const store = createStore({
  state () {
    return {
      configType: null,
      configTypes: [
        {
          id: 1,
          title: 'Validate Email Address',
          description: 'Validate an email address by specifying the validators.'
        },
        {
          id: 2,
          title: 'Data Extension Upsert',
          description: 'Upserts a data extension row by external key.'
        },
        {
          id: 3,
          title: 'Interaction Fire Event',
          description: 'Fire an API entry event that initiates a journey.'
        },
        {
          id: 4,
          title: 'Contact Delete By Key',
          description: 'Delete a contact by specifying a contact key.'
        }
      ],
      configModal: {
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
    updateConfigType (state, value) {
      state.configType = value;
    },
    updateConfigModal (state, object) {
      state.configModal[object.key] = object.value;
    },
    updateState (state, object) {
      state[object.key] = object.value;
    }
  }
});

export default store;
