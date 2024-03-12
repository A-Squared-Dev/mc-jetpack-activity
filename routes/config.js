// Required environment variables
const VITE_APP_TITLE = process.env.VITE_APP_TITLE;
const VITE_APP_URL = process.env.VITE_APP_URL.replace(/\/+$/, '');

// Optional environment variables
const JB_TIMEOUT = process.env.JB_TIMEOUT || 20000;
const JB_RETRY_COUNT = process.env.JB_RETRY_COUNT || 0;
const JB_RETRY_DELAY = process.env.JB_RETRY_DELAY || 1000;
const JB_CONCURRENT_REQUESTS = process.env.JB_CONCURRENT_REQUESTS || 5;

// Configuration definition
const json = {
  workflowApiVersion: '1.1',
  metaData: {
    category: 'custom'
  },
  type: 'REST',
  lang: {
    'en-US': {
      name: VITE_APP_TITLE,
      description: 'A custom activity for Marketing Cloud Journey Builder'
    }
  },
  arguments: {
    execute: {
      timeout: JB_TIMEOUT,
      retryCount: JB_RETRY_COUNT,
      retryDelay: JB_RETRY_DELAY,
      concurrentRequests: JB_CONCURRENT_REQUESTS,
      url: `${VITE_APP_URL}/execute`
    }
  },
  configurationArguments: {
    validate: {
      url: `${VITE_APP_URL}/validate`
    },
    publish: {
      url: `${VITE_APP_URL}/publish`
    }
  },
  userInterfaces: {
    configModal: {
      url: `${VITE_APP_URL}/`
    },
    runningHover: {
      url: `${VITE_APP_URL}/hover`
    },
    runningModal: {
      url: `${VITE_APP_URL}/modal`
    }
  },
  schema: {
    arguments: {
      execute: {
        inArguments: [{
          config_type: {
            dataType: 'number',
            direction: 'in'
          },
          validation_email: {
            dataType: 'text',
            direction: 'in'
          },
          validation_types: {
            dataType: 'text',
            direction: 'in'
          },
          upsert_dataExtension: {
            dataType: 'text',
            direction: 'in'
          },
          upsert_dataExtensionFields: {
            dataType: 'text',
            direction: 'in'
          },
          upsert_dataAttributes: {
            dataType: 'text',
            direction: 'in'
          },
          entry_eventDefinition: {
            dataType: 'text',
            direction: 'in'
          },
          entry_eventDefinitionFields: {
            dataType: 'text',
            direction: 'in'
          },
          entry_dataAttributes: {
            dataType: 'text',
            direction: 'in'
          },
          entry_contactKey: {
            dataType: 'text',
            direction: 'in'
          },
          deletion_contactKey: {
            dataType: 'text',
            direction: 'in'
          }
        }],
        outArguments: [{
          result: {
            dataType: 'text',
            direction: 'out',
            access: 'visible'
          }
        }]
      }
    }
  }
}

module.exports = (req, res) => {
  res.json(json);
}
